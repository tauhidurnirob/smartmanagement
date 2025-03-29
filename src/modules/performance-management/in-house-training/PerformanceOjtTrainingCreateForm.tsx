import { Box, Button, Card, Divider, Grid, Typography, useTheme } from '@mui/material'
import TextFieldWithLabel from '../../common/TextFieldWithLabel'
import { ISelectItem } from '../../../types/common'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { RequiredItem } from '../../audit/audit-schedule/AuditScheduleDetail'
import ProjectSelect from '../../audit/project-sites/ProjectSelect'
import LocationSelect from '../../location/LocationSelect'
import RoleSelect from '../../user/RoleSelect'
import { IOjtTrainingCreate, IOjtTrainingReqBody } from '../../../types/performance-management'
import FilterLabel from '../../common/FilterLabel'
import SelectDate from '../../common/SelectDate'
import dayjs, { Dayjs } from 'dayjs'
import TimePickerWithText from '../../common/TimePickerWithText'
import SopTrainingSelect from './SopTrainingSelect'
import Api from '../../../api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import FrequencySelect from './FrequencySelect'
import DurationSelect from './DurationSelect'
import ReminderSelect from './ReminderSelect'

const initFormikValue: IOjtTrainingCreate = {
  name: '',
  project: [],
  location: [],
  role: [],
  sopTraining: [],
  frequency: [],
  duration: [],
  reminder: [],
  startDate: null,
  startTime: null,
}

const PerformanceOjtTrainingCreateForm = () => {
  const theme = useTheme()
  const [createOjt, { isLoading }] = Api.useCreateOtjMutation()
  const navigate = useNavigate()

  const formik = useFormik<IOjtTrainingCreate>({
    enableReinitialize: true,
    initialValues: { ...initFormikValue },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('OJT Name is required.'),
      project: Yup.array().length(1, 'Project is required').required('Project is required'),
      location: Yup.array().length(1, 'Location is required').required('Location is required'),
      frequency: Yup.array().length(1, 'Frequency is required').required('Frequency is required'),
      duration: Yup.array().length(1, 'Duration is required').required('Duration is required'),
      reminder: Yup.array().length(1, 'Reminder is required').required('Reminder is required'),
      role: Yup.array().length(1, 'Role is required').required('Role is required'),
      sopTraining: Yup.array()
        .length(1, 'SOP training is required')
        .required('SOP training is required'),
      startDate: Yup.string().required('Date is required'),
      startTime: Yup.string().required('Time is required'),
    }),
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        setSubmitting(true)
        const parsedValues: IOjtTrainingReqBody = {
          ojtName: values.name,
          locationId: values.location[0].value as number,
          projectId: values.project[0].value as number,
          roleId: values.role[0].value as number,
          sopTrainingId: values.sopTraining[0].value as number,
          durationOfCompletion: values.duration[0].value as string,
          frequency: values.frequency[0].value as string,
          reminder: values.reminder[0].value as string,
          startDate: values.startDate ? values.startDate?.format('YYYY-MM-DD') : '',
          startTime: values.startTime ? values.startTime?.format('HH:mm') : '',
        }

        createOjt(parsedValues)
          .unwrap()
          .then(() => {
            toast.success('Created a new OJT')
            navigate('/performance-management/in-house-training/ojt')
          })
          .catch((err) => {
            console.log('Failed to create a OJT: ', err)
            toast.error('Failed to create a OJT')
          })
          .finally(() => {
            setSubmitting(false)
          })
      } catch (err: any) {
        setStatus({ success: false })
        setSubmitting(false)
      }
    },
  })

  const handleChangeProject = (projects: ISelectItem[]) => {
    formik.setFieldValue('project', projects)
    formik.setFieldValue('location', [])
  }

  const handleChangeLocation = (locations: ISelectItem[]) => {
    formik.setFieldValue('location', locations)
  }
  const handleChangeFrequency = (frequency: ISelectItem[]) => {
    formik.setFieldValue('frequency', frequency)
  }
  const handleChangeDuration = (duration: ISelectItem[]) => {
    formik.setFieldValue('duration', duration)
  }
  const handleChangeReminder = (reminder: ISelectItem[]) => {
    formik.setFieldValue('reminder', reminder)
  }
  const handleChangeRole = (roles: ISelectItem[]) => {
    formik.setFieldValue('role', roles)
  }
  const handleSopTrainingChange = (sopTraining: ISelectItem[]) => {
    formik.setFieldValue('sopTraining', sopTraining)
  }
  const handleStartDate = (date: Dayjs | null) => {
    formik.setFieldValue('startDate', date)
  }
  const handleStartTime = (time: Dayjs | null) => {
    formik.setFieldValue('startTime', time)
  }

  return (
    <Card sx={{ mt: 3 }}>
      <Box sx={{ px: 3.75, pt: 5.25, pb: 2.5 }}>
        <Typography variant='h3'>Add New OJT</Typography>
      </Box>
      <Divider light />
      <Box sx={{ px: 3.75, pt: 3, pb: 3 }}>
        <Grid container direction={'column'} spacing={3}>
          <Grid item container spacing={2}>
            <Grid item lg={4} xs={12}>
              <Typography typography={'h4'} sx={{ fontWeight: 500, display: 'inline-flex' }}>
                OJT Name
                <RequiredItem />
              </Typography>
            </Grid>
            <Grid item lg={8} xs={12}>
              <TextFieldWithLabel
                label={''}
                name={'name'}
                placeholder={'OJT Name'}
                showLabel={false}
                value={formik.values.name}
                onChange={(e) => formik.setFieldValue('name', e.target.value)}
                error={!!formik.errors.name}
                helperText={formik.errors.name as string}
              />
            </Grid>
          </Grid>
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
          <Grid item container spacing={2}>
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
          </Grid>
          <Grid item container spacing={2}>
            <Grid item lg={4} xs={12}>
              <Typography typography={'h4'} sx={{ fontWeight: 500, display: 'inline-flex' }}>
                Frequency
                <RequiredItem />
              </Typography>
            </Grid>
            <Grid item lg={8} xs={12}>
              <FrequencySelect
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
          <Grid item container spacing={2}>
            <Grid item lg={4} xs={12}>
              <Typography typography={'h4'} sx={{ fontWeight: 500, display: 'inline-flex' }}>
                Duration
                <RequiredItem />
              </Typography>
            </Grid>
            <Grid item lg={8} xs={12}>
              <DurationSelect
                hiddenLabel={true}
                selected={formik.values.duration as ISelectItem[]}
                onChange={handleChangeDuration}
                isSingleSelect={true}
                disableAllSelect={true}
                error={!!formik.errors.duration}
                helperText={formik.errors.duration as string}
                textColor={theme.palette.grey[800]}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item lg={4} xs={12}>
              <Typography typography={'h4'} sx={{ fontWeight: 500, display: 'inline-flex' }}>
                Reminder
                <RequiredItem />
              </Typography>
            </Grid>
            <Grid item lg={8} xs={12}>
              <ReminderSelect
                hiddenLabel={true}
                selected={formik.values.reminder as ISelectItem[]}
                onChange={handleChangeReminder}
                isSingleSelect={true}
                disableAllSelect={true}
                error={!!formik.errors.reminder}
                helperText={formik.errors.reminder as string}
                textColor={theme.palette.grey[800]}
              />
            </Grid>
          </Grid>
          <Divider sx={{ mt: 5, mb: 3 }} />
          <Grid item container spacing={2}>
            <Grid item lg={4} xs={12}>
              <Typography typography={'h4'} sx={{ fontWeight: 500, display: 'inline-flex' }}>
                Assign Role
                <RequiredItem />
              </Typography>
            </Grid>
            <Grid item lg={8} xs={12}>
              <RoleSelect
                hiddenLabel={true}
                selected={formik.values.role as ISelectItem[]}
                onChange={handleChangeRole}
                isSingleSelect={true}
                disableAllSelect={true}
                error={!!formik.errors.role}
                helperText={formik.errors.role as string}
                textColor={theme.palette.grey[800]}
                placeholder={'Select Role'}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item md={6} xs={12}>
              <FilterLabel required text='Start Date' sx={{ mb: 1.25 }} />
              <SelectDate
                value={formik.values.startDate}
                onAccept={(date) => handleStartDate(date)}
                showErrorMessage={!!formik.errors.startDate}
                error={!!formik.errors.startDate}
                errorMessage={formik.errors.startDate}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FilterLabel required text='Start time' sx={{ mb: 1.25 }} />
              <TimePickerWithText
                required={true}
                hiddenLabel
                label='Start Time'
                date={formik.values.startTime}
                onChange={(time) => handleStartTime(time)}
                placeholder='Start Time'
                showErrorMessage={!!formik.errors.startTime}
                error={!!formik.errors.startTime}
                errorMessage={formik.errors.startTime}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Divider light />
      <Box sx={{ px: 3.75, pt: 3, pb: 3 }}>
        <Grid item container spacing={2}>
          <Grid item lg={4} xs={12}>
            <Typography
              typography={'h4'}
              sx={{
                fontSize: 15,
                fontWeight: 500,
                mt: 1.25,
                display: 'inline-flex',
                color: 'grey.800',
              }}
            >
              SOP Training
              <RequiredItem />
            </Typography>
          </Grid>
          <Grid item lg={8} xs={12}>
            <SopTrainingSelect
              hiddenLabel={true}
              selected={formik.values.sopTraining}
              onChange={handleSopTrainingChange}
              isSingleSelect={true}
              disableAllSelect={true}
              error={!!formik.errors.sopTraining}
              helperText={formik.errors.sopTraining as string}
              textColor={theme.palette.grey[800]}
              placeholder={'Select SOP Training'}
            />
          </Grid>
        </Grid>
      </Box>
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
        <Button
          variant='text'
          color='inherit'
          sx={{ color: (theme) => theme.palette.grey[400], fontWeight: 500 }}
        >
          Cancel
        </Button>
        <Button
          disabled={!formik.isValid || formik.isSubmitting || isLoading}
          onClick={() => formik.handleSubmit()}
          variant='contained'
          color='primary'
        >
          Add OJT
        </Button>
      </Box>
    </Card>
  )
}

export default PerformanceOjtTrainingCreateForm
