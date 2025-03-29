import { FC, useEffect, useMemo, useState } from 'react'
import { Box, Card, Divider, Grid, Typography, Button, Collapse, IconButton } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { To, useNavigate } from 'react-router-dom'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

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
import StyledAlert from '../common/StyledAlert'
import {
  DEVICE_LINKAGE_CONDITION_STATUS_LIST,
  EDeviceLinkageControlType,
  EDeviceLinkageType,
} from '../../helpers/constants'
import SimpleSelect from '../common/SimpleSelect'
import {
  IDeviceLinkage,
  IDeviceLinkageMap,
  IReqDeviceLinkageCreate,
  IReqDeviceLinkageMapCreate,
  IReqDeviceLinkageUpdate,
} from '../../api/models'
import Api from '../../api'
import { LoadingButton } from '@mui/lab'
import DeviceSelectWithCategory from './DeviceSelectWithCategory'
import getDeviceLinkageConditionStatusInfo from '../../helpers/getDeviceLinkageConditionStatusInfo'

const COND_IF = 'If'
const COND_THEN = 'Then'

interface IDeviceLinkageConditionItem {
  devices: ISelectItem[]
  status: ISelectItem
}

interface IDeviceLinkageCreate {
  name: string
  remark: string
  project: ISelectItem[]
  location: ISelectItem[]
  building: ISelectItem[]
  level: ISelectItem[]
  area: ISelectItem[]
  unit: ISelectItem[]
  condIf: IDeviceLinkageConditionItem[]
  condThen: IDeviceLinkageConditionItem[]
}

const initDeviceLinkageItemFormikValue: IDeviceLinkageConditionItem = {
  status: DEVICE_LINKAGE_CONDITION_STATUS_LIST[0],
  devices: [],
}

const initFormikValue: IDeviceLinkageCreate = {
  name: '',
  remark: '',
  project: [],
  location: [],
  building: [],
  level: [],
  area: [],
  unit: [],
  condIf: [],
  condThen: [],
}

interface IProps {
  deviceLinkage?: IDeviceLinkage
}

const generateDeviceLinkageMaps = (
  items: IDeviceLinkageConditionItem[],
  type: EDeviceLinkageType
) => {
  const mapLinkages: IReqDeviceLinkageMapCreate[] = []

  console.log('items: ', items)
  for (const item of items) {
    const isOn = item.status.value === EDeviceLinkageControlType.On

    for (const device of item.devices) {
      const isAll = !!device.isCategory
      const deviceTypeId = isAll ? device.value : device.categoryItem?.value
      const deviceId = device.value as number

      if (deviceTypeId) {
        const curMapIdx = mapLinkages.findIndex(
          (t) => t.deviceTypeId === deviceTypeId && t.isOn === isOn
        )

        if (curMapIdx === -1) {
          mapLinkages.push({
            isAll,
            type,
            isOn,
            deviceTypeId,
            ...(isAll ? {} : { deviceIds: [deviceId] }),
          })
        } else {
          const curMap = mapLinkages[curMapIdx]

          if (curMap.isAll) continue

          if (isAll) {
            mapLinkages.splice(curMapIdx, 1)
            mapLinkages.push({
              isAll,
              type,
              isOn,
              deviceTypeId,
            })
          } else {
            curMap.deviceIds = [...new Set([...(curMap.deviceIds || []), deviceId])]
            mapLinkages[curMapIdx] = curMap
          }
        }
      }
    }
  }

  return mapLinkages
}

const parseDeviceLinkageMaps = (maps: IDeviceLinkageMap[], type: EDeviceLinkageType) => {
  const conds: IDeviceLinkageConditionItem[] = []
  const filteredMaps = maps.filter((t) => t.type === type)

  for (const map of filteredMaps) {
    const { isOn, isAll, deviceType, deviceLinkageDetails } = map

    if (!deviceType) continue

    const status = getDeviceLinkageConditionStatusInfo(
      isOn ? EDeviceLinkageControlType.On : EDeviceLinkageControlType.Off
    )
    const deviceTypeName = deviceType.deviceType || '-'
    const categoryItem: ISelectItem = {
      label: `All ${deviceTypeName}`,
      value: deviceType.id,
      item: deviceType,
    }

    const curCondIdx = conds.findIndex((c) => c.status.value === status.value)

    if (curCondIdx === -1) {
      const devices: ISelectItem[] = []
      if (isAll) {
        devices.push({
          ...categoryItem,
          isCategory: true,
        })
      } else {
        for (const detail of deviceLinkageDetails || []) {
          const { device, deviceId } = detail
          if (device) {
            const { identificationNo } = device
            devices.push({
              label: `${deviceTypeName} - ${identificationNo}`,
              value: deviceId,
              item: device,
              categoryItem: categoryItem,
            })
          }
        }
      }
      conds.push({
        status,
        devices,
      })
    } else {
      const devices: ISelectItem[] = conds[curCondIdx].devices

      if (isAll) {
        const curCatIdx = devices.findIndex((d) => d.isCategory && d.value === categoryItem.value)

        if (curCatIdx === -1) {
          devices.push({
            ...categoryItem,
            isCategory: true,
          })
        }
      } else {
        for (const detail of deviceLinkageDetails || []) {
          const { device } = detail
          if (device) {
            const { identificationNo, id: deviceId } = device
            const curDeviceIdx = devices.findIndex((i) => !i.isCategory && i.value === deviceId)
            if (curDeviceIdx !== -1) {
              devices.push({
                label: `${deviceTypeName} - ${identificationNo}`,
                value: deviceId,
                item: device,
                categoryItem: categoryItem,
              })
            }
          }
        }
      }

      conds[curCondIdx].devices = devices
    }
  }

  return conds
}

const DeviceLinkageCreateEdit: FC<IProps> = ({ deviceLinkage }) => {
  const isEdit = !!deviceLinkage && deviceLinkage.id

  const [createDeviceLinkage, { isLoading: isCreating }] = Api.useCreateDeviceLinkageMutation()
  const [updateDeviceLinkage, { isLoading: isUpdating }] = Api.useUpdateDeviceLinkageMutation()
  const navigate = useNavigate()

  const [initValue, setInitValue] = useState<IDeviceLinkageCreate>(initFormikValue)

  const formik = useFormik<IDeviceLinkageCreate>({
    enableReinitialize: true,
    initialValues: { ...initFormikValue },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Linkage Name is required.'),
      project: Yup.array().min(1, 'Project is required'),
      location: Yup.array().min(1, 'Location is required'),
      building: Yup.array().min(1, 'Building is required'),
      level: Yup.array().min(1, 'Level is required'),
      area: Yup.array().min(1, 'Area is required'),
      unit: Yup.array().min(1, 'Unit is required'),
      condIf: Yup.array(
        Yup.object().shape({
          status: Yup.object(),
          devices: Yup.array().min(1, 'Device is required'),
        })
      ).min(1, 'Device is required'),
      condThen: Yup.array(
        Yup.object().shape({
          status: Yup.object(),
          devices: Yup.array().min(1, 'Device is required'),
        })
      ).min(1, 'Device is required'),
    }),
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        const linkageName = values.name
        const projectId = values.project[0].value as number
        const locationId = values.location[0].value as number
        const buildingId = values.building[0].value as number
        const levelId = values.level[0].value as number
        const areaId = values.area[0].value as number
        const unitId = values.unit[0].value as number
        const remark = values.remark
        const mapIf: IReqDeviceLinkageMapCreate[] = generateDeviceLinkageMaps(
          values.condIf,
          EDeviceLinkageType.If
        )
        const mapThen: IReqDeviceLinkageMapCreate[] = generateDeviceLinkageMaps(
          values.condThen,
          EDeviceLinkageType.Then
        )
        const deviceLinkageMaps = [...mapIf, ...mapThen]

        setSubmitting(true)

        if (isEdit) {
          if (!deviceLinkage?.id) {
            setSubmitting(false)
            return
          }

          const updatedDeviceLinkage: IReqDeviceLinkageUpdate = {
            id: deviceLinkage.id,
            linkageName,
            projectId,
            locationId,
            buildingId,
            levelId,
            areaId,
            unitId,
            remark,
            deviceLinkageMaps,
          }
          updateDeviceLinkage(updatedDeviceLinkage)
            .unwrap()
            .then(() => {
              toast.success('Updated the device linkage')
              setInitValue({ ...values })
            })
            .catch((err) => {
              console.error('Failed to upate the device linkage: ', err)
              toast.error('Failed to upate the device linkage')
            })
            .finally(() => {
              setSubmitting(false)
            })
        } else {
          const newDeviceLinkage: IReqDeviceLinkageCreate = {
            linkageName,
            projectId,
            locationId,
            buildingId,
            levelId,
            areaId,
            unitId,
            remark,
            deviceLinkageMaps,
          }
          createDeviceLinkage(newDeviceLinkage)
            .unwrap()
            .then(() => {
              toast.success('Created a new device linkage')
              navigate('/device/linkage')
            })
            .catch((err) => {
              console.error('Failed to create a new device linkage: ', err)
              toast.error('Failed to create a new device linkage')
            })
            .finally(() => {
              setSubmitting(false)
            })
        }
      } catch (err: any) {
        console.error('Unkown error in saving device linkage: ', err)
        toast.error('Failed to save device linkage')
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

    for (let idx = 0; idx < formik.values.condIf.length; idx++) {
      if (formik.values.condIf[idx]?.status?.value !== initValue.condIf[idx]?.status?.value) {
        return true
      }

      const oldDeviceIds = (initValue.condIf[idx]?.devices || []).map((d) =>
        d.isCategory ? `type-${d.label}` : d.label
      )
      const curDeviceIds = formik.values.condIf[idx].devices.map((d) =>
        d.isCategory ? `type-${d.label}` : d.label
      )
      const strOldDeviceIds = oldDeviceIds.sort((a, b) => (a < b ? 1 : -1)).join(',')
      const strCurDeviceIds = curDeviceIds.sort((a, b) => (a < b ? 1 : -1)).join(',')
      if (strOldDeviceIds !== strCurDeviceIds) return true
    }

    for (let idx = 0; idx < formik.values.condThen.length; idx++) {
      if (formik.values.condThen[idx]?.status?.value !== initValue.condThen[idx]?.status?.value) {
        return true
      }

      const oldDeviceIds = (initValue.condThen[idx]?.devices || []).map((d) =>
        d.isCategory ? `type-${d.label}` : d.label
      )
      const curDeviceIds = formik.values.condThen[idx].devices.map((d) =>
        d.isCategory ? `type-${d.label}` : d.label
      )
      const strOldDeviceIds = oldDeviceIds.sort((a, b) => (a < b ? 1 : -1)).join('')
      const strCurDeviceIds = curDeviceIds.sort((a, b) => (a < b ? 1 : -1)).join('')
      if (strOldDeviceIds !== strCurDeviceIds) return true
    }
  }, [initValue, formik.values])

  const handleChangeStatus = async (idx: number, status: ISelectItem, cond: string) => {
    if (cond === COND_IF) {
      const newDeviceLists = deepCopy(formik.values.condIf)
      newDeviceLists[idx].status = status
      await formik.setFieldValue('condIf', deepCopy(newDeviceLists))
    } else if (cond === COND_THEN) {
      const newDeviceLists = deepCopy(formik.values.condThen)
      newDeviceLists[idx].status = status
      await formik.setFieldValue('condThen', deepCopy(newDeviceLists))
    }
  }

  const handleChangeDevices = async (idx: number, devices: ISelectItem[], cond: string) => {
    if (cond === COND_IF) {
      const newDeviceLists = deepCopy(formik.values.condIf)
      newDeviceLists[idx].devices = devices
      await formik.setFieldValue('condIf', deepCopy(newDeviceLists))
    } else if (cond === COND_THEN) {
      const newDeviceLists = deepCopy(formik.values.condThen)
      newDeviceLists[idx].devices = devices
      await formik.setFieldValue('condThen', deepCopy(newDeviceLists))
    }
  }

  const handleRemoveDeviceLinkage = async (idx: number, cond: string) => {
    if (cond === COND_IF) {
      const newDeviceLists = deepCopy(formik.values.condIf)
      newDeviceLists.splice(idx, 1)
      await formik.setFieldValue('condIf', deepCopy(newDeviceLists))
    } else if (cond === COND_THEN) {
      const newDeviceLists = deepCopy(formik.values.condThen)
      newDeviceLists.splice(idx, 1)
      await formik.setFieldValue('condThen', deepCopy(newDeviceLists))
    }
  }

  const handleChangeLinkageName = async (name: string) => {
    await formik.setFieldValue('name', name)
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

  const handleDiscard = () => {
    formik.setValues({ ...initFormikValue })
  }

  const handleAddLinkage = () => {
    formik.handleSubmit()
  }

  const handleChangeRemark = async (remark: string) => {
    await formik.setFieldValue('remark', remark)
  }

  const handleAddNewCond = async (cond: string) => {
    if (cond === COND_IF) {
      const newDeviceLists = deepCopy(formik.values.condIf)
      newDeviceLists.push({ ...initDeviceLinkageItemFormikValue })
      await formik.setFieldValue('condIf', deepCopy(newDeviceLists))
    } else if (cond === COND_THEN) {
      const newDeviceLists = deepCopy(formik.values.condThen)
      newDeviceLists.push({ ...initDeviceLinkageItemFormikValue })
      await formik.setFieldValue('condThen', deepCopy(newDeviceLists))
    }
  }

  useEffect(() => {
    if (deviceLinkage && deviceLinkage.id) {
      const initValue: IDeviceLinkageCreate = { ...initFormikValue }
      const unit = deviceLinkage.unit
      const area = deviceLinkage?.area
      const level = deviceLinkage?.level
      const building = deviceLinkage?.building
      const location = deviceLinkage?.location
      const project = deviceLinkage?.project
      const deviceLinkageMaps = deviceLinkage.deviceLinkageMaps || []
      const initIfConds: IDeviceLinkageConditionItem[] = parseDeviceLinkageMaps(
        deviceLinkageMaps,
        EDeviceLinkageType.If
      )
      const initThenConds: IDeviceLinkageConditionItem[] = parseDeviceLinkageMaps(
        deviceLinkageMaps,
        EDeviceLinkageType.Then
      )

      initValue.name = deviceLinkage.linkageName || ''
      initValue.remark = deviceLinkage.remark || ''
      initValue.project = project ? [{ label: project.name, value: project.id }] : []
      initValue.location = location ? [{ label: location.name, value: location.id }] : []
      initValue.building = building ? [{ label: building.name, value: building.id }] : []
      initValue.level = level ? [{ label: level.name, value: level.id }] : []
      initValue.area = area ? [{ label: area.name, value: area.id }] : []
      initValue.unit = unit ? [{ label: unit.name, value: unit.id }] : []
      initValue.condIf = deepCopy(initIfConds)
      initValue.condThen = deepCopy(initThenConds)
      formik.setValues({ ...initValue })
      setInitValue(deepCopy(initValue))
    }
  }, [deviceLinkage])

  return (
    <Box>
      {!isEdit && <ButtonBack to={-1 as To} />}
      <Card sx={{ display: 'flex', flexDirection: 'column', mt: isEdit ? 3.75 : 4 }}>
        <Box sx={isEdit ? { px: 3.75, pt: 2.75, pb: 2.5 } : { pt: 4.5, pb: 2.5, px: 3.75 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant='h3' sx={{ color: 'grey.800' }}>
              {isEdit ? 'Device Linkage Info' : 'Add New Device Linkage'}
            </Typography>
            {isEdit && (
              <LoadingButton
                variant='contained'
                color='primary'
                loading={isUpdating}
                disabled={!formik.isValid || !isChanged}
                onClick={() => handleAddLinkage()}
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
                  sx={{ fontWeight: 500, mt: 1.25, display: 'inline-flex', color: 'grey.800' }}
                >
                  Linkage Name
                  <RequiredItem />
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <TextFieldWithLabel
                  label={''}
                  name={'name'}
                  placeholder={'Linkage Name'}
                  showLabel={false}
                  value={formik.values.name}
                  onChange={(e) => handleChangeLinkageName(e.target.value)}
                  error={!!formik.errors.name}
                  helperText={formik.errors.name as string}
                  sx={{ input: { fontWeight: 900, color: 'grey.800' } }}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item lg={4} xs={12}>
                <Typography
                  variant='h4'
                  sx={{ fontWeight: 500, mt: 1.25, display: 'inline-flex', color: 'grey.800' }}
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
                  variant='h4'
                  sx={{ fontWeight: 500, mt: 1.25, display: 'inline-flex', color: 'grey.800' }}
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
        {[COND_IF, COND_THEN].map((cond, condIdx) => {
          const values = cond === COND_IF ? formik.values.condIf : formik.values.condThen
          const condErrors = cond === COND_IF ? formik.errors.condIf : formik.errors.condThen
          return (
            <Box key={`condition-item-${condIdx}`}>
              <Box sx={{ px: 3.75, pt: 3.75, pb: 5.5 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Typography
                    typography={'h4'}
                    sx={{
                      fontWeight: 500,
                      display: 'inline-flex',
                      color: 'grey.800',
                      lineHeight: 1,
                    }}
                  >
                    {cond}
                    <Typography
                      variant='subtitle1'
                      variantMapping={{ subtitle1: 'span' }}
                      sx={{ color: (theme) => theme.palette.error.main, lineHeight: 1 }}
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
                      background: (theme) => theme.palette.primary.light,
                      color: (theme) => theme.palette.primary.main,
                      '&:hover': {
                        color: '#ffffff',
                      },
                    }}
                    onClick={() => handleAddNewCond(cond)}
                  >
                    <Plus sx={{ fontSize: '16px' }} />
                  </Button>
                </Box>
                <Grid container direction={'column'} rowSpacing={2} sx={{ mt: 2 }}>
                  {values.map((item, idx) => {
                    const { status, devices } = item
                    const errors = condErrors?.[idx] as any
                    return (
                      <Grid key={`group-item-${idx}`} item xs={12}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                          <Grid container columnSpacing={5} rowSpacing={2}>
                            <Grid item lg={6} xs={12}>
                              <Typography
                                typography='h5'
                                sx={{ mb: 0.5, display: 'inline-flex', color: 'grey.800' }}
                              >
                                Device List
                                <RequiredItem />
                              </Typography>
                              <DeviceSelectWithCategory
                                hiddenLabel={true}
                                selected={devices as ISelectItem[]}
                                onChange={(e) => handleChangeDevices(idx, e, cond)}
                                isSingleSelect={false}
                                disableAllSelect={true}
                                allowRemoval={true}
                                error={!!errors?.devices}
                                helperText={errors?.devices as string}
                                textColor='grey.800'
                                projectIds={projectIds}
                                locationIds={locationIds}
                                buildingIds={buildingIds}
                                levelIds={levelIds}
                                areaIds={areaIds}
                                unitIds={unitIds}
                              />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Typography
                                typography='h5'
                                sx={{ mb: 0.5, display: 'inline-flex', color: 'grey.800' }}
                              >
                                Device Status
                                <RequiredItem />
                              </Typography>
                              <SimpleSelect
                                width={'100%'}
                                value={status}
                                options={DEVICE_LINKAGE_CONDITION_STATUS_LIST}
                                onChange={(val) => handleChangeStatus(idx, val, cond)}
                              />
                            </Grid>
                          </Grid>
                          <Box sx={{ flex: 1 }}>
                            <IconButton
                              sx={{ mt: 3.8 }}
                              onClick={() => handleRemoveDeviceLinkage(idx, cond)}
                            >
                              <DeleteOutlineIcon />
                            </IconButton>
                          </Box>
                        </Box>
                      </Grid>
                    )
                  })}
                </Grid>
                <Collapse in={!!condErrors && values.length === 0}>
                  <StyledAlert severity='error' variant='outlined' sx={{ mt: '5px' }}>
                    {cond} List is required
                  </StyledAlert>
                </Collapse>
              </Box>
              <Divider light sx={{ borderColor: 'grey.100' }} />
            </Box>
          )
        })}
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
                loading={isCreating}
                onClick={handleDiscard}
                sx={{ color: (theme) => 'grey.400', fontWeight: 500 }}
              >
                Cancel
              </LoadingButton>
              <LoadingButton
                variant='contained'
                size='large'
                color='primary'
                loading={isCreating}
                disabled={!formik.isValid}
                onClick={() => handleAddLinkage()}
              >
                Add Linkage
              </LoadingButton>
            </Box>
          </>
        )}
      </Card>
    </Box>
  )
}

export default DeviceLinkageCreateEdit
