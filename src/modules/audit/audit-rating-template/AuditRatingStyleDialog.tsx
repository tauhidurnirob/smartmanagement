import { FC } from 'react'
import { Box, DialogContent, Divider, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import DialogWrapper from '../../common/DialogWrapper'
import { IRatingTemplate } from '../../../types/audit'
import { AUDIT_RATING_STYLES } from '../../../helpers/constants'
import RatingNumberStyleList from './rating-style-list/RatingNumberStyleList'
import RatingTextStyleList from './rating-style-list/RatingTextStyleList'
import RatingEmojiStyleList from './rating-style-list/RatingEmojiStyleList'

interface IProps {
  open: boolean
  data?: IRatingTemplate
  onClose: () => void
}

const AuditRatingStyleDialog: FC<IProps> = (props) => {
  const { onClose, open, data } = props

  const navigate = useNavigate()

  const handleGoEdit = () => {
    if (data && data.id) {
      navigate(`/audit/audit-form-template/rating-template/${data.id}`)
      onClose()
    }
  }

  return (
    <DialogWrapper
      label={data?.inspectionUnit || ''}
      onClose={onClose}
      open={open}
      maxWidth={'1002px'}
    >
      <DialogContent sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {data?.style === AUDIT_RATING_STYLES[0].value && <RatingNumberStyleList data={data} />}
          {data?.style === AUDIT_RATING_STYLES[2].value && (
            <RatingEmojiStyleList ratingOfNumber={5} data={data} />
          )}
        </Box>
        {data?.style === AUDIT_RATING_STYLES[1].value && (
          <Box sx={{ paddingLeft: 0 }}>
            <RatingTextStyleList ratingOfNumber={data?.numberOfRating as number} data={data} />
          </Box>
        )}
        <Divider light sx={{ mt: 3 }} />
        <Box sx={{ textAlign: 'right', mt: 3 }}>
          <Button variant='contained' color='primary' onClick={handleGoEdit}>
            Edit
          </Button>
        </Box>
      </DialogContent>
    </DialogWrapper>
  )
}

export default AuditRatingStyleDialog
