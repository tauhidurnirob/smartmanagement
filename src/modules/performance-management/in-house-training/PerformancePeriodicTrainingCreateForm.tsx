import { FC, useMemo } from 'react'
import { Box, Card, Divider, Grid, Typography, Stack, useTheme } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { LoadingButton } from '@mui/lab'
import DatePickerWithText from '../../common/DatePickerWithText'
import { MediaDropzoneWithView } from '../../common/MediaDropzoneWithView'
import { ISelectItem, IMedia } from '../../../types/common'
import { EIncidentMediaType } from '../../../helpers/constants'
import { RequiredItem } from '../../audit/audit-schedule/AuditScheduleDetail'
import ProjectSelect from '../../audit/project-sites/ProjectSelect'
import LocationSelect from '../../location/LocationSelect'
import BuildingSelect from '../../location/BuildingSelect'
import LevelSelect from '../../location/LevelSelect'
import AreaSelect from '../../location/AreaSelect'
import UnitSelect from '../../location/UnitSelect'
import TextareaWithLabel from '../../common/TextareaWithLabel'
import dayjs, { Dayjs } from 'dayjs'
import PremiseCategorySelect from '../task-allocation/PremiseCategorySelect'
import TaskActivitySelect from '../task-allocation/TaskActivitySelect'
import TaskFrequencySelect from '../task-allocation/TaskFrequencySelect'
import TimePickerWithText from '../../common/TimePickerWithText'
import ManDaySelect from '../task-allocation/ManDaySelect'
import UserSelect from '../../user/UserSelect'
import Api from '../../../api'
import { ETaskType, IGetOneTask, ITask, PostCreateTask } from '../../../types/task'
import { DATE_FORMAT_FOR_DB, TIME_FORMAT_FOR_DB } from '../../../constants/common'
import TextFieldWithLabel from '../../common/TextFieldWithLabel'

interface IPeriodicTaskCreate {
  name: string
  premiseCategory: ISelectItem[]
  taskActivity: ISelectItem[]
  frequency: ISelectItem[]
  project: ISelectItem[]
  location: ISelectItem[]
  building: ISelectItem[]
  level: ISelectItem[]
  area: ISelectItem[]
  unit: ISelectItem[]
  startDate: Dayjs | null
  startTime: Dayjs | null
  manDays: ISelectItem[]
  staffAssigned: ISelectItem[]
  remark: string
  medias: IMedia[]
}

const getInitialFormikValue = (task: IGetOneTask | undefined) => {
  const initFormikValue: IPeriodicTaskCreate = {
    name: '',
    premiseCategory: [],
    taskActivity: [],
    frequency: [],
    project: [],
    location: [],
    building: [],
    level: [],
    area: [],
    unit: [],
    startDate: null,
    startTime: null,
    manDays: [],
    staffAssigned: [],
    remark: '',
    medias: [],
  }
  if(task) {
    initFormikValue.name = task.name
    initFormikValue.remark = task.remark || ''
    if (task.premiseCategory)
      initFormikValue.premiseCategory = [
        { label: task.premiseCategory.name, value: task.premiseCategory.id },
      ]
    if (task.project)
      initFormikValue.project = [{ label: task.project.name, value: task.project.id }]
    if (task.location)
      initFormikValue.location = [{ label: task.location.name, value: task.location.id }]
    if (task.building)
      initFormikValue.building = [{ label: task.building.name, value: task.building.id }]
    if (task.level) initFormikValue.level = [{ label: task.level.name, value: task.level.id }]
    if (task.area) initFormikValue.area = [{ label: task.area.name, value: task.area.id }]
    if (task.unit) initFormikValue.unit = [{ label: task.unit.name, value: task.unit.id }]
    if (task.frequency)
      initFormikValue.frequency = [{ label: task.frequency, value: task.frequency }]
    if (task.taskDays) initFormikValue.manDays = [{ label: task.taskDays, value: task.taskDays }]
    if (task.startDate) initFormikValue.startDate = dayjs(task.startDate)
    if (task.startTime) initFormikValue.startTime = dayjs(task.startTime, TIME_FORMAT_FOR_DB)
    initFormikValue.taskActivity = task.taskActivity.map((ta) => ({
      label: ta.name,
      value: ta.id,
    }))
    initFormikValue.staffAssigned = task.taskStaffs.map((staff) => ({
      label: staff.staffName,
      value: staff.id,
    }))
    initFormikValue.medias = task.uploads.map((u) => ({ type: 'image', url: u }))
  }
  return initFormikValue
}

interface IProps {
  task?: IGetOneTask
}

const PerformancePeriodictaskTrainingCreateForm: FC<IProps> = ({ task }) => {
  const isEdit = !!task && task.id

  const navigate = useNavigate()
  const theme = useTheme()
  const [createTask, { isLoading: isCreating }] = Api.useCreateTaskMutation()
  const [updateTask, { isLoading: isUpdating }] = Api.useUpdateTaskFormByIdMutation()
  const [uploadFile] = Api.useUploadFileMutation()

  const formik = useFormik<IPeriodicTaskCreate>({
    enableReinitialize: true,
    initialValues: getInitialFormikValue(task),
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Task Name is required'),
      project: Yup.array().min(1, 'Project is required').required('Project is required'),
      location: Yup.array().min(1, 'Location is required').required('Location is required'),
      premiseCategory: Yup.array()
        .min(1, 'Premise Category is required')
        .required('Premise Category is required'),
      taskActivity: Yup.array()
        .min(1, 'Task Activity is required')
        .required('Task Activity is required'),
      frequency: Yup.array().min(1, 'Frequency is required').required('Frequency is required'),
      staffAssigned: Yup.array()
        .min(1, 'Staff Assigned is required')
        .required('Staff Assigned is required'),
    }),
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      console.log(values)
      try {
        const images: string[] = await Promise.all(
          values.medias.map(async (media) => {
            if (media.file) {
              const res = await uploadFile(media.file).unwrap()
              return res?.fileUrl || ''
            } else {
              return media.url
            }
          })
        )

        const taskCreateInfo: PostCreateTask = {
          name: values.name,
          activityIds: values.taskActivity[0]?.value as number,
          areaId: values.area[0]?.value as number,
          buildingId: values.building[0]?.value as number,
          levelId: values.level[0]?.value as number,
          unitId: values.unit[0]?.value as number,
          projectId: values.project[0]?.value as number,
          locationId: values.location[0]?.value as number,
          startDate: values.startDate
            ? dayjs(values.startDate).format(DATE_FORMAT_FOR_DB)
            : undefined,
          startTime: values.startTime
            ? dayjs(values.startTime).format(TIME_FORMAT_FOR_DB)
            : undefined,
          frequency: values.frequency[0]?.value as string,
          staffIds: values.staffAssigned.map((s) => s.value as number),
          premiseCategoryId: values.premiseCategory[0].value as number,
          remark: values.remark,
          taskDays: values.manDays?.[0]?.value as string,
          uploads: images,
          taskTypes: ETaskType.periodic,
        }

        if (isEdit && task) {
          updateTask({ id: task.id, body: taskCreateInfo })
            .unwrap()
            .then(() => {
              toast.success('Updated the Periodic Task')
            })
            .catch((err) => {
              console.log('Failed to update the Periodic Task: ', err)
              toast.error('Failed to update the Periodic Task')
            })
            .finally(() => {
              setSubmitting(false)
            })
        } else {
          createTask(taskCreateInfo)
            .unwrap()
            .then(() => {
              toast.success('Created a new Periodic Task')
              navigate('/performance-management/task-allocation/periodic-task')
            })
            .catch((err) => {
              console.log('Failed to create a Periodic Task: ', err)
              toast.error('Failed to create a Periodic Task')
            })
            .finally(() => {
              setSubmitting(false)
            })
        }
      } catch (err: any) {
        console.error('Unkown error in updating Periodic task: ', err)
        toast.error('Failed to create a Periodic Task')
        setStatus({ success: false })
        setSubmitting(false)
      }
    },
  })

  const projectIds = useMemo(() => {
    return formik.values.project.map((p) => Number(p.value))
  }, [formik.values.project])

  const handleChangeMedias = (medias: IMedia[]) => {
    formik.setFieldValue('medias', medias)
  }

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

  const handleChangePremiseCategory = async (premiseCategory: ISelectItem[]) => {
    await formik.setFieldValue('premiseCategory', premiseCategory)
  }

  const handleChangeTaskActivity = async (taskActivity: ISelectItem[]) => {
    await formik.setFieldValue('taskActivity', taskActivity)
  }

  const handleChangeFrequency = async (frequency: ISelectItem[]) => {
    await formik.setFieldValue('frequency', frequency)
  }

  const handleChangeMandays = async (manDays: ISelectItem[]) => {
    await formik.setFieldValue('manDays', manDays)
  }

  const handleChangeStartDate = async (date: Dayjs | null) => {
    await formik.setFieldValue('startDate', date)
  }

  const handleChangeStartTime = async (date: Dayjs | null) => {
    await formik.setFieldValue('startTime', date)
  }

  const handleChangeStaff = async (staffAssigned: ISelectItem[]) => {
    await formik.setFieldValue('staffAssigned', staffAssigned)
  }

  const handleChangeProject = async (projects: ISelectItem[]) => {
    await formik.setFieldValue('project', projects)
    await formik.setFieldValue('location', [])
    await formik.setFieldValue('building', [])
    await formik.setFieldValue('level', [])
    await formik.setFieldValue('area', [])
    await formik.setFieldValue('unit', [])
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
    formik.setFieldValue('unit', units)
  }

  const handleDiscard = async () => {
    await formik.setValues(getInitialFormikValue(undefined))
  }

  const handleSubmit = () => {
    formik.handleSubmit()
  }

  const handleChangeRemark = (remark: string) => {
    formik.setFieldValue('remark', remark)
  }

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
            <Typography variant='h3'>{isEdit ? 'Periodic Info' : 'Periodic Task'}</Typography>
            {isEdit && (
              <LoadingButton
                variant='contained'
                color='primary'
                loading={isUpdating}
                disabled={!formik.isValid || !formik.dirty}
                onClick={() => handleSubmit()}
              >
                Save
              </LoadingButton>
            )}
          </Box>
        </Box>
        <Divider light sx={{ borderColor: 'grey.100' }} />
        <Box sx={{ px: 3.75, pt: 3, pb: 1.5 }}>
          <Grid container direction={'column'} spacing={2}>
            <Grid item container spacing={2}>
              <Grid item lg={4} xs={12}>
                <Typography
                  typography={'h4'}
                  sx={{ fontWeight: 500, mt: 1.25, display: 'inline-flex' }}
                >
                  Task Name
                  <RequiredItem />
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <TextFieldWithLabel
                  showLabel={false}
                  name='name'
                  placeholder='Task Name'
                  value={formik.values.name}
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
                  typography={'h5'}
                  sx={{ fontSize: 15, fontWeight: 500, display: 'inline-flex', mb: 1.5 }}
                >
                  Premise Category
                </Typography>
              </Grid>

              <Grid item lg={8} xs={12}>
                <PremiseCategorySelect
                  hiddenLabel={true}
                  selected={formik.values.premiseCategory as ISelectItem[]}
                  onChange={handleChangePremiseCategory}
                  isSingleSelect={true}
                  disableAllSelect={true}
                  error={!!formik.errors.premiseCategory}
                  helperText={formik.errors.premiseCategory as string}
                  textColor={theme.palette.grey[800]}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ px: 3.75, pt: 1.5, pb: 3 }}>
          <Grid container direction={'column'} spacing={2.75}>
            <Grid item container spacing={2}>
              <Grid item lg={4} xs={12}>
                <Typography
                  typography={'h5'}
                  sx={{ fontSize: 15, fontWeight: 500, display: 'inline-flex', mb: 1.5 }}
                >
                  Task Activity
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <Grid item lg={12} xs={12} container direction={'row'} spacing={2.75}>
                  <Grid item lg={6} xs={12}>
                    <TaskActivitySelect
                      hiddenLabel={true}
                      selected={formik.values.taskActivity as ISelectItem[]}
                      onChange={handleChangeTaskActivity}
                      isSingleSelect={true}
                      disableAllSelect={true}
                      error={!!formik.errors.taskActivity}
                      helperText={formik.errors.taskActivity as string}
                      textColor={theme.palette.grey[800]}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <TaskFrequencySelect
                      hiddenLabel={true}
                      selected={formik.values.frequency as ISelectItem[]}
                      onChange={handleChangeFrequency}
                      isSingleSelect={true}
                      disableAllSelect={true}
                      error={!!formik.errors.frequency}
                      helperText={formik.errors.frequency as string}
                      textColor={theme.palette.grey[800]}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Divider light sx={{ borderColor: 'grey.100' }} />
        <Box sx={{ px: 3.75, pt: 3, pb: 3 }}>
          <Grid container direction={'column'} spacing={2.75}>
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

        <Box sx={{ px: 3.75, pt: 2, pb: 2 }}>
          <Grid container spacing={1.5}>
            <Grid item lg={3} xs={12}>
              <Typography
                typography={'h4'}
                sx={{ fontWeight: 500, display: 'inline-flex', color: 'grey.800', mb: .5 }}
              >
                Building
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
                sx={{ fontWeight: 500, display: 'inline-flex', color: 'grey.800', mb: .5 }}
              >
                Level
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
                sx={{ fontWeight: 500, display: 'inline-flex', color: 'grey.800', mb: .5 }}
              >
                Area
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
                sx={{ fontWeight: 500, display: 'inline-flex', color: 'grey.800', mb: .5 }}
              >
                Unit
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
          <Grid item container xs={12} columnSpacing={5} rowSpacing={2} mt={2}>
            <Grid item lg={4} xs={12}>
              <Box>
                <Typography
                  typography={'h4'}
                  sx={{ fontWeight: 500, display: 'inline-flex', color: 'grey.800', mb: .5 }}
                >
                  Start Date
                </Typography>
                <DatePickerWithText
                  date={formik.values.startDate}
                  onChange={handleChangeStartDate}
                  label={''}
                  placeholder='Start Date'
                  sxBtn={{ minWidth: { xs: '100%' } }}
                />
              </Box>
            </Grid>

            <Grid item lg={4} xs={12}>
              <Box>
                <Typography
                  typography={'h4'}
                  sx={{ fontWeight: 500, display: 'inline-flex', color: 'grey.800', mb: .5 }}
                >
                  Start Time
                </Typography>
                <TimePickerWithText
                  required={true}
                  hiddenLabel
                  label='Start Time'
                  date={formik.values.startTime}
                  onChange={handleChangeStartTime}
                  placeholder='Start Time'
                  showErrorMessage={!!formik.errors.startTime}
                  error={!!formik.errors.startTime}
                  errorMessage={formik.errors.startTime}
                />
              </Box>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Box>
                <Typography
                  typography={'h4'}
                  sx={{ fontWeight: 500, display: 'inline-flex', color: 'grey.800', mb: .5 }}
                >
                  Estimated Man Days Required
                </Typography>
                <ManDaySelect
                  hiddenLabel={true}
                  selected={formik.values.manDays as ISelectItem[]}
                  onChange={handleChangeMandays}
                  isSingleSelect={true}
                  disableAllSelect={true}
                  error={!!formik.errors.manDays}
                  helperText={formik.errors.manDays as string}
                  textColor={theme.palette.grey[800]}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        {/* <Divider light sx={{ borderColor: 'grey.100' }} /> */}

        <Divider light sx={{ borderColor: 'grey.100' }} />
        <Box sx={{ px: 3.75, pt: 4, pb: 3.25 }}>
          <Grid item container spacing={2} pt={2.5}>
            <Grid item lg={4} xs={12}>
              <Typography
                typography={'h4'}
                sx={{ fontWeight: 500, mt: 1.25, display: 'inline-flex' }}
              >
                Staff Assigned
              </Typography>
            </Grid>
            <Grid item lg={8} xs={12}>
              <UserSelect
                hiddenLabel={true}
                selected={formik.values.staffAssigned as ISelectItem[]}
                onChange={handleChangeStaff}
                textColor={'grey.800'}
                showErrorMessage={true}
                error={!!formik.errors.staffAssigned}
                errorMessage={
                  formik.errors.staffAssigned ? (formik.errors.staffAssigned as string) : ''
                }
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2} pt={2.5}>
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
          <Grid item container spacing={2} pt={2.5}>
            <Grid item lg={4} xs={12}>
              <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
                Photo(s) or Video(s)
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
                sx={{ color: () => 'grey.400', fontWeight: 500 }}
              >
                Cancel
              </LoadingButton>
              <LoadingButton
                variant='contained'
                size='large'
                color='primary'
                loading={isCreating || isUpdating}
                disabled={!formik.isValid}
                onClick={() => handleSubmit()}
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

export default PerformancePeriodictaskTrainingCreateForm
