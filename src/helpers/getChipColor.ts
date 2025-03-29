import { SxProps, Theme } from '@mui/material'

import { CHIP_TYPES } from './constants'

export default function getChipColor(type: CHIP_TYPES) {
  const successChip: SxProps<Theme> = {
    bgcolor: 'success.light',
    color: 'success.main',
  }
  const warningChip: SxProps<Theme> = {
    bgcolor: 'yellow.light',
    color: 'yellow.main',
  }
  const errorChip: SxProps<Theme> = {
    bgcolor: 'error.light',
    color: 'error.main',
  }
  const greyChip: SxProps<Theme> = {
    bgcolor: 'grey.200',
    color: 'grey.600',
  }
  const infoChip: SxProps<Theme> = {
    bgcolor: 'info.light',
    color: 'info.main',
  }
  const defaultChip: SxProps<Theme> = {
    bgcolor: 'primary.light',
    color: 'grey.500',
  }

  if (type === 'success') return successChip
  if (type === 'warning') return warningChip
  if (type === 'error') return errorChip
  if (type === 'info') return infoChip
  if (type === 'grey') return greyChip

  return defaultChip
}
