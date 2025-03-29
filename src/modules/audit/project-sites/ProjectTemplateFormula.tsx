import { useState, useEffect, ChangeEvent } from 'react'
import { Box, Typography, Divider, Button, Stack, Grid, IconButton } from '@mui/material'
import { toast } from 'react-toastify'
import { FormikErrors, useFormik } from 'formik'
import * as Yup from 'yup'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import { ROW_PER_PAGE_OPTIONS } from '../../../helpers/constants'
import Api from '../../../api'
import TextFieldWithLabel from '../../common/TextFieldWithLabel'
import { Plus } from '../../../assets/icons/plus'
import BackDrop from '../../common/BackDrop'
import { IFormula, IFormulaList } from '../../../types/formula'
import { ReqAuditFormulaCreate, ReqAuditFormulaUpdate } from '../../../api/models'

interface IFormulaItem {
  name: string
  formula: string
  step: number
}

const initValue: IFormulaItem[] = []
const initFormulaValue: IFormulaItem = { name: '', formula: '', step: 1 }
const initFormulaTouch = { name: false, formula: false }

const getSaveData = (currentFormulas: IFormulaItem[], initFormulas: IFormula[]) => {
  const deletedFormulaIds = initFormulas
    .filter(
      (item) =>
        typeof item.id === 'number' &&
        currentFormulas.findIndex((cur) => cur.step === item.step) === -1
    )
    .map((item) => item.id as number)
  const addedFormulas: ReqAuditFormulaCreate[] = []
  const updatedFormulas: ReqAuditFormulaUpdate[] = []
  for (const cur of currentFormulas) {
    const formula = initFormulas.find((item) => cur.step === item.step)
    if (!formula) {
      addedFormulas.push({
        name: cur.name,
        formula: cur.formula,
        step: cur.step,
      } as ReqAuditFormulaCreate)
    } else {
      if (cur.name !== formula.name || cur.formula !== formula.formula) {
        if (formula.id !== null) {
          updatedFormulas.push({ id: formula.id, ...cur })
        }
      }
    }
  }

  return {
    addedFormulas,
    deletedFormulaIds,
    updatedFormulas,
  }
}

const ProjectTemplateFormula = () => {
  const [getFormulas, { isLoading: isLoadingFormulas, data }] =
    Api.useLazyGetAuditFormulaListQuery()
  const [deleteFormulas, { isLoading: isDeletingFormulas }] = Api.useDeleteAuditFormulasMutation()
  const [updateMultipleFormulas] = Api.useUpdateMultipleAuditFormulasMutation()
  const [createMultipleFormulas] = Api.useCreateMultipleAuditFormulasMutation()

  const formik = useFormik<{
    formulas: IFormulaItem[]
  }>({
    initialValues: { formulas: initValue },
    validationSchema: Yup.object().shape({
      formulas: Yup.array(
        Yup.object().shape({
          name: Yup.string().max(255).required('Formula name is required'),
          formula: Yup.string().max(255).required('Formula is required'),
        })
      ),
    }),
    onSubmit: async (values, { setStatus, setValues, setSubmitting }) => {
      setSubmitting(true)

      try {
        const { addedFormulas, updatedFormulas, deletedFormulaIds } = getSaveData(
          values.formulas,
          data?.rows || []
        )

        // Delete some formulas
        if (deletedFormulaIds.length > 0) {
          await deleteFormulas({ ids: deletedFormulaIds }).unwrap()
        }

        // Add new formulas
        if (addedFormulas.length > 0) {
          await createMultipleFormulas(addedFormulas).unwrap()
        }

        // Update formulas
        if (updatedFormulas.length > 0) {
          await updateMultipleFormulas(updatedFormulas).unwrap()
        }

        toast.success(`Formulas has been saved`)

        setSubmitting(false)
      } catch (err: any) {
        console.error(err)
        setStatus({ success: false })
        setSubmitting(false)
      }
    },
  })

  const loadData = (text: string) => {
    getFormulas({
      page: 1,
      limit: ROW_PER_PAGE_OPTIONS[0],
      text,
    })
      .unwrap()
      .then((res) => {
        const formulas = res.rows.map((item) => ({
          name: item.name,
          formula: item.formula,
          step: item.step,
        }))
        formik.setFieldValue('formulas', formulas)
      })
      .catch((err) => {
        console.log('Failed to get formula list: ', err)
        formik.setFieldValue('formulas', [])
      })
  }

  const handleChangeFormulaName = async (idx: number, name: string) => {
    const newFormulas = [...formik.values.formulas]
    newFormulas[idx].name = name
    await formik.setFieldValue('formulas', newFormulas)
    await formik.setFieldTouched(`formulas[${idx}].name`, true)
  }

  const handleChangeFormula = (idx: number, formula: string) => {
    const newFormulas = [...formik.values.formulas]
    newFormulas[idx].formula = formula
    formik.setFieldValue('formulas', newFormulas)
    formik.setFieldTouched(`formulas[${idx}].formula`, true)
  }

  const handleAddNewFormula = () => {
    const maxStep = formik.values.formulas[formik.values.formulas.length - 1].step + 1
    const newFormulas = [...formik.values.formulas, { ...initFormulaValue, step: maxStep }]
    formik.setFieldValue('formulas', newFormulas)

    const newTouched = [...(formik.touched?.formulas || [])]
    newTouched.push({ ...initFormulaTouch })
    formik.setTouched({
      ...(formik.touched || {}),
      formulas: newTouched,
    })
  }

  const handleRemoveFormula = (idx: number) => {
    const newFormulas = [...formik.values.formulas]
    newFormulas.splice(idx, 1)
    if (newFormulas.length > 0) {
      const newTouched = [...(formik.touched?.formulas || [])]
      newTouched.splice(idx, 1)
      formik.setTouched({
        ...(formik.touched || {}),
        formulas: newTouched,
      })
    }
    formik.setFieldValue('formulas', newFormulas)
  }

  const handleSaveFormulas = () => {
    formik.handleSubmit()
  }

  useEffect(() => {
    loadData('')
  }, [])

  return (
    <Box
      sx={{
        p: 0,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
      }}
    >
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
          <Typography typography={'h3'}>Formula</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: { lg: 'nowrap', xs: 'wrap' },
            gap: 2,
          }}
        >
          <Button variant='contained' color='primary' onClick={handleSaveFormulas}>
            Save
          </Button>
        </Box>
      </Box>
      <Divider light />
      <Box sx={{ pt: 2.5, pb: 4, px: 3.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography typography={'h5'} sx={{ fontSize: '1.125rem' }}>
            Formula
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
            onClick={handleAddNewFormula}
          >
            <Plus sx={{ fontSize: '16px' }} />
          </Button>
        </Box>

        <Box sx={{ mt: 2.5 }} display={'flex'} flexDirection={'column'} gap={3.5}>
          {!isLoadingFormulas &&
            formik.values.formulas.map((formula, idx) => {
              return (
                <Stack key={idx} flexDirection={'row'} alignItems={'flex-start'} gap={1}>
                  <Stack flexGrow={1}>
                    <Grid container spacing={{ lg: 2.5, xs: 1.5 }} alignItems={'flex-start'}>
                      <Grid item lg={6} xs={12}>
                        <Typography typography={'h5'} sx={{ mb: 0.75 }}>
                          Formula {formula.step}
                        </Typography>
                        <TextFieldWithLabel
                          showLabel={false}
                          size='small'
                          fullWidth
                          placeholder='Name'
                          name='formulaName'
                          value={formula.name}
                          onChange={(e) => handleChangeFormulaName(idx, e.target.value)}
                          error={
                            !!formik.touched.formulas &&
                            !!formik.touched.formulas[idx] &&
                            !!formik.touched.formulas[idx].name &&
                            !!formik.errors.formulas &&
                            !!formik.errors.formulas[idx] &&
                            !!(formik.errors.formulas[idx] as FormikErrors<IFormulaItem>).name
                          }
                          helperText={
                            !!formik.touched.formulas &&
                            !!formik.touched.formulas[idx] &&
                            !!formik.touched.formulas[idx].name &&
                            !!formik.errors.formulas &&
                            !!formik.errors.formulas[idx] &&
                            typeof formik.errors.formulas[idx] !== 'string' &&
                            (formik.errors.formulas[idx] as FormikErrors<IFormulaItem>).name
                              ? (formik.errors.formulas[idx] as FormikErrors<IFormulaItem>).name
                              : ''
                          }
                        />
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <Typography
                          typography={'h5'}
                          sx={{ mb: 0.75, display: { lg: 'flex', xs: 'none' } }}
                        >
                          &nbsp;
                        </Typography>
                        <TextFieldWithLabel
                          showLabel={false}
                          size='small'
                          fullWidth
                          placeholder='Formula'
                          name='formulaFormula'
                          value={formula.formula}
                          onChange={(e) => handleChangeFormula(idx, e.target.value)}
                          error={
                            !!formik.touched.formulas &&
                            !!formik.touched.formulas[idx] &&
                            !!formik.touched.formulas[idx].formula &&
                            !!formik.errors.formulas &&
                            !!formik.errors.formulas[idx] &&
                            !!(formik.errors.formulas[idx] as FormikErrors<IFormulaItem>).formula
                          }
                          helperText={
                            !!formik.touched.formulas &&
                            !!formik.touched.formulas[idx] &&
                            !!formik.errors.formulas &&
                            !!formik.errors.formulas[idx] &&
                            typeof formik.errors.formulas[idx] !== 'string' &&
                            (formik.errors.formulas[idx] as FormikErrors<IFormulaItem>).formula
                              ? (formik.errors.formulas[idx] as FormikErrors<IFormulaItem>).formula
                              : ''
                          }
                        />
                      </Grid>
                    </Grid>
                  </Stack>
                  <Stack>
                    <IconButton sx={{ mt: 3.5 }} onClick={() => handleRemoveFormula(idx)}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Stack>
                </Stack>
              )
            })}
          {isLoadingFormulas && <BackDrop />}
        </Box>
      </Box>
    </Box>
  )
}

export default ProjectTemplateFormula
