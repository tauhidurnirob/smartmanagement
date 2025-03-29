import { FC, useMemo, useRef } from 'react'
import { Card, Stack, Typography, Grid, Divider, Box, useTheme } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import FileSaver from 'file-saver'
import { toast } from 'react-toastify'
import { LoadingButton } from '@mui/lab'
import { useDispatch } from 'react-redux'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

import {
  _getAuditOverviewState,
  _getIncidentReportFileType,
  _getIncidentReportFilters,
} from '../../store/_selectors'
import Api from '../../api'
import { DATE_FORMAT_WITHOUT_TIME } from '../../constants/common'
import { _auditOverviewActions } from '../../store/slices/audit'
import DatePickerWithText from '../../modules/common/DatePickerWithText'
import SimpleSelect from '../../modules/common/SimpleSelect'
import IncidentOverviewChart from './IncidentOverviewChart'
import { DOWNLOAD_FILE_TYPES } from '../../helpers/constants'
import _actions from '../../store/_actions'

const LEGENDS = [
  { label: 'Event Overdue', color: '#F64E60' },
  { label: 'Event Closed', color: '#0BB783' },
]

const IncidentReportCharts: FC = () => {
  const dispatch = useDispatch()
  const theme = useTheme()

  const refPrint = useRef<any>(null)

  const [downloadIncidentReportExcel, { isLoading: isDownloadingExcel }] =
    Api.useDownloadIncidentReportExcelMutation()

  const filters = _getIncidentReportFilters()
  const fileType = _getIncidentReportFileType()

  const types = useMemo(
    () => filters.reportTypes.map((i) => i.value as string),
    [filters.reportTypes]
  )

  const projectIds = useMemo(
    () => filters.projects.map((i) => i.value as number),
    [filters.projects]
  )

  const locationIds = useMemo(
    () => filters.locations.map((i) => i.value as number),
    [filters.locations]
  )

  const { data: reports } = Api.useGetIncidentReportQuery({
    projectIds,
    locationIds,
    startDate: filters.startDate.startOf('day').toISOString(),
    endDate: filters.endDate.endOf('day').toISOString(),
    types,
  })

  const { chartData, counts } = useMemo(() => {
    const chartData = []
    let totalCount = 0
    let completedCount = 0
    let overdueCount = 0
    let avgWeekIncidents = 0

    if (reports && reports?.length > 0) {
      const sortedReports = [...reports]?.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
      for (const item of sortedReports || []) {
        const date = dayjs(item.date).format(DATE_FORMAT_WITHOUT_TIME)
        const completed = item.count.closed
        const overdue = item.count.overdue
        const total = item.count.closed + item.count.overdue

        totalCount += total
        completedCount += completed
        overdueCount += overdue

        chartData.push({
          date,
          completed,
          overdue,
          total,
        })
      }

      const totalWeeks =
        Math.ceil(dayjs(reports[0].date).diff(reports[reports.length - 1].date, 'day') / 7) || 1
      avgWeekIncidents = totalCount / totalWeeks
    }

    const counts = [
      { label: 'Total all incident', value: totalCount },
      { label: 'Average incident of per week', value: avgWeekIncidents.toFixed(1) },
      { label: 'Total overdue event', value: overdueCount },
      { label: 'Total close event', value: completedCount },
    ]

    return {
      chartData,
      counts,
    }
  }, [reports])

  const handleChangeStartDate = (date: Dayjs | null) => {
    dispatch(
      _actions.incidents.report.setFilters({ ...filters, startDate: date || dayjs(new Date()) })
    )
  }
  const handleChangeEndDate = (date: Dayjs | null) => {
    dispatch(
      _actions.incidents.report.setFilters({ ...filters, endDate: date || dayjs(new Date()) })
    )
  }

  const handleDownload = async () => {
    if (fileType.value === 'pdf') {
      const captureElement = refPrint.current

      if (!captureElement) return

      const canvas = await html2canvas(captureElement)
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF()

      pdf.addImage(imgData, 'PNG', 5, 30, 203, 100)
      pdf.save('incident_report.pdf')
    } else {
      downloadIncidentReportExcel({
        types,
        projectIds,
        locationIds,
        startDate: filters.startDate.startOf('day').toISOString(),
        endDate: filters.endDate.endOf('day').toISOString(),
      })
        .unwrap()
        .then((res) => {
          const type = 'aapplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          const blob = new Blob([res], {
            type: type,
          })
          FileSaver.saveAs(blob, `incident_report.xlsx`)
        })
        .catch((err) => {
          console.log('Failed to download incident report: ', err)
          toast.error(err?.data?.message || 'Failed to download incident report')
        })
    }
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
          {filters.startDate.format('DD MMM YYYY')} to {filters.endDate.format('DD MMM YYYY')}
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
              date={filters.startDate}
              label='Start Date'
              onChange={handleChangeStartDate}
              placeholder='Start Date'
              sxBtn={{ minWidth: { xs: '100%' } }}
            />
          </Grid>
          <Grid item lg={6} xs={12} width={{ lg: 'auto', xs: '100%' }}>
            <DatePickerWithText
              date={filters.endDate}
              label='End Date'
              onChange={handleChangeEndDate}
              placeholder='End Date'
              sxBtn={{ minWidth: { xs: '100%' } }}
            />
          </Grid>
        </Grid>
      </Stack>
      <Divider />
      <Box sx={{ px: 5, py: 3 }} ref={refPrint}>
        <Grid container columnSpacing={0} rowSpacing={2}>
          <Grid item lg={9} xs={12}>
            <IncidentOverviewChart data={chartData} selectedTypes={[]} />
          </Grid>
          <Grid item lg={3} xs={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: 2,
                // justifyContent: 'space-between',
                // height: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { lg: 'column', xs: 'row' },
                  flexWrap: { xs: 'wrap' },
                  justifyContent: { lg: 'flex-start', xs: 'space-between' },
                  gap: 1.25,
                  px: 2.5,
                  py: 1.5,
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
                      <Typography
                        typography='subtitle1'
                        sx={{ fontWeight: 500, color: (theme) => theme.palette.grey[800] }}
                      >
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
          value={fileType}
          options={DOWNLOAD_FILE_TYPES}
          onChange={(val) => dispatch(_actions.incidents.report.setFileType(val))}
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
          loading={isDownloadingExcel}
        >
          Download Report
        </LoadingButton>
      </Box>
    </Card>
  )
}

export default IncidentReportCharts
