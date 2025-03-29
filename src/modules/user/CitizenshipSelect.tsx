import React from 'react'
import { Box, SxProps, Collapse } from '@mui/material'

import { ISelectItem } from '../../types/common'
import FilterLabel from '../common/FilterLabel'

import StyledAlert from '../common/StyledAlert'
import InfiniteMultipleSelect from '../common/InfiniteMultipleSelect'
import { IRole } from '../../types/role'
import { citizenships } from '../../constants/countries'
import { IUserCitizensip } from '../../types/user'

interface IProps {
  selected: ISelectItem[]
  onChange: (items: ISelectItem[]) => void
  hiddenLabel?: boolean
  isSingleSelect?: boolean
  selectStyle?: SxProps
  disableAllSelect?: boolean
  hiddenErrorMessage?: boolean
  error?: boolean
  helperText?: React.ReactNode
  placeholder?: string
  textColor?: string
  sx?: SxProps
}

const CitizenshipSelect = ({
  selected,
  hiddenLabel,
  onChange,
  selectStyle,
  isSingleSelect,
  disableAllSelect,
  hiddenErrorMessage,
  error,
  helperText,
  placeholder,
  textColor,
  sx,
}: IProps) => {
  const handleParseItem = (item: IUserCitizensip) => {
    return {
      value: item.value,
      label: item.label,
    }
  }
  const handleChange = (items: ISelectItem[]) => {
    onChange(items)
  }
  return (
    <Box sx={{ ...(sx || {}) }}>
      {!hiddenLabel && <FilterLabel text='Citizenship' className='label' />}
      <InfiniteMultipleSelect
        selectedItems={selected}
        onChange={handleChange}
        limit={10}
        labelForAll={
          placeholder ? placeholder : disableAllSelect ? 'Select citizenship' : 'All citizenship'
        }
        selectStyle={selectStyle}
        isSingleSelect={isSingleSelect}
        allowAllSelect={!disableAllSelect}
        textColor={textColor}
        onParseItem={handleParseItem}
        tmpData={citizenships}
      />
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

export default CitizenshipSelect
