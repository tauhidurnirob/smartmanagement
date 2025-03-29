import React from 'react'

import { Chip, Theme } from '@mui/material'
import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx'
import { CHIP_TYPES } from '../../helpers/constants'
import getChipColor from '../../helpers/getChipColor'

const chipStyle: SxProps<Theme> = {
  borderRadius: '4px',
  fontWeight: 700,
  height: 26,
}

interface IProps {
  type: CHIP_TYPES
  text: string
  onClick?: (e?: any) => void
  sx?: SxProps
}

const CustomChip: React.FC<IProps> = ({ type = 'success', text, onClick, sx }) => {
  const getChipStyles = () => [chipStyle, getChipColor(type), sx || {}] as SxProps<Theme>

  return <Chip label={text} sx={getChipStyles()} onClick={onClick} />
}

export default CustomChip
