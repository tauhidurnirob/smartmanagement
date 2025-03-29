import { FC, useEffect, useMemo } from 'react'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { To, useNavigate } from 'react-router-dom'
import { LoadingButton } from '@mui/lab'
import dayjs, { Dayjs } from 'dayjs'

import {
  Box,
  Button,
  Card,
  Typography,
  Grid,
  Divider,
  Collapse,
  useTheme
} from '@mui/material'
import { ISelectItem } from '../../../types/common'
import { RequiredItem } from '../../audit/audit-schedule/AuditScheduleDetail'
import ProjectSelect from '../../audit/project-sites/ProjectSelect'
import { IIncidentListFilters } from '../../../types/incident'
import LocationSelect from "../../location/LocationSelect"
import AreaSelect from '../../location/AreaSelect'
import TextareaWithLabel from '../../common/TextareaWithLabel'
import { Plus } from '../../../assets/icons/plus'
import deepCopy from '../../../helpers/deepCopy'
import StyledAlert from '../../common/StyledAlert'
import { ITaskRoutine } from '../../../types/performance-management'
import TaskActivitySelect from '../task-allocation/TaskActivitySelect'
import TimePickerWithText from '../../common/TimePickerWithText'
import StaffSelect from '../task-allocation/StaffSelect'
import FrequencyDaySelect from '../in-house-training/FrequencyDaySelect'
import { PostCreateTaskRoutine } from '../../../types/task'
import Api from '../../../api'
import { DATE_FORMAT_ONLY_TIME, DATE_FORMAT_ONLY_TIME_WITHOUT_AM } from '../../../constants/common'

interface IActivity {
  activity: ISelectItem[],
  area: ISelectItem[],
  startTime: string | null | Dayjs,
  endTime: string | null | Dayjs,
  frequency: ISelectItem[],
  remark: string
}
interface IRoutineTaskCreate {
  project: ISelectItem[]
  location: ISelectItem[]
  subLocationAssigned: string
  staff: ISelectItem[]
  remark: string,
  activities: IActivity[]
}


interface IActivitiesTouched {
  activity: boolean
  area: boolean
  startTime: boolean
  endTime: boolean
  frequency: boolean
  remark: boolean
}
interface IRoutineTouched {
  subLocationAssigned: boolean
  remark: boolean
  activities?: IActivitiesTouched[]
}

const initActivities: IActivity = {
  activity: [],
  area: [],
  startTime: '',
  endTime: '',
  frequency: [],
  remark: ''
}
const initValue = {
  project: [],
  location: [],
  subLocationAssigned: '',
  staff: [],
  remark: '',
  activities: []
}

interface IProps {
  task?: ITaskRoutine
}

const RoutineTaskCreate: FC<IProps> = ({ task }) => {
  const isEdit = !!task && task.id
  const theme = useTheme()
  const navigate = useNavigate()

  const [createTask, {isLoading}] = Api.useCreateTaskRoutineMutation()

  const formik = useFormik<IRoutineTaskCreate>({
    enableReinitialize: true,
    initialValues: { ...initValue },
    validationSchema: Yup.object().shape({
      project: Yup.array().min(1, 'Project is required').required('Project is required'),
      location: Yup.array().min(1, 'Location is required').required('Location is required'),
      subLocationAssigned: Yup.string(),
      staff: Yup.array().min(1, 'Staff is required'),
      remark: Yup.string(),
      activities: Yup.array(
        Yup.object().shape({
          activity: Yup.array().min(1, 'Activity is required').required('Activity is required'),
          area: Yup.array().min(1, 'Area is required').required('Area is required'),
          startTime: Yup.string().nullable().required('Start time is required'),
          endTime: Yup.string().nullable().required('End time is required'),
          frequency: Yup.array().min(1, 'Frequency is required').required('Frequency is required'),
          remark: Yup.string()
        })
      ).min(1, 'Activities are required'),
    }),
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        setSubmitting(true)
        const data: PostCreateTaskRoutine = {
          projectId: values.project?.[0].value as number,
          locationId: values.location?.[0].value as number,
          subLocationAssigned: values.subLocationAssigned,
          remark: values.remark,
          staffIds: values.staff.map((item) => (item.value as number)),
          taskActivities: values.activities?.map((item) => ({
            taskActivityId: item.activity?.[0].value as number,
            areaId: item.area?.[0].value as number,
            startTime: dayjs(item.startTime).format(DATE_FORMAT_ONLY_TIME_WITHOUT_AM),
            endTime: dayjs(item.endTime).format(DATE_FORMAT_ONLY_TIME_WITHOUT_AM),
            frequency: item.frequency.map((item) => (item.value as string)),
            remarks: item.remark
          }))
        }

        if (isEdit) {
          if (!task) {
            setSubmitting(false)
            return
          }
        } else {
          createTask(data)
          .then((res: any) => {
            if (res.error) {
              toast.error(res.error.data.message)
              setSubmitting(false)
            } else {
              toast.success('New routine task has been added successfully')
              setSubmitting(false)
              setTimeout(() => {
                navigate(`/performance-management/task-allocation/routine-task`)
              }, 1000)
            }
          })
        }
      } catch (err: any) {
        console.error('Unkown error in creating task: ', err)
        toast.error('Failed to create task')
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

  const isChanged = useMemo(() => {
    const values = formik.values

    // if (values.name !== initValue.name) return true

    // if (values.project[0]?.value !== initValue.project[0]?.value) return true
    // if (values.location[0]?.value !== initValue.location[0]?.value) return true
    // if (values.building[0]?.value !== initValue.building[0]?.value) return true
    // if (values.level[0]?.value !== initValue.level[0]?.value) return true
    // if (values.area[0]?.value !== initValue.area[0]?.value) return true
    // if (values.unit[0]?.value !== initValue.unit[0]?.value) return true

    // for (let idx = 0; idx < formik.values.items.length; idx++) {
    //   if (formik.values.items[idx]?.type[0]?.value !== initValue.items[idx]?.type[0]?.value) {
    //     return true
    //   }

    //   const oldDeviceIds = (initValue.items[idx]?.devices || []).map((d) => d.value as number)
    //   const curDeviceIds = formik.values.items[idx].devices.map((d) => d.value as number)

    //   const strOldDeviceIds = oldDeviceIds.sort((a, b) => (a < b ? 1 : -1)).join(',')
    //   const strCurDeviceIds = curDeviceIds.sort((a, b) => (a < b ? 1 : -1)).join(',')

    //   if (strOldDeviceIds !== strCurDeviceIds) return true
    // }

    return false
  }, [initValue, formik.values])



  const clearAllActivities = async () => {
    const newActivityLists = deepCopy(formik.values.activities)
    for (let idx = 0; idx < newActivityLists.length; idx++) {
      newActivityLists[idx].activity = []
      newActivityLists[idx].area = []
    }
    formik.setFieldValue('activities', deepCopy(newActivityLists))
  }

  const handleChangeProject = async (projects: ISelectItem[]) => {
    await formik.setFieldValue('project', projects)
    await formik.setFieldValue('location', [])
    await clearAllActivities()
  }

  const handleChangeLocation = async (locations: ISelectItem[]) => {
    await formik.setFieldValue('location', locations)
    await clearAllActivities()
  }
  const handleChangeStaff = async (staffs: ISelectItem[]) => {
    await formik.setFieldValue('staff', staffs)
  }

  const handleChangeArea = async (idx: number, areas: ISelectItem[]) => {
    const newActivityLists = deepCopy(formik.values.activities)
    newActivityLists[idx].area = areas
    formik.setFieldValue('activities', deepCopy(newActivityLists))
  }
  const handleChangeActivity = async (idx: number, act: ISelectItem[]) => {
    const newActivityLists = deepCopy(formik.values.activities)
    newActivityLists[idx].activity = act
    formik.setFieldValue('activities', deepCopy(newActivityLists))
  }
  const handleChangeTimeStart = (idx: number, timeStart: Dayjs | null) => {
    const newActivityLists = deepCopy(formik.values.activities)
    newActivityLists[idx].startTime = timeStart || null
    formik.setFieldValue('activities', deepCopy(newActivityLists))
  }
  const handleChangeTimeEnd = (idx: number, timeEnd: Dayjs | null) => {
    const newActivityLists = deepCopy(formik.values.activities)
    newActivityLists[idx].endTime = timeEnd || null
    formik.setFieldValue('activities', deepCopy(newActivityLists))
  }
  const handleChangeFrequency = (idx: number, freq: ISelectItem[]) => {
    const newActivityLists = deepCopy(formik.values.activities)
    newActivityLists[idx].frequency = freq
    formik.setFieldValue('activities', deepCopy(newActivityLists))
  }
  const handleChangeRemark = (idx: number, remark: string) => {
    const newActivityLists = deepCopy(formik.values.activities)
    newActivityLists[idx].remark = remark
    formik.setFieldValue('activities', deepCopy(newActivityLists))
  }

  const handleDiscard = async () => {
    await formik.setValues({ ...initValue })
  }
  console.log(formik)

  const handleAddroutine = () => {
    formik.handleSubmit()
  }

  const handleAddNewActivity = () => {
    const newDeviceLists = deepCopy(formik.values.activities)
    newDeviceLists.push({ ...initActivities })
    formik.setFieldValue('activities', deepCopy(newDeviceLists))
  }

  // useEffect(() => {
  //   if (deviceGroup && deviceGroup.id) {
  //     const initValue: IDeviceGroupCreate = { ...initFormikValue }
  //     const unit = deviceGroup.unit
  //     const area = deviceGroup.area
  //     const level = deviceGroup.level
  //     const building = deviceGroup.building
  //     const location = deviceGroup.location
  //     const project = deviceGroup.project
  //     const deviceGroupMaps = deviceGroup.deviceGroupMaps || []
  //     const initItems = []
  //     for (const item of deviceGroupMaps) {
  //       const { deviceType, deviceGroupDetails } = item
  //       const typeInfo = deviceType
  //         ? [
  //           {
  //             label: deviceType.deviceType || '',
  //             value: deviceType.id,
  //             item: deviceType,
  //           },
  //         ]
  //         : []
  //       const initDevices = (deviceGroupDetails || []).map((d) => ({
  //         label: d.device?.identificationNo || '-',
  //         value: d.deviceId,
  //       }))
  //       initItems.push({
  //         type: typeInfo,
  //         devices: initDevices,
  //       })
  //     }
  //     initValue.name = deviceGroup.groupName || ''
  //     initValue.remark = deviceGroup.remark || ''
  //     initValue.project = project ? [{ label: project.name, value: project.id }] : []
  //     initValue.location = location ? [{ label: location.name, value: location.id }] : []
  //     initValue.building = building ? [{ label: building.name, value: building.id }] : []
  //     initValue.level = level ? [{ label: level.name, value: level.id }] : []
  //     initValue.area = area ? [{ label: area.name, value: area.id }] : []
  //     initValue.unit = unit ? [{ label: unit.name, value: unit.id }] : []
  //     initValue.items = deepCopy(initItems)
  //     formik.setValues({ ...initValue })
  //     setInitValue(deepCopy(initValue))
  //   }
  // }, [deviceGroup])

  return (
    <Box>
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
            <Typography variant='h3'>{isEdit ? 'Routine Info' : 'Routine Task'}</Typography>
            {isEdit && (
              <LoadingButton
                variant='contained'
                color='primary'
                loading={false}
                disabled={!formik.isValid || !isChanged}
                onClick={() => handleAddroutine()}
              >
                Save
              </LoadingButton>
            )}
          </Box>
        </Box>
        <Divider light sx={{ borderColor: 'grey.100' }} />
        <Box sx={{ px: 3.75, pt: 3, pb: 3 }}>
          <Grid item container spacing={2}>
            <Grid item lg={4} xs={12}>
              <Typography typography={'h4'} sx={{ fontWeight: 500, display: 'inline-flex' }}>
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
        </Box>
        <Box sx={{ px: 3.75, pt: 2, pb: 5 }}>
          <Grid container spacing={1.5}>

            <Grid item lg={4} xs={12}>
              <Typography typography={'h4'} sx={{ fontWeight: 500, display: 'inline-flex' }}>
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
            <Grid item lg={4} xs={12}>
              <Typography
                typography={'h4'}
                sx={{ fontWeight: 500, mt: 1.25, display: 'inline-flex' }}
              >
                Sub Location Assigned
              </Typography>
            </Grid>
            <Grid item lg={8} xs={12}>
              <TextareaWithLabel
                label={''}
                name={'sublocation'}
                placeholder={'Sub-location'}
                rows={4}
                hiddenLabel={true}
                onChange={(e) => formik.setFieldValue('sublocation', e.target.value)}
              />
            </Grid>
          </Grid>

        </Box>
        <Divider light sx={{ borderColor: 'grey.100' }} />
        <Box sx={{ px: 3.75, pt: 3.75, pb: 5.5 }}>
        <Grid item container spacing={2}>
            <Grid item lg={4} xs={12}>
              <Typography typography={'h4'} sx={{ fontWeight: 500, display: 'inline-flex' }}>
                Staff Assigned
                <RequiredItem />
              </Typography>
            </Grid>
            <Grid item lg={8} xs={12}>
              <StaffSelect
                hiddenLabel={true}
                selected={(formik.values.staff) || []}
                onChange={handleChangeStaff}
                allowAllSelect={false}
                showErrorMessage={true}
                error={!!formik.errors.staff && !!formik.touched.staff}
                errorMessage={formik.errors?.staff as string}
                textColor={theme.palette.grey[800]}
              />
            </Grid>
        </Grid>
          <Grid
          item
          container
          xs={12}
          columnSpacing={5}
          rowSpacing={0}
          >
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
              helperText={formik.errors.remark}
              />
            </Grid>
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
              Task Activity
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
              onClick={() => handleAddNewActivity()}
            >
              <Plus sx={{ fontSize: '16px' }} />
            </Button>
          </Box>
          <Grid container direction={'column'} rowSpacing={2} sx={{ mt: 2 }}>
            {formik.values.activities.map((item, idx) => {
              const { activity, area, startTime, endTime, frequency, remark: remarks } = item
              const errors = formik.errors.activities?.[idx] as any
              return (
                <Box
                  key={`group-item-${idx}`}
                  sx={{ borderTop: theme => `1px solid ${theme.palette.divider}`, pt: 3, mb: 3 }}
                >
                  <Grid
                  item
                  container
                  xs={12}
                  columnSpacing={5}
                  rowSpacing={2}
                  >
                  <Grid item lg={6} xs={12}>
                    <Typography
                      typography={'h4'}
                      sx={{ fontWeight: 500, display: 'inline-flex', color: 'grey.800', mb: .5 }}
                    >
                      Task Activity
                      <RequiredItem />
                    </Typography>
                    <TaskActivitySelect
                      hiddenLabel={true}
                      selected={activity}
                      onChange={(val) => handleChangeActivity(idx, val)}
                      isSingleSelect={true}
                      disableAllSelect={true}
                      error={!!errors?.activity}
                      helperText={errors?.activity as string}
                      projectIds={projectIds}
                      textColor={'grey.800'}
                      query={'Routine'}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Typography
                      typography={'h4'}
                      sx={{ fontWeight: 500, display: 'inline-flex', color: 'grey.800', mb: .5 }}
                    >
                      Area
                      <RequiredItem />
                    </Typography>
                    <AreaSelect
                      hiddenLabel={true}
                      selected={area as ISelectItem[]}
                      onChange={(val) => handleChangeArea(idx, val)}
                      isSingleSelect={true}
                      disableAllSelect={true}
                      helperText={errors?.area as string}
                      textColor={'grey.800'}
                      projectIds={projectIds}
                      locationIds={locationIds}
                    />
                  </Grid>
                  </Grid>

                <Grid
                  item
                  container
                  xs={12}
                  columnSpacing={5}
                  rowSpacing={2}
                  mt={1}
                >
                  <Grid item lg={4} xs={12}>
                    <Box>
                      <Typography
                        typography={'h4'}
                        sx={{ fontWeight: 500, display: 'inline-flex', color: 'grey.800', mb: .5 }}
                      >
                        Start Time
                        <RequiredItem />
                      </Typography>
                      <TimePickerWithText
                        required={false}
                        hiddenLabel
                        label='Start Time'
                        date={startTime}
                        onChange={(val) => handleChangeTimeStart(idx, val)}
                        placeholder='Start Time'
                        {...(endTime ? {maxTime: dayjs(endTime) as any} : {})}
                      />
                    </Box>
                  </Grid>

                  <Grid item lg={4} xs={12}>
                    <Box>
                      <Typography
                        typography={'h4'}
                        sx={{ fontWeight: 500, display: 'inline-flex', color: 'grey.800', mb: .5 }}
                      >
                        End Time
                        <RequiredItem />
                      </Typography>
                      <TimePickerWithText
                        required={false}
                        hiddenLabel
                        label='End Time'
                        date={endTime}
                        onChange={(val) => handleChangeTimeEnd(idx, val)}
                        placeholder='End Time'
                        {...(startTime ? {minTime: dayjs(startTime) as any} : {})}
                      />
                    </Box>
                  </Grid>
                    <Grid item lg={4} xs={12}>
                      <Typography
                        typography={'h4'}
                        sx={{ fontWeight: 500, display: 'inline-flex', color: 'grey.800', mb: .5 }}
                      >
                        Frequency
                        <RequiredItem />
                      </Typography>
                      <FrequencyDaySelect
                        hiddenLabel={true}
                        selected={frequency}
                        onChange={(val)=> handleChangeFrequency(idx, val)}
                        isSingleSelect={false}
                        disableAllSelect={true}
                        error={!!errors?.frequency}
                        helperText={errors?.frequency as string}
                        textColor={theme.palette.grey[800]}
                        placeholder={'Select Frequency'}
                      />
                    </Grid>
                  </Grid>
                  <Grid item lg={12} xs={12} mt={1.5}>
                    <Grid item lg={4} xs={12}>
                      <Typography
                        typography={'h4'}
                        sx={{ fontWeight: 500, display: 'inline-flex', color: 'grey.800', mb: .5 }}
                      >
                        Remark
                      </Typography>
                    </Grid>
                    <Grid item lg={12} xs={12}>
                      <TextareaWithLabel
                        label={''}
                        name={`remark${idx}`}
                        placeholder={'Remark'}
                        rows={4}
                        hiddenLabel={true}
                        value={remarks}
                        onChange={(e) => handleChangeRemark(idx, e.target.value)}
                        error={!!formik.errors.remark && formik.touched.remark}
                        helperText={formik.errors.remark}
                      />
                    </Grid>
                  </Grid>
                </Box>
              )
            })}
          </Grid>
          <Collapse in={!!formik.errors.activities && formik.values.activities.length === 0}>
            <StyledAlert severity='error' variant='outlined' sx={{ mt: '5px' }}>
              Activity List is required
            </StyledAlert>
          </Collapse>
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
                loading={false}
                onClick={handleDiscard}
                sx={{ color: (theme) => 'grey.400', fontWeight: 500 }}
              >
                Cancel
              </LoadingButton>
              <LoadingButton
                variant='contained'
                size='large'
                color='primary'
                loading={isLoading}
                disabled={!formik.isValid}
                onClick={() => handleAddroutine()}
              >
                Add Task
              </LoadingButton>
            </Box>
          </>
        )}
      </Card>
    </Box>
  )
}

export default RoutineTaskCreate
