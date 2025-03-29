import { FC, useMemo, useState } from 'react'
import { Card, Stack, Typography, Grid, Divider, Box, useTheme } from '@mui/material'
import dayjs from 'dayjs'
import FileSaver from 'file-saver'
import { toast } from 'react-toastify'
import { LoadingButton } from '@mui/lab'

import { IDashboardOverviewFilters } from '../../types/dashboard'
import { ISelectItem } from '../../types/common'
import Api from '../../api'
import { DATE_FORMAT_WITHOUT_TIME } from '../../constants/common'
import OverviewChart from '../audit/overview/OverviewChart'
import SimpleSelect from '../common/SimpleSelect'
import { DOWNLOAD_FILE_TYPES } from '../../helpers/constants'

const LEGENDS = [
  { label: 'Passed Audit', color: '#50CD89' },
  { label: 'Overall Failure', color: '#F1416C' },
  { label: 'IU Failure', color: '#FE9136' },
]

interface IProps {
  filters: IDashboardOverviewFilters
}

const DashboardAuditReport: FC<IProps> = ({ filters }) => {
  const theme = useTheme()

  const [fileType, setFileType] = useState<ISelectItem>(DOWNLOAD_FILE_TYPES[0])

  const projectIds = useMemo(() => {
    return filters.projects.map((p) => Number(p.value))
  }, [filters.projects])

  const locationIds = useMemo(() => {
    return filters.locations.map((p) => Number(p.value))
  }, [filters.locations])

  const { data: reports } = Api.useGetAuditReportsQuery({
    projectIds,
    locationIds,
    auditStates: [],
    startDate: dayjs(filters.startDate).startOf('day').toISOString(),
    endDate: dayjs(filters.endDate).endOf('day').toISOString(),
  })

  const { chartData, counts } = useMemo(() => {
    const chartData = []
    let totalCount = 0
    let passedCount = 0
    let overallFailedCount = 0
    let iuFailedCount = 0
    let avgWeekAudits = 0

    if (reports && reports?.length > 0) {
      const sortedReports = [...reports]?.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
      for (const item of sortedReports || []) {
        const date = dayjs(item.date).format(DATE_FORMAT_WITHOUT_TIME)
        const passed = item.count.passed
        const overallFailure = item.count.overallFailure
        const iuFailure = item.count.iuFailure
        const total = item.count.passed + item.count.overallFailure + item.count.iuFailure

        totalCount += total
        passedCount += passed
        overallFailedCount += overallFailure
        iuFailedCount += iuFailure

        chartData.push({
          date,
          passed,
          overallFailure,
          iuFailure,
          total,
        })
      }

      const totalWeeks =
        Math.ceil(dayjs(reports[0].date).diff(reports[reports.length - 1].date, 'day') / 7) || 1
      avgWeekAudits = totalCount / totalWeeks
    }

    const counts = [
      { label: 'Total audit received', value: totalCount },
      { label: 'Average audit of per week', value: avgWeekAudits.toFixed(1) },
      { label: 'Total passed audit', value: passedCount },
      { label: 'Total overall failure', value: overallFailedCount },
      { label: 'Total IU failure', value: iuFailedCount },
    ]

    return {
      chartData,
      counts,
    }
  }, [reports])

  const [downloadReport, { isLoading: downloadLoading }] = Api.useDownloadAuditReportMutation()
  const handleDownload = () => {
    downloadReport({
      fileFormat: fileType.value as 'pdf' | 'excel',
      projectIds,
      locationIds,
      auditStates: [],
      startDate: dayjs(filters.startDate).startOf('day').toISOString(),
      endDate: dayjs(filters.endDate).endOf('day').toISOString(),
    })
      .unwrap()
      .then((res) => {
        if (res) {
          if (fileType.value === 'pdf') {
            const type = 'application/zip'
            const blob = new Blob([res], {
              type: type,
            })
            FileSaver.saveAs(blob, `audit_report.zip`)
          } else {
            const type = 'aapplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            const blob = new Blob([res], {
              type: type,
            })
            FileSaver.saveAs(blob, `audit_report.xlsx`)
          }
        }
      })
      .catch((err) => {
        console.log('Failed to download audit report: ', err)
        toast.error(err?.data?.message || 'Failed to download audit report')
      })
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
        <Typography
          typography='h3'
          sx={{ fontSize: 18, fontWeight: 600, color: (theme) => theme.palette.grey[800] }}
        >
          Report from <br />
          {filters.startDate?.format('DD MMM YYYY')} to {filters.endDate?.format('DD MMM YYYY')}
        </Typography>
      </Stack>
      <Divider />
      <Box sx={{ px: 5, py: 3 }}>
        {!chartData.length && (
          <Box p={4}>
            <Typography align='center'>No Available Records</Typography>
          </Box>
        )}
        {!!chartData.length && (
          <Grid container spacing={2}>
            <Grid item lg={9} xs={12}>
              <OverviewChart data={chartData} selectedTypes={[]} hasLegend />
            </Grid>
            <Grid item lg={3} xs={12} sx={{ mt: { lg: 9, xs: 1 } }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2.75,
                      px: 2.5,
                      py: 3.25,
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
                                sx={{ fontWeight: 500, color: (theme) => theme.palette.grey[800] }}
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
                                  sx={{
                                    fontWeight: 500,
                                    color: (theme) => theme.palette.grey[800],
                                  }}
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
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
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
          value={fileType}
          options={DOWNLOAD_FILE_TYPES}
          onChange={(val) => setFileType(val)}
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
          loading={downloadLoading}
        >
          Download Report
        </LoadingButton>
      </Box>
    </Card>
  )
}

export default DashboardAuditReport
