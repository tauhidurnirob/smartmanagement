import { FC } from 'react'
import { Button, DialogContent, Stack, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import DialogWrapper from '../../common/DialogWrapper'

interface IProps {
  open: boolean
  ids: number[]
  type: number
  onClose: (deleted?: boolean) => void
}

const AuditRecycleBinDeleteModal: FC<IProps> = ({ open, onClose }) => {
  const isLoading = false
  const handleGoBack = () => {
    onClose()
  }
  const handleDelete = () => {
    // Delete records per type
    onClose(true)
  }
  return (
    <>
      <DialogWrapper maxWidth='655px' label={''} open={open} onClose={() => onClose()}>
        <DialogContent sx={{ p: 4, pb: 7 }}>
          <Stack direction={'column'} justifyContent={'center'}>
            <Typography typography={'h2'} sx={{ fontSize: '1.625rem', textAlign: 'center', mb: 2 }}>
              Are you sure you want to permanently delete?
            </Typography>
            <Typography
              typography={'h5'}
              sx={{
                fontSize: '1.125rem',
                textAlign: 'center',
                mb: 4,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              This action cannot be undone, <br />
              so please be sure before proceeding.
            </Typography>
            <Stack direction='row' justifyContent='center' gap={2}>
              <Button
                variant='contained'
                color='primary'
                size='large'
                onClick={handleGoBack}
                sx={{ px: 3 }}
              >
                Cancel
              </Button>
              <LoadingButton
                variant='contained'
                loading={isLoading}
                color='error'
                size='large'
                onClick={() => handleDelete()}
                sx={{ px: 3 }}
              >
                Delete
              </LoadingButton>
            </Stack>
          </Stack>
        </DialogContent>
      </DialogWrapper>
    </>
  )
}

export default AuditRecycleBinDeleteModal
