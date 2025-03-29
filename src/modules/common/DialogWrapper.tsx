import React, { FC } from 'react'
import { Typography, Dialog, DialogTitle, Divider, IconButton, Box } from '@mui/material'
import { CloseDuotone } from '../../assets/icons/close-duotone'

interface IProps {
  open: boolean
  label: string | React.ReactNode
  maxWidth: string | number
  onClose: () => void
  children: React.ReactNode
  hiddenTopDivider?: boolean
  hiddenHeader?: boolean
}

const DialogWrapper: FC<IProps> = (props) => {
  const { open, label, maxWidth, children, onClose, hiddenTopDivider, hiddenHeader } = props

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClose()
    event.stopPropagation()
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
  }

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{
        sx: { width: '100%', maxWidth: maxWidth, m: 'auto', borderRadius: 5 },
      }}
      transitionDuration={{ exit: 0 }}
    >
      {!hiddenHeader && (
        <DialogTitle
          sx={{
            p: '28px 24px 23px 32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          component='div'
          onClick={handleClick}
        >
          {typeof label === 'string' ? (
            <Typography variant='h4' sx={{ fontSize: 22 }}>
              {label}
            </Typography>
          ) : (
            label
          )}
          <IconButton
            onClick={handleClose}
            size='small'
            sx={{ color: (theme) => theme.palette.grey[600], borderRadius: 2, p: 0 }}
          >
            <CloseDuotone sx={{ fontSize: 36 }} />
          </IconButton>
        </DialogTitle>
      )}
      {!hiddenTopDivider && !hiddenHeader && <Divider />}
      <Box onClick={handleClick}>{children}</Box>
    </Dialog>
  )
}

export default DialogWrapper
