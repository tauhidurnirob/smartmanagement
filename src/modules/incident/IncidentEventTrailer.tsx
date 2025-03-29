import { FC, useState } from 'react'
import { Card, SxProps, Box, Typography, Divider, Stack } from '@mui/material'

import { CommentsIcon } from '../../assets/icons/comments'
import TextareaWithLabel from '../common/TextareaWithLabel'
import IncidentEventItem from './IncidentEventItem'
import EventTrailerTextEditor from './EventTrailerTextEditor'
import { IFeedback } from '../../types/feedback'
import { getFeedbackStatusInfo } from '../feedback/overview/FeedbackList'
import CustomChip from '../common/CustomChip'
import Api from '../../api'
import { toast } from 'react-toastify'

interface IProps {
  incidentId: number
  sx?: SxProps
  feedback?: IFeedback
}

const IncidentEventTrailer: FC<IProps> = ({ sx, feedback, incidentId }) => {
  const { data: eventList, isFetching: isLoading } = Api.useGetIncidentEventsQuery({
    incidentId,
    page: 1,
    limit: 100,
    orderBy: 'createdAt',
    orderDir: 'asc',
  })
  const [commentIncident, { isLoading: isCommenting }] = Api.useCommentIncidentMutation()

  const [commits, setCommits] = useState<string>('')
  const [commentEditorOn, setCommentEditorOn] = useState<boolean>(false)

  const events = eventList?.rows || []

  const handleChangeCommits = (commits: string) => {
    setCommits(commits)
  }
  const statusInfo = getFeedbackStatusInfo(feedback?.status ?? '')

  const handldComment = (comment: string) => {
    console.log('comment: ', comment)
    commentIncident({
      incidentId: incidentId,
      comment,
    })
      .unwrap()
      .then(() => {
        toast.success('Commentted incident')
      })
      .catch((err) => {
        console.log('Failed to comment incident: ', err)
        toast.error('Failed to comment incident')
      })
  }

  return (
    <Card sx={{ ...(sx || {}) }}>
      <Box sx={{ px: 3.75, pt: 5, pb: 2.5 }}>
        {feedback ? (
          <Stack direction={'row'} gap={3} flexWrap={'wrap'}>
            <Typography variant='h3'>Recent Activity</Typography>
            <CustomChip
              type={statusInfo ? statusInfo.chipType : 'error'}
              text={statusInfo ? statusInfo.label : '-'}
            />
          </Stack>
        ) : (
          <Typography variant='h3'>Event Trail</Typography>
        )}
      </Box>
      <Divider light />
      <Stack
        sx={{
          maxHeight: '568px',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#DEDEDE',
            borderRadius: '120px',
          },
        }}
      >
        {events.map((event, idx) => {
          return (
            <IncidentEventItem
              key={idx}
              event={event}
              isFirst={idx === 0}
              isLast={idx === events.length - 1}
            />
          )
        })}
      </Stack>
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'row',
          boxShadow: '0px -4px 4px rgba(0, 0, 0, 0.25)',
          minHeight: '4.75rem',
          pr: 3.75,
          pl: 1.75,
          py: 1.75,
          gap: 2,
          alignItems: 'flex-start',
        }}
      >
        {!commentEditorOn && (
          <>
            <Box sx={{ flex: 1, mt: 0.5 }}>
              <TextareaWithLabel
                name='commits'
                showLabel={false}
                onChange={(e) => handleChangeCommits(e.target.value)}
                value={commits}
                placeholder='Write a Comment'
                minRows={1}
                sx={{
                  '.MuiInputBase-input': { background: '#ffffff', borderRadius: 0, border: 'none' },
                }}
                onFocus={() => setCommentEditorOn(true)}
              />
            </Box>
            <CommentsIcon sx={{ color: 'rgba(181, 181, 195)', fontSize: '50px' }} />
          </>
        )}
        {commentEditorOn && (
          <EventTrailerTextEditor isLoading={isCommenting} onComment={handldComment} />
        )}
      </Stack>
    </Card>
  )
}

export default IncidentEventTrailer
