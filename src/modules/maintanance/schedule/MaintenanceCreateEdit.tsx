import { Box, Button, Card, Divider, Grid, Typography, useTheme } from '@mui/material'
import { IMaintenance } from '../../../types/maintenance'
import { FC, useState } from 'react'
import { RequiredItem } from '../../audit/audit-schedule/AuditScheduleDetail'
import TextFieldWithLabel from '../../common/TextFieldWithLabel'
import TextareaWithLabel from '../../common/TextareaWithLabel'
import { ISelectItem } from '../../../types/common'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ProjectSelect from '../../audit/project-sites/ProjectSelect'
import LocationSelect from '../../location/LocationSelect'
import SimpleSelect from '../../common/SimpleSelect'
import { MAINTENANCE_SCHEDULE_FREQUENCYS } from '../../../helpers/constants'
import TimePickerWithText from '../../common/TimePickerWithText'

interface IMaintenanceCreate {
  name: string
  remark: string
  project: ISelectItem[]
  location: ISelectItem[]
  frequency: ISelectItem
  downTime: string
}

const initFormikValue: IMaintenanceCreate = {
  name: '',
  remark: '',
  project: [],
  location: [],
  frequency: MAINTENANCE_SCHEDULE_FREQUENCYS[0],
  downTime: '',
}

interface IProps {
  maintenance?: IMaintenance
}

const MaintenanceCreateEdit: FC<IProps> = ({ maintenance }) => {
  const isDetails = !!maintenance

  const theme = useTheme()

  const formik = useFormik<IMaintenanceCreate>({
    enableReinitialize: true,
    initialValues: { ...initFormikValue },
    validationSchema: Yup.object().shape({
      name: Yup.string().max(250).required('Maintenance name is required'),
      remark: Yup.string(),
      project: Yup.array().length(1, 'Project is required').required('Project is required'),
      location: Yup.array().length(1, 'Location is required').required('Location is required'),
      frequency: Yup.object().required('Frequency is required'),
      downTime: Yup.string(),
    }),
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        // setSubmitting(true)
      } catch (err: any) {
        console.error('Unkown error in saving maintenance: ', err)
        setStatus({ success: false })
        setSubmitting(false)
      }
    },
  })

  return (
    <Box>
      <Card sx={{ display: 'flex', flexDirection: 'column', mt: isDetails ? 3 : 4 }}>
        <Box sx={{ px: 3.75, pt: 5.25, pb: 2.5 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant='h3'>
              {isDetails ? 'Maintenance Info' : 'Add New Maintenance'}
            </Typography>
            {isDetails && (
              <Button variant='contained' color='primary' disabled={isDetails}>
                Save
              </Button>
            )}
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
                  Maintenance Name
                  <RequiredItem />
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <TextFieldWithLabel showLabel={false} name='name' placeholder='Maintenance name' />
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
                />
              </Grid>
            </Grid>
            <Grid item>
              <Divider light />
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
                  onChange={(val) => formik.setFieldValue('project', val)}
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
                  onChange={(val) => formik.setFieldValue('location', val)}
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
            <Grid item>
              <Divider light />
            </Grid>
            <Grid item container spacing={2}>
              <Grid item lg={4} xs={12}>
                <Typography
                  variant='subtitle1'
                  sx={{ fontSize: 15, mt: 1.25, display: 'inline-flex' }}
                >
                  Frequency
                  <RequiredItem />
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <SimpleSelect
                  value={formik.values.frequency}
                  options={MAINTENANCE_SCHEDULE_FREQUENCYS.filter((f) => f.value)}
                  onChange={(val) => formik.setFieldValue('frequency', val)}
                  width='100%'
                  sx={{ '.MuiSelect-select': { py: '13px' } }}
                  color={theme.palette.grey[800]}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item lg={4} xs={12}>
                <Typography
                  variant='subtitle1'
                  sx={{ fontSize: 15, mt: 1.25, display: 'inline-flex' }}
                >
                  Expected Down Time (minute)
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <TextFieldWithLabel
                  showLabel={false}
                  name='downTime'
                  placeholder='Expected Down Time (minute)'
                />
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item lg={6} xs={12}>
                <Typography
                  variant='subtitle1'
                  sx={{ fontSize: 15, mb: 1.25, display: 'inline-flex' }}
                >
                  Start Time
                  <RequiredItem />
                </Typography>
                <TimePickerWithText
                  required={true}
                  hiddenLabel
                  label='Start Time'
                  date={null}
                  onChange={() => null}
                  placeholder='Start Time'
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <Typography
                  variant='subtitle1'
                  sx={{ fontSize: 15, mb: 1.25, display: 'inline-flex' }}
                >
                  End Time
                  <RequiredItem />
                </Typography>
                <TimePickerWithText
                  required={true}
                  hiddenLabel
                  label='End Time'
                  date={null}
                  onChange={() => null}
                  placeholder='End Time'
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
        {!isDetails && (
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
              <Button
                variant='text'
                color='inherit'
                sx={{ color: (theme) => theme.palette.grey[400], fontWeight: 500 }}
              >
                Cancel
              </Button>
              <Button variant='contained' color='primary'>
                Add Maintenance
              </Button>
            </Box>
          </>
        )}
      </Card>
    </Box>
  )
}

export default MaintenanceCreateEdit
