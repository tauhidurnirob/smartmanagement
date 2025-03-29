import { FC, useEffect, useMemo, useState } from 'react'
import { Box, Typography, Button, Stack, Checkbox, Card, Grid, TextField } from '@mui/material'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { Plus } from '../../../assets/icons/plus'
import Api from '../../../api'
import { TrashIcon } from '../../../assets/icons/trash'
import deepCopy from '../../../helpers/deepCopy'
import DeleteDialog from '../../common/DeleteDialog'
import BackDrop from '../../common/BackDrop'
import useDebounce from '../../../hooks/useDebounce'
import SearchField from '../../common/SearchField'

interface IFormTypeItem {
  id: number
  name: string
  isActive: boolean
}

interface INewFormTypeItem {
  name: string
}

const AuditFormTypeList: FC = () => {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)

  const {
    data: formTypeList,
    refetch,
    isFetching: isLoading,
  } = Api.useGetAuditFormTypeListQuery({
    page: 1,
    limit: 100,
    orderBy: 'name',
    orderDir: 'asc',
    text: debouncedSearch,
    isAll: true,
  })
  const [updateFormType] = Api.useUpdateAuditFormTypeMutation()
  const [deleteFormTypesByIds] = Api.useDeleteAuditFormTypesByIdsMutation()
  const [updateFormTypes] = Api.useUpdateMultipleAuditFormTypesMutation()
  const [createFormTypes] = Api.useCreateMultipleAuditFormTypesMutation()
  const [deleteFormTypeById, {isLoading: deleteLoading}] = Api.useDeleteAuditFormTypeMutation()

  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [selectedFormIdx, setSelectedFormIdx] = useState<number | null>(null)

  const initForms = useMemo(() => {
    const forms = (formTypeList?.rows || []).map(
      (item) =>
        ({
          name: item.name.toString(),
          id: item.id,
          isActive: item.isActive,
        } as IFormTypeItem)
    )

    return forms
  }, [formTypeList])

  const formik = useFormik<{
    forms: IFormTypeItem[]
    newForms: INewFormTypeItem[]
  }>({
    enableReinitialize: true,
    initialValues: { forms: [], newForms: [] },
    validationSchema: Yup.object().shape({
      forms: Yup.array(
        Yup.object().shape({
          name: Yup.string()
            .required('Form Name is required')
            .test(
              'form-type-number-uniqqueness',
              'Name of Form Type should be unique',
              (value, rest) => {
                const index = (rest.options as any).index
                const forms = rest.from ? rest.from[1].value.forms : []
                const newForms = rest.from ? rest.from[1].value.newForms : []
                const names = []
                for (let idx = 0; idx < forms.length; idx++) {
                  if (idx !== index) {
                    names.push(forms[idx].name)
                  }
                }
                for (const newForm of newForms) {
                  names.push(newForm.name)
                }
                return !names.includes(value)
              }
            ),
          isActive: Yup.boolean(),
          id: Yup.number(),
        })
      ),
      newForms: Yup.array(
        Yup.object().shape({
          name: Yup.string()
            .required('Form Name is required')
            .test(
              'form-type-number-uniqqueness',
              'Name of Form Type should be unique',
              (value, rest) => {
                const index = (rest.options as any).index
                const forms = rest.from ? rest.from[1].value.forms : []
                const newForms = rest.from ? rest.from[1].value.newForms : []
                const names = []
                for (let idx = 0; idx < newForms.length; idx++) {
                  if (idx !== index) {
                    names.push(newForms[idx].name)
                  }
                }
                for (const form of forms) {
                  names.push(form.name)
                }
                return !names.includes(value)
              }
            ),
        })
      ),
    }),
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        setSubmitting(true)
        const forms = values.forms
        const newForms = values.newForms.map((f) => ({ isActive: true, name: f.name }))

        const deletedIds = []
        const updatedForms = []
        for (const initForm of initForms) {
          const form = forms.find((f) => f.id === initForm.id)
          if (form) {
            if (form.name !== initForm.name || form.isActive !== initForm.isActive) {
              updatedForms.push({ ...form, name: form.name })
            }
          } else {
            deletedIds.push(initForm.id)
          }
        }

        // delete forms
        if (deletedIds.length > 0) {
          await deleteFormTypesByIds(deletedIds).unwrap()
        }

        // Update old forms
        if (updatedForms.length > 0) {
          await updateFormTypes(updatedForms).unwrap()
        }

        // Create new forms
        if (newForms.length > 0) {
          await createFormTypes(newForms).unwrap()
        }

        refetch()

        setIsEdit(false)
        setSubmitting(false)
        formik.setFieldValue('newForms', [])
      } catch (err: any) {
        console.error('Unkown error in saving form types: ', err)
        toast.error('Failed to save form types')
        setStatus({ success: false })
        setSubmitting(false)
      }
    },
  })

  const handleClickEdit = () => {
    if (isEdit) {
      formik.handleSubmit()
    } else {
      formik.setFieldValue('newForms', [])
      setIsEdit(true)
    }
  }

  const handleChangeFormActive = (idx: number, isActive: boolean) => {
    handleChangeFormActiveForEdit(idx, isActive)

    const form = formik.values.forms[idx]
    const formId = form.id
    const formName = form.name
    updateFormType({
      id: formId,
      name: formName,
      isActive: isActive,
    })
      .unwrap()
      .then(() => {
        toast.success('Updated a form type')
        refetch()
      })
      .catch((err) => {
        console.log('Failed to update form type: ', err)
        toast.error('Failed to update form type')
      })
  }

  const handleChangeFormActiveForEdit = (idx: number, isActive: boolean) => {
    const newForms = deepCopy<IFormTypeItem[]>(formik.values.forms)
    newForms[idx].isActive = isActive
    formik.setFieldValue('forms', newForms)
  }

  const handleChangeFormNumber = (idx: number, strFormNumber: string) => {
    const newForms = deepCopy<IFormTypeItem[]>(formik.values.forms)
    newForms[idx].name = strFormNumber
    formik.setFieldValue('forms', newForms)
  }

  const handleAddNewFormType = () => {
    const newForms = deepCopy<INewFormTypeItem[]>(formik.values.newForms)
    newForms.push({ name: '' })
    formik.setFieldValue('newForms', newForms)
  }

  const handleChangeNewFormNumber = (idx: number, strFormNumber: string) => {
    const newForms = deepCopy<INewFormTypeItem[]>(formik.values.newForms)
    newForms[idx].name = strFormNumber
    formik.setFieldValue('newForms', newForms)
  }

  const handleRemoveNewFormType = (idx: number) => {
    const newForms = deepCopy<INewFormTypeItem[]>(formik.values.newForms)
    newForms.splice(idx, 1)
    formik.setFieldValue('newForms', newForms)
  }

  const handleRemoveFormType = (idx: number) => {
    setSelectedFormIdx(idx)
  }

  const handleDeleteOneFormType = () => {
    if (selectedFormIdx) {
      deleteFormTypeById(selectedFormIdx)
        .unwrap()
        .then(() => {
          toast.success('Form type has been deleted')
          setSelectedFormIdx(null)
        })
        .catch((err) => {
          console.log('Failed to delete audit form type: ', err)
          toast.error('Failed to delete audit form type')
        })
    }
  }

  useEffect(() => {
    formik.setFieldValue('forms', deepCopy(initForms))
  }, [initForms])

  console.log(formik)

  return (
    <Card sx={{ px: 4.5, pt: 3, pb: 5 }}>
      <Stack justifyContent={'space-between'} flexDirection={'row'} alignItems={'center'}>
        <Box display={'flex'} sx={{ mt: 0 }} alignItems={'center'}>
          <Typography
            typography='h4'
            sx={{ fontWeight: 500, mr: 1, color: (theme) => theme.palette.grey[600] }}
          >
            Search
          </Typography>
          <SearchField
            placeholder='Search by Keyword'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              background: (theme) => theme.palette.grey[100],
              minWidth: 0,
              height: '40px',
              justifyContent: 'center',
            }}
          />
        </Box>
        <Button
          variant='contained'
          color='primary'
          onClick={handleClickEdit}
          disabled={isLoading || formik.isSubmitting}
        >
          {isEdit ? 'Save' : 'Edit'}
        </Button>
      </Stack>
      <Box sx={{ mt: 3.5 }}>
        {!isEdit && (
          <Grid container spacing={1}>
            {formik.values.forms.map((form, index) => {
              const isActive = !!form.isActive
              const formName = form.name
              return (
                <Grid item key={index} lg={2} md={3} sm={3} xs={12}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Checkbox
                      checked={isActive}
                      onChange={() => handleChangeFormActive(index, !isActive)}
                      sx={{ p: 0 }}
                    />
                    <Typography typography='h4' sx={{ fontWeight: 700, ml: 3 }}>
                      {formName}
                    </Typography>
                  </Box>
                </Grid>
              )
            })}
          </Grid>
        )}
        {isEdit && (
          <Box>
            <Grid container spacing={1}>
              {formik.values.forms.map((form, index) => {
                const isActive = !!form.isActive
                const formName = form.name
                const formId = form.id
                const hasError = formik.errors.forms ? formik.errors.forms[index] : null
                return (
                  <Grid item key={index} lg={2} md={4} sm={6} xs={12}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <Checkbox
                        checked={isActive}
                        onChange={() => handleChangeFormActiveForEdit(index, !isActive)}
                        sx={{ p: 0 }}
                      />
                      <TextField
                        value={formName}
                        onChange={(e) => handleChangeFormNumber(index, e.target.value)}
                        sx={{
                          ml: 1.5,
                          '.MuiInputBase-input': {
                            p: 0,
                            pl: 1.5,
                            py: '3px',
                            borderRadius: '2px',
                          },
                          '.MuiOutlinedInput-notchedOutline': {
                            borderRadius: '2px',
                            boxShadow: '1px 1px 2px rgba(0, 0, 0, 0.15)',
                            borderColor: hasError ? '#ff0000' : 'none',
                          },
                        }}
                      />
                      {/* <Button
                        variant='text'
                        color='inherit'
                        size='small'
                        sx={{ minWidth: 0, p: 1, ml: 0.5 }}
                        onClick={() => handleRemoveFormType(formId)}
                      >
                        <TrashIcon
                          sx={{ fontSize: '20px', color: (theme) => theme.palette.grey[500] }}
                        />
                      </Button> */}
                    </Box>
                  </Grid>
                )
              })}
            </Grid>
            <Stack>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 5, mb: 1.5 }}>
                <Typography typography={'h5'} sx={{ fontSize: '1.125rem' }}>
                  Add New Form Type
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
                  onClick={handleAddNewFormType}
                >
                  <Plus sx={{ fontSize: '16px' }} />
                </Button>
              </Box>
              <Stack sx={{ gap: 1 }}>
                {formik.values.newForms.map((form, index) => {
                  const formName = form.name
                  const hasError = formik.errors.newForms ? formik.errors.newForms[index] : null
                  return (
                    <Box
                      key={index}
                      sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                    >
                      <TextField
                        value={formName}
                        onChange={(e) => handleChangeNewFormNumber(index, e.target.value)}
                        sx={{
                          flex: 1,
                          mr: 1,
                          '.MuiInputBase-input': {
                            p: 0,
                            pl: 2,
                            py: 1,
                            borderRadius: '6px',
                          },
                          '.MuiOutlinedInput-notchedOutline': {
                            borderRadius: '6px',
                            borderColor: hasError ? '#ff0000' : 'none',
                          },
                        }}
                      />
                      <Button
                        variant='text'
                        color='inherit'
                        size='small'
                        sx={{ minWidth: 0, p: 1 }}
                        onClick={() => handleRemoveNewFormType(index)}
                      >
                        <TrashIcon
                          sx={{ fontSize: '20px', color: (theme) => theme.palette.grey[500] }}
                        />
                      </Button>
                    </Box>
                  )
                })}
              </Stack>
            </Stack>
          </Box>
        )}
      </Box>
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Box sx={{ position: 'relative', height: '30px' }}>
            <BackDrop size={30} />
          </Box>
        </Box>
      )}
      <DeleteDialog
        open={!!selectedFormIdx}
        onClose={() => setSelectedFormIdx(null)}
        heading={'Are you sure you want to delete this form?'}
        onDelete={() => handleDeleteOneFormType()}
        onGoBack={() => setSelectedFormIdx(null)}
        loading={deleteLoading}
      />
    </Card>
  )
}

export default AuditFormTypeList
