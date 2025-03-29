import { Box, Typography } from '@mui/material'
import { To, useParams, useSearchParams } from 'react-router-dom'

import ButtonBack from '../../modules/common/ButtonBack'
import AuditDetailsByLocation from '../../modules/audit/overview/AuditDetailsByLocation'

const AuditDetails = () => {
  const { id } = useParams()

  const [searchParams] = useSearchParams()
  const yy = searchParams.get('year')
  const mm = searchParams.get('month')
  const formTypeId = searchParams.get('formTypeId')

  return (
    <Box>
      <ButtonBack to={-1 as To} />
      <Typography variant='h3' mt={3}>
        Audit Details
      </Typography>

      <AuditDetailsByLocation locationId={Number(id)} year={yy} month={mm} formTypeId={Number(formTypeId)} />
    </Box>
  )
}

export default AuditDetails
