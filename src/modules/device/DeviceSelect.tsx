import React from 'react'
import { Box, SxProps, Collapse } from '@mui/material'

import { ISelectItem } from '../../types/common'
import FilterLabel from '../common/FilterLabel'
import InfiniteMultipleSelect from '../common/InfiniteMultipleSelect'
import StyledAlert from '../common/StyledAlert'
import { IDevice } from '../../api/models'

interface IProps {
  selected: ISelectItem[]
  onChange: (items: ISelectItem[], data?: any) => void
  hiddenLabel?: boolean
  isSingleSelect?: boolean
  selectStyle?: SxProps
  disableAllSelect?: boolean
  hiddenErrorMessage?: boolean
  error?: boolean
  helperText?: React.ReactNode
  placeholder?: string
  textColor?: string
  allowRemoval?: boolean
  deviceTypeIds?: number[]
  projectIds?: number[]
  locationIds?: number[]
  buildingIds?: number[]
  levelIds?: number[]
  areaIds?: number[]
  unitIds?: number[]
  text?: string
}

const DeviceSelect = ({
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
  allowRemoval,
  deviceTypeIds,
  projectIds,
  locationIds,
  buildingIds,
  levelIds,
  areaIds,
  unitIds,
  text,
}: IProps) => {
  const handleParseItem = (item: IDevice) => {
    return {
      value: item.id,
      label: item.identificationNo,
      item: item,
    }
  }

  const handleChange = (items: ISelectItem[], data?: any) => {
    onChange(items, data)
  }

  return (
    <Box>
      {!hiddenLabel && <FilterLabel text='Device List' />}
      <InfiniteMultipleSelect
        selectedItems={selected}
        onChange={handleChange}
        limit={10}
        labelForAll={placeholder ? placeholder : disableAllSelect ? 'Select Device' : 'All Devices'}
        selectStyle={selectStyle}
        isSingleSelect={isSingleSelect}
        allowAllSelect={!disableAllSelect}
        textColor={textColor}
        allowRemoval={allowRemoval}
        queryApiKey='useGetDeviceListQuery'
        onParseItem={handleParseItem}
        queryFilters={{
          deviceTypeIds: deviceTypeIds || [],
          projectIds: projectIds || [],
          locationIds: locationIds || [],
          buildingIds: buildingIds || [],
          levelIds: levelIds || [],
          areaIds: areaIds || [],
          unitIds: unitIds || [],
          text: text || '',
        }}
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

export default DeviceSelect
