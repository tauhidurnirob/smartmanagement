import { Box } from '@mui/material'

import ButtonBack from '../../modules/common/ButtonBack'
import AuditScheduleDetail from '../../modules/audit/audit-schedule/AuditScheduleDetail'
import { useParams } from 'react-router'
import { IAuditSchedule } from '../../types/audit'

const AuditScheduleCreate = () => {
  const { id } = useParams()

  const schedule = { id: id ? Number(id) : -1 } as IAuditSchedule

  return (
    <Box>
      <ButtonBack to={'/audit/schedule'} />
      <AuditScheduleDetail schedule={schedule} />
    </Box>
  )
}

export default AuditScheduleCreate
