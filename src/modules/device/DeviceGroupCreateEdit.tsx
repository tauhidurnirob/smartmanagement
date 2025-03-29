import { FC, useEffect, useMemo, useState } from 'react'
import { Box, Card, Divider, Grid, Typography, Collapse, Button } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { To, useNavigate } from 'react-router-dom'
import { LoadingButton } from '@mui/lab'

import { ISelectItem } from '../../types/common'
import { RequiredItem } from '../audit/audit-schedule/AuditScheduleDetail'
import ProjectSelect from '../audit/project-sites/ProjectSelect'
import LocationSelect from '../location/LocationSelect'
import BuildingSelect from '../location/BuildingSelect'
import LevelSelect from '../location/LevelSelect'
import AreaSelect from '../location/AreaSelect'
import UnitSelect from '../location/UnitSelect'
import ButtonBack from '../common/ButtonBack'
import TextFieldWithLabel from '../common/TextFieldWithLabel'
import TextareaWithLabel from '../common/TextareaWithLabel'
import { Plus } from '../../assets/icons/plus'
import deepCopy from '../../helpers/deepCopy'
import DeviceTypeSelect from './DeviceTypeSelect'
import DeviceSelect from './DeviceSelect'
import StyledAlert from '../common/StyledAlert'
import { IDeviceGroup, IReqDeviceGroupCreate, IReqDeviceGroupUpdate } from '../../api/models'
import Api from '../../api'
import { ROLE_PERMISSION_KEYS } from '../../helpers/constants'
import useAuth from '../../hooks/useAuth'
interface IDeviceGroupItem {
  type: ISelectItem[]
  devices: ISelectItem[]
}

interface IDeviceGroupCreate {
  name: string
  remark: string
  project: ISelectItem[]
  location: ISelectItem[]
  building: ISelectItem[]
  level: ISelectItem[]
  area: ISelectItem[]
  unit: ISelectItem[]
  items: IDeviceGroupItem[]
}

const initGroupDeviceItemFormikValue: IDeviceGroupItem = {
  type: [],
  devices: [],
}

const initFormikValue: IDeviceGroupCreate = {
  name: '',
  remark: '',
  project: [],
  location: [],
  building: [],
  level: [],
  area: [],
  unit: [],
  items: [],
}

interface IProps {
  deviceGroup?: IDeviceGroup
}

const DeviceGroupCreateEdit: FC<IProps> = ({ deviceGroup }) => {
  const isEdit = !!deviceGroup && deviceGroup.id

  const navigate = useNavigate()

  const [createDeviceGroup, { isLoading: isCreating }] = Api.useCreateDeviceGroupMutation()
  const [updateDeviceGroup, { isLoading: isUpdating }] = Api.useUpdateDeviceGroupMutation()

  const [initValue, setInitValue] = useState<IDeviceGroupCreate>(initFormikValue)

  const formik = useFormik<IDeviceGroupCreate>({
    enableReinitialize: true,
    initialValues: { ...initFormikValue },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Group Name is required.'),
      project: Yup.array().min(1, 'Project is required').required('Project is required'),
      location: Yup.array().min(1, 'Location is required').required('Location is required'),
      building: Yup.array().min(1, 'Building is required').required('Building is required'),
      level: Yup.array().min(1, 'Level is required').required('Level is required'),
      area: Yup.array().min(1, 'Area is required').required('Area is required'),
      unit: Yup.array().min(1, 'Unit is required').required('Unit is required'),
      items: Yup.array(
        Yup.object().shape({
          type: Yup.array().required('Device Type is required').min(1, 'Device Type is required'),
          devices: Yup.array(),
        })
      ).min(1, 'Device Lists are required'),
    }),
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        const groupName = values.name
        const projectId = values.project[0].value as number
        const locationId = values.location[0].value as number
        const buildingId = values.building[0].value as number
        const levelId = values.level[0].value as number
        const areaId = values.area[0].value as number
        const unitId = values.unit[0].value as number
        const remark = values.remark
        const deviceGroupMaps = values.items.map((item) => {
          const { devices, type } = item
          const deviceTypeId = type[0].value as number
          const deviceIds = devices.map((d) => d.value as number)
          const isAll = deviceIds.length === 0
          return {
            isAll,
            deviceIds,
            deviceTypeId,
          }
        })

        setSubmitting(true)

        if (isEdit) {
          if (!deviceGroup) {
            setSubmitting(false)
            return
          }
          const updatedDeviceGroup: IReqDeviceGroupUpdate = {
            id: deviceGroup?.id,
            groupName,
            projectId,
            locationId,
            buildingId,
            levelId,
            areaId,
            unitId,
            remark: remark,
            deviceGroupMaps,
          }
          updateDeviceGroup(updatedDeviceGroup)
            .unwrap()
            .then(() => {
              toast.success('Updated the device group')
            })
            .catch((err) => {
              console.log('Failed to update the device group: ', err)
              toast.error('Failed to update the device group')
            })
            .finally(() => {
              setSubmitting(false)
            })
        } else {
          const newDeviceGroup: IReqDeviceGroupCreate = {
            groupName,
            projectId,
            locationId,
            buildingId,
            levelId,
            areaId,
            unitId,
            remark: remark,
            deviceGroupMaps,
          }
          createDeviceGroup(newDeviceGroup)
            .unwrap()
            .then(() => {
              toast.success('Created a new device group')
              navigate('/device/group')
            })
            .catch((err) => {
              console.log('Failed to create a new device group: ', err)
              toast.error('Failed to create a new device group')
            })
            .finally(() => {
              setSubmitting(false)
            })
        }
      } catch (err: any) {
        console.error('Unkown error in updating device group: ', err)
        toast.error('Failed to save device')
        setStatus({ success: false })
        setSubmitting(false)
      }
    },
  })

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

  const unitIds = useMemo(() => {
    return formik.values.unit.map((p) => Number(p.value))
  }, [formik.values.unit])

  const isChanged = useMemo(() => {
    const values = formik.values

    if (values.name !== initValue.name) return true

    if (values.project[0]?.value !== initValue.project[0]?.value) return true
    if (values.location[0]?.value !== initValue.location[0]?.value) return true
    if (values.building[0]?.value !== initValue.building[0]?.value) return true
    if (values.level[0]?.value !== initValue.level[0]?.value) return true
    if (values.area[0]?.value !== initValue.area[0]?.value) return true
    if (values.unit[0]?.value !== initValue.unit[0]?.value) return true

    for (let idx = 0; idx < formik.values.items.length; idx++) {
      if (formik.values.items[idx]?.type[0]?.value !== initValue.items[idx]?.type[0]?.value) {
        return true
      }

      const oldDeviceIds = (initValue.items[idx]?.devices || []).map((d) => d.value as number)
      const curDeviceIds = formik.values.items[idx].devices.map((d) => d.value as number)

      const strOldDeviceIds = oldDeviceIds.sort((a, b) => (a < b ? 1 : -1)).join(',')
      const strCurDeviceIds = curDeviceIds.sort((a, b) => (a < b ? 1 : -1)).join(',')

      if (strOldDeviceIds !== strCurDeviceIds) return true
    }

    return false
  }, [initValue, formik.values])

  const handleChangeType = (idx: number, type: ISelectItem[]) => {
    const newDeviceLists = deepCopy(formik.values.items)
    newDeviceLists[idx].type = type
    newDeviceLists[idx].devices = []
    formik.setFieldValue('items', deepCopy(newDeviceLists))
  }

  const handleChangeDevices = (idx: number, devices: ISelectItem[]) => {
    const newDeviceLists = deepCopy(formik.values.items)
    newDeviceLists[idx].devices = devices
    formik.setFieldValue('items', deepCopy(newDeviceLists))
  }

  const clearAllDeviceList = async () => {
    const newDeviceLists = deepCopy(formik.values.items)
    for (let idx = 0; idx < newDeviceLists.length; idx++) {
      newDeviceLists[idx].devices = []
    }
    formik.setFieldValue('items', deepCopy(newDeviceLists))
  }

  const handleChangeGroupName = (name: string) => {
    formik.setFieldValue('name', name)
  }

  const handleChangeProject = async (projects: ISelectItem[]) => {
    await formik.setFieldValue('project', projects)
    await formik.setFieldValue('location', [])
    await formik.setFieldValue('building', [])
    await formik.setFieldValue('level', [])
    await formik.setFieldValue('area', [])
    await formik.setFieldValue('unit', [])
    await formik.setFieldValue('unit', [])
    await clearAllDeviceList()
  }

  const handleChangeLocation = async (locations: ISelectItem[]) => {
    await formik.setFieldValue('location', locations)
    await formik.setFieldValue('building', [])
    await formik.setFieldValue('level', [])
    await formik.setFieldValue('area', [])
    await formik.setFieldValue('unit', [])
    await clearAllDeviceList()
  }

  const handleChangeBuilding = async (buildings: ISelectItem[]) => {
    await formik.setFieldValue('building', buildings)
    await formik.setFieldValue('level', [])
    await formik.setFieldValue('area', [])
    await formik.setFieldValue('unit', [])
    await clearAllDeviceList()
  }

  const handleChangeLevel = async (levels: ISelectItem[]) => {
    await formik.setFieldValue('level', levels)
    await formik.setFieldValue('area', [])
    await formik.setFieldValue('unit', [])
    await clearAllDeviceList()
  }

  const handleChangeArea = async (areas: ISelectItem[]) => {
    await formik.setFieldValue('area', areas)
    await formik.setFieldValue('unit', [])
    await clearAllDeviceList()
  }

  const handleChangeUnit = async (units: ISelectItem[]) => {
    formik.setFieldValue('unit', units)
    await clearAllDeviceList()
  }

  const handleDiscard = async () => {
    await formik.setValues({ ...initFormikValue })
  }

  const handleAddGroup = () => {
    formik.handleSubmit()
  }

  const handleChangeRemark = (remark: string) => {
    formik.setFieldValue('remark', remark)
  }

  const handleAddNewDevice = () => {
    const newDeviceLists = deepCopy(formik.values.items)
    newDeviceLists.push({ ...initGroupDeviceItemFormikValue })
    formik.setFieldValue('items', deepCopy(newDeviceLists))
  }
  const { user } = useAuth();
  const [isEditable, setEditable] = useState(false);
 
  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.device.deviceGroup.editDeviceGroup)) {
      setEditable(true)
    }
    if (deviceGroup && deviceGroup.id) {
      const initValue: IDeviceGroupCreate = { ...initFormikValue }
      const unit = deviceGroup.unit
      const area = deviceGroup.area
      const level = deviceGroup.level
      const building = deviceGroup.building
      const location = deviceGroup.location
      const project = deviceGroup.project
      const deviceGroupMaps = deviceGroup.deviceGroupMaps || []
      const initItems = []
      for (const item of deviceGroupMaps) {
        const { deviceType, deviceGroupDetails } = item
        const typeInfo = deviceType
          ? [
              {
                label: deviceType.deviceType || '',
                value: deviceType.id,
                item: deviceType,
              },
            ]
          : []
        const initDevices = (deviceGroupDetails || []).map((d) => ({
          label: d.device?.identificationNo || '-',
          value: d.deviceId,
        }))
        initItems.push({
          type: typeInfo,
          devices: initDevices,
        })
      }
      initValue.name = deviceGroup.groupName || ''
      initValue.remark = deviceGroup.remark || ''
      initValue.project = project ? [{ label: project.name, value: project.id }] : []
      initValue.location = location ? [{ label: location.name, value: location.id }] : []
      initValue.building = building ? [{ label: building.name, value: building.id }] : []
      initValue.level = level ? [{ label: level.name, value: level.id }] : []
      initValue.area = area ? [{ label: area.name, value: area.id }] : []
      initValue.unit = unit ? [{ label: unit.name, value: unit.id }] : []
      initValue.items = deepCopy(initItems)
      formik.setValues({ ...initValue })
      setInitValue(deepCopy(initValue))
    }
  }, [deviceGroup])

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
            <Typography variant='h3'>{isEdit ? 'Group Info' : 'Add New Group'}</Typography>
            {isEdit && (
              <LoadingButton
                variant='contained'
                color='primary'
                loading={isUpdating}
                disabled={!formik.isValid || !isChanged || !isEditable}
                onClick={() => handleAddGroup()}
              >
                Save
              </LoadingButton>
            )}
          </Box>
        </Box>
        <Divider light sx={{ borderColor: 'grey.100' }} />
        <Box sx={{ px: 3.75, pt: 3, pb: 3 }}>
          <Grid container direction={'column'} spacing={2.75}>
            <Grid item container spacing={2}>
              <Grid item lg={4} xs={12}>
                <Typography
                  typography={'h4'}
                  sx={{ fontWeight: 500, mt: 1.25, display: 'inline-flex' }}
                >
                  Group Name
                  <RequiredItem />
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <TextFieldWithLabel
                  label={''}
                  name={'name'}
                  placeholder={'Group Name'}
                  showLabel={false}
                  value={formik.values.name}
                  onChange={(e) => handleChangeGroupName(e.target.value)}
                  error={!!formik.errors.name}
                  helperText={formik.errors.name as string}
                  sx={{ input: { fontWeight: 900, color: 'grey.800' } }}
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
                  projectIds={projectIds}
                  textColor={'grey.800'}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ px: 3.75, pt: 2, pb: 5 }}>
          <Grid container spacing={1.5}>
            <Grid item lg={3} xs={12}>
              <Typography
                typography={'h4'}
                sx={{ fontWeight: 500, display: 'inline-flex', color: 'grey.800' }}
              >
                Building
                <RequiredItem />
              </Typography>
              <BuildingSelect
                hiddenLabel={true}
                selected={formik.values.building as ISelectItem[]}
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
            <Grid item lg={3} xs={12}>
              <Typography
                typography={'h4'}
                sx={{ fontWeight: 500, display: 'inline-flex', color: 'grey.800' }}
              >
                Level
                <RequiredItem />
              </Typography>
              <LevelSelect
                hiddenLabel={true}
                selected={formik.values.level as ISelectItem[]}
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
            <Grid item lg={3} xs={12}>
              <Typography
                typography={'h4'}
                sx={{ fontWeight: 500, display: 'inline-flex', color: 'grey.800' }}
              >
                Area
                <RequiredItem />
              </Typography>
              <AreaSelect
                hiddenLabel={true}
                selected={formik.values.area as ISelectItem[]}
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
            <Grid item lg={3} xs={12}>
              <Typography
                typography={'h4'}
                sx={{ fontWeight: 500, display: 'inline-flex', color: 'grey.800' }}
              >
                Unit
                <RequiredItem />
              </Typography>
              <UnitSelect
                hiddenLabel={true}
                selected={formik.values.unit as ISelectItem[]}
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
        </Box>
        <Divider light sx={{ borderColor: 'grey.100' }} />
        <Box sx={{ px: 3.75, pt: 3.75, pb: 5.5 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Typography
              typography={'h4'}
              sx={{ fontWeight: 500, display: 'inline-flex', color: 'grey.800', lineHeight: 1 }}
            >
              Device
              <Typography
                variant='subtitle1'
                variantMapping={{ subtitle1: 'span' }}
                sx={{ color: 'error.main', lineHeight: 1 }}
              >
                *
              </Typography>
            </Typography>
            <Button
              variant='contained'
              size='small'
              sx={{
                p: 1,
                ml: 2,
                minWidth: 0,
                bgcolor: 'primary.light',
                color: 'primary.main',
                '&:hover': {
                  color: '#ffffff',
                },
              }}
              onClick={() => handleAddNewDevice()}
            >
              <Plus sx={{ fontSize: '16px' }} />
            </Button>
          </Box>
          <Grid container direction={'column'} rowSpacing={2} sx={{ mt: 2 }}>
            {formik.values.items.map((item, idx) => {
              const { type, devices } = item
              const errors = formik.errors.items?.[idx] as any
              const devieType = type[0]
              const deviceTypeIds = devieType ? [devieType.value as number] : []
              return (
                <Grid
                  key={`group-item-${idx}`}
                  item
                  container
                  xs={12}
                  columnSpacing={5}
                  rowSpacing={2}
                >
                  <Grid item lg={6} xs={12}>
                    <Typography
                      typography='h5'
                      sx={{ mb: 0.5, display: 'inline-flex', color: 'grey.800' }}
                    >
                      Device Type
                      <RequiredItem />
                    </Typography>
                    <DeviceTypeSelect
                      hiddenLabel={true}
                      selected={type}
                      onChange={(e) => handleChangeType(idx, e)}
                      isSingleSelect={true}
                      disableAllSelect={true}
                      error={!!errors?.type}
                      helperText={errors?.type as string}
                      textColor={'grey.800'}
                      placeholder={'Select Device Type'}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Typography
                      typography='h5'
                      sx={{ mb: 0.5, display: 'inline-flex', color: 'grey.800' }}
                    >
                      Device List
                      <RequiredItem />
                    </Typography>
                    <DeviceSelect
                      hiddenLabel={true}
                      selected={devices as ISelectItem[]}
                      onChange={(e) => handleChangeDevices(idx, e)}
                      isSingleSelect={false}
                      disableAllSelect={false}
                      allowRemoval={true}
                      error={!!errors?.devices}
                      helperText={errors?.devices as string}
                      textColor='grey.800'
                      deviceTypeIds={deviceTypeIds}
                      projectIds={projectIds}
                      locationIds={locationIds}
                      buildingIds={buildingIds}
                      levelIds={levelIds}
                      areaIds={areaIds}
                      unitIds={unitIds}
                    />
                  </Grid>
                </Grid>
              )
            })}
          </Grid>
          <Collapse in={!!formik.errors.items && formik.values.items.length === 0}>
            <StyledAlert severity='error' variant='outlined' sx={{ mt: '5px' }}>
              Device List is required
            </StyledAlert>
          </Collapse>
        </Box>
        <Divider light sx={{ borderColor: 'grey.100' }} />
        <Box sx={{ px: 3.75, pt: 4, pb: 3.25 }}>
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
                showLabel={false}
                name='remark'
                onChange={(e) => handleChangeRemark(e.target.value)}
                value={formik.values.remark}
                placeholder='Write a Remark'
                rows={5}
              />
            </Grid>
          </Grid>
        </Box>
        {!isEdit && (
          <>
            <Divider light sx={{ borderColor: 'grey.100' }} />
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
                onClick={handleDiscard}
                sx={{ color: (theme) => 'grey.400', fontWeight: 500 }}
              >
                Cancel
              </LoadingButton>
              <LoadingButton
                variant='contained'
                size='large'
                color='primary'
                loading={isCreating || isUpdating}
                disabled={!formik.isValid}
                onClick={() => handleAddGroup()}
              >
                Add Group
              </LoadingButton>
            </Box>
          </>
        )}
      </Card>
    </Box>
  )
}

export default DeviceGroupCreateEdit
