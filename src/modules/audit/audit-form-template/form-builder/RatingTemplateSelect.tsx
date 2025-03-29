import React from 'react'
import { Box, SxProps, Collapse } from '@mui/material'
import { ISelectItem } from '../../../../types/common'
import { IProject } from '../../../../types/project'
import FilterLabel from '../../../common/FilterLabel'
import InfiniteMultipleSelect from '../../../common/InfiniteMultipleSelect'
import StyledAlert from '../../../common/StyledAlert'

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

const RatingTemplateSelect = ({
  selected,
  hiddenLabel,
  isRecycleBin,
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
  const handleParseItem = (item: IProject) => {
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
      {!hiddenLabel && <FilterLabel text='Project' className='label' />}
      <InfiniteMultipleSelect
        selectedItems={selected}
        onChange={handleChange}
        limit={10}
        labelForAll={
          placeholder ? placeholder : disableAllSelect ? 'Select Rating Template' : 'All Rating Templates'
        }
        selectStyle={selectStyle}
        isSingleSelect={isSingleSelect}
        allowAllSelect={!disableAllSelect}
        textColor={textColor}
        allowRemoval={allowRemoval}
        queryApiKey='useGetAuditRatingTemplateListQuery'
        onParseItem={handleParseItem}
        queryFilters={{ includeRecycleBin: isRecycleBin }}
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

export default RatingTemplateSelect
