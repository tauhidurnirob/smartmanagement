import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material'
import { FC } from 'react'
import { LoadingButton } from '@mui/lab'
import { CloseDuotone } from '../../assets/icons/close-duotone'

interface IProps {
  open: boolean
  onClose: () => void
  heading?: string | React.ReactNode
  subHeading?: string | React.ReactNode
  onGoBack: () => void
  onDelete: () => void
  loading: boolean
  maxWidth?: string | number
  isArchive?: boolean
  isSignOut?: boolean
  labelBtnDelete?: string
  labelBtnCancel?: string
  hasCancel?: boolean
  hasBack?: boolean
  submitBtnColor?: 'error' | 'primary'
}

const DeleteDialog: FC<IProps> = ({
  open,
  onClose,
  heading,
  subHeading,
  onGoBack,
  onDelete,
  loading,
  maxWidth,
  isArchive,
  isSignOut,
  labelBtnDelete,
  labelBtnCancel,
  hasCancel,
  hasBack,
  submitBtnColor,
}) => {
  return (
    <Dialog
      open={open}
      onClose={(e: any) => {
        e.stopPropagation()
        onClose()
      }}
      sx={{ p: '25px' }}
      PaperProps={{
        sx: { width: '100%', maxWidth: maxWidth, m: 'auto', borderRadius: 5 },
      }}
    >
      <DialogTitle align='right'>
        <IconButton
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          size='small'
          sx={{ color: (theme) => theme.palette.grey[600], borderRadius: 2, p: 0 }}
        >
          <CloseDuotone sx={{ fontSize: 36 }} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: '34px 30px' }}>
        {heading && (
          <Typography variant='h2' align='center' mt={3}>
            {heading}
          </Typography>
        )}
        {subHeading && (
          <Typography fontSize={'1rem'} color='text.secondary' align='center' mt={2}>
            {subHeading}
          </Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ mb: '30px', display: 'flex', justifyContent: 'center', gap: 2 }}>
        {isArchive || isSignOut || hasCancel ? (
          <Button
            variant='text'
            color='inherit'
            sx={{ color: (theme) => theme.palette.grey[400], fontWeight: 500 }}
            disabled={loading}
            onClick={(e) => {
              e.stopPropagation()
              onGoBack()
            }}
          >
            {labelBtnCancel ?? 'Cancel'}
          </Button>
        ) : (
          <Button
            variant='contained'
            color='primary'
            onClick={(e) => {
              e.stopPropagation()
              onGoBack()
            }}
            disabled={loading}
          >
            {labelBtnCancel ?? 'Cancel'}
          </Button>
        )}
        {hasBack ? (
          <LoadingButton
            variant='contained'
            color='inherit'
            sx={{ color: (theme) => theme.palette.grey[400], fontWeight: 500 }}
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
            loading={loading}
          >
            {isArchive ? 'Archive' : isSignOut ? 'Sign Out' : labelBtnDelete ?? 'Delete'}
          </LoadingButton>
        ) : (
          <LoadingButton
            variant='contained'
            color={isSignOut ? 'primary' : submitBtnColor ?? 'error'}
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
            loading={loading}
          >
            {isArchive ? 'Archive' : isSignOut ? 'Sign Out' : labelBtnDelete ?? 'Delete'}
          </LoadingButton>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default DeleteDialog
