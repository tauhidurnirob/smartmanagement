import React, { useState } from 'react'
import { Box, SxProps, Collapse, Radio, RadioGroup, FormControlLabel } from '@mui/material'

import { ISelectItem } from '../../types/common'
import FilterLabel from '../common/FilterLabel'

import StyledAlert from '../common/StyledAlert'
import { UserGender } from '../../types/user'

interface IProps {
  onChange: (items: UserGender) => void
  selected: UserGender | null
  hiddenLabel?: boolean
  hiddenErrorMessage?: boolean
  error?: boolean
  helperText?: React.ReactNode
  sx?: SxProps
}

const GenderSelect = ({
  hiddenLabel,
  onChange,
  hiddenErrorMessage,
  error,
  helperText,
  sx,
  selected,
}: IProps) => {
  return (
    <Box sx={{ ...(sx || {}) }}>
      {!hiddenLabel && <FilterLabel text='Gender' className='gender' />}

      {/* Gender Radio Buttons */}
      <RadioGroup value={selected} onChange={(e) => onChange(e.target.value as UserGender)} row>
        <FormControlLabel value='male' control={<Radio />} label='Male' />
        <FormControlLabel value='female' control={<Radio />} label='Female' />
      </RadioGroup>

      {/* Error Message */}
      {!hiddenErrorMessage && (
        <Collapse in={error}>
          <StyledAlert severity='error' variant='outlined' sx={{ mt: '5px' }}>
            {helperText}
          </StyledAlert>
        </Collapse>
      )}
    </Box>
  )
}

export default GenderSelect
