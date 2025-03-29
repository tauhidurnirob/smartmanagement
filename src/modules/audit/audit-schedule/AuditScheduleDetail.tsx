import { FC, useState, useEffect } from 'react'
import { Box, Card, Divider, Typography, Button, Grid, useTheme } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { LoadingButton } from '@mui/lab'

import TextareaWithLabel from '../../common/TextareaWithLabel'
import FrequencySelect from './FrequencySelect'
import { ISelectItem } from '../../../types/common'
import { AUDIT_SCHEDULE_FREQUENCYS,ROLE_PERMISSION_KEYS } from '../../../helpers/constants'
import UserSelect from '../../user/UserSelect'
import SelectDate from '../../common/SelectDate'
import DaySelect from './DaySelect'
import { IAuditSchedule } from '../../../types/audit'
import Api from '../../../api'
import TextFieldWithLabel from '../../common/TextFieldWithLabel'
import BackDrop from '../../common/BackDrop'
import { titleCase } from '../../../helpers/customFunctions'
import DeleteDialog from '../../common/DeleteDialog'
import ProjectSelect from '../project-sites/ProjectSelect'
import LocationSelect from '../../location/LocationSelect'
import { DATE_FORMAT } from '../../../constants/common'
import useAuth from '../../../hooks/useAuth'

export const RequiredItem = ({ ...rest }) => {
  return (
    <Typography
      variant='subtitle1'
      variantMapping={{ subtitle1: 'span' }}
      sx={{ color: (theme) => theme.palette.error.main }}
      {...rest}
    >
      *
    </Typography>
  )
}

interface IProps {
  schedule?: IAuditSchedule
}

const AuditScheduleDetail: FC<IProps> = ({ schedule }) => {
  const isEdit = !!schedule

  const [deleteOn, setDeleteOn] = useState(false)

  const navigate = useNavigate()

  const { data, isLoading } = Api.useGetAuditScheduleByIdQuery(Number(schedule?.id), {
    skip: !isEdit,
  })

  const theme = useTheme()

  const [createAuditSchedule, { isLoading: isLoadingCreate }] = Api.useCreateAuditScheduleMutation()
  const [updateAuditSchedule] = Api.useUpdateAuditScheduleMutation()
  const [deleteSchedule, { isLoading: isLoadingDelete }] = Api.useDeleteAuditScheduleByIdMutation()
  const { user } = useAuth(); // Accessing getRoutesInfo function from useAuth hook

  useEffect(() => {
    
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.audit.schedule.deleteTasksForCleaner)) {
      setIsDeletable(true);
    }else{
      setIsDeletable(false);
    }
   
  }, []);
  const [isDeletable, setIsDeletable] = useState(true);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: isEdit ? data?.name || '' : '',
      notificationDescription: isEdit ? data?.notificationDescription || '' : '',
      frequencyType: isEdit
        ? { label: titleCase(data?.frequencyType as string), value: data?.frequencyType }
        : null,
      repeatOn: isEdit && data?.repeatOn ? data?.repeatOn?.split(',') : [],
      timeStart: isEdit && data?.timeStart ? dayjs(data?.timeStart) : undefined,
      users: isEdit ? data?.users?.map((item) => ({ label: item.fullName, value: item.id })) : [],
      project:
        isEdit && data?.project
          ? [{ label: data?.project?.name, value: data?.project?.id }]
          : ([] as ISelectItem[]),
      location:
        isEdit && data?.location
          ? [{ label: data?.location?.name, value: data?.location?.id }]
          : ([] as ISelectItem[]),
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().max(255).required('Schedule name is required'),
      notificationDescription: Yup.string().required('Notification description is required'),
      frequencyType: Yup.object().required('Frequency is required'),
      repeatOn: Yup.array().when('frequencyType', (frequencyType, schema) => {
        if (frequencyType[0]?.value === 'weekly')
          return schema.min(1).required('Repeat On is required')
        return schema
      }),
      timeStart: Yup.date().required('Time is required'),
      users: Yup.array()
        .required('Assign To is required')
        .test('assign-to-users', 'Assign To is required', function (value) {
          return value && value.length !== 0
        }),
      project: Yup.array().length(1, 'Project is required').required('Project is required'),
      location: Yup.array().length(1, 'Location is required').required('Location is required'),
    }),
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        const repOn = (values.repeatOn as any)?.join(',')
        const userIds = values.users?.map((user: any) => user.value)
        if (isEdit) {
          updateAuditSchedule({
            id: schedule.id,
            payload: {
              name: values.name,
              notificationDescription: values.notificationDescription,
              frequencyType: values.frequencyType?.value as string,
              repeatOn: repOn,
              timeStart: values.timeStart as any,
              userIds: userIds,
              projectId: values.project[0].value as number,
              locationId: values.location[0].value as number,
            },
          })
            .unwrap()
            .then((res) => {
              setStatus({ success: true })
              toast.success('Changes saved')
            })
            .catch((err) => {
              console.log('Failed to update a new schedule: ', err)
              setStatus({ success: false })
            })
            .finally(() => {
              setSubmitting(false)
            })
        } else {
          createAuditSchedule({
            name: values.name,
            notificationDescription: values.notificationDescription,
            frequencyType: values.frequencyType?.value as string,
            repeatOn: repOn,
            timeStart: values.timeStart as any,
            userIds: userIds,
            projectId: values.project[0].value as number,
            locationId: values.location[0].value as number,
          })
            .unwrap()
            .then((res) => {
              setStatus({ success: true })
              toast.success('A new schedule has been added')
              navigate('/audit/schedule')
            })
            .catch((err) => {
              console.log('Failed to create a new schedule: ', err)
              setStatus({ success: false })
            })
            .finally(() => {
              setSubmitting(false)
            })
        }
      } catch (err: any) {
        console.error('Unkown error in schedule: ', err)
        setStatus({ success: false })
        setSubmitting(false)
      }
    },
  })

  const handleChangeFrequency = (frequency: ISelectItem) => {
    formik.setFieldValue('frequencyType', frequency)
  }

  const handleChangeUsers = (users: ISelectItem[]) => {
    formik.setFieldValue('users', users)
  }

  const handleChangeDate = (date: Dayjs | null) => {
    formik.setFieldValue('timeStart', date)
  }

  const handleChangeRepeatOn = (days: string[]) => {
    formik.setFieldValue('repeatOn', days)
  }

  const handleChangeProject = (projects: ISelectItem[]) => {
    formik.setFieldValue('project', projects)
    formik.setFieldValue('location', [])
  }

  const handleChangeLocation = (locations: ISelectItem[]) => {
    formik.setFieldValue('location', locations)
  }
  return (
    <Box position='relative'>
      {isLoading && <BackDrop />}
      {isEdit && (
        <Card sx={{ mt: 4.5 }}>
          <Box sx={{ p: 4.25, justifyContent: 'space-between', display: 'flex' }}>
            <Box>
              <Typography variant='h2' sx={{ fontSize: 19 }}>
                {formik.values.name}
              </Typography>
              <Typography
                variant='subtitle1'
                sx={{
                  fontSize: 14,
                  display: 'inline-flex',
                  mt: 2,
                  color: (theme) => theme.palette.grey[500],
                  span: {
                    fontSize: 14,
                    ml: 3,
                    color: (theme) => theme.palette.text.primary,
                  },
                }}
              >
                Created On: <span>{dayjs(data?.createAt).format(DATE_FORMAT)}</span>
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button variant='contained' color='error' sx={{}} onClick={() => setDeleteOn(true)}>
                Delete Schedule
              </Button>
            </Box>
          </Box>
        </Card>
      )}
      <Card sx={{ mt: isEdit ? 2.75 : 4.5 }}>
        <Box sx={{ pt: 5, px: 4, pb: 2.5 }}>
          {isEdit ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant='h3'>Schedule Info</Typography>
              <Button
                variant='contained'
                color='primary'
                onClick={() => formik.handleSubmit()}
                disabled={!formik.dirty || formik.isSubmitting}
              >
                Save Changes
              </Button>
            </Box>
          ) : (
            <Typography variant='h3'>Add New Schedule</Typography>
          )}
        </Box>
        <Divider light />
        <>
          <Box sx={{ pt: 2.75, px: 3.75, pb: 4.5 }}>
            <Grid container spacing={2} alignItems={'flex-start'}>
              <Grid item lg={4} xs={12}>
                <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
                  Schedule Name
                  <RequiredItem />
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <TextFieldWithLabel
                  showLabel={false}
                  placeholder='Schedule Name'
                  {...formik.getFieldProps('name')}
                  height='40px'
                  error={!!formik.errors.name && !!formik.touched.name}
                  helperText={formik.errors.name as string}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 0.5 }}>
              <Grid item lg={4} xs={12}>
                <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
                  Notification Description
                  <RequiredItem />
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <TextareaWithLabel
                  placeholder='Write a Notification Description'
                  rows={4}
                  showLabel={false}
                  {...formik.getFieldProps('notificationDescription')}
                  error={
                    !!formik.errors.notificationDescription &&
                    !!formik.touched.notificationDescription
                  }
                  helperText={formik.errors.notificationDescription as string}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems={'flex-start'} sx={{ mt: 0.5 }}>
              <Grid item lg={4} xs={12}>
                <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
                  Frequency
                  <RequiredItem />
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <FrequencySelect
                  hiddenLabel={true}
                  selected={formik.values.frequencyType as ISelectItem}
                  onChange={handleChangeFrequency}
                  textColor={theme.palette.grey[800]}
                  options={AUDIT_SCHEDULE_FREQUENCYS.filter((f) => !!f.value)}
                  error={!!formik.errors.frequencyType && !!formik.touched.frequencyType}
                  helperText={formik.errors.frequencyType as string}
                />
              </Grid>
            </Grid>
            {formik.values.frequencyType?.value === 'weekly' && (
              <Grid container spacing={2} alignItems={'center'} sx={{ mt: 1 }}>
                <Grid item lg={4} xs={12}>
                  <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
                    Repeat On
                    <RequiredItem />
                  </Typography>
                </Grid>
                <Grid item lg={8} xs={12}>
                  <DaySelect
                    selected={formik.values.repeatOn as any}
                    onChange={handleChangeRepeatOn}
                    error={!!formik.errors.repeatOn}
                    errorMessage={formik.errors.repeatOn as string}
                  />
                </Grid>
              </Grid>
            )}
            <Grid container spacing={2} sx={{ mt: 1 }} alignItems={'flex-start'}>
              <Grid item lg={4} xs={12}>
                <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
                  Start Date & Time
                  <RequiredItem />
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <SelectDate
                  value={formik.values.timeStart as any}
                  onAccept={handleChangeDate}
                  placeholder='Start Date & Time'
                  hiddenArrowIcon={true}
                  hasTime={true}
                  showErrorMessage={true}
                  error={!!formik.errors.timeStart && formik.touched.timeStart}
                  errorMessage={formik.errors.timeStart}
                  textColor={theme.palette.grey[800]}
                />
              </Grid>
            </Grid>
          </Box>
          <Divider light />
          <Box sx={{ pt: 3.5, px: 3.75, pb: 4.5 }}>
            <Grid container spacing={2} alignItems={'flex-start'}>
              <Grid item lg={4} xs={12}>
                <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
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
                  error={!!formik.errors.project && !!formik.touched.project}
                  helperText={formik.errors.project as string}
                  textColor={theme.palette.grey[800]}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item lg={4} xs={12}>
                <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
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
                  error={!!formik.errors.location && !!formik.touched.location}
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
          </Box>
          <Divider light />
          <Box sx={{ pt: 3.5, px: 3.75, pb: 4.5 }}>
            <Grid container spacing={2} alignItems={'flex-start'}>
              <Grid item lg={4} xs={12}>
                <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
                  Assign to
                  <RequiredItem />
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <UserSelect
                  hiddenLabel={true}
                  selected={(formik.values.users as any) || []}
                  onChange={handleChangeUsers}
                  allowAllSelect={false}
                  showErrorMessage={true}
                  error={!!formik.errors.users && formik.touched.users}
                  errorMessage={formik.errors.users}
                  textColor={theme.palette.grey[800]}
                />
              </Grid>
            </Grid>
          </Box>
        </>
        {!isEdit && (
          <>
            <Divider light />
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 4, pt: 2.5, pb: 3.5 }}>
                <Button
                  variant='text'
                  sx={{ color: (theme) => theme.palette.grey[400] }}
                  onClick={() => {
                    formik.resetForm()
                    navigate(-1)
                  }}
                >
                  Cancel
                </Button>
                <LoadingButton
                  variant='contained'
                  color='primary'
                  sx={{ ml: 3 }}
                  onClick={() => formik.handleSubmit()}
                  disabled={!formik.isValid || formik.isSubmitting}
                  loading={isLoadingCreate}
                >
                  Add Schedule
                </LoadingButton>
              </Box>
            </Box>
          </>
        )}
      </Card>
      <DeleteDialog
        open={deleteOn}
        onClose={() => setDeleteOn(false)}
        heading={'Are you sure you want to delete this schedule?'}
        subHeading={''}
        onDelete={() => {
          if(isDeletable){
            setDeleteOn(false)
            deleteSchedule(schedule?.id as number).then(() => {
              toast.success('Schedule deleted successfully')
              navigate(-1)
            })
          }else{
            toast.error('You do not have access to delete!')
          }
          
        }}
        onGoBack={() => setDeleteOn(false)}
        loading={isLoadingDelete}
      />
    </Box>
  )
}

export default AuditScheduleDetail
