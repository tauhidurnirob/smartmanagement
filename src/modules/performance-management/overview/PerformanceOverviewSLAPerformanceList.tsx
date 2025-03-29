import { FC, useState } from 'react'
import { Card, Stack, Box, Typography, Divider } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import SimpleSelect from '../../common/SimpleSelect'
import { ISelectItem } from '../../../types/common'
import {
  DOWNLOAD_FILE_TYPES,
  PERFORMANCE_SLA_DATE_LIST,
  PERFORMANCE_SLA_TYPE_LIST,
} from '../../../helpers/constants'
import PerformanceOverviewSLAChart from './PerformanceOverviewSLAChart'

const tmpCharData = [
  { date: '2022-04', area: 0, achieved: 33 },
  { date: '2022-05', area: 0, achieved: 26 },
  { date: '2022-06', area: 0, achieved: 45 },
  { date: '2022-07', area: 1, achieved: 57 },
  { date: '2022-08', area: 0, achieved: 33 },
  { date: '2022-09', area: 0, achieved: 28 },
  { date: '2022-10', area: 0, achieved: 19 },
  { date: '2022-11', area: 1, achieved: 7 },
  { date: '2022-12', area: 2, achieved: 19 },
]

interface IProps {
  data?: any
}

const PerformanceOverviewSLAPerformanceList: FC<IProps> = ({}) => {
  const [type, setType] = useState<ISelectItem>(PERFORMANCE_SLA_TYPE_LIST[0])
  const [downloadType, setDownloadType] = useState<ISelectItem>(DOWNLOAD_FILE_TYPES[0])
  const [selectedDate, setSelectedDate] = useState<ISelectItem>(PERFORMANCE_SLA_DATE_LIST[0])

  const handleChangeType = (t: ISelectItem) => {
    setType(t)
  }

  const handleChangeDate = (t: ISelectItem) => {
    setSelectedDate(t)
  }

  const handleChangeDownloadType = (t: ISelectItem) => {
    setDownloadType(t)
  }

  return (
    <Card sx={{ height: '100%' }}>
      <Stack
        direction='column'
        rowGap={{ lg: 3.75, xs: 3 }}
        sx={{ pt: 3, pl: 2.5, pr: 3, pb: 3.25 }}
      >
        <Stack direction={'row'} justifyContent={'space-between'} flexWrap={'wrap'}>
          <Typography typography={'h3'} color='grey.800'>
            SLA Performance Report
          </Typography>
          <Stack direction={'row'} columnGap={2.75} flexWrap={'wrap'} sx={{ mt: 0.5 }}>
            <SimpleSelect
              width={'100%'}
              options={PERFORMANCE_SLA_TYPE_LIST}
              value={type}
              onChange={(t) => handleChangeType(t)}
            />
            <SimpleSelect
              width={'100%'}
              options={PERFORMANCE_SLA_DATE_LIST}
              value={selectedDate}
              onChange={(t) => handleChangeDate(t)}
            />
          </Stack>
        </Stack>
      </Stack>
      <Divider sx={{ borderColor: '#EBEDF3' }} />
      <Box sx={{ pb: 3, pt: 2 }}>
        <PerformanceOverviewSLAChart data={tmpCharData} />
      </Box>
      <Divider sx={{ borderColor: '#EBEDF3' }} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          pt: 2.5,
          pl: 2.5,
          pr: 3,
          pb: 3,
        }}
      >
        <Typography typography='h5' sx={{ fontWeight: 500, color: 'grey.800' }}>
          Download Report Format
        </Typography>
        <SimpleSelect
          value={downloadType}
          options={DOWNLOAD_FILE_TYPES}
          onChange={(val) => handleChangeDownloadType(val)}
          width='173px'
          color={'grey.800'}
          sx={{
            ml: 2.5,
          }}
        />
        <LoadingButton
          variant='contained'
          color='primary'
          // onClick={handleDownload}
          sx={{ ml: 2.5, py: 1 }}
          // loading={downloadLoading}
        >
          Download Report
        </LoadingButton>
      </Box>
    </Card>
  )
}

export default PerformanceOverviewSLAPerformanceList
