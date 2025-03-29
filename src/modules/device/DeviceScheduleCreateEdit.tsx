import { FC, useEffect, useMemo, useState } from 'react'
import {
  Box,
  Card,
  Divider,
  Grid,
  Typography,
  useTheme,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { To, useNavigate } from 'react-router-dom'
import dayjs, { Dayjs } from 'dayjs'

import { ISelectItem, ISelectItemWithCategory } from '../../types/common'
import { RequiredItem } from '../audit/audit-schedule/AuditScheduleDetail'
import ProjectSelect from '../audit/project-sites/ProjectSelect'
import LocationSelect from '../location/LocationSelect'
import BuildingSelect from '../location/BuildingSelect'
import LevelSelect from '../location/LevelSelect'
import AreaSelect from '../location/AreaSelect'
import UnitSelect from '../location/UnitSelect'
import ButtonBack from '../common/ButtonBack'
import { IDeviceSchedule } from '../../types/device'
import TextFieldWithLabel from '../common/TextFieldWithLabel'
import TextareaWithLabel from '../common/TextareaWithLabel'
import deepCopy from '../../helpers/deepCopy'
import DeviceScheduleFrequencySelect from './DeviceScheduleFrequencySelect'
import { DEVICE_SCHEDULE_FREQUENCYS, DEVICE_SCHEDULE_STATUS_LIST } from '../../helpers/constants'
import DaySelect from '../audit/audit-schedule/DaySelect'
import SelectDate from '../common/SelectDate'
import DeviceTypeSelect from './DeviceTypeSelect'
import DeviceSelect from './DeviceSelect'
import Api from '../../api'
import { _getAuth } from '../../store/_selectors'
import { IReqDeviceScheduleCreate, IReqDeviceScheduleUpdate } from '../../api/models'
import { LoadingButton } from '@mui/lab'
import DeleteDialog from '../common/DeleteDialog'

interface IDeviceScheduleCreate {
  name: string
  remark: string
  project: ISelectItem[]
  location: ISelectItem[]
  building: ISelectItem[]
  level: ISelectItem[]
  area: ISelectItem[]
  unit: ISelectItem[]
  frequency: ISelectItem | null
  repeatOn: string[]
  timeStart: string | null
  deviceType: ISelectItemWithCategory[]
  device: ISelectItem[]
  status: string
}

const initFormikValue: IDeviceScheduleCreate = {
  name: '',
  remark: '',
  project: [],
  location: [],
  building: [],
  level: [],
  area: [],
  unit: [],
  frequency: null,
  repeatOn: [],
  timeStart: null,
  deviceType: [],
  device: [],
  status: DEVICE_SCHEDULE_STATUS_LIST[0].value as string,
}

interface IProps {
  deviceSchedule?: IDeviceSchedule
  onCloseEdit?: () => void
}

const DeviceScheduleCreateEdit: FC<IProps> = ({ deviceSchedule, onCloseEdit }) => {
  const isEdit = !!deviceSchedule && deviceSchedule.id

  const theme = useTheme()
  const navigate = useNavigate()

  const { user } = _getAuth()

  const [initValue, setInitValue] = useState<IDeviceScheduleCreate>(initFormikValue)
  const [createSchedule, {isLoading: createLoading}] = Api.useCreateDeviceScheduleMutation()
  const [updateSchedule, {isLoading: updateLoading}] = Api.useUpdateDeviceScheduleMutation()

  const formik = useFormik<IDeviceScheduleCreate>({
    enableReinitialize: true,
    initialValues: { ...initFormikValue },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Schedule Name is required.'),
      project: Yup.array().length(1, 'Project is required').required('Project is required'),
      location: Yup.array().length(1, 'Location is required').required('Location is required'),
      building: Yup.array().length(1, 'Building is required').required('Building is required'),
      level: Yup.array().length(1, 'Level is required').required('Level is required'),
      area: Yup.array().length(1, 'Area is required').required('Area is required'),
      unit: Yup.array().length(1, 'Unit is required').required('Unit is required'),
      deviceType: Yup.array()
        .length(1, 'Device Type is required')
        .required('Device Type is required'),
      device: Yup.array(),
      frequency: Yup.object().required('Frequency is required'),
      repeatOn: Yup.array().when('frequency', (frequency, schema) => {
        if (frequency[0]?.value === 'weekly')
          return schema.min(1, 'Repeat On is required').required('Repeat On is required')
        return schema
      }),
      timeStart: Yup.string().nullable().required('Time is required'),
    }),
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        setSubmitting(true)
        const data = {
          scheduleName: values.name,
          frequencyType: values.frequency?.value as string,
          repeatOn: (values.repeatOn)?.join(','),
          timeStart: values.timeStart as string,
          projectId: values.project[0].value as number,
          locationId: values.location[0].value as number,
          buildingId: values.building[0].value as number,
          levelId: values.level[0].value as number,
          areaId: values.area[0].value as number,
          unitId: values.unit[0].value as number,
          deviceTypeId: values.deviceType[0].value as number,
          deviceIds: values.device.length ? values.device?.map((d => d.value)) as number[] : [],
          isOn: values.status === 'on' ? true : false,
          isAll: values.device.length ? false : true
        }
        const dataCreate: IReqDeviceScheduleCreate = {
          ...data,
          createdUserId: user?.id as number
        }
        const dataUpdate: IReqDeviceScheduleUpdate = {
          ...data,
          id: deviceSchedule?.id as number,
          updatedUserId: user?.id as number
        }
        if(isEdit) {
          updateSchedule(dataUpdate)
            .then((res) => {
              setStatus({ success: true })
              toast.success('A new device activation schedule has been updated')
              navigate('/device/activation-schedule')
            })
            .catch((err) => {
              console.log('Failed to update device activation schedule: ', err)
              toast.error('Failed to update device activation schedule')
              setStatus({ success: false })
            })
            .finally(() => {
              setSubmitting(false)
            })
        }
        else {
          createSchedule(dataCreate)
            .then((res) => {
              setStatus({ success: true })
              toast.success('A new device activation schedule has been added')
              navigate('/device/activation-schedule')
            })
            .catch((err) => {
              console.log('Failed to create a new device activation schedule: ', err)
              toast.error('Failed to create a new device activation schedule')
              setStatus({ success: false })
            })
            .finally(() => {
              setSubmitting(false)
            })
        }
        if (onCloseEdit) onCloseEdit()
      } catch (err: any) {
        console.error('Unkown error in saving device: ', err)
        toast.error('Failed to save device activation schedule')
        setStatus({ success: false })
        setSubmitting(false)
      }
    },
  })

  const isChanged = useMemo(() => {
    const values = formik.values

    if (values.name !== initValue.name) return true
    if (values.project[0]?.value !== initValue.project[0]?.value) return true
    if (values.location[0]?.value !== initValue.location[0]?.value) return true
    if (values.building[0]?.value !== initValue.building[0]?.value) return true
    if (values.level[0]?.value !== initValue.level[0]?.value) return true
    if (values.area[0]?.value !== initValue.area[0]?.value) return true
    if (values.unit[0]?.value !== initValue.unit[0]?.value) return true
    if (values.frequency?.value !== initValue.frequency?.value) return true
    if (values.timeStart !== initValue.timeStart) return true
    if (values.repeatOn?.length !== initValue.repeatOn?.length) return true
    if (
      values.repeatOn.sort((a, b) => (a < b ? 1 : -1)).join('') !==
      initValue.repeatOn.sort((a, b) => (a < b ? 1 : -1)).join('')
    )
      return true
  }, [initValue, formik.values])

  const handleChangeFrequency = (freq: ISelectItem) => {
    formik.setFieldValue('frequency', freq)
  }

  const handleChangeScheduleName = (name: string) => {
    formik.setFieldValue('name', name)
  }

  const handleChangeProject = (projects: ISelectItem[]) => {
    formik.setFieldValue('project', projects)
    formik.setFieldValue('location', [])
    formik.setFieldValue('building', [])
    formik.setFieldValue('level', [])
    formik.setFieldValue('area', [])
    formik.setFieldValue('unit', [])
  }

  const handleChangeLocation = (locations: ISelectItem[]) => {
    formik.setFieldValue('location', locations)
    formik.setFieldValue('building', [])
    formik.setFieldValue('level', [])
    formik.setFieldValue('area', [])
    formik.setFieldValue('unit', [])
  }

  const handleChangeBuilding = (buildings: ISelectItem[]) => {
    formik.setFieldValue('building', buildings)
    formik.setFieldValue('level', [])
    formik.setFieldValue('area', [])
    formik.setFieldValue('unit', [])
  }

  const handleChangeLevel = (levels: ISelectItem[]) => {
    formik.setFieldValue('level', levels)
    formik.setFieldValue('area', [])
    formik.setFieldValue('unit', [])
  }

  const handleChangeArea = (areas: ISelectItem[]) => {
    formik.setFieldValue('area', areas)
    formik.setFieldValue('unit', [])
  }

  const handleChangeUnit = (units: ISelectItem[]) => {
    formik.setFieldValue('unit', units)
  }

  const handleDiscard = () => {
    formik.setValues({ ...initFormikValue })
  }

  const handleAddSchedule = () => {
    formik.handleSubmit()
  }

  const handleChangeRemark = (remark: string) => {
    formik.setFieldValue('remark', remark)
  }

  const handleChangeRepeatOn = (repeatOn: string[]) => {
    formik.setFieldValue('repeatOn', repeatOn)
  }

  const handleChangeTimeStart = (timeStart: Dayjs | null) => {
    formik.setFieldValue('timeStart', timeStart ? timeStart.toISOString() : null)
  }

  const handleChangeDeviceType = (deviceType: ISelectItem[]) => {
    formik.setFieldValue('deviceType', deviceType)
    formik.setFieldValue('device', [])
  }

  const handleChangeDevice = (device: ISelectItemWithCategory[]) => {
    formik.setFieldValue('device', device)
  }

  const handleChangeStatus = (status: string) => {
    formik.setFieldValue('status', status)
  }

  useEffect(() => {
    if (deviceSchedule && deviceSchedule.id) {
      // const initValue: IDeviceScheduleCreate = { ...initFormikValue }

      const unit = deviceSchedule.unit
      const area = deviceSchedule.area
      const level = deviceSchedule.level
      const building = deviceSchedule.building
      const location = deviceSchedule.location
      const project = deviceSchedule.project
      const status = deviceSchedule.status
      const timeStart = deviceSchedule.timeStart
      const devices = deviceSchedule.devices
      const frequency = DEVICE_SCHEDULE_FREQUENCYS?.find((device) => device.value === deviceSchedule.frequencyType)
      const deviceType = deviceSchedule.deviceType
      const repeatOn = deviceSchedule.repeatOn

      initValue.name = deviceSchedule.scheduleName || ''
      initValue.remark = deviceSchedule.remark || ''
      initValue.timeStart = timeStart ? timeStart : null
      initValue.frequency = frequency as ISelectItem
      initValue.repeatOn = repeatOn ? repeatOn.toLowerCase().split(',') : []
      initValue.status = status || (DEVICE_SCHEDULE_STATUS_LIST[0].value as string)
      initValue.project = project ? [{ label: project.name, value: project.id }] : []
      initValue.location = location ? [{ label: location.name, value: location.id }] : []
      initValue.building = building ? [{ label: building.name, value: building.id }] : []
      initValue.level = level ? [{ label: level.name, value: level.id }] : []
      initValue.area = area ? [{ label: area.name, value: area.id }] : []
      initValue.unit = unit ? [{ label: unit.name, value: unit.id }] : []
      initValue.device = devices?.map((device) => ({ label: device.identificationNo, value: device.id }))
      initValue.deviceType = [{label: deviceType.deviceType, value: deviceType.id, category: deviceType.deviceCategory.deviceCategory}]

      // formik.setValues({ ...initValue })
      // setInitValue(deepCopy(initValue))
    }
  }, [deviceSchedule])

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
              {isEdit ? 'Device Schedule Info' : 'Add New Device Schedule'}
            </Typography>
            {isEdit && (
              <LoadingButton
                variant='contained'
                color='primary'
                disabled={!isChanged || !formik.isValid}
                onClick={() => handleAddSchedule()}
                loading={updateLoading}
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
                  Schedule Name
                  <RequiredItem />
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <TextFieldWithLabel
                  label={''}
                  name={'name'}
                  placeholder={'Schedule Name'}
                  showLabel={false}
                  value={formik.values.name}
                  onChange={(e) => handleChangeScheduleName(e.target.value)}
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
                  textColor={theme.palette.grey[800]}
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
                  projectIds={
                    formik.values.project?.[0]?.value
                      ? [formik.values.project?.[0]?.value as number]
                      : []
                  }
                  textColor={theme.palette.grey[800]}
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
                textColor={theme.palette.grey[800]}
                projectIds={
                  formik.values.project?.[0]?.value
                    ? [formik.values.project?.[0]?.value as number]
                    : []
                }
                locationIds={
                  formik.values.location?.[0]?.value
                    ? [formik.values.location?.[0]?.value as number]
                    : []
                }
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
                textColor={theme.palette.grey[800]}
                projectIds={
                  formik.values.project?.[0]?.value
                    ? [formik.values.project?.[0]?.value as number]
                    : []
                }
                locationIds={
                  formik.values.location?.[0]?.value
                    ? [formik.values.location?.[0]?.value as number]
                    : []
                }
                buildingIds={
                  formik.values.building?.[0]?.value
                    ? [formik.values.building?.[0]?.value as number]
                    : []
                }
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
                textColor={theme.palette.grey[800]}
                projectIds={
                  formik.values.project?.[0]?.value
                    ? [formik.values.project?.[0]?.value as number]
                    : []
                }
                locationIds={
                  formik.values.location?.[0]?.value
                    ? [formik.values.location?.[0]?.value as number]
                    : []
                }
                buildingIds={
                  formik.values.building?.[0]?.value
                    ? [formik.values.building?.[0]?.value as number]
                    : []
                }
                levelIds={
                  formik.values.level?.[0]?.value
                    ? [formik.values.level?.[0]?.value as number]
                    : []
                }
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
                textColor={theme.palette.grey[800]}
                projectIds={
                  formik.values.project?.[0]?.value
                    ? [formik.values.project?.[0]?.value as number]
                    : []
                }
                locationIds={
                  formik.values.location?.[0]?.value
                    ? [formik.values.location?.[0]?.value as number]
                    : []
                }
                buildingIds={
                  formik.values.building?.[0]?.value
                    ? [formik.values.building?.[0]?.value as number]
                    : []
                }
                levelIds={
                  formik.values.level?.[0]?.value
                    ? [formik.values.level?.[0]?.value as number]
                    : []
                }
                areaIds={
                  formik.values.area?.[0]?.value
                    ? [formik.values.area?.[0]?.value as number]
                    : []
                }
              />
            </Grid>
          </Grid>
        </Box>
        <Divider light sx={{ borderColor: 'grey.100' }} />
        <Box sx={{ px: 3.75, pt: 3.5, pb: 3.75 }}>
          <Grid container spacing={3} direction={'column'}>
            <Grid item container spacing={2}>
              <Grid item lg={4} xs={12}>
                <Typography
                  typography={'h4'}
                  sx={{ fontWeight: 500, display: 'inline-flex', color: 'grey.800', mt: 1.25 }}
                >
                  Frequency
                  <RequiredItem />
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <DeviceScheduleFrequencySelect
                  hiddenLabel={true}
                  selected={formik.values.frequency}
                  onChange={handleChangeFrequency}
                  showErrorMessage={!!formik.errors.frequency}
                  error={!!formik.errors.frequency}
                  errorMessage={formik.errors.frequency as string}
                  textColor='grey.800'
                />
              </Grid>
            </Grid>
            {formik.values.frequency?.value === 'weekly' && (
              <Grid item container spacing={2}>
                <Grid item lg={4} xs={12}>
                  <Typography
                    variant='h4'
                    sx={{ fontWeight: 500, display: 'inline-flex', color: 'grey.800', mt: 1.25 }}
                  >
                    Repeat On
                    <RequiredItem />
                  </Typography>
                </Grid>
                <Grid item lg={8} xs={12}>
                  <DaySelect
                    selected={formik.values.repeatOn}
                    onChange={handleChangeRepeatOn}
                    error={!!formik.errors.repeatOn}
                    errorMessage={formik.errors.repeatOn as string}
                  />
                </Grid>
              </Grid>
            )}
            <Grid item container spacing={2}>
              <Grid item lg={4} xs={12}>
                <Typography
                  variant='h4'
                  sx={{
                    fontWeight: 500,
                    color: 'grey.800',
                    mt: 1.25,
                    display: 'inline-flex',
                  }}
                >
                  Start Date & Time
                  <RequiredItem />
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <SelectDate
                  value={formik.values.timeStart ? dayjs(formik.values.timeStart) : null}
                  onAccept={handleChangeTimeStart}
                  placeholder='Start Date & Time'
                  hiddenArrowIcon={true}
                  hasTime={true}
                  showErrorMessage={!!formik.errors.timeStart}
                  error={!!formik.errors.timeStart}
                  errorMessage={formik.errors.timeStart}
                  textColor={'grey.800'}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Divider light sx={{ borderColor: 'grey.100' }} />
        <Box sx={{ px: 3.75, pt: 4, pb: 3.25 }}>
          <Grid container direction={'column'} spacing={2.5}>
            <Grid item container spacing={2}>
              <Grid item lg={4} xs={12}>
                <Typography
                  variant='h4'
                  sx={{
                    fontWeight: 500,
                    color: 'grey.800',
                    mt: 1.25,
                    display: 'inline-flex',
                  }}
                >
                  Device Type
                  <RequiredItem />
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <DeviceTypeSelect
                  hiddenLabel={true}
                  selected={formik.values.deviceType}
                  onChange={(e) => handleChangeDeviceType(e)}
                  isSingleSelect={true}
                  disableAllSelect={true}
                  error={!!formik.errors?.deviceType}
                  helperText={formik.errors?.deviceType as string}
                  textColor={'grey.800'}
                  placeholder={'Select Device Type'}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item lg={4} xs={12}>
                <Typography
                  variant='h4'
                  sx={{
                    fontWeight: 500,
                    color: 'grey.800',
                    mt: 1.25,
                    display: 'inline-flex',
                  }}
                >
                  Device List
                  <RequiredItem />
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <DeviceSelect
                  hiddenLabel={true}
                  selected={formik.values.device as ISelectItemWithCategory[]}
                  onChange={(e) => handleChangeDevice(e as ISelectItemWithCategory[])}
                  isSingleSelect={false}
                  disableAllSelect={false}
                  allowRemoval={true}
                  error={!!formik.errors?.device}
                  helperText={formik.errors?.device as string}
                  textColor='grey.800'
                  deviceTypeIds={
                    formik.values.deviceType?.[0]?.value
                      ? [formik.values.deviceType?.[0]?.value as number]
                      : []
                  }
                />
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item lg={4} xs={12}>
                <Typography
                  variant='h4'
                  sx={{
                    fontWeight: 500,
                    color: 'grey.800',
                    mt: 1.25,
                    display: 'inline-flex',
                  }}
                >
                  Status
                  <RequiredItem />
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <FormControl>
                  <RadioGroup
                    aria-labelledby='device-schedule-status'
                    name='status'
                    value={formik.values.status}
                    onChange={(e) => handleChangeStatus(e.target.value)}
                    sx={{ display: 'flex', flexDirection: 'row', gap: 6 }}
                  >
                    {DEVICE_SCHEDULE_STATUS_LIST.map((e, idx) => {
                      return (
                        <FormControlLabel
                          key={`device-schedule-status-item-${idx}`}
                          value={e.value as string}
                          control={<Radio />}
                          label={
                            <Typography
                              variant='h5'
                              sx={{
                                fontWeight: 500,
                                color: 'grey.800',
                                display: 'inline-flex',
                                mt: 0.65,
                              }}
                            >
                              {e.label}
                            </Typography>
                          }
                        />
                      )
                    })}
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item container spacing={2} sx={{ mt: 0 }}>
              <Grid item lg={4} xs={12}>
                <Typography
                  typography={'h4'}
                  sx={{ fontWeight: 500, display: 'inline-flex', color: 'grey.800' }}
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
              <Button
                variant='text'
                color='inherit'
                onClick={handleDiscard}
                sx={{ color: (theme) => theme.palette.grey[400], fontWeight: 500 }}
              >
                Cancel
              </Button>
              <LoadingButton
                variant='contained'
                size='large'
                color='primary'
                disabled={!formik.isValid}
                onClick={() => handleAddSchedule()}
                loading={createLoading}
              >
                Add Schedule
              </LoadingButton>
            </Box>
          </>
        )}
      </Card>
    </Box>
  )
}

export default DeviceScheduleCreateEdit
