import { FC, useEffect, useMemo } from 'react'
import { Box, Card, Divider, Grid, Typography, Stack, Button, Collapse } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { To, useNavigate } from 'react-router-dom'

import ImageHotspots from '../common/image-hotspot/ImageHotspot'
import { IMedia, ISelectItem } from '../../types/common'
import { RequiredItem } from '../audit/audit-schedule/AuditScheduleDetail'
import TextareaWithLabel from '../common/TextareaWithLabel'
import ProjectSelect from '../audit/project-sites/ProjectSelect'
import LocationSelect from '../location/LocationSelect'
import BuildingSelect from '../location/BuildingSelect'
import LevelSelect from '../location/LevelSelect'
import AreaSelect from '../location/AreaSelect'
import UnitSelect from '../location/UnitSelect'
import UserSelect from '../user/UserSelect'
import { MediaDropzoneWithView } from '../common/MediaDropzoneWithView'
import { MapMarker } from '../../assets/icons/map-marker'
import IncidentTypeSelect from './IncidentTypeSelect'
import ButtonBack from '../common/ButtonBack'
import {
  IIncident,
  IIncidentType,
  ILevel,
  IReqIncidentCreate,
  IReqIncidentUpdate,
  IUnit,
} from '../../api/models'
import StyledAlert from '../common/StyledAlert'
import Api from '../../api'
import { LoadingButton } from '@mui/lab'
import { EIncidentMediaType } from '../../helpers/constants'

interface IIncidentCreate {
  type: ISelectItem[]
  remark: string
  project: ISelectItem[]
  location: ISelectItem[]
  building: ISelectItem[]
  level: ISelectItem[]
  area: ISelectItem[]
  unit: ISelectItem[]
  users: ISelectItem[]
  medias: IMedia[]
  position: { x: number; y: number } | null
}

const initFormikValue: IIncidentCreate = {
  type: [],
  remark: '',
  project: [],
  location: [],
  building: [],
  level: [],
  area: [],
  unit: [],
  users: [],
  medias: [],
  position: null,
}

interface IProps {
  incident?: IIncident
  isWashroom?: boolean
  onCloseEdit?: () => void
}

const IncidentCreateEdit: FC<IProps> = ({ incident, onCloseEdit }) => {
  const isEdit = !!incident && incident.id

  const navigate = useNavigate()

  const [createIncident, { isLoading: isCreating }] = Api.useCreateIncidentMutation()
  const [updateIncident, { isLoading: isUpdating }] = Api.useUpdateIncidentMutation()
  const [uploadFile, { isLoading: isUploading }] = Api.useUploadFileMutation()

  const formik = useFormik<IIncidentCreate>({
    enableReinitialize: true,
    initialValues: { ...initFormikValue },
    validationSchema: Yup.object().shape({
      type: Yup.array().min(1, 'Incident Type is required'),
      remark: Yup.string(),
      project: Yup.array().min(1, 'Project is required'),
      location: Yup.array().min(1, 'Location is required'),
      builiding: Yup.array().nullable(),
      level: Yup.array().nullable(),
      area: Yup.array().nullable(),
      unit: Yup.array().nullable(),
      users: Yup.array().min(1, 'Recipients are required'),
      position: Yup.object().nullable().required('Position is required'),
    }),
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        const type = values.type[0]
        const position = values.position

        if (!type || !position) return

        const incidentTypeId = type.value as number
        const remarks = values.remark
        const projectId = values.project[0].value as number
        const locationId = values.location[0].value as number
        const buildingId = values.building[0].value as number
        const levelId = values.level[0].value as number
        const areaId = values.area[0].value as number
        const unitId = values.unit[0].value as number
        const recipientIds = values.users.map((u) => u.value as number)
        console.log('values.medias: ', values.medias)
        const medias = []
        for (const media of values.medias) {
          if (media.file) {
            const res = await uploadFile(media.file).unwrap()
            console.log('res: ', res)
            const fileUrl = res?.fileUrl || ''
            medias.push({
              type: media.type as EIncidentMediaType,
              url: fileUrl,
            })
          } else {
            medias.push({
              type: media.type as EIncidentMediaType,
              url: media.url,
            })
          }
        }

        setSubmitting(true)
        if (isEdit) {
          const updatedIncident: IReqIncidentUpdate = {
            id: incident.id,
            incidentTypeId,
            remarks,
            projectId,
            locationId,
            buildingId,
            levelId,
            areaId,
            unitId,
            recipientIds,
            medias,
            position,
          }
          updateIncident(updatedIncident)
            .unwrap()
            .then(() => {
              toast.success('Updated the incident')
              if (onCloseEdit) onCloseEdit()
            })
            .catch((err) => {
              console.log('Failed to upate the incident: ', err)
              toast.error('Failed to upate the incident')
            })
            .finally(() => {
              setSubmitting(false)
            })
        } else {
          const newIncident: IReqIncidentCreate = {
            incidentTypeId,
            remarks,
            projectId,
            locationId,
            buildingId,
            levelId,
            areaId,
            unitId,
            recipientIds,
            medias,
            position,
          }
          createIncident(newIncident)
            .unwrap()
            .then(() => {
              toast.success('Created a new incident')
              navigate('/incident/overview')
              if (onCloseEdit) onCloseEdit()
            })
            .catch((err) => {
              console.log('Failed to create a new incident: ', err)
              toast.error('Failed to create a new incident')
            })
            .finally(() => {
              setSubmitting(false)
            })
        }
      } catch (err: any) {
        console.error('Unkown error in saving incident: ', err)
        toast.error('Failed to save incident')
        setStatus({ success: false })
        setSubmitting(false)
      }
    },
  })

  const { floorImgUrl } = useMemo(() => {
    const level = formik.values.level[0]
    const unit = formik.values.unit[0]

    const floorImgUrl = (level && level.item && (level.item as ILevel).floorPlanImgUrl) || ''
    const unitPoints = (unit && unit.item && (unit.item as IUnit).points) || []

    return { floorImgUrl, unitPoints }
  }, [formik.values])

  const projectIds = useMemo(() => {
    return formik.values.project.map((p) => Number(p.value))
  }, [formik.values.project])

  const locationIds = useMemo(() => {
    return formik.values.location.map((p) => Number(p.value))
  }, [formik.values.location])

  const buildingIds = useMemo(() => {
    return formik.values.building.map((p) => Number(p.value))
  }, [formik.values.building])

  const levelIds = useMemo(() => {
    return formik.values.level.map((p) => Number(p.value))
  }, [formik.values.level])

  const areaIds = useMemo(() => {
    return formik.values.area.map((p) => Number(p.value))
  }, [formik.values.area])

  const handleChangeType = (item: ISelectItem[]) => {
    formik.setFieldValue('type', item)
  }

  const handleChangeRemark = (remark: string) => {
    formik.setFieldValue('remark', remark)
  }

  const handleChangeProject = async (projects: ISelectItem[]) => {
    await formik.setFieldValue('project', projects)
    await formik.setFieldValue('location', [])
    await formik.setFieldValue('building', [])
    await formik.setFieldValue('level', [])
    await formik.setFieldValue('area', [])
    await formik.setFieldValue('unit', [])
    formik.setFieldValue('position', null)
  }

  const handleChangeLocation = async (locations: ISelectItem[]) => {
    await formik.setFieldValue('location', locations)
    await formik.setFieldValue('building', [])
    await formik.setFieldValue('level', [])
    await formik.setFieldValue('area', [])
    await formik.setFieldValue('unit', [])
    formik.setFieldValue('position', null)
  }

  const handleChangeBuilding = async (buildings: ISelectItem[]) => {
    await formik.setFieldValue('building', buildings)
    await formik.setFieldValue('level', [])
    await formik.setFieldValue('area', [])
    await formik.setFieldValue('unit', [])
    formik.setFieldValue('position', null)
  }

  const handleChangeLevel = async (levels: ISelectItem[]) => {
    await formik.setFieldValue('level', levels)
    await formik.setFieldValue('area', [])
    await formik.setFieldValue('unit', [])
    formik.setFieldValue('position', null)
  }

  const handleChangeArea = async (areas: ISelectItem[]) => {
    await formik.setFieldValue('area', areas)
    await formik.setFieldValue('unit', [])
  }

  const handleChangeUnit = async (units: ISelectItem[]) => {
    await formik.setFieldValue('unit', units)
  }

  const handleChangeUsers = (users: ISelectItem[]) => {
    formik.setFieldValue('users', users)
  }

  const handleAddMedia = (files: File[]) => {
    const newFiles = files.map((file) => {
      let fileType = file.type
      if (file.type.includes('image')) {
        fileType = EIncidentMediaType.Image
      } else if (file.type.includes('video')) {
        fileType = EIncidentMediaType.Video
      }
      return {
        type: fileType,
        url: URL.createObjectURL(file),
        file: file,
      }
    })
    const newMedias = [...formik.values.medias, ...newFiles]
    formik.setFieldValue('medias', newMedias)
  }

  const handleChangeMedias = (medias: IMedia[]) => {
    formik.setFieldValue('medias', [...medias])
  }

  const handleDiscard = () => {
    formik.setValues({ ...initFormikValue })
    navigate(-1)
  }

  const handleAddIncident = () => {
    formik.handleSubmit()
  }

  const handleAddHotspot = (x: number, y: number) => {
    formik.setFieldValue('position', { x, y })
  }

  useEffect(() => {
    if (incident && incident.id) {
      const initValue: IIncidentCreate = { ...initFormikValue }
      const type = incident.incidentType
      const typeInfo = type ? [{ label: type.name || '', value: type.id }] : []
      const location = incident.location
      const project = incident.project
      const building = incident.building
      const level = incident.level
      const area = incident.area
      const unit = incident.unit
      const newRecipients: ISelectItem[] = []
      for (const ccRecipient of incident.recipients || []) {
        const newRecipient = { label: ccRecipient.fullName, value: ccRecipient.id }
        newRecipients.push(newRecipient)
      }
      initValue.remark = incident.remarks || ''
      initValue.type = typeInfo
      initValue.project = project ? [{ label: project.name, value: project.id }] : []
      initValue.location = location ? [{ label: location.name, value: location.id }] : []
      initValue.building = building ? [{ label: building.name, value: building.id }] : []
      initValue.level = level ? [{ label: level.name, value: level.id, item: level }] : []
      initValue.area = area ? [{ label: area.name, value: area.id }] : []
      initValue.unit = unit ? [{ label: unit.name, value: unit.id, item: unit }] : []
      initValue.users = newRecipients
      initValue.medias = incident.medias || []
      initValue.position = incident.position || null
      console.log('initValue.position: ', initValue.position)
      formik.setValues({ ...initValue })
    }
  }, [incident])

  console.log('formik: ', formik)
  return (
    <Box>
      {!isEdit && <ButtonBack to={-1 as To} />}
      <Card sx={{ display: 'flex', flexDirection: 'column', mt: isEdit ? 3 : 4 }}>
        <Box sx={{ px: 3.75, pt: 5.25, pb: 2.5 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant='h3'>{isEdit ? 'Edit Incident' : 'Add New Incident'}</Typography>
            <Button
              variant='contained'
              color='primary'
              disabled={!formik.isValid}
              onClick={() => handleAddIncident()}
            >
              Save
            </Button>
          </Box>
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
                  Incident Type
                  <RequiredItem />
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <IncidentTypeSelect
                  hiddenLabel={true}
                  selected={formik.values.type as ISelectItem[]}
                  onChange={handleChangeType}
                  isSingleSelect={true}
                  disableAllSelect={true}
                  error={!!formik.errors.type}
                  helperText={formik.errors.type as string}
                  textColor={'grey.800'}
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
                  value={formik.values.remark}
                  onChange={(e) => handleChangeRemark(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Divider light />
        <Box sx={{ px: 3.75, pt: 3, pb: 3 }}>
          <Grid container direction={'column'} spacing={2}>
            <Grid item container spacing={2}>
              <Grid item lg={4} xs={12}>
                <Typography
                  variant='subtitle1'
                  sx={{ fontSize: 15, mt: 1.25, display: 'inline-flex' }}
                >
                  Project
                  <RequiredItem />
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <ProjectSelect
                  hiddenLabel={true}
                  selected={formik.values.project as ISelectItem[]}
                  onChange={handleChangeProject}
                  isSingleSelect={true}
                  disableAllSelect={true}
                  error={!!formik.errors.project}
                  helperText={formik.errors.project as string}
                  textColor={'grey.800'}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item lg={4} xs={12}>
                <Typography
                  variant='subtitle1'
                  sx={{ fontSize: 15, mt: 1.25, display: 'inline-flex' }}
                >
                  Location
                  <RequiredItem />
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <LocationSelect
                  hiddenLabel={true}
                  selected={formik.values.location as ISelectItem[]}
                  onChange={handleChangeLocation}
                  isSingleSelect={true}
                  disableAllSelect={true}
                  error={!!formik.errors.location}
                  helperText={formik.errors.location as string}
                  textColor={'grey.800'}
                  projectIds={projectIds}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Divider light />
        <Box sx={{ px: 3.75, py: 4 }}>
          <Grid container spacing={2}>
            <Grid item lg={4} xs={12}>
              <Grid container direction={'column'} rowSpacing={2.5}>
                <Grid item>
                  <BuildingSelect
                    hiddenLabel={true}
                    selected={formik.values.building as ISelectItem[]}
                    onChange={handleChangeBuilding}
                    isSingleSelect={true}
                    disableAllSelect={true}
                    error={!!formik.errors.building && !!formik.touched.building}
                    helperText={formik.errors.building as string}
                    projectIds={projectIds}
                    locationIds={locationIds}
                  />
                </Grid>
                <Grid item>
                  <LevelSelect
                    hiddenLabel={true}
                    selected={formik.values.level as ISelectItem[]}
                    onChange={handleChangeLevel}
                    isSingleSelect={true}
                    disableAllSelect={true}
                    error={!!formik.errors.level && !!formik.touched.level}
                    helperText={formik.errors.level as string}
                    projectIds={projectIds}
                    locationIds={locationIds}
                    buildingIds={buildingIds}
                  />
                </Grid>
                <Grid item>
                  <AreaSelect
                    hiddenLabel={true}
                    selected={formik.values.area as ISelectItem[]}
                    onChange={handleChangeArea}
                    isSingleSelect={true}
                    disableAllSelect={true}
                    error={!!formik.errors.area && !!formik.touched.area}
                    helperText={formik.errors.area as string}
                    projectIds={projectIds}
                    locationIds={locationIds}
                    buildingIds={buildingIds}
                    levelIds={levelIds}
                  />
                </Grid>
                <Grid item>
                  <UnitSelect
                    hiddenLabel={true}
                    selected={formik.values.unit as ISelectItem[]}
                    onChange={handleChangeUnit}
                    isSingleSelect={true}
                    disableAllSelect={true}
                    error={!!formik.errors.unit && !!formik.touched.unit}
                    helperText={formik.errors.unit as string}
                    projectIds={projectIds}
                    locationIds={locationIds}
                    buildingIds={buildingIds}
                    levelIds={levelIds}
                    areaIds={areaIds}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={8} xs={12}>
              <Box sx={{ width: '100%', height: '100%', minHeight: '627px' }}>
                <ImageHotspots
                  src={floorImgUrl}
                  alt={'floor-image'}
                  hotspots={
                    formik.values.position
                      ? [
                          {
                            ...formik.values.position,
                            content: (
                              <MapMarker
                                sx={{
                                  display: 'block',
                                  color: (theme) => theme.palette.error.main,
                                  width: '40px',
                                  height: 'auto',
                                }}
                              />
                            ),
                            sx: {
                              background: 'transparent',
                              mt: '-34px',
                              ml: '-20px',
                            },
                          },
                        ]
                      : []
                  }
                  hideZoomControls={false}
                  hideFullscreenControl={true}
                  onAddHotspot={handleAddHotspot}
                />
                <Collapse in={!!formik.errors.position}>
                  <StyledAlert severity='error' variant='outlined' sx={{ mt: '5px' }}>
                    {formik.errors.position as string}
                  </StyledAlert>
                </Collapse>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Divider light />
        <Box sx={{ px: 3.75, pt: 3, pb: 3 }}>
          <Grid container direction={'column'} spacing={2}>
            <Grid item container spacing={2}>
              <Grid item lg={4} xs={12}>
                <Typography
                  variant='subtitle1'
                  sx={{ fontSize: 15, mt: 1.25, display: 'inline-flex' }}
                >
                  Recipient
                  <RequiredItem />
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <Box>
                  <UserSelect
                    hiddenLabel={true}
                    selected={formik.values.users as ISelectItem[]}
                    onChange={handleChangeUsers}
                    textColor={'grey.800'}
                    showErrorMessage={true}
                    error={!!formik.errors.users}
                    errorMessage={formik.errors.users ? (formik.errors.users as string) : ''}
                  />
                  <Typography
                    variant='subtitle2'
                    sx={{
                      color: (theme) => 'grey.600',
                      fontWeight: 500,
                      textAlign: 'right',
                      mt: 1,
                    }}
                  >
                    Recipient is assigned by default
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item lg={4} xs={12}>
                <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
                  Upload Pictures or Video
                </Typography>
                <Typography variant='subtitle2' sx={{}}>
                  Supported format: jpg, jpeg, png, mp4. <br />
                  Max file is 5 MB.
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <Stack sx={{ display: 'flex', flexDirection: { lg: 'row', xs: 'column' } }}>
                  <MediaDropzoneWithView
                    medias={formik.values.medias}
                    onDrop={handleAddMedia}
                    onChange={handleChangeMedias}
                  />
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        {!isEdit && (
          <>
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
              <LoadingButton
                variant='text'
                color='inherit'
                loading={isCreating || isUploading}
                onClick={handleDiscard}
                sx={{ color: (theme) => 'grey.400', fontWeight: 500 }}
              >
                Cancel
              </LoadingButton>
              <LoadingButton
                variant='contained'
                size='large'
                color='primary'
                loading={isCreating || isUploading}
                disabled={!formik.isValid}
                onClick={() => handleAddIncident()}
              >
                Add Incident
              </LoadingButton>
            </Box>
          </>
        )}
      </Card>
    </Box>
  )
}

export default IncidentCreateEdit
