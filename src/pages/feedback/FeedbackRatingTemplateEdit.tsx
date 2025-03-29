import { useParams } from 'react-router-dom'
import { Box, Card } from '@mui/material'

import Api from '../../api'
import AuditRatingTemplateCreateEdit from '../../modules/audit/audit-rating-template/AuditRatingTemplateCreateEdit'
import BackDrop from '../../modules/common/BackDrop'

const FeedbackRatingTemplateEdit = () => {
  const { id } = useParams()

  const ratingTemplateId = id ? Number(id) : 0
  const isNumber = Number.isInteger(Number(id))

  const { data: ratingTemplate, isFetching: isLoading } = Api.useGetAuditRatingTemplateByIdQuery(
    ratingTemplateId,
    { skip: !isNumber }
  )

  if (isLoading) {
    return (
      <Card
        sx={{
          height: '100%',
          minHeight: 'calc(100vh - 150px)',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
        }}
      >
        <Box sx={{ position: 'relative', height: '60px' }}>
          <BackDrop />
        </Box>
      </Card>
    )
  }

  return <AuditRatingTemplateCreateEdit ratingTemplate={ratingTemplate} />
}

export default FeedbackRatingTemplateEdit
