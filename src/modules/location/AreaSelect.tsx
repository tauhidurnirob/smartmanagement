import React, { useMemo } from 'react'
import { Box, SxProps, Collapse } from '@mui/material'
import { ISelectItem } from '../../types/common'
import FilterLabel from '../common/FilterLabel'
import InfiniteMultipleSelect from '../common/InfiniteMultipleSelect'
import StyledAlert from '../common/StyledAlert'
import { IArea } from '../../api/models'

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
  projectIds?: number[]
  locationIds?: number[]
  buildingIds?: number[]
  levelIds?: number[]
  disabled?: boolean
}

const AreaSelect = ({
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
  projectIds,
  locationIds,
  buildingIds,
  levelIds,
  disabled,
}: IProps) => {
  const dependencyIds = useMemo(() => {
    return [
      ...(projectIds || []),
      ...(locationIds || []),
      ...(buildingIds || []),
      ...(levelIds || []),
    ]
  }, [projectIds, locationIds, buildingIds, levelIds])

  const handleParseItem = (item: IArea) => {
    return {
      value: item.id,
      label: item.name,
    }
  }

  const handleChange = (items: ISelectItem[]) => {
    onChange(items)
  }

  return (
    <Box>
      {!hiddenLabel && <FilterLabel text='Area' />}
      <InfiniteMultipleSelect
        selectedItems={selected}
        onChange={handleChange}
        limit={10}
        labelForAll={placeholder ? placeholder : disableAllSelect ? 'Select area' : 'All Areas'}
        selectStyle={selectStyle}
        isSingleSelect={isSingleSelect}
        allowAllSelect={!disableAllSelect}
        textColor={textColor}
        dependencyIds={dependencyIds}
        disabled={disabled}
        queryApiKey='useGetAreaListQuery'
        onParseItem={handleParseItem}
        queryFilters={{
          ...(projectIds && { projectIds }),
          ...(locationIds && { locationIds }),
          ...(buildingIds && { buildingIds }),
          ...(levelIds && { levelIds }),
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

export default AreaSelect
