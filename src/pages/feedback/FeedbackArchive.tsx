import { Box, Typography } from "@mui/material"
import FeedbackList from "../../modules/feedback/overview/FeedbackList"


const FeedbackArchive = () => {
  return (
    <Box>
      <Typography typography={'h3'} mb={3}>Feedback</Typography>
      <Box mt={3}>
        <FeedbackList isArchive />
      </Box>
    </Box>
  )
}

export default FeedbackArchive