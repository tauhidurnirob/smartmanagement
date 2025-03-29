import { Alert, Box, Button, Grid, Snackbar, TextField, Typography } from '@mui/material'

import ButtonBack from '../../modules/common/ButtonBack'
import AutomationTaskFlowChartDetail from '../../modules/performance-management/task-allocation/AutomationTaskFlowChartDetail'
import SearchField from '../../modules/common/SearchField'
import FrequencySelect from '../../modules/audit/audit-schedule/FrequencySelect'
import { AUDIT_SCHEDULE_FREQUENCYS, WEEK_FULL_DATE_LIST_NUMBEWR } from '../../helpers/constants'
import { ISelectItem } from '../../types/common'
import FilterLabel from '../../modules/common/FilterLabel'
import SelectDate from '../../modules/common/SelectDate'
import { Fragment, useMemo, useRef, useState } from 'react'
import CustomDateRange, { IDateRange } from '../../modules/common/CustomDateRange'
import { addDays, addWeeks } from '@fullcalendar/core/internal'
import dayjs, { Dayjs } from 'dayjs'
// import { DateTimePicker } from '@mui/lab'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { RequiredItem } from '../../modules/audit/audit-schedule/AuditScheduleDetail'
import Api from '../../api'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { LoadingButton } from '@mui/lab'
import DeleteDialog from '../../modules/common/DeleteDialog'
import useDebounce from '../../hooks/useDebounce'

interface IProps {
  selected: ISelectItem
  open: boolean
  handleClose: () => void
  label?: string
  value: IDateRange
  setValue: (v: IDateRange) => void
}

const DAY_DURATION = 24 * 60 * 60 * 1000
type ThreeData = {
  id: string
  type: string
  title: string
  canAdd: string
  data?: Record<string, any>
  children?: ThreeData[]
}

type ListData = {
  key: string
  type: string
  title: string
  canAdd: string
  list?: any[]
}

const makeThree = (data: any[], parentId?: string) => {
  const result: ThreeData[] = []
  for (const item of data) {
    if (
      (!parentId && item?.key?.split('-').length === 1) ||
      parentId === item?.key?.split('-').slice(0, -1).join('-')
    ) {
      const tempObj: any = {
        id: item.key,
        type: item.OutType,
        data: {
          list: item.list,
          key: item.key,
          title: item.title || '',
          canAdd: item.canAdd,
          type: item.type,
        },
        children: makeThree(data, item.key),
        title: item.title || '',
        canAdd: item.canAdd,
      }
      if (item.type == 'custom-time') {
        tempObj.data.list = item.timeType
        tempObj.data.title = item.time || ''
      }
      result.push(tempObj)
    }
  }

  return result
}
const test = new Date('2023-12-21T03:30:44.606Z')
const PerformanceTaskAllocationAutomationTaskCreate = () => {
  const [SnackbarOpen, setSnackbar] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()
  const [startDate, setStartDate] = useState<any>(dayjs())
  const [endDate, setEndDate] = useState<any>(dayjs())
  const [formstartdata, setFormStartData] = useState<any>()
  const [formenddata, setFormendData] = useState<any>()
  const graphRef: any = useRef(null)
  // const createStatus = useRef(false)
  const [deleteOn, setDeleteOn] = useState(false)
  const [createStatus, setcreateStatus] = useState(true)
  const [saveChange, setSave] = useState(true)
  //   const startDate2 = dayjs('2023-12-21T15:55:08.000Z').toDate()
  //   console.log('startDate2 ==> ', startDate2)
  // flow detail
  let Flowdetail: any = {}
  const [selectedFrequency, setSelectedFrequency] = useState<any>(AUDIT_SCHEDULE_FREQUENCYS[0])
  const [dayOfWeek, setdayOfWeek] = useState<ISelectItem>({ label: 'Monday', value: 1 })
  useMemo(() => {
    if (Flowdetail?.taskId && createStatus) {
      setcreateStatus(false)
    }
  }, [Flowdetail])
  const getData = () => {
    const { data } = Api.useGetAutomationFlowQuery({ id: location.state.id })
    if (data?.taskId) {
      const { endAt, frequency, startAt, dayOfWeek } = data as any
      console.log('data ==> ', data)
      Flowdetail = data
      if (createStatus) {
        const tempItem = AUDIT_SCHEDULE_FREQUENCYS.find((item) => item.value === frequency)
        const temp1 = dayjs(startAt)
        const temp2 = dayjs(endAt)
        setStartDate(temp1)
        setFormStartData(temp1)
        setEndDate(temp2)
        setFormendData(temp2)
        setSelectedFrequency(tempItem)
        setcreateStatus(false)
        if (dayOfWeek) {
          const tempDayOfWeek = WEEK_FULL_DATE_LIST_NUMBEWR.find((item) => item.value === dayOfWeek)

          setdayOfWeek(tempDayOfWeek as ISelectItem)
        }
      }
    }
  }
  if (JSON.stringify(Flowdetail) === '{}') {
    getData()
  }
  // location.taksId

  const { id: projectId } = useParams()

  const [error1, isLoading1] = Api.usePostAutomationFlowMutation({})
  const [PostAutomation] = Api.usePostAutomationFlowMutation()

  // updata
  const [UpdateAutomation] = Api.useUpdateAutomationFlowMutation()
  //   const [value2, setValue2] = useState(dayjs('2023-12-22T03:30:44.606Z'))
  const handleStartDateChange = (date: any) => {
    const maxEndDate = dayjs(date).add(1, 'day')
    const newEndDate = endDate.isAfter(maxEndDate) ? maxEndDate : endDate
    setEndDate(newEndDate)
    console.log('date ==> ', date)
    const formatstartDate = dayjs(date).toDate()
    console.log('formatstartDate ==> ', formatstartDate)
    setFormStartData(formatstartDate)
    // setFormendData(formenddata)
    if (saveChange) {
      setSave(false)
    }
  }
  const handleEndDateChange = (date: any) => {
    if (saveChange) {
      setSave(false)
    }
    setEndDate(date)
    const formattedendDate = dayjs(date).toDate()
    setFormendData(formattedendDate)
    // setFormStartData(formstartdata)
  }
  const handleChangeFrequency = (frequency: ISelectItem) => {
    setSelectedFrequency(frequency)
    if (saveChange) {
      setSave(false)
    }
  }
  const handleChangeWeek = (frequency: ISelectItem) => {
    setdayOfWeek(frequency)
    if (saveChange) {
      setSave(false)
    }
  }
  const getWeeksAfter = (date: Date | null, amount: number) => {
    return date ? addWeeks(date, amount) : undefined
  }
  const getPostAutomation = (val: any) => {
    PostAutomation2(val)
  }
  const getUpdateAutomation = (val: any) => {
    graphRef.current = val

    if (val && saveChange) {
      setSave(false)
    }
  }
  const [value, setValue] = useState<Dayjs | null>(dayjs())
  const timer = useRef({
    create: false,
    update: false,
  })
  const setTime = () => {
    PostAutomation({
      id: location.state.id,
      data: Flowdetail.data,
      startAt: formstartdata,
      endAt: formenddata,
      dayOfWeek: dayOfWeek.value,
      frequency: selectedFrequency.value,
    }).then(() => {
      toast.success('successfully')
      setcreateStatus(true)
      setTimeout(() => {
        getData()
        timer.current.create = false
      })
    })
  }
  const PostAutomation2 = (val: any[]) => {
    if (timer.current.create) return toast.warning("Don't click again")
    if (!val) {
      setTime()
      return
    }
    timer.current.create = true
    const tempList = val.filter((item) => {
      if (!item.data || Object.keys(item.data).length === 0) {
        return false
      } else {
        return true
      }
    })

    const result = makeThree(
      tempList.map((item: any) => {
        let childrenType = null
        if (item?.data?.level) {
          childrenType = item.data.level === 2 ? 'high' : 'normal'
        }
        const tempObj: any = {
          key: item.data.key,
          OutType: item.shape,
          type: item.data.type,
          childrenType,
          title: item.data.title || '',
          canAdd: item.data.canAdd || '',
          list: item.data.list,
        }

        console.log(item)
        if (item.shape == 'custom-time') {
          ;(tempObj.title = item.data.time || ''), (tempObj.list = item.data.timeType)
        } else if (
          (item.shape == 'custom-condiction' || item.shape == 'custom-normal-node') &&
          item.data.mold
        ) {
          tempObj.canAdd = item.data.mold
        }
        return tempObj
      })
    )
    if (!testTime()) {
      timer.current.create = false
      return
    }
    PostAutomation({
      id: location.state.id,
      data: result,
      startAt: formstartdata,
      endAt: formenddata,
      frequency: selectedFrequency.value,
      dayOfWeek: dayOfWeek.value,
    }).then(() => {
      toast.success('successfully')
      setcreateStatus(true)
      setTimeout(() => {
        getData()
        timer.current.create = false
      })
    })
  }
  const UpdateAutomation2 = (val: any) => {
    if (timer.current.update) return toast.warning("Don't click again")
    console.log('val ==> ', val)
    if (!val) {
      console.log('Flowdetail ==> ', Flowdetail)
      console.log('dayOfWeek ==> 发送请求', dayOfWeek)

      UpdateAutomation({
        id: location.state.id,
        data: Flowdetail.data,
        startAt: formstartdata,
        endAt: formenddata,
        frequency: selectedFrequency.value,
        dayOfWeek: dayOfWeek.value,
      }).then(() => {
        toast.success('Saved Successfully')
        setSave(true)
        timer.current.update = false
      })
      return
    }
    timer.current.update = true
    const tempList = val.filter((item: any) => {
      if (!item.data || Object.keys(item.data).length === 0) {
        return false
      } else {
        return true
      }
    })
    const result = makeThree(
      tempList.map((item: any) => {
        let childrenType = null
        if (item?.data?.level) {
          childrenType = item.data.level === 2 ? 'high' : 'normal'
        }
        const tempObj: any = {
          key: item.data.key,
          OutType: item.shape,
          type: item.data.type,
          childrenType,
          title: item.data.title || '',
          canAdd: item.data.canAdd || '',
          list: item.data.list,
        }
        if (item.shape == 'custom-time') {
          ;(tempObj.title = item.data.time || item.data.title),
            (tempObj.list = item.data.timeType || item.data.list)
        } else if (
          (item.shape == 'custom-condiction' || item.shape == 'custom-normal-node') &&
          item.data.mold
        ) {
          tempObj.canAdd = item.data.mold
        }
        return tempObj
      })
    )

    UpdateAutomation({
      id: location.state.id,
      data: result,
      startAt: formstartdata,
      endAt: formenddata,
      dayOfWeek: dayOfWeek.value,
      frequency: selectedFrequency.value,
    }).then(() => {
      toast.success('Saved Successfully')
      setSave(true)
      timer.current.update = false
    })
  }
  const handleClickGoto = () => {
    if (!saveChange) {
      setDeleteOn(true)
    } else {
      navigate(
        '/performance-management/task-allocation/automation-task/detail?id=' + location.state.id
      )
    }
  }

  const testTime = (): boolean => {
    if (!formenddata || !formstartdata) {
      setSnackbar(true)
      return false
    } else {
      const time1 = new Date(formstartdata as any)
      const time2 = new Date(formenddata as any)
      console.log('time ==> ', time1)
      console.log('time2 ==> ', time2)
      if (time1 < time2) {
      } else if (time1 > time2) {
        setSnackbar(true)
        return false
      } else {
        setSnackbar(true)
        return false
      }
    }
    return true
  }

  const handleClose = () => {
    setSnackbar(false)
  }

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Grid>
            <ButtonBack onClick={handleClickGoto} />
          </Grid>
          <Grid
            spacing={4}
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {/* <Grid container spacing={2} sx={{ height: '40px',flex: 1,marginRight:'10px'}}> */}
              <Grid>
                <Grid sx={{ fontSize: 15, display: 'flex', alignItems: 'center', height: '26px' }}>
                  <Typography variant='subtitle1' sx={{ fontSize: 15, paddingRight: '6px' }}>
                    Frequency
                  </Typography>
                  <FrequencySelect
                    hiddenLabel={true}
                    selected={selectedFrequency}
                    onChange={handleChangeFrequency}
                    options={AUDIT_SCHEDULE_FREQUENCYS}
                  />

                  {selectedFrequency.value === 'weekly' && (
                    <>
                      <Typography
                        variant='subtitle1'
                        sx={{ fontSize: 15, paddingRight: '6px', ml: 3 }}
                      >
                        Weekly
                      </Typography>
                      <FrequencySelect
                        hiddenLabel={true}
                        selected={dayOfWeek}
                        onChange={handleChangeWeek}
                        options={WEEK_FULL_DATE_LIST_NUMBEWR}
                      />
                    </>
                  )}
                </Grid>
              </Grid>
              <Grid
                sx={{ height: '26px' }}
                style={{ paddingRight: 4, height: '26px', marginRight: 8, marginTop: '-15px' }}
              >
                <DateTimePicker
                  className='TaskMindDateTimePicker'
                  sx={{ pl: 2 }}
                  value={startDate}
                  onChange={handleStartDateChange}
                  ampm={true}
                  timeSteps={{ hours: 1, minutes: 1 }}
                  minDate={dayjs().startOf('day')}
                />
                {/* maxDate={dayjs(startDate).add(1, 'day').startOf('day')} */}
              </Grid>
              <Grid
                sx={{ height: '26px' }}
                style={{ paddingRight: 4, height: '26px', marginRight: 8, marginTop: '-15px' }}
              >
                <DateTimePicker
                  className='TaskMindDateTimePicker'
                  sx={{ pl: 2 }}
                  value={endDate}
                  onChange={handleEndDateChange}
                  minDate={dayjs().startOf('day')}
                  timeSteps={{ hours: 1, minutes: 1 }}
                  ampm={true}
                />
                {/* maxDate={dayjs(startDate).add(1, 'day').startOf('day')} */}
              </Grid>
              <Grid style={{ height: '26px', marginTop: '-12px' }}>
                {Flowdetail && Flowdetail.taskId ? (
                  <Box component='div' display='block' borderColor='#dadada'>
                    <Box
                      sx={{
                        display: 'flex',
                        px: 4,
                        pb: 3.5,
                        boxSizing: 'border-box',
                      }}
                    >
                      <LoadingButton
                        variant='contained'
                        // color='primary' #3699ff
                        sx={{
                          ml: 3,
                          backgroundColor: '#3699FF',
                          color: '#FFFFFF',
                        }}
                        // disabled={!graphRef.current}
                        disabled={saveChange}
                        onClick={() => {
                          if (!testTime()) {
                            return
                          }
                          const data = graphRef.current
                            ?.toJSON()
                            ?.cells.filter(
                              (item: any) =>
                                item?.shape != 'edge' && !item?.data?.key?.includes('trigger')
                            )
                          // const res:any = PostAutomation(data)
                          // setcreateStatus(res)
                          // {
                          //   Flowdetail && Flowdetail?.data?.length > 0
                          //     ? UpdateAutomation(data)
                          //     : ''
                          // }
                          UpdateAutomation2(data)
                        }}
                      >
                        save changes
                        {/* {Flowdetail && Flowdetail?.data?.length > 0 ? <>save change</> : ''} */}
                      </LoadingButton>
                    </Box>
                  </Box>
                ) : (
                  <></>
                )}
              </Grid>
            </LocalizationProvider>
          </Grid>
        </Box>
      </Box>

      <Box sx={{ bgcolor: '#fff', p: 2, borderRadius: 2, mt: 2 }}>
        <AutomationTaskFlowChartDetail
          UpdateAutomation={getUpdateAutomation}
          createStatus={createStatus}
          PostAutomation={getPostAutomation}
          Flowdetail={Flowdetail}
        />
      </Box>
      <DeleteDialog
        open={deleteOn}
        onClose={() => setDeleteOn(false)}
        heading={
          'You have made changes to the data but have not saved them. Are you sure you want to exit?'
        }
        subHeading={''}
        submitBtnColor='primary'
        hasBack={true}
        labelBtnDelete='Exit'
        onDelete={() => {
          navigate(
            '/performance-management/task-allocation/automation-task/detail?id=' + location.state.id
          )
        }}
        onGoBack={() => setDeleteOn(false)}
        loading={false}
      />
      <Snackbar
        open={SnackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity='warning'>
          The time selection is incorrect. Please set it again.
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default PerformanceTaskAllocationAutomationTaskCreate
