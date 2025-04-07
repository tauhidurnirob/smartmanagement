import { FC, useMemo, useRef } from 'react'
import {
  Box,
  Card,
  Divider,
  Typography,
  Button,
  Grid,
  useTheme,
  Paper,
  Stack,
} from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import { LoadingButton } from '@mui/lab'

import TextareaWithLabel from '../../common/TextareaWithLabel'
import { ISelectItem } from '../../../types/common'

import { IGetOneTask } from '../../../types/task'
import Api from '../../../api'
import LocationSelect from '../../location/LocationSelect'
import ProjectSelect from '../../audit/project-sites/ProjectSelect'
import BuildingSelect from '../../location/BuildingSelect'
import LevelSelect from '../../location/LevelSelect'
import AreaSelect from '../../location/AreaSelect'
import UnitSelect from '../../location/UnitSelect'
import PremiseCategorySelect from './PremiseCategorySelect'
import TaskActivitySelect from './TaskActivitySelect'

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
  schedule?: IGetOneTask | undefined
  detail?: boolean
}

const returnStr = (val: any, type: string) => {
  if (val) {
    return val[type]
  }
  return ''
}

const AutomationTaskCreateDetail: FC<IProps> = ({ schedule, detail }) => {
  const [createTask, { isLoading: isCreateingTask }] = Api.useCreateTaskMutation()
  const isEdit = !!schedule
  const location = useLocation()
  //   const isEdit = true
  //   const { data: PremiseList } = Api.useGetTaskPremiseListQuery({ page: 1, limit: 10 })
  //   const { data: ActivitList } = Api.useGetTaskActivitiesListQuery({ page: 1, limit: 10 })
  const [updateTaskForm] = Api.useUpdateTaskFormByIdMutation()
  const navigate = useNavigate()
  const searchIds = useRef<{ locationIds: any[]; projectIds: any[] }>({
    locationIds: [],
    projectIds: [],
  })
  //   useGetTaskByIdQuery
  //   const { data, isLoading } = Api.useGetTaskByIdQuery(Number(schedule?.taskId), {
  //     skip: !isEdit,
  //   })
  const data = schedule
  //   console.log('schedule ==> ', schedule)
  if (
    schedule?.id &&
    !searchIds.current.locationIds.length &&
    !searchIds.current.projectIds.length
  ) {
    console.log('schedule.location ==> ', schedule.location)
    const tempId: any = {
      locationIds: [],
      projectIds: [],
    }
    tempId.locationIds.push(schedule.location.id)
    schedule.project && tempId.projectIds.push(schedule.project.id)
    searchIds.current = tempId
    console.log('searchIds.current ==> ', searchIds.current)

    // searchIds.current.locationIds.push(schedule.location.id)
    // searchIds.current.projectIds.push(schedule.project.id)
  }
  const theme = useTheme()

  const [createAuditSchedule, { isLoading: isLoadingCreate }] = Api.useCreateAuditScheduleMutation()
  const [updateAuditSchedule] = Api.useUpdateAuditScheduleMutation()
  const [deleteSchedule, { isLoading: isLoadingDelete }] = Api.useDeleteAuditScheduleByIdMutation()
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: isEdit ? data?.name || '' : '',
      remark: isEdit ? data?.remark || '' : '',
      premiseCategoryId: isEdit
        ? [
            {
              label: returnStr(data?.premiseCategory, 'name'),
              value: returnStr(data?.premiseCategory, 'id'),
            },
          ]
        : ([] as ISelectItem[]),
      active: isEdit
        ? [
            {
              label: data?.taskActivity?.[0]?.name as string,
              value: data?.taskActivity?.[0]?.id,
            },
          ]
        : ([] as ISelectItem[]),
      project: isEdit
        ? [
            {
              label: returnStr(data?.project, 'name'),
              value: returnStr(data?.project, 'id'),
            },
          ]
        : ([] as ISelectItem[]),
      location: isEdit
        ? [
            {
              label: returnStr(data?.location, 'name'),
              value: returnStr(data?.location, 'id'),
            },
          ]
        : ([] as ISelectItem[]),
      buildings: isEdit
        ? [
            {
              label: returnStr(data?.building, 'name'),
              value: returnStr(data?.building, 'id'),
            },
          ]
        : ([] as ISelectItem[]),
      levels: isEdit
        ? [
            {
              label: returnStr(data?.level, 'name'),
              value: returnStr(data?.level, 'id'),
            },
          ]
        : ([] as ISelectItem[]),
      areas: isEdit
        ? [{ label: returnStr(data?.area, 'name'), value: returnStr(data?.area, 'id') }]
        : ([] as ISelectItem[]),
      units: isEdit
        ? [{ label: returnStr(data?.unit, 'name'), value: returnStr(data?.unit, 'id') }]
        : ([] as ISelectItem[]),
    },
    validationSchema: Yup.object().shape({
      premiseCategoryId: Yup.array()
        .required('Premise Category is required')
        .length(1, 'Premise Category is required'),
      active: Yup.array()
        .required('Task Activity is required')
        .length(1, 'Task Activity is required'),
      project: Yup.array().required('Project is required').length(1, 'Project is required'),
      location: Yup.array().length(1, 'Location is required').required('Location is required'),
      buildings: Yup.array().length(1, 'Building is required').required('Building is required'),

      levels: Yup.array().length(1, 'Level is required').required('Level is required'),

      areas: Yup.array().length(1, 'Area is required').required('Area is required'),

      units: Yup.array().length(1, 'Area is required').required('Unit is required'),
    }),
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      console.log('values ==> ', values)
      try {
        if (isEdit) {
          updateTaskForm({
            id: location.state?.id ? location.state.id : location.search.split('=')[1],
            body: {
              remark: values.remark,
              locationId: values.location[0].value,
              activityIds: values?.active[0].value as number,
              projectId: values.project[0].value,
              buildingId: values.buildings[0].value,
              levelId: values.levels[0].value,
              areaId: values.areas[0].value,
              unitId: values.units[0].value,
              premiseCategoryId: values.premiseCategoryId[0].value,
              name: '',
              staffIds: [],
              taskTypes: 'Automation',
            },
          }).then((res: any) => {
            if (res.error) {
              toast.error(res.error.data.message)
            } else {
              toast.success('Update Automation Task Success')
            }
          })
        } else {
          createTask({
            remark: values.remark,
            locationId: values.location[0].value,
            activityIds: values?.active[0].value as number,
            projectId: values.project[0].value,
            buildingId: values.buildings[0].value,
            levelId: values.levels[0].value,
            areaId: values.areas[0].value,
            unitId: values.units[0].value,
            premiseCategoryId: values.premiseCategoryId[0].value,
            name: '',
            staffIds: [],
            taskTypes: 'Automation',
          }).then((res: any) => {
            if (res.error) {
              toast.error(res.error.data.message)
            } else {
              toast.success('Add New Automation Task Success')
              setTimeout(() => {
                navigate('/performance-management/task-allocation/automation-task/flowchart', {
                  state: {
                    id: res.data.task.id,
                    projectId: values.project[0].value,
                    locationId: values.location[0].value,
                    buildingIds: values.buildings[0].value,
                    levelIds: values.levels[0].value,
                    areaIds: values.areas[0].value,
                    unitIds: values.units[0].value,
                  },
                })
              }, 1000)
            }
          })
        }
      } catch (error) {
        toast.error('Failed to save Task')
      }
    },
  })

  const handleActive = (frequency: ISelectItem[]) => {
    formik.setFieldValue('active', frequency)
  }

  const handleChangeProject = (projects: ISelectItem[]) => {
    formik.setFieldValue('project', projects)
    searchIds.current.projectIds = []
    searchIds.current.projectIds.push(projects[0].value)
    cleanerArea()
  }
  const cleanerArea = () => {
    formik.setFieldValue('buildings', [] as ISelectItem[])
    formik.setFieldValue('levels', [] as ISelectItem[])
    formik.setFieldValue('areas', [] as ISelectItem[])
    formik.setFieldValue('units', [] as ISelectItem[])
  }
  const handlePremiseCategoryId = (value: ISelectItem[]) => {
    formik.setFieldValue('premiseCategoryId', value)
  }

  const handleChangeLocation = (locations: ISelectItem[]) => {
    formik.setFieldValue('location', locations)
    searchIds.current.locationIds = []
    searchIds.current.locationIds.push(locations[0].value)
    cleanerArea()
  }
  const handleFlowchart = () => {
    navigate('/performance-management/task-allocation/automation-task/flowchart', {
      state: {
        id: location.state?.id ? location.state.id : location.search.split('=')[1],
        locationId: data?.location.id,
        projectId: data?.project?.id,
        buildingIds: formik.values.buildings[0].value,
        levelIds: formik.values.levels[0].value,
        areaIds: formik.values.areas[0].value,
        unitIds: formik.values.units[0].value,
      },
    })
  }

  const projectIds = useMemo(() => {
    return formik.values.project.map((p) => p.value as number)
  }, [formik.values.project])

  const handleChangeBuildings = (buildings: ISelectItem[]) => {
    //   setFilters({ ...filters, buildings })
    formik.setFieldValue('buildings', buildings)
  }

  const handleChangeLevels = (levels: ISelectItem[]) => {
    // setFilters({ ...filters, levels })
    formik.setFieldValue('levels', levels)
  }

  const handleChangeAreas = (areas: ISelectItem[]) => {
    // setFilters({ ...filters, areas })
    formik.setFieldValue('areas', areas)
  }

  const handleChangeUnits = (units: ISelectItem[]) => {
    //   setFilters({ ...filters, units })
    formik.setFieldValue('units', units)
  }
  return (
    <Box position='relative'>
      <Card sx={{ mt: isEdit ? 2.75 : 4.5 }}>
        <Box sx={{ pt: 5, px: 4, pb: 2.5 }}>
          {isEdit && detail ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant='h3'>Automation Task</Typography>
              <div>
                {/* #00A3FF b3e3ff*/}
                <Button
                  variant='contained'
                  style={{
                    backgroundColor: formik.dirty ? '#00A3FF' : '#b3e3ff',
                    fontWeight: 400,
                    fontSize: 15,
                    padding: '12px 20px 12px 20px',
                  }}
                  color='primary'
                  size='medium'
                  onClick={() => formik.handleSubmit()}
                  disabled={!formik.dirty || formik.isSubmitting}
                >
                  Save Changes
                </Button>
                <Button
                  variant='contained'
                  style={{
                    backgroundColor: '#2BA579',
                    fontWeight: 400,
                    marginLeft: 20,
                    fontSize: 15,
                    padding: '12px 20px 12px 20px',
                  }}
                  onClick={handleFlowchart}
                >
                  View Automation Flowchart
                </Button>
              </div>
            </Box>
          ) : (
            <Typography variant='h3'>Add New Automation Task</Typography>
          )}
        </Box>
        <Divider sx={{ borderColor: 'rgba(239, 242, 245, 1)' }} />
        <>
          <Box sx={{ pt: 2.75, px: 3.75, pb: 4 }} className='TypographyIconSize'>
            <Grid container spacing={2} alignItems={'flex-start'}>
              <Grid item lg={4} xs={12}>
                <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
                  Premise Category
                  <RequiredItem />
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <PremiseCategorySelect
                  hiddenLabel={true}
                  selected={formik.values.premiseCategoryId as any}
                  onChange={handlePremiseCategoryId}
                  isSingleSelect={true}
                  disableAllSelect={true}
                  error={
                    !!formik.errors.premiseCategoryId && !formik.values.premiseCategoryId.length
                  }
                  helperText={formik.errors.premiseCategoryId as string}
                  projectIds={projectIds}
                  textColor={'grey.800'}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems={'flex-start'} sx={{ mt: 0.5 }}>
              <Grid item lg={4} xs={12}>
                <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
                  Task Activity
                  <RequiredItem />
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <TaskActivitySelect
                  hiddenLabel={true}
                  query='Automation'
                  selected={formik.values.active as ISelectItem[]}
                  onChange={handleActive}
                  isSingleSelect={true}
                  disableAllSelect={true}
                  error={!!formik.errors.active && !formik.values.active.length}
                  helperText={formik.errors.active as string}
                  projectIds={projectIds}
                  textColor={'grey.800'}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems={'flex-start'} sx={{ mt: 0.5 }}>
              <Grid item lg={4} xs={12}>
                <Typography variant='subtitle1' sx={{ fontSize: 15, display: 'inline-flex' }}>
                  Remark
                  {/* <RequiredItem /> */}
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <TextareaWithLabel
                  placeholder='Write a Remark'
                  rows={4}
                  showLabel={false}
                  name='groupName'
                  value={formik.values.remark}
                  onChange={(e) => formik.setFieldValue('remark', e.target.value)}
                  error={!!formik.errors.remark && !!formik.values.remark}
                  helperText={formik.errors.remark as string}
                />
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ px: 3.75 }} className='TypographyIconSize'>
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
                  error={!!formik.errors.project && !!formik.values.project}
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
                  error={!!formik.errors.location && !!formik.values.location}
                  helperText={formik.errors.location as string}
                  //   projectIds={
                  //     formik.values.project?.[0]?.value
                  //       ? [formik.values.project?.[0]?.value as number]
                  //       : []
                  //   }
                  textColor={theme.palette.grey[800]}
                />
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ px: 1.8, pb: 2.2 }} className='TypographyIconSize'>
            <Paper elevation={0} sx={{ p: 2, mt: 4 }}>
              <Stack
                direction={{ lg: 'row', xs: 'column' }}
                alignItems='flex-start'
                justifyContent='space-between'
                columnGap={{ lg: 1.5, xs: 1 }}
                rowGap={2.5}
              >
                <Grid
                  container
                  columnSpacing={{ lg: 1.25, xs: 1 }}
                  rowSpacing={{ lg: 1.25, xs: 2.5 }}
                  sx={{ pl: 0 }}
                >
                  <Grid item md={3} sm={12}>
                    <Box>
                      <Typography variant='subtitle1' sx={{ fontSize: 15, mb: 1.5 }}>
                        Building
                        <RequiredItem />
                      </Typography>
                      <BuildingSelect
                        hiddenLabel={true}
                        locationIds={searchIds.current.locationIds}
                        projectIds={searchIds.current.projectIds}
                        isSingleSelect={true}
                        disableAllSelect={true}
                        error={!!formik.errors.buildings && !!formik.values.buildings}
                        helperText={formik.errors.buildings as string}
                        textColor={theme.palette.grey[800]}
                        placeholder='Please select Building'
                        selected={formik.values.buildings as ISelectItem[]}
                        onChange={handleChangeBuildings}
                      />
                    </Box>
                  </Grid>
                  <Grid item md={3} sm={12}>
                    <Box>
                      <Typography variant='subtitle1' sx={{ fontSize: 15, mb: 1.5 }}>
                        Level
                        <RequiredItem />
                      </Typography>
                      <LevelSelect
                        hiddenLabel={true}
                        isSingleSelect={true}
                        disableAllSelect={true}
                        locationIds={searchIds.current.locationIds}
                        projectIds={searchIds.current.projectIds}
                        error={!!formik.errors.levels && !!formik.values.levels}
                        helperText={formik.errors.levels as string}
                        textColor={theme.palette.grey[800]}
                        placeholder='Please select Level'
                        selected={formik.values.levels as ISelectItem[]}
                        onChange={handleChangeLevels}
                      />
                    </Box>
                  </Grid>
                  <Grid item md={3} sm={12}>
                    <Box>
                      <Typography variant='subtitle1' sx={{ fontSize: 15, mb: 1.5 }}>
                        Area
                        <RequiredItem />
                      </Typography>
                      <AreaSelect
                        hiddenLabel={true}
                        isSingleSelect={true}
                        disableAllSelect={true}
                        locationIds={searchIds.current.locationIds}
                        projectIds={searchIds.current.projectIds}
                        error={!!formik.errors.areas && !!formik.values.areas}
                        helperText={formik.errors.areas as string}
                        textColor={theme.palette.grey[800]}
                        selected={formik.values.areas as ISelectItem[]}
                        placeholder='Please select Area'
                        onChange={handleChangeAreas}
                      />
                    </Box>
                  </Grid>
                  <Grid item md={3} sm={12}>
                    <Box>
                      <Typography variant='subtitle1' sx={{ fontSize: 15, mb: 1.5 }}>
                        Unit
                        <RequiredItem />
                      </Typography>
                      <UnitSelect
                        hiddenLabel={true}
                        isSingleSelect={true}
                        disableAllSelect={true}
                        locationIds={searchIds.current.locationIds}
                        projectIds={searchIds.current.projectIds}
                        error={!!formik.errors.units && !!formik.values.units}
                        helperText={formik.errors.units as string}
                        textColor={theme.palette.grey[800]}
                        placeholder='Please select Unit'
                        selected={formik.values.units as ISelectItem[]}
                        onChange={handleChangeUnits}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Stack>
            </Paper>
          </Box>
        </>
        {!isEdit && !detail && (
          <>
            <Divider sx={{ borderColor: 'rgba(235, 237, 243, 1)' }} />
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 4, pt: 2.5, pb: 3.5 }}>
                <Button
                  variant='text'
                  sx={{ color: (theme: any) => theme.palette.grey[400] }}
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
                  sx={{ ml: 3, padding: '12px 20px 12px 20px' }}
                  onClick={() => {
                    formik.handleSubmit()
                  }}
                  disabled={!formik.isValid}
                  //   disabled={false}
                  loading={isLoadingCreate}
                >
                  Next
                </LoadingButton>
              </Box>
            </Box>
          </>
        )}
      </Card>
    </Box>
  )
}

export default AutomationTaskCreateDetail
