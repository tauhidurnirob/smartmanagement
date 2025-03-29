import React from 'react'
import { Box, SxProps, Collapse } from '@mui/material'

import { ISelectItem } from '../../types/common'
import FilterLabel from '../common/FilterLabel'
import StyledAlert from '../common/StyledAlert'
import InfiniteMultipleSelect from '../common/InfiniteMultipleSelect'
import { IDeviceType } from '../../api/models'

interface IProps {
  selected: ISelectItem[]
  onChange: (items: ISelectItem[]) => void
  hiddenLabel?: boolean
  selectStyle?: SxProps
  hiddenErrorMessage?: boolean
  error?: boolean
  helperText?: React.ReactNode
  placeholder?: string
  isSingleSelect?: boolean
  disableAllSelect?: boolean
  textColor?: string
  allowRemoval?: boolean
}

const DeviceTypeSelect = ({
  selected,
  hiddenLabel,
  onChange,
  hiddenErrorMessage,
  error,
  helperText,
  selectStyle,
  isSingleSelect,
  disableAllSelect,
  textColor,
  allowRemoval,
}: IProps) => {
  const handleParseItem = (item: IDeviceType) => {
    return {
      value: item.id,
      label: item.deviceType,
      category: item.deviceCategory?.deviceCategory,
      item: item,
    }
  }

  const handleChange = (items: ISelectItem[]) => {
    onChange(items)
  }

  return (
    <Box>
      {!hiddenLabel && <FilterLabel text='Device Type' />}
      <InfiniteMultipleSelect
        selectedItems={selected}
        onChange={handleChange}
        limit={10}
        labelForAll={disableAllSelect ? 'Select device type' : 'All Device Types'}
        selectStyle={selectStyle}
        isSingleSelect={isSingleSelect}
        allowAllSelect={!disableAllSelect}
        withCategory={true}
        textColor={textColor}
        allowRemoval={allowRemoval}
        queryApiKey='useGetDeviceTypeListQuery'
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

export default DeviceTypeSelect
