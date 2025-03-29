import { FC, useEffect, useMemo, useState } from 'react'
import { Box, Card, Divider, Grid, Typography, Collapse } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { To, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

import { IDeviceHotspot, ISelectItem } from '../../types/common'
import { RequiredItem } from '../audit/audit-schedule/AuditScheduleDetail'
import ProjectSelect from '../audit/project-sites/ProjectSelect'
import LocationSelect from '../location/LocationSelect'
import BuildingSelect from '../location/BuildingSelect'
import LevelSelect from '../location/LevelSelect'
import AreaSelect from '../location/AreaSelect'
import UnitSelect from '../location/UnitSelect'
import ButtonBack from '../common/ButtonBack'
import TextFieldWithLabel from '../common/TextFieldWithLabel'
import DeviceTypeSelect from './DeviceTypeSelect'
import { DATE_FORMAT_WITHOUT_MIN } from '../../constants/common'
import deepCopy from '../../helpers/deepCopy'
import DeviceFloorMap from './DeviceFloorMap'
import { EDeviceMapType,ROLE_PERMISSION_KEYS } from '../../helpers/constants'
import StyledAlert from '../common/StyledAlert'
import {
  IDevice,
  IDeviceType,
  ILevel,
  IReqDeviceCreate,
  IReqDeviceUnitCreate,
  IReqDeviceUpdate,
  IUnit,
} from '../../api/models'
import Api from '../../api'
import useAuth from '../../hooks/useAuth'
import { LoadingButton } from '@mui/lab'

interface IDeviceCreate {
  identificationNo: string
  type: ISelectItem[]
  project: ISelectItem[]
  location: ISelectItem[]
  building: ISelectItem[]
  level: ISelectItem[]
  area: ISelectItem[]
  unit: ISelectItem[]
  hotspots: IDeviceHotspot[]
}

const initFormikValue: IDeviceCreate = {
  identificationNo: '',
  type: [],
  project: [],
  location: [],
  building: [],
  level: [],
  area: [],
  unit: [],
  hotspots: [],
}

interface IProps {
  device?: IDevice
}

const DeviceCreateEdit: FC<IProps> = ({ device }) => {
  const isEdit = !!device && device.id

  const [createDevice, { isLoading: isCreating }] = Api.useCreateDeviceMutation()
  const [updateDevice, { isLoading: isUpdating }] = Api.useUpdateDeviceMutation()
  const navigate = useNavigate()
  const [initValue, setInitValue] = useState<IDeviceCreate>(initFormikValue)

  const formik = useFormik<IDeviceCreate>({
    enableReinitialize: true,
    initialValues: { ...initFormikValue },
    validationSchema: Yup.object().shape({
      identificationNo: Yup.string().required('Identification Number is required.'),
      type: Yup.array().required('Device Type is required').min(1, 'Device Type is required'),
      project: Yup.array().min(1, 'Project is required').required('Project is required'),
      location: Yup.array().min(1, 'Location is required').required('Location is required'),
      building: Yup.array().min(1, 'Building is required').required('Building is required'),
      level: Yup.array().min(1, 'Level is required').required('Level is required'),
      area: Yup.array().min(1, 'Area is required').required('Area is required'),
      unit: Yup.array().min(1, 'Unit is required').required('Unit is required'),
      hotspots: Yup.array()
        .length(1, 'Device Locaton in Map is required')
        .required('Device Locaton in Map is required'),
    }),
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        const type = values.type[0]?.item as IDeviceType

        if (!type) return

        const deviceCategoryId = type.deviceCategoryId
        const deviceTypeId = type.id
        const identificationNo = values.identificationNo
        const lastActionUserId = user?.id
        const positionX = values.hotspots[0].x
        const positionY = values.hotspots[0].y
        const deviceUnit: IReqDeviceUnitCreate = {
          projectId: values.project[0].value as number,
          locationId: values.location[0].value as number,
          buildingId: values.building[0].value as number,
          levelId: values.level[0].value as number,
          areaId: values.area[0].value as number,
          unitId: values.unit[0].value as number,
        }

        setSubmitting(true)
        if (isEdit) {
          if (!device) return

          const updatedDevice: IReqDeviceUpdate = {
            id: device.id,
            deviceCategoryId: deviceCategoryId,
            deviceTypeId: deviceTypeId,
            identificationNo: identificationNo,
            lastActionUserId,
            positionX,
            positionY,
            deviceUnit,
          }
          updateDevice(updatedDevice)
            .unwrap()
            .then(() => {
              toast.success('Updated the device')
              setInitValue({ ...values })
            })
            .catch((err) => {
              console.log('Failed to upate the device: ', err)
              toast.error('Failed to upate the device')
            })
            .finally(() => {
              setSubmitting(false)
            })
        } else {
          const newDevice: IReqDeviceCreate = {
            deviceCategoryId: deviceCategoryId,
            deviceTypeId: deviceTypeId,
            identificationNo: identificationNo,
            lastActionUserId,
            positionX,
            positionY,
            deviceUnit,
          }
          createDevice(newDevice)
            .unwrap()
            .then(() => {
              toast.success('Created a new device')
              navigate('/device/overview')
            })
            .catch((err) => {
              console.log('Failed to create a new device: ', err)
              toast.error('Failed to create a new device')
            })
            .finally(() => {
              setSubmitting(false)
            })
        }
      } catch (err: any) {
        console.error('Unkown error in saving device: ', err)
        toast.error('Failed to save device')
        setStatus({ success: false })
        setSubmitting(false)
      }
    },
  })

  const { bottomItems } = useMemo(() => {
    const { createdAt, updatedAt } = device || {}
    const strUpdatedAt = updatedAt ? dayjs(updatedAt).format(DATE_FORMAT_WITHOUT_MIN) : '-'
    const strCreateAt = createdAt ? dayjs(createdAt).format(DATE_FORMAT_WITHOUT_MIN) : '-'
    const bottomItems = [
      // { label: 'Last Sign-in IP', value: lastSignInIP ? lastSignInIP : '-' },
      { label: 'Created On', value: strCreateAt },
      { label: 'Updated On', value: strUpdatedAt },
    ]

    return {
      bottomItems,
    }
  }, [device])

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

  const isChanged = useMemo(() => {
    const values = formik.values

    if (values.identificationNo !== initValue.identificationNo) return true

    if (values.type[0]?.value !== initValue.type[0]?.value) return true
    if (values.project[0]?.value !== initValue.project[0]?.value) return true
    if (values.location[0]?.value !== initValue.location[0]?.value) return true
    if (values.building[0]?.value !== initValue.building[0]?.value) return true
    if (values.level[0]?.value !== initValue.level[0]?.value) return true
    if (values.area[0]?.value !== initValue.area[0]?.value) return true
    if (values.unit[0]?.value !== initValue.unit[0]?.value) return true
    if (values.hotspots[0]?.x !== initValue.hotspots[0]?.x) return true
    if (values.hotspots[0]?.y !== initValue.hotspots[0]?.y) return true
  }, [initValue, formik.values])

  const { floorImgUrl, unitPoints } = useMemo(() => {
    const level = formik.values.level[0]
    const unit = formik.values.unit[0]

    const floorImgUrl = (level && level.item && (level.item as ILevel).floorPlanImgUrl) || ''
    const unitPoints = (unit && unit.item && (unit.item as IUnit).points) || []

    return { floorImgUrl, unitPoints }
  }, [formik.values])

  const handleChangeType = async (item: ISelectItem[]) => {
    await formik.setFieldValue('type', item)
  }

  const handleChangeIdentificationNo = async (identificationNo: string) => {
    await formik.setFieldValue('identificationNo', identificationNo)
  }

  const handleChangeProject = async (projects: ISelectItem[]) => {
    await formik.setFieldValue('project', projects)
    await formik.setFieldValue('location', [])
    await formik.setFieldValue('building', [])
    await formik.setFieldValue('level', [])
    await formik.setFieldValue('area', [])
    await formik.setFieldValue('unit', [])
  }

  const handleChangeLocation = async (locations: ISelectItem[]) => {
    await formik.setFieldValue('location', locations)
    await formik.setFieldValue('building', [])
    await formik.setFieldValue('level', [])
    await formik.setFieldValue('area', [])
    await formik.setFieldValue('unit', [])
  }

  const handleChangeBuilding = async (buildings: ISelectItem[]) => {
    await formik.setFieldValue('building', buildings)
    await formik.setFieldValue('level', [])
    await formik.setFieldValue('area', [])
    await formik.setFieldValue('unit', [])
  }

  const handleChangeLevel = async (levels: ISelectItem[]) => {
    await formik.setFieldValue('level', levels)
    await formik.setFieldValue('area', [])
    await formik.setFieldValue('unit', [])
  }

  const handleChangeArea = async (areas: ISelectItem[]) => {
    await formik.setFieldValue('area', areas)
    await formik.setFieldValue('unit', [])
  }

  const handleChangeUnit = async (units: ISelectItem[]) => {
    await formik.setFieldValue('unit', units)
  }

  const handleDiscard = async () => {
    await formik.setValues({ ...initFormikValue })
  }

  const handleAddDevice = async () => {
    formik.handleSubmit()
  }

  const handleChangeHotspots = async (spots: IDeviceHotspot[]) => {
    await formik.setFieldValue('hotspots', [...spots])
  }
  const { user } = useAuth();
  const [isEditable, setEditable] = useState(false);
 
  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.device.overview.editDevice)) {
        setEditable(true)
    }
    if (device && device.id) {
      const initValue: IDeviceCreate = { ...initFormikValue }

      const type = device.deviceType
      const typeInfo = type
        ? [
            {
              label: type.deviceType || '',
              value: type.id,
              category: type.deviceCategory?.deviceCategory || '',
              item: type,
            },
          ]
        : []

      const unit = device.deviceUnit?.unit
      const area = device.deviceUnit?.area
      const level = device.deviceUnit?.level
      const building = device.deviceUnit?.building
      const location = device.deviceUnit?.location
      const project = device.deviceUnit?.project

      initValue.identificationNo = device.identificationNo || ''
      initValue.type = typeInfo
      initValue.project = project ? [{ label: project.name, value: project.id }] : []
      initValue.location = location ? [{ label: location.name, value: location.id }] : []
      initValue.building = building ? [{ label: building.name, value: building.id }] : []
      initValue.level = level ? [{ label: level.name, value: level.id, item: level }] : []
      initValue.area = area ? [{ label: area.name, value: area.id }] : []
      initValue.unit = unit ? [{ label: unit.name, value: unit.id, item: unit }] : []
      initValue.hotspots =
        typeof device.positionX === 'number' && typeof device.positionY === 'number'
          ? [{ x: device.positionX, y: device.positionY }]
          : []

      formik.setValues({ ...initValue })
      setInitValue(deepCopy(initValue))
    }
  }, [device])

  return (
    <Box>
      {!isEdit && <ButtonBack to={-1 as To} />}
      <Card sx={{ display: 'flex', flexDirection: 'column', mt: isEdit ? 3.75 : 4 }}>
        <Box sx={isEdit ? { px: 3.75, py: 1.5 } : { pt: 4.5, pb: 2.5, px: 3.75 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant='h3'>{isEdit ? 'Device Info' : 'Add New Device'}</Typography>
            {isEdit && (
              <LoadingButton
                variant='contained'
                color='primary'
                disabled={!formik.isValid || !isChanged || !isEditable}
                loading={isCreating || isUpdating}
                onClick={() => handleAddDevice()}
              >
                Save
              </LoadingButton>
            )}
          </Box>
        </Box>
        <Divider light />
        <Box sx={{ px: 3.75, pt: 3, pb: 3 }}>
          <Grid container direction={'column'} spacing={2.75}>
            <Grid item container spacing={2}>
              <Grid item lg={4} xs={12}>
                <Typography
                  typography={'h4'}
                  sx={{ fontWeight: 500, mt: 1.25, display: 'inline-flex' }}
                >
                  Identification No.
                  <RequiredItem />
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <TextFieldWithLabel
                  label={''}
                  name={'identificationNo'}
                  placeholder={'Identification No.'}
                  showLabel={false}
                  value={formik.values.identificationNo}
                  onChange={(e) => handleChangeIdentificationNo(e.target.value)}
                  error={!!formik.errors.identificationNo}
                  helperText={formik.errors.identificationNo as string}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item lg={4} xs={12}>
                <Typography
                  typography={'h4'}
                  sx={{ fontWeight: 500, mt: 1.25, display: 'inline-flex' }}
                >
                  Device Type
                  <RequiredItem />
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <DeviceTypeSelect
                  hiddenLabel={true}
                  selected={formik.values.type}
                  onChange={handleChangeType}
                  isSingleSelect={true}
                  disableAllSelect={true}
                  error={!!formik.errors.type}
                  helperText={formik.errors.type as string}
                  textColor={'grey.800'}
                  placeholder={'Select Device Type'}
                />
              </Grid>
            </Grid>
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
                  selected={formik.values.project}
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
                  selected={formik.values.location}
                  onChange={handleChangeLocation}
                  isSingleSelect={true}
                  disableAllSelect={true}
                  error={!!formik.errors.location}
                  helperText={formik.errors.location as string}
                  projectIds={projectIds}
                  textColor={'grey.800'}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ px: 3.75, pt: 2, pb: 5.5 }}>
          <Grid container spacing={2.5}>
            <Grid item lg={5} xs={12}>
              <Grid container direction={'column'} rowSpacing={2.5}>
                <Grid item>
                  <Typography typography={'h4'} sx={{ fontWeight: 500, display: 'inline-flex' }}>
                    Building
                    <RequiredItem />
                  </Typography>
                  <BuildingSelect
                    hiddenLabel={true}
                    selected={formik.values.building}
                    onChange={handleChangeBuilding}
                    isSingleSelect={true}
                    disableAllSelect={true}
                    error={!!formik.errors.building}
                    helperText={formik.errors.building as string}
                    textColor={'grey.800'}
                    projectIds={projectIds}
                    locationIds={locationIds}
                  />
                </Grid>
                <Grid item>
                  <Typography typography={'h4'} sx={{ fontWeight: 500, display: 'inline-flex' }}>
                    Level
                    <RequiredItem />
                  </Typography>
                  <LevelSelect
                    hiddenLabel={true}
                    selected={formik.values.level}
                    onChange={handleChangeLevel}
                    isSingleSelect={true}
                    disableAllSelect={true}
                    error={!!formik.errors.level}
                    helperText={formik.errors.level as string}
                    textColor={'grey.800'}
                    projectIds={projectIds}
                    locationIds={locationIds}
                    buildingIds={buildingIds}
                  />
                </Grid>
                <Grid item>
                  <Typography typography={'h4'} sx={{ fontWeight: 500, display: 'inline-flex' }}>
                    Area
                    <RequiredItem />
                  </Typography>
                  <AreaSelect
                    hiddenLabel={true}
                    selected={formik.values.area}
                    onChange={handleChangeArea}
                    isSingleSelect={true}
                    disableAllSelect={true}
                    error={!!formik.errors.area}
                    helperText={formik.errors.area as string}
                    textColor={'grey.800'}
                    projectIds={projectIds}
                    locationIds={locationIds}
                    buildingIds={buildingIds}
                    levelIds={levelIds}
                  />
                </Grid>
                <Grid item>
                  <Typography typography={'h4'} sx={{ fontWeight: 500, display: 'inline-flex' }}>
                    Unit
                    <RequiredItem />
                  </Typography>
                  <UnitSelect
                    hiddenLabel={true}
                    selected={formik.values.unit}
                    onChange={handleChangeUnit}
                    isSingleSelect={true}
                    disableAllSelect={true}
                    error={!!formik.errors.unit}
                    helperText={formik.errors.unit as string}
                    textColor={'grey.800'}
                    projectIds={projectIds}
                    locationIds={locationIds}
                    buildingIds={buildingIds}
                    levelIds={levelIds}
                    areaIds={areaIds}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={7} xs={12}>
              <Box sx={{ width: '100%', height: '100%', minHeight: '434px' }}>
                <DeviceFloorMap
                  src={floorImgUrl}
                  hotspots={formik.values.hotspots}
                  unitPoints={unitPoints}
                  onChangeHotspots={handleChangeHotspots}
                  editType={EDeviceMapType.AddableDevice}
                />

                <Collapse in={!!formik.errors.hotspots}>
                  <StyledAlert severity='error' variant='outlined' sx={{ mt: '5px' }}>
                    {formik.errors.hotspots as string}
                  </StyledAlert>
                </Collapse>
              </Box>
            </Grid>
          </Grid>
        </Box>
        {isEdit && (
          <>
            <Divider light />
            <Box sx={{ px: 3.75, pt: 4.25, pb: 5 }}>
              <Grid container direction={'column'} columnSpacing={2} rowSpacing={5.5}>
                {bottomItems.map((item, idx) => {
                  const { label, value } = item
                  return (
                    <Grid key={`bottom-item-${idx}`} item container spacing={2}>
                      <Grid item lg={4} xs={12}>
                        <Typography variant='h4' sx={{ fontSize: 15, display: 'inline-flex' }}>
                          {label}
                        </Typography>
                      </Grid>
                      <Grid item lg={8} xs={12}>
                        <Typography variant='h5' sx={{ color: 'grey.700', display: 'inline-flex' }}>
                          {value}
                        </Typography>
                      </Grid>
                    </Grid>
                  )
                })}
              </Grid>
            </Box>
          </>
        )}
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
                loading={isCreating || isUpdating}
                disabled={!formik.isValid}
                onClick={handleDiscard}
                sx={{ color: 'grey.400', fontWeight: 500 }}
              >
                Cancel
              </LoadingButton>
              <LoadingButton
                variant='contained'
                size='large'
                color='primary'
                loading={isCreating || isUpdating}
                disabled={!formik.isValid}
                onClick={() => handleAddDevice()}
              >
                Add Device
              </LoadingButton>
            </Box>
          </>
        )}
      </Card>
    </Box>
  )
}

export default DeviceCreateEdit
