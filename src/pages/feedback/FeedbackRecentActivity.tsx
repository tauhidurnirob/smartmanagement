import { Box, Typography } from '@mui/material'
import ButtonBack from '../../modules/common/ButtonBack'
import { To, useParams } from 'react-router-dom'
import { useMemo } from 'react'
import { tmpFeedbacks } from '../../modules/feedback/overview/dummy'
import IncidentEventTrailer from '../../modules/incident/IncidentEventTrailer'

const FeedbackRecentActivity = () => {
  const { id } = useParams()
  const feedback = useMemo(() => {
    return tmpFeedbacks.find((i) => i.id.toString() === id) || tmpFeedbacks[0]
  }, [id])

  return (
    <Box>
      <ButtonBack to={-1 as To} />
      <Typography mt={3} mb={1} fontSize={'19px'}>
        <Box component={'span'} color={'text.primary'} fontWeight={'600'}>
          Feedback ID:
        </Box>{' '}
        F3456978
      </Typography>
      <IncidentEventTrailer feedback={feedback} sx={{ mt: 2.5 }} incidentId={Number(id)} />
    </Box>
  )
}

export default FeedbackRecentActivity
