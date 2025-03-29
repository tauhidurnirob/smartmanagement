import { Box, Typography } from "@mui/material"
import FeedbackList from "../../modules/feedback/overview/FeedbackList"

const FeedbackOverview = () => {
  return (
    <Box>
      <Typography typography={'h3'} mb={3}>Feedback</Typography>
      <Box mt={3}>
        <FeedbackList />
      </Box>
    </Box>
  )
}

export default FeedbackOverview