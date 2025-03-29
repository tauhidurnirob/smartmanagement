import {
  Box,
  Typography,
  Divider,
  Card,
  Grid,
  Button,
  Stack,
  IconButton,
  useTheme,
} from '@mui/material'
import { FormikErrors, useFormik } from 'formik'
import * as Yup from 'yup'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { toast } from 'react-toastify'
import { LoadingButton } from '@mui/lab'

import ButtonBack from '../../modules/common/ButtonBack'
import { Plus } from '../../assets/icons/plus'
import Api from '../../api'
import TextFieldWithLabel from '../../modules/common/TextFieldWithLabel'

import deepCopy from '../../helpers/deepCopy'
import AuditProjectSiteCreateLocationItem from './AuditProjectSiteCreateLocationItem'
import { ReqProjectCreate } from '../../api/models'
import { useNavigate } from 'react-router-dom'
import { usePlacesWidget } from 'react-google-autocomplete'
import { GOOGLE_MAP_API } from '../../helpers/constants'
import { ISelectItem } from '../../types/common'
import FromulaGroupSelect from '../../modules/audit/project-sites/FromulaGroupSelect'

interface IProjectLocation {
  name: string
  address: string
  mtr: string
  lat: number | null
  lng: number | null
}

interface IProjectLocationCategory {
  name: string
  locations: IProjectLocation[] | null
}

interface IProjectLocationTouched {
  name: boolean
  address: boolean
  mtr: boolean
}

interface IProjectLocationCategoryTouched {
  name: boolean
  locations?: IProjectLocationTouched[]
}

interface IProjectTouched {
  projectName: boolean
  locationsCategories?: IProjectLocationCategoryTouched[]
}

const initLocation: IProjectLocation = { name: '', address: '', mtr: '', lat: null, lng: null }
const initLocationCategory: IProjectLocationCategory = { name: '', locations: null }
const initLocationCategoryTouch = { name: false }
const initTouched: IProjectTouched = { projectName: false }
const initValue = { projectName: '', formulaGroup: [], locationCategories: [] }

const AuditProjectSiteCreate = () => {
  const theme = useTheme()
  const [createProject, { isLoading }] = Api.useCreateProjectMutation()

  const { ref } = usePlacesWidget<HTMLInputElement>({
    apiKey: GOOGLE_MAP_API,
    options: {
      types: [],
      componentRestrictions: undefined,
      strictBounds: undefined,
    },
  })

  const navigate = useNavigate()

  const formik = useFormik<{
    projectName: string
    formulaGroup: ISelectItem[]
    locationCategories: IProjectLocationCategory[]
  }>({
    initialValues: { ...initValue },
    initialTouched: { ...initTouched },
    validationSchema: Yup.object().shape({
      projectName: Yup.string().max(255).required('Project Name is required'),
      formulaGroup: Yup.array()
        .length(1, 'SLA Fromula Group is required')
        .required('SLA Fromula Group is required'),
      locationCategories: Yup.array(
        Yup.object().shape({
          name: Yup.string().max(255).required('Category Name is required'),
          locations: Yup.array(
            Yup.object().shape({
              name: Yup.string().max(255).required('Location Name is required'),
              address: Yup.string().max(255).required('Location Address is required'),
            })
          ).nullable(),
        })
      ),
    }),
    onSubmit: async (values, { setStatus, setValues, setSubmitting }) => {
      setSubmitting(true)

      try {
        const locationCategories = values.locationCategories.map((cat) => {
          const catName = cat.name
          const locations = (cat.locations || []).map((loc) => {
            return {
              ...loc,
              mtr: loc.mtr.length > 0 ? Number(loc.mtr) : 0,
            }
          })

          return {
            name: catName,
            locations: locations,
          }
        })
        const req = {
          name: values.projectName,
          locationCategories: locationCategories,
          formulaGroupId: values.formulaGroup?.[0].value,
        } as ReqProjectCreate

        createProject(req)
          .unwrap()
          .then((res) => {
            toast.success(`Project site added`)
            setValues({ ...initValue }, false)
            navigate('/audit/project-site')
          })
          .catch((err) => {
            console.log('Failed to create a new project: ', err)
            toast.error('Failed to create a new project site')
          })
          .finally(() => {
            setSubmitting(false)
          })
      } catch (err: any) {
        console.log('Failed to create project:', err)
        setStatus({ success: false })
        setSubmitting(false)
      }
    },
  })

  const handleChangeProjectName = async (name: string) => {
    await formik.setFieldValue('projectName', name, true)
    await formik.setFieldTouched(`projectName`, true, true)
  }

  const handleAddNewLocationCategory = async () => {
    const newLocationCategories = [...formik.values.locationCategories, { ...initLocationCategory }]
    await formik.setFieldValue('locationCategories', newLocationCategories)

    const newTouched = [...(formik.touched?.locationCategories || [])]
    newTouched.push({ ...initLocationCategoryTouch })
    await formik.setTouched({
      ...(formik.touched || {}),
      locationCategories: newTouched,
    })
  }

  const handleRemoveLocationCategory = async (idx: number) => {
    const newLocationCategories = [...formik.values.locationCategories]
    newLocationCategories.splice(idx, 1)
    if (newLocationCategories.length > 0) {
      const newTouched = [...(formik.touched?.locationCategories || [])]
      newTouched.splice(idx, 1)
      await formik.setTouched({
        ...(formik.touched || {}),
        locationCategories: newTouched,
      })
    }
    await formik.setFieldValue('locationCategories', newLocationCategories)
  }

  const handleChangeLocationCategoryName = async (idx: number, name: string) => {
    const newLocationCategories = [...formik.values.locationCategories]
    newLocationCategories[idx].name = name
    await formik.setFieldValue('locationCategories', newLocationCategories)
    await formik.setFieldTouched(`locationCategories[${idx}].name`, true)
  }

  const handleAddNewLocationInLocationCategory = (idx: number) => {
    const newLocationCategories = [...formik.values.locationCategories]
    newLocationCategories[idx].locations = []
    formik.setFieldValue('locationCategories', deepCopy(newLocationCategories))
  }

  const handleRemoveAllLocationsInLocationCategory = (idx: number) => {
    const newLocationCategories = [...formik.values.locationCategories]
    newLocationCategories[idx].locations = null
    formik.setFieldValue('locationCategories', deepCopy(newLocationCategories))
  }

  const handleChangeLocationName = (categoryIdx: number, locIdx: number, name: string) => {
    const newLocationCategories = [...formik.values.locationCategories]
    const newLocation = newLocationCategories[categoryIdx].locations?.[locIdx]
    if (newLocation) {
      newLocation.name = name
      formik.setFieldValue(
        `locationCategories[${categoryIdx}].locations[${locIdx}]`,
        deepCopy(newLocation)
      )
    }
  }

  const handleChangeLocationAddress = async (
    categoryIdx: number,
    locIdx: number,
    params: { address: string; lat: number | null; lng: number | null }
  ) => {
    await formik.setFieldValue(
      `locationCategories[${categoryIdx}].locations[${locIdx}].address`,
      params.address
    )
    await formik.setFieldValue(
      `locationCategories[${categoryIdx}].locations[${locIdx}].lat`,
      params.lat
    )
    await formik.setFieldValue(
      `locationCategories[${categoryIdx}].locations[${locIdx}].lng`,
      params.lng
    )
  }

  const handleChangeLocationMtr = async (categoryIdx: number, locIdx: number, mtr: string) => {
    const newLocation = deepCopy<IProjectLocation>(
      formik.values.locationCategories[categoryIdx].locations?.[locIdx] || ({} as IProjectLocation)
    )
    if (newLocation) {
      newLocation.mtr = mtr
      await formik.setFieldValue(
        `locationCategories[${categoryIdx}].locations[${locIdx}]`,
        deepCopy(newLocation)
      )
    }
  }

  const handleRemoveLocation = (categoryIdx: number, locIdx: number) => {
    const newLocationCategories = [...formik.values.locationCategories]
    const newLocations = [...(newLocationCategories[categoryIdx].locations || [])]
    newLocations.splice(locIdx, 1)
    formik.setFieldValue(`locationCategories[${categoryIdx}].locations`, deepCopy(newLocations))
  }

  const handleAddNewLocation = (categoryIdx: number) => {
    const newLocationCategories = [...formik.values.locationCategories]
    if (newLocationCategories[categoryIdx].locations !== null) {
      newLocationCategories[categoryIdx].locations?.push({ ...initLocation })
    } else {
      newLocationCategories[categoryIdx].locations = [{ ...initLocation }]
    }
    formik.setFieldValue('locationCategories', newLocationCategories)
  }

  const handleSave = () => {
    formik.handleSubmit()
  }

  const handleDiscard = () => {
    formik.setValues({ ...initValue }, true)
    navigate(-1)
  }

  return (
    <Box>
      <ButtonBack to={'/audit/project-site'} />
      <Box mt={4.5}>
        <Card sx={{ boxShadow: 'none', p: 0, display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              pt: 5,
              px: 4,
              pb: 2.5,
            }}
          >
            <Typography typography={'h3'}>Add New Project Site</Typography>
          </Box>
          <Divider light />
          <Box sx={{ pt: 3.5, pr: 4, pb: 5, pl: 5 }}>
            <Box>
              <Grid container columnSpacing={{ lg: 2, xs: 1 }} alignItems={'flex-start'}>
                <Grid item lg={4} xs={12}>
                  <Typography
                    typography={'h3'}
                    sx={{ fontSize: '1.125rem', fontWeight: 500, mt: 1.75 }}
                  >
                    Project Name
                  </Typography>
                </Grid>
                <Grid item lg={8} xs={12}>
                  <TextFieldWithLabel
                    showLabel={false}
                    size='small'
                    fullWidth
                    placeholder='Project Name'
                    name='projectName'
                    value={formik.values.projectName}
                    onChange={(e) => handleChangeProjectName(e.target.value)}
                    error={!!formik.errors.projectName}
                    helperText={formik.errors.projectName ? formik.errors.projectName : ''}
                  />
                </Grid>
              </Grid>
              <Grid container mt={3} columnSpacing={{ lg: 2, xs: 1 }} alignItems={'flex-start'}>
                <Grid item lg={4} xs={12}>
                  <Typography
                    typography={'h3'}
                    sx={{ fontSize: '1.125rem', fontWeight: 500, mt: 1.75 }}
                  >
                    SLA Formula Group
                  </Typography>
                </Grid>
                <Grid item lg={8} xs={12}>
                  <FromulaGroupSelect
                    hiddenLabel={true}
                    selected={formik.values.formulaGroup as ISelectItem[]}
                    onChange={(value) => formik.setFieldValue('formulaGroup', value)}
                    isSingleSelect={true}
                    disableAllSelect={true}
                    error={!!formik.errors.formulaGroup && !!formik.touched.formulaGroup}
                    helperText={formik.errors.formulaGroup as string}
                    textColor={theme.palette.grey[800]}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ mt: 5.5, display: 'flex', alignItems: 'center' }}>
              <Typography typography={'h5'} sx={{ fontSize: '1.125rem' }}>
                Category
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
                onClick={handleAddNewLocationCategory}
              >
                <Plus sx={{ fontSize: '16px' }} />
              </Button>
            </Box>
            <Box sx={{ mt: 2.5 }} display={'flex'} flexDirection={'column'} gap={{ lg: 5, xs: 2 }}>
              {formik.values.locationCategories.map((locationCategory, idx) => {
                const locations = locationCategory.locations
                const nameError =
                  !!formik.errors.locationCategories?.[idx] &&
                  !!(
                    formik.errors.locationCategories[idx] as FormikErrors<IProjectLocationCategory>
                  ).name
                const nameHelpText =
                  !!formik.errors.locationCategories?.[idx] &&
                  typeof formik.errors.locationCategories[idx] !== 'string' &&
                  (formik.errors.locationCategories[idx] as FormikErrors<IProjectLocationCategory>)
                    .name
                    ? (
                        formik.errors.locationCategories[
                          idx
                        ] as FormikErrors<IProjectLocationCategory>
                      ).name
                    : ''
                return (
                  <Stack key={idx} flexDirection={'column'}>
                    <Stack
                      flexDirection={{ lg: 'row', xs: 'column' }}
                      alignItems={{ lg: 'flex-start', xs: 'flex-end' }}
                      gap={1}
                    >
                      <Stack
                        flexGrow={1}
                        flexDirection={'row'}
                        alignItems={'flex-start'}
                        gap={1}
                        width={{ lg: 'auto', xs: '100%' }}
                      >
                        <Stack flexGrow={1}>
                          <Grid container spacing={{ lg: 2, xs: 1 }} alignItems={'flex-start'}>
                            <Grid item xs={12}>
                              <Typography typography={'h5'} sx={{ mb: 0.75 }}>
                                Category Name {idx + 1}
                              </Typography>
                              <TextFieldWithLabel
                                showLabel={false}
                                size='small'
                                fullWidth
                                placeholder='Category Name'
                                name='locationName'
                                value={locationCategory.name}
                                onChange={(e) =>
                                  handleChangeLocationCategoryName(idx, e.target.value)
                                }
                                error={nameError}
                                helperText={nameHelpText}
                              />
                            </Grid>
                          </Grid>
                        </Stack>
                        <Stack>
                          <IconButton
                            sx={{ mt: 3.25 }}
                            onClick={() => handleRemoveLocationCategory(idx)}
                          >
                            <DeleteOutlineIcon />
                          </IconButton>
                        </Stack>
                      </Stack>
                      <Button
                        variant='text'
                        color={locations === null ? 'primary' : 'error'}
                        sx={{ mt: { lg: 3.6, xs: 0 }, width: '150px' }}
                        onClick={() =>
                          locations === null
                            ? handleAddNewLocationInLocationCategory(idx)
                            : handleRemoveAllLocationsInLocationCategory(idx)
                        }
                      >
                        {locations === null ? 'Add Location' : 'Delete All Locations'}
                      </Button>
                    </Stack>
                    {locations !== null && (
                      <Box sx={{ mt: 3.5, ml: 3.75 }}>
                        <AuditProjectSiteCreateLocationItem
                          locations={locations}
                          errors={
                            (
                              formik.errors.locationCategories?.[
                                idx
                              ] as FormikErrors<IProjectLocationCategory>
                            )?.locations
                          }
                          onAdd={() => handleAddNewLocation(idx)}
                          onRemove={(locIdx) => handleRemoveLocation(idx, locIdx)}
                          onChangeName={(locIdx, name) =>
                            handleChangeLocationName(idx, locIdx, name)
                          }
                          onChangeMtr={(locIdx, mtr) => handleChangeLocationMtr(idx, locIdx, mtr)}
                          onChangeAddress={(locIdx, params) =>
                            handleChangeLocationAddress(idx, locIdx, params)
                          }
                        />
                      </Box>
                    )}
                  </Stack>
                )
              })}
            </Box>
          </Box>
          <Divider light />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 4, pt: 2.5, pb: 3 }}>
            <Button
              variant='text'
              sx={{ color: (theme) => theme.palette.grey[400] }}
              onClick={handleDiscard}
              disabled={formik.isSubmitting}
            >
              Cancel
            </Button>
            <LoadingButton
              variant='contained'
              color='primary'
              sx={{ ml: 3 }}
              onClick={handleSave}
              disabled={!formik.isValid || formik.isSubmitting}
              loading={formik.isSubmitting || isLoading}
            >
              Add
            </LoadingButton>
          </Box>
        </Card>
      </Box>
    </Box>
  )
}

export default AuditProjectSiteCreate
