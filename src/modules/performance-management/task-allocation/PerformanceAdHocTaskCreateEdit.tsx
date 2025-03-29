import { FC, useMemo } from 'react'
import { Box, Card, Divider, Grid, Typography, useTheme } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import PremiseCategorySelect from './PremiseCategorySelect'
import TaskActivitySelect from './TaskActivitySelect'
import ResponseTimeSelect from './ResponseTimeSelect'
import { RequiredItem } from '../../audit/audit-schedule/AuditScheduleDetail'
import ProjectSelect from '../../audit/project-sites/ProjectSelect'
import LocationSelect from '../../location/LocationSelect'
import { ISelectItem, IMedia } from '../../../types/common'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router'
import StaffSelect from './StaffSelect'
import BuildingSelect from '../../location/BuildingSelect'
import LevelSelect from '../../location/LevelSelect'
import AreaSelect from '../../location/AreaSelect'
import UnitSelect from '../../location/UnitSelect'
import TextareaWithLabel from '../../common/TextareaWithLabel'
import TimePickerWithText from '../../common/TimePickerWithText'
import SelectDate from '../../common/SelectDate'
import dayjs, { Dayjs } from 'dayjs'
import { MediaDropzoneWithView } from '../../common/MediaDropzoneWithView'
import { EIncidentMediaType } from '../../../helpers/constants'
import Api from '../../../api'
import { IGetOneTask } from '../../../types/task'

interface IAdHocTaskCreate {
  project: ISelectItem[]
  location: ISelectItem[]
  building: ISelectItem[]
  level: ISelectItem[]
  area: ISelectItem[]
  unit: ISelectItem[]
  remark: string
  startDate: string
  timeStart: string | Dayjs
  users: ISelectItem[]
  medias: IMedia[]
  premiseCategory: ISelectItem[]
  taskActivity: ISelectItem[]
  responseTime: ISelectItem | null
  timeEnd: string | Dayjs
}

const initFormikValue: IAdHocTaskCreate = {
  project: [],
  location: [],
  building: [],
  level: [],
  area: [],
  unit: [],
  remark: '',
  startDate: new Date().toISOString(),
  timeStart: '',
  timeEnd: '',
  users: [],
  medias: [],
  premiseCategory: [],
  taskActivity: [],
  responseTime: null,
}

interface IProps {
  data?: IGetOneTask
}

const PerformanceSopTrainingCreateEdit: FC<IProps> = ({data}) => {
  const theme = useTheme()
  const navigate = useNavigate()

  const { id } = useParams()

  const isEdit = !!id

  const [createTask, { isLoading: isCreateingTask }] = Api.useCreateTaskMutation()
  const [updateTask, { isLoading: isUpdatingTask }] = Api.useUpdateTaskMutation()
  const [uploadFile] = Api.useUploadFileMutation()

  function checkURLType(url: any) {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp']
    const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.webm']
    const fileExtension = url.split('.').pop().toLowerCase()

    if (imageExtensions.includes(`.${fileExtension}`)) {
      return 'image'
    } else if (videoExtensions.includes(`.${fileExtension}`)) {
      return 'video'
    } else {
      return 'other'
    }
  }

  const getFileObj = (urls: any) => {
    // convert the array of file urls to an object
    const tempImagesObj = urls.map((u: any) => {
      return { url: u, type: checkURLType(u) }
    })
    return tempImagesObj
  }

  const formik = useFormik<IAdHocTaskCreate>({
    enableReinitialize: true,
    initialValues: {
      project:
        isEdit && data?.project
          ? [{ label: data?.project?.name, value: data?.project?.id }]
          : ([] as ISelectItem[]),
      location:
        isEdit && data?.location
          ? [{ label: data?.location?.name, value: data?.location?.id }]
          : ([] as ISelectItem[]),
      building:
        isEdit && data?.building
          ? [{ label: data?.building?.name, value: data?.building?.id }]
          : ([] as ISelectItem[]),
      level:
        isEdit && data?.level
          ? [{ label: data?.level?.name, value: data?.level?.id }]
          : ([] as ISelectItem[]),
      area:
        isEdit && data?.area
          ? [{ label: data?.area?.name, value: data?.area?.id }]
          : ([] as ISelectItem[]),
      unit:
        isEdit && data?.unit
          ? [{ label: data?.unit?.name, value: data?.unit?.id }]
          : ([] as ISelectItem[]),
      remark: isEdit && data?.remark ? data?.remark : '',
      startDate: isEdit && data?.startDate ? data?.startDate : initFormikValue.startDate,
      timeStart: isEdit && data?.startTime ? dayjs(data?.startTime, 'HH:mm') : '',
      timeEnd: isEdit && data?.alertTime ? dayjs(data?.alertTime, 'HH:mm') : '',
      users:
        isEdit && data?.taskStaffs
          ? data?.taskStaffs.map((staff) => ({ label: staff.staffName, value: staff.id }))
          : [],
      medias: isEdit && data?.uploads ? getFileObj(data?.uploads) : [],
      premiseCategory:
        isEdit && data?.premiseCategory
          ? [{ label: data?.premiseCategory?.name, value: data?.premiseCategory?.id }]
          : ([] as ISelectItem[]),
      taskActivity:
        isEdit && data?.taskActivity[0]?.name
          ? [{ label: data?.taskActivity[0]?.name, value: data?.taskActivity[0]?.id }]
          : ([] as ISelectItem[]),
      responseTime: isEdit
        ? { value: data?.taskTypes as string, label: data?.taskTypes as string }
        : null,
    },
    validationSchema: Yup.object().shape({
      project: Yup.array().min(1, 'Project is required').required('Project is required'),
      location: Yup.array().required('Location is required'),
      startDate: Yup.string().nullable().required('Date is required'),
      users: Yup.array()
        .required('Assign To is required')
        .test('assign-to-users', 'Assign To is required', function (value) {
          return value && value.length !== 0
        }),
      premiseCategory: Yup.array().required('Frequency is required'),
      taskActivity: Yup.array().required('Task Activity is required'),
      responseTime: Yup.object().required('Response Time is required'),
      timeStart: Yup.string().nullable().required('Start time is required'),
    }),
    onSubmit: async (values, { setStatus, setSubmitting, setFieldValue }) => {
      try {
        setSubmitting(true)
        const medias = []
        for (const media of values.medias) {
          if (media.file) {
            const res = await uploadFile(media.file).unwrap()
            const fileUrl = res?.fileUrl || ''
            medias.push(fileUrl)
          } else {
            medias.push(media.url)
          }
        }
        if (!isEdit) {
          createTask({
            remark: values.remark,
            locationId: values.location[0]?.value as number,
            activityIds: values.taskActivity[0]?.value as number,
            projectId: values.project[0]?.value as number,
            buildingId: values.building[0]?.value as number,
            levelId: values.level[0]?.value as number,
            areaId: values.area[0]?.value as number,
            unitId: values.unit[0]?.value as number,
            premiseCategoryId: values.premiseCategory[0]?.value as number,
            name: '',
            staffIds: values.users.map((u) => u.value) as number[],
            taskTypes: (values?.responseTime?.value || '') as string,
            uploads: medias,
            frequency: 'string',
            assignArea: 'string',
            startDate: values.startDate,
            startTime: dayjs(values.timeStart).format('hh:mm'),
            endTime: dayjs(values.timeEnd).format('hh:mm'),
            taskDays: '1 Day',
            date: values.startDate,
          }).then((res: any) => {
            if (res.error) {
              toast.error(res.error.data.message)
              setSubmitting(false)
            } else {
              toast.success('Ad-Hoc task has been created successfully')
              setSubmitting(false)
              setTimeout(() => {
                navigate(`/performance-management/task-allocation/ad-hoc-task`)
              }, 1000)
            }
          })
        } else {
          updateTask({
            taskId: id,
            remark: values.remark,
            locationId: values.location[0]?.value as number,
            activityIds: values.taskActivity[0]?.value as number,
            projectId: values.project[0]?.value as number,
            buildingId: values.building[0]?.value as number,
            levelId: values.level[0]?.value as number,
            areaId: values.area[0]?.value as number,
            unitId: values.unit[0]?.value as number,
            premiseCategoryId: values?.premiseCategory[0]?.value as number,
            name: '',
            staffIds: values.users.map((u) => u.value || u.id) as number[],
            taskTypes: (values?.responseTime?.value || '') as string,
            uploads: medias,
            frequency: 'string',
            assignArea: 'string',
            startDate: values.startDate,
            startTime: dayjs(values.timeStart).format('hh:mm'),
            endTime: dayjs(values.timeEnd).format('hh:mm'),
            taskDays: '1 Day',
            date: values.startDate,
          }).then((res: any) => {
            if (res.error) {
              toast.error(res.error.data.message)
              setSubmitting(false)
            } else {
              toast.success('Ad-Hoc task has been updated successfully')
              setSubmitting(false)
              setTimeout(() => {
                navigate(`/performance-management/task-allocation/ad-hoc-task/${id}`)
              }, 1000)
            }
          })
        }
      } catch (err: any) {
        toast.error('Failed to submit')
        setStatus({ success: false })
        setSubmitting(false)
      }
    },
  })

  const projectIds = useMemo(() => {
    return formik.values.project.map((p) => p.value as number)
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

  const handleChangeProject = (project: ISelectItem[]) => {
    formik.setFieldValue('project', project)
  }

  const handleChangeLocation = (location: ISelectItem[]) => {
    formik.setFieldValue('location', location)
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

  const handleChangeRemark = (remark: string) => {
    formik.setFieldValue('remark', remark)
  }

  const handleChangeDateStart = (startDate: Dayjs | null) => {
    formik.setFieldValue('startDate', startDate ? startDate.toISOString() : null)
  }

  const handleChangeTimeStart = (timeStart: Dayjs | null) => {
    formik.setFieldValue('timeStart', timeStart ? timeStart : null)
  }

  const handleChangeTimeEnd = (timeEnd: Dayjs | null) => {
    formik.setFieldValue('timeEnd', timeEnd ? timeEnd : null)
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

  const handleChangeCategory = (frequency: ISelectItem[]) => {
    formik.setFieldValue('premiseCategory', frequency)
  }

  const handleChangeActivity = (frequency: ISelectItem[]) => {
    formik.setFieldValue('taskActivity', frequency)
  }

  const handleChangeResponseTime = (frequency: ISelectItem) => {
    formik.setFieldValue('responseTime', frequency)
  }

  const handleDiscard = async () => {
    await formik.setValues({ ...initFormikValue })
  }

  const handleAddTask = () => {
    formik.handleSubmit()
  }

  return (
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
          <Typography variant='h3'>{isEdit ? 'Group Info' : 'Add New Ad-Hoc Task'}</Typography>
          {isEdit && (
            <LoadingButton
              variant='contained'
              color='primary'
              loading={isUpdatingTask}
              disabled={!formik.dirty || formik.isSubmitting}
              onClick={() => handleAddTask()}
            >
              Save Changes
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
                Premise Category
                <RequiredItem />
              </Typography>
            </Grid>
            <Grid item lg={8} xs={12}>
              <PremiseCategorySelect
                hiddenLabel={true}
                selected={formik.values.premiseCategory as ISelectItem[]}
                onChange={handleChangeCategory}
                isSingleSelect={true}
                disableAllSelect={true}
                error={!!formik.errors.premiseCategory}
                helperText={formik.errors.premiseCategory as string}
                projectIds={projectIds}
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
                Task Activity
                <RequiredItem />
              </Typography>
            </Grid>
            <Grid item lg={4} xs={12}>
              <TaskActivitySelect
                hiddenLabel={true}
                selected={formik.values.taskActivity as ISelectItem[]}
                onChange={handleChangeActivity}
                isSingleSelect={true}
                disableAllSelect={true}
                error={!!formik.errors.premiseCategory}
                helperText={formik.errors.premiseCategory as string}
                projectIds={projectIds}
                textColor={'grey.800'}
                query='Adhock'
              />
            </Grid>
            <Grid item lg={4} xs={12}>
              <ResponseTimeSelect
                hiddenLabel={true}
                selected={formik.values.responseTime as ISelectItem}
                onChange={handleChangeResponseTime}
                showErrorMessage
                // error={!!errors.feedbackType && !!touched.feedbackType}
                // errorMessage={errors.feedbackType as string}
                textColor={theme.palette.grey[800]}
              />
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
      </Box>
      <Box sx={{ px: 3.75, pt: 2, pb: 5 }}>
        <Grid container spacing={1.5}>
          <Grid item lg={4} xs={12}>
            <Typography
              typography={'h4'}
              sx={{ fontWeight: 500, display: 'inline-flex', color: 'grey.800' }}
            >
              Start Date
            </Typography>
            <RequiredItem />
            <SelectDate
              value={formik.values.startDate ? dayjs(formik.values.startDate) : null}
              onAccept={handleChangeDateStart}
              placeholder='Start Date'
              hiddenArrowIcon={true}
              // hasTime={true}
              showErrorMessage={!!formik.errors.startDate}
              error={!!formik.errors.startDate}
              errorMessage={formik.errors.startDate}
              textColor={'grey.800'}
            />
          </Grid>
          <Grid item lg={4} xs={12}>
            <Typography
              typography={'h4'}
              sx={{ fontWeight: 500, display: 'inline-flex', color: 'grey.800' }}
            >
              Start Time
              <RequiredItem />
            </Typography>
            <TimePickerWithText
              required={true}
              hiddenLabel
              label='Start Time'
              date={formik.values.timeStart}
              onChange={handleChangeTimeStart}
              placeholder='Start Time'
            />
          </Grid>
          <Grid item lg={4} xs={12}>
            <Typography
              typography={'h4'}
              sx={{ fontWeight: 500, display: 'inline-flex', color: 'grey.800', mb: .5 }}
            >
              End Time
            </Typography>
            <TimePickerWithText
              required={true}
              hiddenLabel
              label='End Time'
              date={formik.values.timeEnd}
              onChange={handleChangeTimeEnd}
              placeholder='End Time'
            />
          </Grid>
        </Grid>
      </Box>
      <Divider light sx={{ borderColor: 'grey.100' }} />
      <Box sx={{ px: 3.75, pt: 4, pb: 3.25 }}>
        <Grid item container spacing={2}>
          <Grid item lg={4} xs={12}>
            <Typography
              typography={'h4'}
              sx={{ fontWeight: 500, mt: 1.25, display: 'inline-flex' }}
            >
              Staff Assigned
              <RequiredItem />
            </Typography>
          </Grid>
          <Grid item lg={8} xs={12}>
            <StaffSelect
              hiddenLabel={true}
              selected={(formik.values.users as any) || []}
              onChange={handleChangeUsers}
              allowAllSelect={false}
              showErrorMessage={true}
              // error={!!formik.errors.users && formik.touched.users}
              // errorMessage={formik.errors.users}
              textColor={theme.palette.grey[800]}
            />
          </Grid>
        </Grid>
      </Box>
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
      <Box sx={{ px: 3.75, pt: 4, pb: 3.25 }}>
        <Grid item container spacing={2}>
          <Grid item lg={4} xs={12}>
            <Typography
              typography={'h4'}
              sx={{ fontWeight: 500, mt: 1.25, display: 'inline-flex' }}
            >
              Photos(s) or Video(s)
            </Typography>
            <Typography variant='subtitle2'>
              Insert SOP for cleaning works <br />
              <br />
              Supported format: jpg, jpeg, png, mp4. <br />
              Max file is 5 MB.
            </Typography>
          </Grid>
          <Grid item lg={8} xs={12}>
            <MediaDropzoneWithView
              medias={formik.values.medias}
              onDrop={handleAddMedia}
              onChange={handleChangeMedias}
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
              onClick={handleDiscard}
              sx={{ color: (theme) => 'grey.400', fontWeight: 500 }}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              variant='contained'
              color='primary'
              sx={{ ml: 3, py: 1 }}
              loading={isCreateingTask}
              disabled={!formik.isValid}
              onClick={() => handleAddTask()}
            >
              Add Task
            </LoadingButton>
          </Box>
        </>
      )}
    </Card>
  )
}

export default PerformanceSopTrainingCreateEdit
