import { createSlice } from '@reduxjs/toolkit'
import { FEEDBACK_INBOX_TABS } from '../../../helpers/constants'

interface FeedbackInboxState {
  inboxType: string
}

const initialState: FeedbackInboxState = {
  inboxType: FEEDBACK_INBOX_TABS[0].value,
}

const feedbackInboxSlice = createSlice({
  name: 'feedbackInbox',
  initialState,
  reducers: {
    setInboxType: (state, action) => {
      state.inboxType = action.payload
    },
  },
})

export default feedbackInboxSlice
