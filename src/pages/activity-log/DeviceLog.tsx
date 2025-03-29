import { useMemo } from 'react'
import { Box } from '@mui/material'

import ActivityLogHeader from '../../modules/activity-log/ActivityLogHeader'
import DetailActivityList from '../../modules/common/DetailActivityList'
import { tmpDeviceActivityList } from './dummy'

const DeviceLog = () => {
  const { logs } = useMemo(() => {
    const logs = {
      count: tmpDeviceActivityList.length,
      rows: tmpDeviceActivityList,
    }

    return { logs }
  }, [])
  return (
    <Box>
      <ActivityLogHeader label='Device Log' />
      <Box sx={{ mt: 3.25 }}>
        <DetailActivityList hiddenLabel hasParameters isActivityLog logList={logs} />
      </Box>
    </Box>
  )
}

export default DeviceLog
