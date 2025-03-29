import { FC, useMemo } from 'react'
import { Card, Stack, Typography, Grid, Divider, Box, useTheme } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import { LoadingButton } from '@mui/lab'
import { useDispatch } from 'react-redux'

import { _getAuditOverviewState } from '../../store/_selectors'
import { DATE_FORMAT_WITHOUT_TIME } from '../../constants/common'
import { _auditOverviewActions } from '../../store/slices/audit'
import DatePickerWithText from '../common/DatePickerWithText'
import SimpleSelect from '../common/SimpleSelect'
import { DOWNLOAD_FILE_TYPES } from '../../helpers/constants'
import DeviceOverviewChart from './DeviceOverviewChart'

const reports = [
  {
    date: '2023-06-14T10:10:00.000000Z',
    count: { received: 20, alert: 5, online: 35, offline: 15, swap: 20, error: 25 },
  },
  {
    date: '2023-06-15T10:10:00.000000Z',
    count: { received: 15, alert: 5, online: 35, offline: 15, swap: 20, error: 25 },
  },
  {
    date: '2023-06-16T10:10:00.000000Z',
    count: { received: 20, alert: 5, online: 35, offline: 15, swap: 20, error: 25 },
  },
  {
    date: '2023-06-17T10:10:00.000000Z',
    count: { received: 15, alert: 5, online: 35, offline: 15, swap: 20, error: 25 },
  },
  {
    date: '2023-06-18T10:10:00.000000Z',
    count: { received: 15, alert: 5, online: 35, offline: 15, swap: 20, error: 25 },
  },
]

const LEGENDS = [
  { label: 'Device Alert', color: '#F64E60' },
  { label: 'Device Online', color: '#0BB783' },
  { label: 'Device Offline', color: '#3699FF' },
  { label: 'Device Swap', color: '#8950FC' },
  { label: 'Device Error', color: '#A5742B' },
]

interface IProps {
  projectIds: number[]
  locationIds: number[]
}

const DeviceReportCharts: FC<IProps> = ({ projectIds, locationIds }) => {
  const dispatch = useDispatch()
  const audit = _getAuditOverviewState()
  const theme = useTheme()

  // const [downloadReport, { isLoading: downloadLoading }] = Api.useDownloadAuditReportMutation()

  // const { data: reports } = Api.useGetAuditReportsQuery({
  //   projectIds,
  //   locationIds,
  //   startDate: audit.chartStartDate.toISOString(),
  //   endDate: audit.chartEndDate.toISOString(),
  // })

  const { chartData, counts } = useMemo(() => {
    const chartData = []
    let totalReceivedCount = 0
    let totalAlertCount = 0
    let totalSwapCount = 0
    let avgWeekAlerts = 0

    if (reports && reports?.length > 0) {
      const sortedReports = [...reports]?.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
      for (const item of sortedReports || []) {
        const date = dayjs(item.date).format(DATE_FORMAT_WITHOUT_TIME)
        const alert = item.count.alert
        const online = item.count.online
        const offline = item.count.offline
        const swap = item.count.swap
        const error = item.count.error
        const received = item.count.received

        totalReceivedCount += received
        totalAlertCount += alert
        totalSwapCount += swap

        chartData.push({
          date,
          received,
          alert,
          online,
          offline,
          swap,
          error,
        })
      }

      const totalWeeks =
        Math.ceil(dayjs(reports[0].date).diff(reports[reports.length - 1].date, 'day') / 7) || 1
      avgWeekAlerts = totalAlertCount / totalWeeks
    }

    const counts = [
      { label: 'Total all alert received', value: totalReceivedCount },
      { label: 'Average alert of per week', value: avgWeekAlerts.toFixed(1) },
      { label: 'Total device alert', value: totalAlertCount },
      { label: 'Total device swap', value: totalSwapCount },
    ]

    return {
      chartData,
      counts,
    }
  }, [reports])

  const handleChangeStartDate = (date: Dayjs | null) => {
    dispatch(_auditOverviewActions.setChartStartDate(date || dayjs(new Date())))
  }
  const handleChangeEndDate = (date: Dayjs | null) => {
    dispatch(_auditOverviewActions.setChartStartDate(date || dayjs(new Date())))
  }

  const handleDownload = () => {
    // downloadReport({
    //   fileFormat: audit.chartFileType.value as 'pdf' | 'excel',
    //   projectIds,
    //   locationIds,
    //   startDate: audit.chartStartDate.toISOString(),
    //   endDate: audit.chartEndDate.toISOString(),
    // })
    //   .unwrap()
    //   .then((res) => {
    //     if (res) {
    //       if (audit.chartFileType.value === 'pdf') {
    //         const type = 'application/pdf'
    //         const blob = new Blob([res], {
    //           type: type,
    //         })
    //         FileSaver.saveAs(blob, `audit_report.pdf`)
    //       } else {
    //         const type = 'aapplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    //         const blob = new Blob([res], {
    //           type: type,
    //         })
    //         FileSaver.saveAs(blob, `audit_report.xlsx`)
    //       }
    //     }
    //   })
    //   .catch((err) => {
    //     console.log('Failed to download audit report: ', err)
    //     toast.error(err?.data?.message || 'Failed to download audit report')
    //   })
  }

  return (
    <Card>
      <Stack
        direction={{ lg: 'row', xs: 'column' }}
        flexWrap={{ lg: 'nowrap', xs: 'wrap' }}
        justifyContent={'space-between'}
        sx={{ pl: 3, pr: 5, pt: 2.25, pb: 2.75 }}
        gap={2}
      >
        <Typography typography='h3' sx={{ fontSize: 18, fontWeight: 600, color: 'grey.800' }}>
          Report from <br />
          {audit.chartStartDate.format('DD MMM YYYY')} to {audit.chartEndDate.format('DD MMM YYYY')}
        </Typography>
        <Grid
          container
          flexDirection={{ lg: 'row', xs: 'column' }}
          flexWrap={{ lg: 'wrap', xs: 'wrap' }}
          alignItems={'center'}
          columnSpacing={4.25}
          rowSpacing={2}
          maxWidth={{ lg: '500px' }}
        >
          <Grid item lg={6} xs={12} width={{ lg: 'auto', xs: '100%' }}>
            <DatePickerWithText
              date={audit.chartStartDate}
              label='Start Date'
              onChange={handleChangeStartDate}
              placeholder='Start Date'
              sxBtn={{ minWidth: { xs: '100%' }, '.MuiTypography-root': { color: '#000' } }}
            />
          </Grid>
          <Grid item lg={6} xs={12} width={{ lg: 'auto', xs: '100%' }}>
            <DatePickerWithText
              date={audit.chartEndDate}
              label='End Date'
              onChange={handleChangeEndDate}
              placeholder='End Date'
              sxBtn={{ minWidth: { xs: '100%' }, '.MuiTypography-root': { color: '#000' } }}
            />
          </Grid>
        </Grid>
      </Stack>
      <Divider />
      <Box sx={{ px: 5, py: 3 }}>
        <Grid container columnSpacing={0} rowSpacing={2}>
          <Grid item lg={9} xs={12}>
            <DeviceOverviewChart data={chartData} selectedTypes={[]} />
          </Grid>
          <Grid item lg={3} xs={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { lg: 'column', xs: 'row' },
                  flexWrap: { xs: 'wrap' },
                  justifyContent: { lg: 'flex-start', xs: 'space-between' },
                  gap: 1.5,
                  px: 2.5,
                  py: 2.5,
                  background: (theme) => theme.palette.grey[50],
                  borderRadius: 3,
                }}
              >
                {LEGENDS.map((legend, idx) => {
                  return (
                    <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                      <Box
                        sx={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: legend.color,
                        }}
                      />
                      <Typography typography='h6' sx={{ fontWeight: 500, color: 'grey.800' }}>
                        {legend.label}
                      </Typography>
                    </Box>
                  )
                })}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3.75,
                  px: 2.5,
                  py: 2.75,
                  background: (theme) => theme.palette.grey[50],
                  borderRadius: 3,
                }}
              >
                {counts.map((count, idx) => {
                  return (
                    <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                      <Grid container spacing={1} alignItems={'center'}>
                        <Grid item xs={6}>
                          <Typography
                            typography='subtitle1'
                            sx={{ fontWeight: 500, color: 'grey.800' }}
                          >
                            {count.label}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Box
                            sx={{
                              display: 'flex',
                              width: '100%',
                              borderRadius: '5px',
                              background: '#D9D9D9',
                              alignItems: 'center',
                              justifyContent: 'center',
                              p: 2,
                            }}
                          >
                            <Typography
                              typography='h3'
                              sx={{ fontWeight: 500, color: (theme) => theme.palette.grey[800] }}
                            >
                              {count.value}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  )
                })}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          pt: 2.5,
          pb: 3,
          px: 5,
        }}
      >
        <Typography
          typography='h3'
          sx={{ fontSize: 18, fontWeight: 500, color: (theme) => theme.palette.grey[800] }}
        >
          Download Report Format
        </Typography>
        <SimpleSelect
          value={audit.chartFileType}
          options={DOWNLOAD_FILE_TYPES}
          onChange={(val) => dispatch(_auditOverviewActions.setChartFileType(val))}
          width='173px'
          color={theme.palette.grey[800]}
          sx={{
            ml: 1.5,
          }}
        />
        <LoadingButton
          variant='contained'
          color='primary'
          onClick={handleDownload}
          sx={{ ml: 3, py: 1 }}
          // loading={downloadLoading}
        >
          Download Report
        </LoadingButton>
      </Box>
    </Card>
  )
}

export default DeviceReportCharts
