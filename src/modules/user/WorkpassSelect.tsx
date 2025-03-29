import React, { useState } from 'react'
import { Box, SxProps, Collapse, Radio, RadioGroup, FormControlLabel } from '@mui/material'
import FilterLabel from '../common/FilterLabel'

import StyledAlert from '../common/StyledAlert'
import { TWorkPass, UserGender } from '../../types/user'

interface IProps {
  onChange: (items: TWorkPass) => void
  selected?: TWorkPass
  hiddenLabel?: boolean
  hiddenErrorMessage?: boolean
  error?: boolean
  helperText?: React.ReactNode
  sx?: SxProps
}

const WorkpassSelect = ({
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
      {!hiddenLabel && <FilterLabel text='Workpass Type' className='workpass-type' />}

      {/* Gender Radio Buttons */}
      <RadioGroup
        value={String(selected)}
        onChange={(e) => onChange(e.target.value as TWorkPass)}
        row
      >
        <FormControlLabel value='0' control={<Radio />} label='Work Permit' />
        <FormControlLabel value='1' control={<Radio />} label='Spass' />
        <FormControlLabel value='2' control={<Radio />} label='Epass' />
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

export default WorkpassSelect
