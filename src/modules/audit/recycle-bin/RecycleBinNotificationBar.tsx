import { FC } from 'react'
import { SxProps, Box, Typography, Stack, IconButton } from '@mui/material'

import { AUDIT_TABLE_PROCESSED } from '../../../helpers/constants'
import { CheckLoading } from '../../../assets/icons/check-loading'
import { WarningCircle } from '../../../assets/icons/warning-circle'
import { Closecross } from '../../../assets/icons/close-cross'

const containerSx = {
  borderRadius: '5px',
}

interface IProps {
  processed?: null | AUDIT_TABLE_PROCESSED
  sx?: SxProps
  onRemove?: () => void
}

const RecycleBinNotificationBar: FC<IProps> = ({ processed, sx, onRemove }) => {
  const handleRemove = () => {
    if (onRemove) {
      onRemove()
    }
  }
  if (processed === AUDIT_TABLE_PROCESSED.restored) {
    return (
      <Box sx={{ mt: 3, ...(sx || {}) }}>
        <Box
          sx={{
            py: 1,
            pr: 1.5,
            pl: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: (theme) => theme.palette.success.light,
            border: '1px solid #2D8A39',
            ...containerSx,
          }}
        >
          <Stack direction={'row'} alignItems={'center'} gap={3}>
            <CheckLoading sx={{ color: (theme) => theme.palette.success.main }} />
            <Typography variant='subtitle1' sx={{ fontSize: 18 }}>
              Restored successfully
            </Typography>
          </Stack>
          <IconButton onClick={handleRemove}>
            <Closecross sx={{ fontSize: '20px' }} />
          </IconButton>
        </Box>
      </Box>
    )
  }

  if (processed === AUDIT_TABLE_PROCESSED.deleted) {
    return (
      <Box mt={3}>
        <Box
          sx={{
            py: 1,
            pr: 1.5,
            pl: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: (theme) => theme.palette.error.light,
            border: '1px solid #F1416C',
            ...containerSx,
          }}
        >
          <Stack direction={'row'} alignItems={'center'} gap={3}>
            <WarningCircle sx={{ color: (theme) => theme.palette.error.main }} />
            <Typography variant='subtitle1' sx={{ fontSize: 18 }}>
              Deleted permanently
            </Typography>
          </Stack>
          <IconButton onClick={handleRemove}>
            <Closecross sx={{ fontSize: '20px' }} />
          </IconButton>
        </Box>
      </Box>
    )
  }

  return null
}

export default RecycleBinNotificationBar
