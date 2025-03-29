import React from 'react'
import { Box, SxProps, Collapse } from '@mui/material'
import { ISelectItem } from '../../../types/common'
import FilterLabel from '../../common/FilterLabel'
import InfiniteMultipleSelect from '../../common/InfiniteMultipleSelect'
import StyledAlert from '../../common/StyledAlert'
import { MAN_DAYS } from '../../../helpers/constants'

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

const ManDaySelect = ({
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
  const handleParseItem = (item: ISelectItem) => {
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
      {!hiddenLabel && <FilterLabel text='Man days' className='label' />}
      <InfiniteMultipleSelect
        selectedItems={selected}
        onChange={handleChange}
        limit={10}
        labelForAll={
          placeholder ? placeholder : disableAllSelect ? 'Select Man days' : 'All Man days'
        }
        selectStyle={selectStyle}
        isSingleSelect={isSingleSelect}
        allowAllSelect={!disableAllSelect}
        textColor={textColor}
        onParseItem={handleParseItem}
        tmpData={MAN_DAYS}
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

export default ManDaySelect
