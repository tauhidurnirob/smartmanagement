import { useMemo } from 'react'
import { Box } from '@mui/material'

import DetailActivityList from '../../modules/common/DetailActivityList'
import { tmpAuditActivityList } from './dummy'
import ActivityLogHeader from '../../modules/activity-log/ActivityLogHeader'

const AuditActivityLog = () => {
  const { logs } = useMemo(() => {
    const logs = {
      count: tmpAuditActivityList.length,
      rows: tmpAuditActivityList,
    }

    return { logs }
  }, [])
  return (
    <Box>
      <ActivityLogHeader label='Audit Log' />
      <Box sx={{ mt: 3.25 }}>
        <DetailActivityList hiddenLabel hasParameters isActivityLog logList={logs} />
      </Box>
    </Box>
  )
}

export default AuditActivityLog
