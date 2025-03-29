import { Box } from '@mui/material'

import ButtonBack from '../../modules/common/ButtonBack'
import AuditScheduleDetail from '../../modules/audit/audit-schedule/AuditScheduleDetail'

const AuditScheduleCreate = () => {
  return (
    <Box>
      <ButtonBack to={'/audit/schedule'} />
      <AuditScheduleDetail />
    </Box>
  )
}

export default AuditScheduleCreate
