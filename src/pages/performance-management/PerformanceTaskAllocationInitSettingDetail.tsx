import { useState, useMemo } from 'react'
import { To } from 'react-router'
import { useParams } from 'react-router-dom'
import {
  Box,
  Button,
  Card,
  Stack,
  Typography,
  Grid,
  Divider,
  IconButton,
  Collapse,
} from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import ButtonBack from '../../modules/common/ButtonBack'
import BackDrop from '../../modules/common/BackDrop'
import { ISelectItem } from '../../types/common'
import SearchField from '../../modules/common/SearchField'
import TextFieldWithLabel from '../../modules/common/TextFieldWithLabel'
import { Plus } from '../../assets/icons/plus'
import StyledAlert from '../../modules/common/StyledAlert'
import { TrashDuotoneIcon } from '../../assets/icons/trash-duotone'
import deepCopy from '../../helpers/deepCopy'
import SimpleSelect from '../../modules/common/SimpleSelect'
import { TASK_TYPE_LIST } from '../../helpers/constants'
import TaskActivitySLATimeSelect from '../../modules/performance-management/task-allocation/TaskActivitySLATimeSelect'
import Api from '../../api'
import useDebounce from '../../hooks/useDebounce'
import { ETaskType, ITaskActivity } from '../../types/task'
import { ISlaTime } from '../../types/performance-management'
import { getSlaTimeString, parseSlaTime } from '../../helpers/getSlaTimeString'
import { toast } from 'react-toastify'
import { IReqTaskActivitiesCreate } from '../../api/models'
import { LoadingButton } from '@mui/lab'

interface ITaskActivityFormik {
  id: number | null
  name: string
  taskType: ISelectItem | null
  slaTime: ISlaTime | null
  bufferTime: ISlaTime | null
}

interface ITaskActivityList {
  activities: ITaskActivityFormik[]
}

const getTaskType = (type: ETaskType) => {
  return TASK_TYPE_LIST.find(t => t.value === type) || null
}

const getInitialValues = (activities: ITaskActivity[]) => {
  const actArr: ITaskActivityFormik[] = []
  activities.forEach(act => {
    const tmpAct: ITaskActivityFormik = {
      id: act.id,
      name: act.name,
      taskType: getTaskType(act.taskType),
      slaTime: parseSlaTime(act.slaTime),
      bufferTime: parseSlaTime(act.bufferTime)
    }
    actArr.push(tmpAct)
  });
  return {
    activities: actArr
  }
}

const PerformanceTaskAllocationInitSettingDetail = () => {
  const { id } = useParams()

  const [search, setSearch] = useState<string>('')
  const debouncedSearch = useDebounce(search, 500)

  const { data, isLoading } = Api.useGetTaskActivitiesByProjectIdQuery({
    text: debouncedSearch,
    projectId: Number(id),
  }, {skip: !id})

  const [createActivities, {isLoading: createLoading}] = Api.useCreateTaskActivitiesMutation()
  console.log(data)
  const { items } = useMemo(() => {
    const items = [
      { label: 'Total Task Activity', value: data?.totalTaskActivities || 0, color: 'grey.800' },
      { label: 'Periodic', value: data?.periodic || 0, color: 'primary.main' },
      { label: 'Routine', value: data?.routine || 0, color: '#AD00FF' },
      { label: 'Ad-Hoc Urgent', value: data?.adHocUrgent || 0, color: '#AD00FF' },
      { label: 'Ad-Hoc Non Urgent', value: data?.adHocNonUrgent || 0, color: '#AD00FF' },
      { label: 'Automation', value: data?.automation || 0, color: 'yellow.main' },
    ]
    return { items }
  }, [data])

  const formik = useFormik<ITaskActivityList>({
    enableReinitialize: true,
    initialValues: getInitialValues(data?.activities || []),
    validationSchema: Yup.object().shape({
      activities: Yup.array(
        Yup.object().shape({
          name: Yup.string().required('Task Activity Name is required'),
          taskType: Yup.object().nullable().required('Task Type is required'),
        })
      ),
    }),
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        setSubmitting(true)
        const newActivities = values.activities?.filter(activities => !activities.id)
        const createData: IReqTaskActivitiesCreate = {
          projectId: Number(data?.projectId),
          taskActivities: newActivities.map(act => ({
            name: act.name,
            taskType: act.taskType?.value as ETaskType,
            slaTime: (act.slaTime ? getSlaTimeString(act.slaTime) : '') as string,
            bufferTime: (act.bufferTime ? getSlaTimeString(act.bufferTime) : '') as string
          }))
        }
        createActivities(createData)
          .unwrap()
          .then((res) => {
            setStatus({ success: true })
            toast.success('New task activities has been added')
          })
          .catch((err) => {
            console.error('Unkown error in saving task activity list: ', err)
            setStatus({ success: false })
          })
          .finally(() => {
            setSubmitting(false)
          })
      } catch (err: any) {
        console.error('Unkown error in saving task activity list: ', err)
        toast.error('Failed to save task activities')
        setStatus({ success: false })
        setSubmitting(false)
      }
    },
  })

  console.log(formik.values)

  const handleChangeSearch = (search: string) => {
    setSearch(search)
  }

  const handleAddNewActivity = () => {
    const newActivities = deepCopy(formik.values.activities)
    newActivities.push({
      name: '',
      id: null,
      taskType: TASK_TYPE_LIST[0],
      slaTime: null,
      bufferTime: null,
    })
    formik.setFieldValue('activities', newActivities)
  }

  const handleChangeName = (idx: number, name: string) => {
    const newActivities = deepCopy(formik.values.activities)
    newActivities[idx].name = name
    formik.setFieldValue('activities', newActivities)
  }

  const handleRemoveTaskActivity = (idx: number) => {
    const newActivities = deepCopy(formik.values.activities)
    newActivities.splice(idx, 1)
    formik.setFieldValue('activities', newActivities)
  }

  const handleChangeTaskType = async (taskType: ISelectItem | null, idx: number) => {
    const newActivities = formik.values.activities
    newActivities[idx].taskType = taskType
    await formik.setFieldValue('activities', newActivities)
  }

  const handleSlaTime = async (v: ISlaTime | null, idx: number) => {
    const newActivities = formik.values.activities
    newActivities[idx].slaTime = v
    await formik.setFieldValue('activities', newActivities)
  }

  const handleBufferTime = async (v: ISlaTime | null, idx: number) => {
    const newActivities = formik.values.activities
    newActivities[idx].bufferTime = v
    await formik.setFieldValue('activities', newActivities)
  }

  const handleSave = () => {
    formik.handleSubmit()
  }

  return (
    <Box>
      <ButtonBack to={-1 as To} />
      <Stack justifyContent={'space-between'} direction='row' alignItems={'center'} mt={4}>
        <Typography variant='h3'>Task Activity</Typography>
        {/* <Button variant='contained' color='error'>
          Delete Project SLA
        </Button> */}
      </Stack>

      {isLoading ? (
        <Card sx={{ mt: 2.25, py: 3.75, px: 3.75 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <Box sx={{ position: 'relative', height: '30px' }}>
              <BackDrop size={30} />
            </Box>
          </Box>
        </Card>
      ) : (
        <Stack>
          <Card sx={{ mt: 2.25, py: 3, px: 3.75 }}>
            <Stack
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 2,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant='h4'>TP</Typography>
            </Stack>
            <Grid container columnSpacing={1.5} rowSpacing={1.5} sx={{ mt: 1.5 }}>
              {items.map((item, idx) => {
                const { label, value, color } = item
                return (
                  <Grid key={`sla-item-${idx}`} item lg={2} md={3} sm={6} xs={12}>
                    <Stack
                      sx={{
                        border: '1px dashed #E4E6EF',
                        borderRadius: 1.5,
                        gap: 0.5,
                        py: 1.5,
                        px: 2,
                      }}
                    >
                      <Typography variant='h2' sx={{ color: color }}>
                        {value}
                      </Typography>
                      <Typography variant='h5' sx={{ color: 'grey.400' }}>
                        {label}
                      </Typography>
                    </Stack>
                  </Grid>
                )
              })}
            </Grid>
          </Card>
          <Card sx={{ mt: 3 }}>
            <Stack
              direction='row'
              justifyContent={'space-between'}
              sx={{ px: 1.5, pt: 3.5, pb: 1 }}
            >
              <SearchField
                placeholder='Search by Keyword'
                sx={{
                  backgroundColor: 'grey.100',
                  minWidth: 0,
                  maxWidth: '290px',
                  height: '40px',
                  justifyContent: 'center',
                }}
                value={search}
                onChange={(e) => handleChangeSearch(e.target.value)}
              />
              <LoadingButton variant='contained' color='primary' loading={createLoading} onClick={handleSave}>
                Save
              </LoadingButton>
            </Stack>
            <Divider light sx={{ borderColor: '#EFF2F5' }} />
            <Stack sx={{ py: 2.5, px: 3.5 }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 3 }}>
                <Typography
                  typography={'h4'}
                  sx={{ fontWeight: 500, display: 'inline-flex', color: 'grey.800', lineHeight: 1 }}
                >
                  Task Activity Name
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
                  onClick={() => handleAddNewActivity()}
                >
                  <Plus sx={{ fontSize: '16px' }} />
                </Button>
              </Box>
              <Grid
                container
                direction={'column'}
              >
                {formik.values.activities.map((item, idx) => {
                  const { name, taskType, slaTime, bufferTime, id } = item
                  const errors = formik.errors?.activities?.[idx] as any
                  const persisted = !!id
                  return (
                    <Box
                      key={`group-item-${idx}`}
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 1,
                        borderRadius: 1.5,
                        alignItems: 'center',
                        mb: 2
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Grid container columnSpacing={2}>
                          <Grid item lg={6} xs={12}>
                            <Typography
                              typography='h5'
                              sx={{
                                mb: 0.5,
                                display: 'inline-flex',
                                color: 'grey.800',
                                fontSize: 15,
                              }}
                            >
                              Task Activity {idx + 1}
                            </Typography>
                            <TextFieldWithLabel
                              showLabel={false}
                              name='name'
                              placeholder='Task Activity Name'
                              value={name}
                              onChange={(e) => handleChangeName(idx, e.target.value)}
                              height='44px'
                              showErrorMessage={false}
                              sx={{
                                '.MuiInputBase-input': {
                                  bgcolor: 'grey.50',
                                  '&::placeholder': {
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    opacity: 1,
                                    color: 'grey.400',
                                  },
                                },
                              }}
                            />
                            <Collapse in={!!errors?.name}>
                              <StyledAlert severity='error' variant='outlined' sx={{ mt: '5px' }}>
                                {errors?.name}
                              </StyledAlert>
                            </Collapse>
                          </Grid>
                          <Grid item lg={2} xs={12}>
                            <Typography
                              typography='h5'
                              sx={{
                                mb: 0.5,
                                display: 'inline-flex',
                                color: 'grey.800',
                                fontSize: 15,
                              }}
                            >
                              Task Type
                            </Typography>
                            <SimpleSelect
                              width={'100%'}
                              value={taskType}
                              options={TASK_TYPE_LIST}
                              onChange={(val) => handleChangeTaskType(val, idx)}
                              disabled={persisted}
                            />
                            <Collapse in={!!errors?.taskType}>
                              <StyledAlert severity='error' variant='outlined' sx={{ mt: '5px' }}>
                                {errors?.taskType}
                              </StyledAlert>
                            </Collapse>
                          </Grid>
                          <Grid item lg={2} xs={12}>
                            <Typography
                              typography='h5'
                              sx={{
                                mb: 0.5,
                                display: 'inline-flex',
                                color: 'grey.800',
                                fontSize: 15,
                              }}
                            >
                              SLA Time
                            </Typography>
                            <TaskActivitySLATimeSelect slaTime={slaTime} setSlaTime={(v) => handleSlaTime(v, idx)} />
                            <Collapse in={!!errors?.slaTime}>
                              <StyledAlert severity='error' variant='outlined' sx={{ mt: '5px' }}>
                                {errors?.slaTime}
                              </StyledAlert>
                            </Collapse>
                          </Grid>
                          <Grid item lg={2} xs={12}>
                            <Typography
                              typography='h5'
                              sx={{
                                mb: 0.5,
                                display: 'inline-flex',
                                color: 'grey.800',
                                fontSize: 15,
                              }}
                            >
                              Buffer Time
                            </Typography>
                            <TaskActivitySLATimeSelect isBuffer slaTime={bufferTime} setSlaTime={(v) => handleBufferTime(v, idx)} />
                            <Collapse in={!!errors?.bufferTime}>
                              <StyledAlert severity='error' variant='outlined' sx={{ mt: '5px' }}>
                                {errors?.bufferTime}
                              </StyledAlert>
                            </Collapse>
                          </Grid>
                        </Grid>
                      </Box>
                      {
                        !persisted && <IconButton sx={{ mt: 2 }} onClick={() => handleRemoveTaskActivity(idx)}>
                          <TrashDuotoneIcon sx={{ color: 'grey.400' }} />
                        </IconButton>
                      }
                    </Box>
                  )
                })}
              </Grid>
            </Stack>
          </Card>
        </Stack>
      )}
    </Box>
  )
}

export default PerformanceTaskAllocationInitSettingDetail
