import React from 'react'
import { Box, SxProps, Collapse } from '@mui/material'
import { ISelectItem } from '../../../types/common'
import FilterLabel from '../../common/FilterLabel'
import InfiniteMultipleSelect from '../../common/InfiniteMultipleSelect'
import { WEEK_FULL_DATE_LIST_STRING } from '../../../helpers/constants'
import StyledAlert from '../../common/StyledAlert'


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

const FrequencyDaySelect = ({
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
  const handleParseItem = (item: any) => {
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
      {!hiddenLabel && <FilterLabel text='Frequency' className='label' />}
      <InfiniteMultipleSelect
        selectedItems={selected}
        onChange={handleChange}
        limit={10}
        labelForAll={
          placeholder ? placeholder : disableAllSelect ? 'Select Frequency' : 'All Frequency'
        }
        selectStyle={selectStyle}
        isSingleSelect={isSingleSelect}
        allowAllSelect={!disableAllSelect}
        allowRemoval={true}
        textColor={textColor}
        onParseItem={handleParseItem}
        tmpData={WEEK_FULL_DATE_LIST_STRING}
        disableSearch={true}
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

export default FrequencyDaySelect
