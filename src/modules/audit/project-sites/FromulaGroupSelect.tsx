import React from 'react'
import { Box, SxProps, Collapse } from '@mui/material'
import InfiniteMultipleSelect from '../../common/InfiniteMultipleSelect'
import { ISelectItem } from '../../../types/common'
import FilterLabel from '../../common/FilterLabel'
import StyledAlert from '../../common/StyledAlert'
import { IFormulaGroup } from '../../../types/formula'

interface IProps {
  selected: ISelectItem[]
  onChange: (items: ISelectItem[]) => void
  hiddenLabel?: boolean
  isRecycleBin?: boolean
  isSingleSelect?: boolean
  selectStyle?: SxProps
  disableAllSelect?: boolean
  hiddenErrorMessage?: boolean
  error?: boolean
  helperText?: React.ReactNode
  placeholder?: string
  textColor?: string
  sx?: SxProps
  allowRemoval?: boolean
}

const FromulaGroupSelect = ({
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
  allowRemoval,
}: IProps) => {
  const handleParseItem = (item: IFormulaGroup) => {
    return {
      value: item.id,
      label: item.name,
    }
  }

  const handleChange = (items: ISelectItem[]) => {
    onChange(items)
  }
  return (
    <Box sx={{ ...(sx || {}) }}>
      {!hiddenLabel && <FilterLabel text='SLA Formula Group' className='label' />}
      <InfiniteMultipleSelect
        selectedItems={selected}
        onChange={handleChange}
        limit={10}
        labelForAll={
          placeholder
            ? placeholder
            : disableAllSelect
            ? 'Select Formula Group'
            : 'All Formula Group'
        }
        selectStyle={selectStyle}
        isSingleSelect={isSingleSelect}
        allowAllSelect={!disableAllSelect}
        textColor={textColor}
        allowRemoval={allowRemoval}
        queryApiKey='useGetAuditFormulaGroupListQuery'
        onParseItem={handleParseItem}
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

export default FromulaGroupSelect
