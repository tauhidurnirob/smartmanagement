import React from 'react'
import { Box, SxProps, Collapse } from '@mui/material'

import { ISelectItem } from '../../types/common'
import FilterLabel from '../common/FilterLabel'
import InfiniteMultipleSelect from '../common/InfiniteMultipleSelect'
import StyledAlert from '../common/StyledAlert'
import { IIncidentType } from '../../api/models'

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
}

const IncidentTypeSelect = ({
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
}: IProps) => {
  const handleParseItem = (item: IIncidentType) => {
    return {
      value: item.id,
      label: item.name || '',
    }
  }

  const handleChange = (items: ISelectItem[]) => {
    onChange(items)
  }

  return (
    <Box>
      {!hiddenLabel && <FilterLabel text='Incident Type' />}
      <InfiniteMultipleSelect
        selectedItems={selected}
        onChange={handleChange}
        limit={10}
        labelForAll={
          placeholder
            ? placeholder
            : disableAllSelect
            ? 'Select incident type'
            : 'All Incident Types'
        }
        selectStyle={selectStyle}
        isSingleSelect={isSingleSelect}
        allowAllSelect={!disableAllSelect}
        textColor={textColor}
        queryApiKey='useGetIncidentTypeListQuery'
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

export default IncidentTypeSelect
