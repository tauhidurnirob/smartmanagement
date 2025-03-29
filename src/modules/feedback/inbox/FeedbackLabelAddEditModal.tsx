import { FC } from "react"
import DialogWrapper from "../../common/DialogWrapper"
import { Box, Button, DialogContent, Divider, Typography } from "@mui/material"
import TextFieldWithLabel from "../../common/TextFieldWithLabel"
import { LoadingButton } from "@mui/lab"

interface IProps {
  labelId?: number
  open: boolean
  onClose: () => void
}

const FeedbackLabelAddEditModal:FC<IProps> = ({
  labelId,
  open,
  onClose
}) => {
  const isEdit = !!labelId
  return (
    <DialogWrapper
      open={open}
      label={isEdit ? 'Edit Label' : 'Add Label'}
      maxWidth={'sm'}
      onClose={onClose}
    >
      <Box p={4}>
        <Typography variant="h5" fontSize={'18px'}>{isEdit ? 'Edit Label Name' : 'Add Label Name'}</Typography>
        <TextFieldWithLabel
          hiddenLabel
          name="field"
          placeholder="Label name"
        />
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 4, pt: 2.5, pb: 3.5 }}>
        <Button
          variant='text'
          sx={{ color: (theme) => theme.palette.grey[400] }}
          onClick={() => null}
        >
          Cancel
        </Button>
        <LoadingButton
          variant='contained'
          color='primary'
          sx={{ ml: 3 }}
          onClick={() => null}
          loading={false}
        >
          {isEdit ? 'Save' : 'Add'}
        </LoadingButton>
      </Box>
    </DialogWrapper>
  )
}

export default FeedbackLabelAddEditModal