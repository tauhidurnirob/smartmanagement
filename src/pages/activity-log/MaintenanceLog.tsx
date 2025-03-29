import { useMemo } from 'react'
import { Box } from '@mui/material'
import ActivityLogHeader from '../../modules/activity-log/ActivityLogHeader'
import DetailActivityList from '../../modules/common/DetailActivityList'
import { tmpMaintenanceActivityList } from './dummy'

const MaintenanceLog = () => {
  const { logs } = useMemo(() => {
    const logs = {
      count: tmpMaintenanceActivityList.length,
      rows: tmpMaintenanceActivityList,
    }

    return { logs }
  }, [])
  return (
    <Box>
      <ActivityLogHeader label='Maintenance Log' />
      <Box sx={{ mt: 3.25 }}>
        <DetailActivityList hiddenLabel hasParameters isActivityLog logList={logs} />
      </Box>
    </Box>
  )
}

export default MaintenanceLog
