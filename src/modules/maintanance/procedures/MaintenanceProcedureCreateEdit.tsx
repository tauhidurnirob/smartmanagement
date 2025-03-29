import { Box, Button, Card, Divider, Grid, Typography } from '@mui/material'
import { FC } from 'react'
import { RequiredItem } from '../../audit/audit-schedule/AuditScheduleDetail'
import TextFieldWithLabel from '../../common/TextFieldWithLabel'
import TextareaWithLabel from '../../common/TextareaWithLabel'
import { FormikErrors, useFormik } from 'formik'
import * as Yup from 'yup'
import { Plus } from '../../../assets/icons/plus'
import MaintenanceProcedureStep from './MaintenanceProcedureStep'
import { IMaintenanceStep } from '../../../types/maintenance'
import deepCopy from '../../../helpers/deepCopy'
import { IImg } from '../../../types/performance-management'

interface IMaintenanceProcedureCreate {
  name: string
  remark: string
  steps: IMaintenanceStep[]
}

const initFormikValue: IMaintenanceProcedureCreate = {
  name: '',
  remark: '',
  steps: [],
}
const initStep: IMaintenanceStep = { text: '', images: [] }
const initStepTouched = { text: false }

interface IProps {
  procedureId?: number
}
const MaintenanceProcedureCreateEdit: FC<IProps> = ({ procedureId }) => {
  const isDetails = !!procedureId

  const handleAddNewStep = () => {
    const newSteps = [...formik.values.steps, { ...initStep }]
    formik.setFieldValue('steps', newSteps)

    const newTouched = [...(formik.touched?.steps || [])]
    newTouched.push({ ...initStepTouched })
    formik.setTouched({
      ...(formik.touched || {}),
      steps: newTouched,
    })
  }

  const formik = useFormik<IMaintenanceProcedureCreate>({
    enableReinitialize: true,
    initialValues: { ...initFormikValue },
    validationSchema: Yup.object().shape({
      name: Yup.string().max(250).required('Procedure name is required'),
      remark: Yup.string(),
      steps: Yup.array(
        Yup.object().shape({
          text: Yup.string().max(255).required('Step deccription is required'),
          images: Yup.array(),
        })
      ),
    }),
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        // setSubmitting(true)
      } catch (err: any) {
        console.error('Unkown error in saving procedure: ', err)
        setStatus({ success: false })
        setSubmitting(false)
      }
    },
  })

  const handleImageRemove = (imgIdx: number, listIdx: number) => {
    const newSteps = deepCopy(formik.values.steps)
    newSteps[listIdx].images.splice(imgIdx, 1)
    formik.setFieldValue('steps', newSteps)
  }

  const handleTextChange = async (idx: number, text: string) => {
    const newLists = [...formik.values.steps]
    newLists[idx].text = text
    await formik.setFieldValue('steps', newLists)
    await formik.setFieldTouched(`steps[${idx}].text`, true)
  }

  const handleRemoveSop = (index: number) => {
    const newSteps = [...formik.values.steps]
    newSteps.splice(index, 1)
    formik.setFieldValue('steps', newSteps)

    const newTouched = [...(formik.touched?.steps || [])]
    newTouched.splice(index, 1)
    formik.setTouched({
      ...(formik.touched || {}),
      steps: newTouched,
    })
  }

  const setImages = (imgs: IImg[], index: number) => {
    const newSteps = deepCopy(formik.values.steps)
    newSteps[index].images = imgs
    formik.setFieldValue('steps', newSteps)
  }

  return (
    <Card sx={{ mt: 3 }}>
      <Box sx={{ px: 3.75, pt: 5.25, pb: 2.5 }}>
        <Typography variant='h3'>
          {isDetails ? 'Procedure Details' : 'Add New Procedure'}
        </Typography>
      </Box>
      <Divider light />
      <Box sx={{ px: 3.75, pt: 3, pb: 3 }}>
        <Grid container direction={'column'} spacing={2}>
          <Grid item container spacing={2}>
            <Grid item lg={4} xs={12}>
              <Typography
                typography={'h4'}
                sx={{ fontWeight: 500, mt: 1.25, display: 'inline-flex' }}
              >
                Procedure Name
                <RequiredItem />
              </Typography>
            </Grid>
            <Grid item lg={8} xs={12}>
              <TextFieldWithLabel
                showLabel={false}
                name='name'
                placeholder='Procedure name'
                onChange={(e) => {
                  formik.setFieldValue('name', e.target.value)
                }}
                error={!!formik.errors.name && formik.touched.name}
                helperText={formik.errors.name}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item lg={4} xs={12}>
              <Typography
                typography={'h4'}
                sx={{ fontWeight: 500, mt: 1.25, display: 'inline-flex' }}
              >
                Remark
              </Typography>
            </Grid>
            <Grid item lg={8} xs={12}>
              <TextareaWithLabel
                label={''}
                name={'remark'}
                placeholder={'Remark'}
                rows={4}
                hiddenLabel={true}
                onChange={(e) => formik.setFieldValue('remark', e.target.value)}
                error={!!formik.errors.remark && formik.touched.remark}
                helperText={formik.errors.remark}
              />
            </Grid>
          </Grid>
        </Grid>
        <Box>
          <Box sx={{ mt: 5.5, display: 'flex', alignItems: 'center' }}>
            <Typography typography={'h5'} sx={{ fontSize: '1.125rem' }}>
              Steps
              <RequiredItem />
            </Typography>
            <Button
              variant='contained'
              size='small'
              sx={{
                p: 1,
                ml: 3,
                minWidth: 0,
                background: (theme) => theme.palette.primary.light,
                color: (theme) => theme.palette.primary.main,
                '&:hover': {
                  color: '#ffffff',
                },
              }}
              onClick={handleAddNewStep}
            >
              <Plus sx={{ fontSize: '16px' }} />
            </Button>
          </Box>
          <Typography mt={1}>
            Supported format: jpg, jpeg, png, mp4. Max file size is 5 MB
          </Typography>
          {formik.values.steps?.map((step, idx) => {
            const textError =
              !!formik.errors.steps?.[idx] &&
              !!(formik.errors.steps[idx] as FormikErrors<IMaintenanceStep>).text
            const textErrorMsg =
              !!formik.errors.steps?.[idx] &&
              typeof formik.errors.steps[idx] !== 'string' &&
              (formik.errors.steps[idx] as FormikErrors<IMaintenanceStep>).text
                ? (formik.errors.steps[idx] as FormikErrors<IMaintenanceStep>).text
                : ''
            return (
              <MaintenanceProcedureStep
                key={`step-${idx}`}
                label={`Step ${idx}`}
                placeholder={`Step ${idx}`}
                fieldName={`step${idx}`}
                error={textError}
                errorMsg={textErrorMsg as string}
                images={step.images}
                setImages={setImages}
                handleImageRemove={handleImageRemove}
                handleTextChange={handleTextChange}
                index={idx}
                onRemove={() => handleRemoveSop(idx)}
                text={step.text}
              />
            )
          })}
        </Box>
      </Box>
      <Divider light />
      <Box
        sx={{
          px: 3.75,
          pt: 2.5,
          pb: 3.75,
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 3,
        }}
      >
        <Button
          variant='text'
          color='inherit'
          sx={{ color: (theme) => theme.palette.grey[400], fontWeight: 500 }}
        >
          Cancel
        </Button>
        {!isDetails && (
          <Button variant='contained' color='primary'>
            Add Procedure
          </Button>
        )}
        {isDetails && (
          <Button variant='contained' color='primary'>
            Save
          </Button>
        )}
      </Box>
    </Card>
  )
}

export default MaintenanceProcedureCreateEdit
