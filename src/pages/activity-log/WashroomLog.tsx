import { useMemo } from 'react'
import { Box } from '@mui/material'
import ActivityLogHeader from '../../modules/activity-log/ActivityLogHeader'
import DetailActivityList from '../../modules/common/DetailActivityList'
import { tmpWashroomActivityList } from './dummy'

const WashroomLog = () => {
  const { logs } = useMemo(() => {
    const logs = {
      count: tmpWashroomActivityList.length,
      rows: tmpWashroomActivityList,
    }

    return { logs }
  }, [])
  return (
    <Box>
      <ActivityLogHeader label='Washroom Management Log' />
      <Box sx={{ mt: 3.25 }}>
        <DetailActivityList hiddenLabel hasParameters isActivityLog logList={logs} />
      </Box>
    </Box>
  )
}

export default WashroomLog
