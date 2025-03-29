import { Box, Typography, Divider, Grid, Stack, TextField, TextFieldProps, Button } from '@mui/material'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import TextFieldWithLabel from '../../common/TextFieldWithLabel'
import { To, useNavigate } from 'react-router-dom'
import { RequiredItem } from '../audit-schedule/AuditScheduleDetail'
import TextareaWithLabel from '../../common/TextareaWithLabel'
import ErrorText from '../../common/ErrorText'
import Api from '../../../api'
import { LoadingButton } from '@mui/lab'
import { IFormulaGroup } from '../../../types/formula'
import { FC } from 'react'


const getNumbersFromExpression = (expression: string) => {
  const matches = expression.match(/-?\d+(\.\d+)?/g);
  if (matches) {
    const results = matches.map(match => parseFloat(match));
    return results
  } else {
    return []
  }
}


const getInitialValue = (data: IFormulaGroup | undefined) => {
  const formula1 = data?.formulas?.[0]?.formula
  const formula2 = data?.formulas?.[1]?.formula
  return {
    groupName: data?.name || '',
    remark: data?.remark || '',
    formula1Name: data?.formulas?.[0]?.name ||'',
    formula1Number1: formula1? getNumbersFromExpression(formula1)?.[0] : 70,
    formula1Number2: formula1? getNumbersFromExpression(formula1)?.[1] : 70,
    formula2Name: data?.formulas?.[1]?.name ||'',
    formula2Number1: formula2? getNumbersFromExpression(formula2)?.[0] : 70,
    formula2Number2: formula2? getNumbersFromExpression(formula2)?.[1] : 70,
  }
}

const NumberInputField = ({...props}: TextFieldProps) => {
  return (
    <TextField
      type='number'
      variant="outlined"
      size='small'
      sx={{
        '& .MuiInputBase-root fieldset': {
          borderColor: theme => `${theme.palette.primary.main} !important`
        },
        '& .MuiInputBase-root input': {
          p: '8px !important',
          width: '40px'
        }
      }}
      {...props}
    />
  )
}
const NumberIndigator = ({
  text,
  left
}: {text: string, left: number}) => {
  return (
    <Box
      sx={{
        fontSize: '10px',
        color: '#fff',
        background: theme => theme.palette.grey[500],
        width: '14px',
        height: '14px',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: -3,
        left: left || 0,
        zIndex: 100
      }}
    >
      {text}
    </Box>
  )
}
interface IProps {
  data?: IFormulaGroup
  onCancel?: () => void
}

const ProjectFormulaGroupAddEdit:FC<IProps> = ({
  data,
  onCancel
}) => {
  const navigate = useNavigate()
  const isEdit = !!data

  const [createFormulaGroup] = Api.useCreateAuditFormulaGroupMutation()
  const [updateFormulaGroup] = Api.useUpdateAuditFormulaGroupMutation()
  const [createBatchFormula] = Api.useCreateMultipleAuditFormulasMutation()
  const [updateBatchFormula] = Api.useUpdateMultipleAuditFormulasMutation()

  const formik = useFormik<{
    groupName: string
    remark: string
    formula1Name: string
    formula1Number1: number
    formula1Number2: number
    formula2Name: string
    formula2Number1: number
    formula2Number2: number
  }>({
    initialValues: getInitialValue(data),
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      groupName: Yup.string().max(256).required('Group name is required'),
      remark: Yup.string(),
      formula1Name: Yup.string().required('Fromula 1 name is required'),
      formula1Number1: Yup.number().required(),
      formula1Number2: Yup.number().required(),
      formula2Name: Yup.string().required('Fromula 2 name is required'),
      formula2Number1: Yup.number().required(),
      formula2Number2: Yup.number().required(),
    }),
    onSubmit: async (values, { setStatus, setValues, setSubmitting }) => {
      setSubmitting(true)

      try {
        if(isEdit) {
          if(data?.name !== values.groupName || data?.remark !== values.remark) {
            await updateFormulaGroup({id: data?.id, name: values.groupName, remark: values.remark})
          }
          const formula1 = `(${values.formula1Number1}% - S) * ${values.formula1Number2}% * MTR`
          const formula2 = `(${values.formula2Number1}% - I) * MIUS / MS * ${values.formula2Number2}% * MTR`
          const formulas = [
            {
              id: data?.formulas?.[0]?.id as number,
              name: values.formula1Name,
              formula: formula1,
              remark: '',
            },
            {
              id: data?.formulas?.[1]?.id as number,
              name: values.formula2Name,
              formula: formula2,
              remark: '',
            }
          ]
          updateBatchFormula(formulas)
            .unwrap()
            .then((res) => {
              toast.success(`Formula Group has been saved`)
              navigate('/audit/project-site/formula')
            })
            .catch((err) => {
              throw Error
            })
        }
        else {
          const res: any = await createFormulaGroup({name: values.groupName, remark: values.remark})
          const formula1 = `(${values.formula1Number1}% - S) * ${values.formula1Number2}% * MTR`
          const formula2 = `(${values.formula2Number1}% - I) * MIUS / MS * ${values.formula2Number2}% * MTR`
          const formulas = [
            {
              name: values.formula1Name,
              formula: formula1,
              remark: '',
              step: 1,
              formulaGroupId: res?.data?.id
            },
            {
              name: values.formula2Name,
              formula: formula2,
              remark: '',
              step: 2,
              formulaGroupId: res?.data?.id
            }
          ]
          createBatchFormula(formulas)
            .unwrap()
            .then((res) => {
              toast.success(`Formula Group has been added`)
              navigate('/audit/project-site/formula')
            })
            .catch((err) => {
              throw Error
            })
        }

        setSubmitting(false)
      } catch (err: any) {
        console.error(err)
        setStatus({ success: false })
        setSubmitting(false)
        toast.error(`Formula Group creation failed`)
      }
    },
  })

  return (
    <Box>
      <Box
        sx={{
          p: 0,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          mt: 4,
          mx: 4
        }}
      >
        {
          !isEdit &&
          <>
            <Box
              sx={{
                pt: 3.5,
                px: 4,
                pb: 2.5,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 3,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: { lg: 'nowrap', xs: 'wrap' },
                  gap: 2,
                }}
              >
                <Typography typography={'h3'}>Add New SLA Formula Group</Typography>
              </Box>
            </Box>
            <Divider light />
          </>
        }

        <Box sx={{ pt: 2.5, pb: 4, px: 3.5 }}>
          <Box>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems={{ lg: 'center', xs: 'flex-start' }}
              sx={{ flexDirection: { lg: 'row', xs: 'column' } }}
            >
              <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
                SLA Formula Group Name
                <RequiredItem />
              </Typography>
              <Box width='100%' maxWidth={{ lg: '860px', xs: '100%' }}>
                <TextFieldWithLabel
                  showLabel={false}
                  name='groupName'
                  placeholder='SLA Formula Group Name'
                  value={formik.values.groupName}
                  onChange={(e) => formik.setFieldValue('groupName', e.target.value)}
                  height='40px'
                  error={!!formik.errors.groupName && !!formik.touched.groupName}
                  helperText={formik.errors.groupName}
                />
              </Box>
            </Box>
            <Box
              display='flex'
              justifyContent='space-between'
              mt={2}
              alignItems={{ lg: 'center', xs: 'flex-start' }}
              sx={{ flexDirection: { lg: 'row', xs: 'column' } }}
            >
              <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
                Remark
              </Typography>
              <Box width='100%' maxWidth={{ lg: '860px', xs: '100%' }}>
                <TextareaWithLabel
                  showLabel={false}
                  name='remark'
                  onChange={(e) => formik.setFieldValue('remark', e.target.value)}
                  value={formik.values.remark}
                  placeholder='Remarks'
                  rows={4}
                />
              </Box>
            </Box>
          </Box>
          <Box mt={4}>
            <Typography typography={'h5'} sx={{ fontSize: '1.125rem' }}>
              SLA Formula
            </Typography>
            <Box mt={1}>
              <Typography fontSize={15} fontWeight={500} >SLA Formula 1</Typography>
              <Grid container mt={1} columnSpacing={3}>
                <Grid item xs={12} sm={6} >
                  <TextFieldWithLabel
                    showLabel={false}
                    size='small'
                    fullWidth
                    placeholder='SLA Formula 1'
                    name='formula1Name'
                    value={formik.values.formula1Name}
                    onChange={(e) => formik.setFieldValue('formula1Name', e.target.value)}
                    error={!!formik.errors.formula1Name && !!formik.touched.formula1Name}
                    helperText={formik.errors.formula1Name}
                  />
                </Grid>
                <Grid item xs={12} sm={6} >
                  <Stack
                    direction={'row'}
                    sx={{
                      background: theme => theme.palette.grey[100],
                      height: '42px',
                      borderRadius: '6px',
                      px: 2,
                      alignItems: 'center',
                      gap: 1,
                      position:'relative'
                    }}
                  >
                    <NumberIndigator text='1' left={80} />
                    <NumberIndigator text='2' left={135} />
                    <NumberIndigator text='3' left={235} />
                    <NumberIndigator text='4' left={322} />
                    <Typography fontWeight={600}>{'[('}</Typography>
                    <NumberInputField
                      value={formik.values.formula1Number1}
                      onChange={(e) => formik.setFieldValue('formula1Number1', e.target.value)}
                    />
                    <Typography fontWeight={600}>{'%'}</Typography>
                    <Typography fontWeight={600}>{'-'}</Typography>
                    <Typography fontWeight={600}>{'S'}</Typography>
                    <Typography fontWeight={600}>{')'}</Typography>
                    <Typography fontWeight={600}>{'x'}</Typography>
                    <Typography fontWeight={600}>{'('}</Typography>
                    <NumberInputField
                      value={formik.values.formula1Number2}
                      onChange={(e) => formik.setFieldValue('formula1Number2', e.target.value)}
                    />
                    <Typography fontWeight={600}>{'%'}</Typography>
                    <Typography fontWeight={600}>{')'}</Typography>
                    <Typography fontWeight={600}>{'x'}</Typography>
                    <Typography fontWeight={600}>{'MTR'}</Typography>
                    <Typography fontWeight={600}>{']'}</Typography>
                  </Stack>
                  <ErrorText
                    error={(!!formik.errors.formula1Number1 && !!formik.touched.formula1Number1) || (!!formik.errors.formula1Number2 && !!formik.touched.formula1Number2)}
                    text={'All fields are required'}
                  />
                  <Typography color={'grey.500'}>
                  * (1) SLA percentage, (2) overall score, (3) weightage, (4) monthly contract sum
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box mt={3}>
              <Typography fontSize={15} fontWeight={500} >SLA Formula 2</Typography>
              <Grid container mt={1} columnSpacing={3}>
                <Grid item xs={12} sm={6} >
                  <TextFieldWithLabel
                    showLabel={false}
                    size='small'
                    fullWidth
                    placeholder='SLA Formula 2'
                    name='formula2Name'
                    value={formik.values.formula2Name}
                    onChange={(e) => formik.setFieldValue('formula2Name', e.target.value)}
                    error={!!formik.errors.formula2Name && !!formik.touched.formula2Name}
                    helperText={formik.errors.formula2Name}
                  />
                </Grid>
                <Grid item xs={12} sm={6} >
                  <Stack
                    direction={'row'}
                    sx={{
                      background: theme => theme.palette.grey[100],
                      height: '42px',
                      borderRadius: '6px',
                      px: 2,
                      alignItems: 'center',
                      gap: 1,
                      position:'relative'
                    }}
                  >
                    <NumberIndigator text='1' left={80} />
                    <NumberIndigator text='2' left={135} />
                    <NumberIndigator text='3' left={215} />
                    <NumberIndigator text='4' left={260} />
                    <NumberIndigator text='5' left={345} />
                    <NumberIndigator text='6' left={422} />
                    <Typography fontWeight={600}>{'[('}</Typography>
                    <NumberInputField
                      value={formik.values.formula2Number1}
                      onChange={(e) => formik.setFieldValue('formula2Number1', e.target.value)}
                    />
                    <Typography fontWeight={600}>{'%'}</Typography>
                    <Typography fontWeight={600}>{'-'}</Typography>
                    <Typography fontWeight={600}>{'S'}</Typography>
                    <Typography fontWeight={600}>{')'}</Typography>
                    <Typography fontWeight={600}>{'x'}</Typography>
                    <Typography fontWeight={600}>{'('}</Typography>
                    <Typography fontWeight={600}>{'MIUS'}</Typography>
                    <Typography fontWeight={600}>{'/'}</Typography>
                    <Typography fontWeight={600}>{'MS'}</Typography>
                    <Typography fontWeight={600}>{')'}</Typography>
                    <Typography fontWeight={600}>{'x'}</Typography>
                    <NumberInputField
                      value={formik.values.formula2Number2}
                      onChange={(e) => formik.setFieldValue('formula2Number2', e.target.value)}
                    />
                    <Typography fontWeight={600}>{'%'}</Typography>
                    <Typography fontWeight={600}>{'x'}</Typography>
                    <Typography fontWeight={600}>{'MTR'}</Typography>
                    <Typography fontWeight={600}>{']'}</Typography>
                  </Stack>
                  <ErrorText
                    error={(!!formik.errors.formula2Number1 && !!formik.touched.formula2Number1) || (!!formik.errors.formula2Number2 && !!formik.touched.formula2Number2)}
                    text={'All fields are required'}
                  />
                  <Typography color={'grey.500'}>
                  * (1) SLA percentage, (2) IU score, (3) maximum IU score, (4) maximum score for all IU, (5) weightage, (6) monthly contract sum
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
        <Divider light />
        <Box
          sx={{
            px: 3.75,
            pt: 4,
            pb: 3.25,
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 3,
          }}
        >
          <Button
            variant='text'
            color='inherit'
            onClick={() => (isEdit && onCancel) ? onCancel() : formik.resetForm()}
            sx={{ color: (theme) => theme.palette.grey[400], fontWeight: 500 }}
          >
            Cancel
          </Button>
          <LoadingButton
            variant='contained'
            color='primary'
            onClick={() => formik.handleSubmit()}
            disabled={formik.isSubmitting}
            loading={formik.isSubmitting}
          >
            {isEdit ? 'Save' : 'Add'}
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  )
}

export default ProjectFormulaGroupAddEdit
