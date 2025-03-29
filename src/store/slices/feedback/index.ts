import feedbackInboxSlice from "./FeedbackInbox"


const FeedbackReducers = {
  [feedbackInboxSlice.name]: feedbackInboxSlice.reducer
}
const _feedbackInboxActions = {
  ...feedbackInboxSlice.actions
}

export {
  FeedbackReducers,
  _feedbackInboxActions,
}
