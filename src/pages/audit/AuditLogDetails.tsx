import { Box, Typography } from '@mui/material'
import ButtonBack from '../../modules/common/ButtonBack'
import { To } from 'react-router-dom'
import AuditDetailsOverview from '../../modules/audit/audit-details/AuditDetailsOverview'

const AuditLogDetails = () => {
  return (
    <Box>
      <ButtonBack to={-1 as To} />
      <Typography variant='h3' mt={3}>
        Audit Log Details
      </Typography>

      {/* <AuditDetailsOverview
        name="Nanyang Junior College"
        mtr={22072.38}
        totalAudit={32}
        passedAudit={2}
        overallFailure={1}
        iuFailure={2}
        submissionDate={new Date()}
        audits={tmpAudits}
        isLoading={false}
      /> */}
    </Box>
  )
}

export default AuditLogDetails
