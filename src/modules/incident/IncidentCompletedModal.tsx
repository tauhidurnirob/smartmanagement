import { FC, useEffect, useState } from 'react'
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import { FileRejection } from 'react-dropzone'

import DialogWrapper from '../common/DialogWrapper'
import TextareaWithLabel from '../common/TextareaWithLabel'
import { ImageDropzoneWithView } from '../common/ImageDropzoneWithView'
import { LoadingButton } from '@mui/lab'

interface IProps {
  open: boolean
  isUpdating: boolean
  onClose: () => void
  onSubmit: (flle: File, comment: string) => void
}

const IncidentCompletedModal: FC<IProps> = ({ open, onClose, onSubmit, isUpdating }) => {
  const [commits, setCommits] = useState<string>('')
  const [picture, setPicture] = useState<{ url: string; file: File } | null>(null)

  const handleDiscard = () => {
    setPicture(null)
    setCommits('')
  }

  const handleChangeCommits = (commits: string) => {
    setCommits(commits)
  }
  const handleChangeImage = (files: File[], fileRejections?: FileRejection[]) => {
    const file = files[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const picture = reader.result ? { url: reader.result as string, file } : null
        setPicture(picture)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = () => {
    if (picture && commits) {
      onSubmit(picture.file, commits)
    }
  }

  const initValues = () => {
    setCommits('')
    setPicture(null)
  }

  useEffect(() => {
    if (!open) {
      initValues()
    }
  }, [open])

  return (
    <>
      <DialogWrapper
        maxWidth='689px'
        label={'Incident Completed'}
        open={open}
        onClose={() => onClose()}
      >
        <DialogContent sx={{ p: 4, pb: 5.5 }}>
          <Box>
            <Typography typography='h5' sx={{ fontSize: 18, mb: 1 }}>
              Comments
            </Typography>
            <TextareaWithLabel
              name='commits'
              showLabel={false}
              onChange={(e) => handleChangeCommits(e.target.value)}
              value={commits}
              placeholder='Commits'
              rows={3}
            />
          </Box>
          <Box sx={{ mt: 3.5 }}>
            <Typography typography='h5' sx={{ fontSize: 18, mb: 2 }}>
              Upload Photo
            </Typography>
            <ImageDropzoneWithView
              maxFiles={1}
              onDrop={handleChangeImage}
              image={picture?.url}
              sx={{ width: '90px', height: '90px' }}
            />
          </Box>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Stack direction='row' justifyContent='flex-end' px={4} py={2} gap={2}>
            <Button
              variant='text'
              color='inherit'
              onClick={handleDiscard}
              sx={{ color: (theme) => theme.palette.grey[400], fontWeight: 500 }}
            >
              Skip
            </Button>
            <LoadingButton
              variant='contained'
              size='large'
              color='primary'
              loading={isUpdating}
              onClick={() => handleSubmit()}
            >
              Submit
            </LoadingButton>
          </Stack>
        </DialogActions>
      </DialogWrapper>
    </>
  )
}

export default IncidentCompletedModal
