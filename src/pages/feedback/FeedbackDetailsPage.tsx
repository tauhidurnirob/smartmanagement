import { Box, Button, Card, Stack, Typography } from "@mui/material"
import ButtonBack from "../../modules/common/ButtonBack"
import { To, useNavigate, useParams } from "react-router-dom"
import { ActivityIcon } from "../../assets/icons/activity"
import { TagIcon } from "../../assets/icons/tag"
import { DownloadBoxIcon } from "../../assets/icons/download-box"
import { useMemo, useState } from "react"
import { tmpFeedbacks } from "../../modules/feedback/overview/dummy"
import FeedbackDetails from "../../modules/feedback/overview/FeedbackDetails"
import FeedbackReAssignModal from "../../modules/feedback/overview/FeedbackReAssignModal"
import DeleteDialog from "../../modules/common/DeleteDialog"


const FeedbackDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [assignFeedbackOn, setAssignFeedbackOn] = useState(false)
  const [archiveFeedbackOn, setArchiveFeedbackOn] = useState(false)

  const feedback = useMemo(() => {
    return tmpFeedbacks.find((i) => i.id.toString() === id) || tmpFeedbacks[0]
  }, [id])

  return (
    <Box>
      <ButtonBack to={-1 as To} />
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} mt={3} flexWrap={'wrap'} gap={2} >
        <Typography typography={'h3'} >Feedback Details</Typography>
        <Stack direction={'row'} alignItems={'center'} flexWrap={'wrap'} gap={2}>
          <Button
            variant="contained"
            color="yellow"
            startIcon={<ActivityIcon />}
            sx={{minWidth: '160px'}}
            onClick={() => navigate('recent-activity')}
          >
            Recent Activity
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<TagIcon />}
            sx={{minWidth: '160px'}}
            onClick={() => setAssignFeedbackOn(true)}
          >
            Re-assign
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<DownloadBoxIcon />}
            sx={{minWidth: '160px'}}
            onClick={() => setArchiveFeedbackOn(true)}
          >
            Archive
          </Button>
        </Stack>
      </Stack>
      <FeedbackDetails feedback={feedback} />
      <FeedbackReAssignModal
        open={assignFeedbackOn}
        onClose={() => setAssignFeedbackOn(false)}
      />
      <DeleteDialog
        open={archiveFeedbackOn}
        onClose={() => setArchiveFeedbackOn(false)}
        heading='Are you sure you want to archive the selected feedback?'
        subHeading='Once archived, the feedback will be removed from the overview tab and moved to the archive tab.'
        loading={false}
        onGoBack={() => null}
        onDelete={() => null}
        isArchive={true}
      />
    </Box>
  )
}

export default FeedbackDetailsPage