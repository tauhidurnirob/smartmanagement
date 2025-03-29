import { Box, Card, Stack, Typography } from "@mui/material"
import FeedbackInboxSidebar from "../../modules/feedback/inbox/FeedbackInboxSidebar"
import FeedbackInboxList from "../../modules/feedback/inbox/FeedbackInboxList"
import { _getFeedbackInboxState } from "../../store/_selectors"
import { useDispatch } from "react-redux"
import { _feedbackInboxActions } from "../../store/slices/feedback"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import FeedbackInboxDetails from "../../modules/feedback/inbox/FeedbackInboxDetails"
import { useState } from "react"
import FeedbackLabelAddEditModal from "../../modules/feedback/inbox/FeedbackLabelAddEditModal"
import FeedbackLabelList from "../../modules/feedback/inbox/FeedbackLabelList"

export const tmpLabels = [
  {
    label: 'Complaints',
    value: 'complaints'
  },
  {
    label: 'Compliments',
    value: 'compliments'
  },
  {
    label: 'Suggestions',
    value: 'suggestions'
  },
  {
    label: 'Feedback',
    value: 'feedback'
  }
]

const FeedbackInbox = () => {
  const {id} = useParams()
  const {pathname} = useLocation()
  
  const isDetails = Boolean(id)
  const isLabel = pathname.includes('label')
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const state = _getFeedbackInboxState()

  const [addModalOn, setAddModalOn] = useState(false)

  return (
    <Box>
      <Typography typography={'h3'} >Inbox</Typography>
      <Card sx={{mt: 3}}>
        <Stack direction={'row'}>
          <FeedbackInboxSidebar
            inboxType={state.inboxType}
            setInboxType={(val) => {
              dispatch(_feedbackInboxActions.setInboxType(val))
              navigate('/feedback/inbox')
            }}
            labels={tmpLabels}
            onAddClick={() => setAddModalOn(true)}
            onSettingsClick={() => navigate('/feedback/inbox/label')}
          />
          <Box flex={1}>
            {
              !isDetails && !isLabel && <FeedbackInboxList labels={tmpLabels} />
            }
            {isDetails && <FeedbackInboxDetails /> }
            {isLabel && <FeedbackLabelList /> }
          </Box>
        </Stack>
      </Card>
      <FeedbackLabelAddEditModal
        open={addModalOn}
        onClose={() => setAddModalOn(false)}
      />
    </Box>
  )
}

export default FeedbackInbox