import React, { useMemo } from 'react'
import { Box, SxProps, Collapse } from '@mui/material'

import { ISelectItem } from '../../types/common'
import FilterLabel from '../common/FilterLabel'
import InfiniteMultipleSelect from '../common/InfiniteMultipleSelect'
import StyledAlert from '../common/StyledAlert'
import { IBuilding } from '../../api/models'

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
  locationIds?: number[]
  projectIds?: number[]
  disabled?: boolean
  limit?: number
}

const BuildingSelect = ({
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
  disabled,
  limit,
}: IProps) => {
  const dependencyIds = useMemo(() => {
    return [...(projectIds || []), ...(locationIds || [])]
  }, [projectIds, locationIds])

  const handleParseItem = (item: IBuilding) => {
    return {
      label: item.name,
      value: item.id,
    }
  }

  const handleChange = (items: ISelectItem[]) => {
    onChange(items)
  }

  return (
    <Box>
      {!hiddenLabel && <FilterLabel text='Building' />}
      <InfiniteMultipleSelect
        selectedItems={selected}
        onChange={handleChange}
        limit={limit ? limit : 10}
        labelForAll={
          placeholder ? placeholder : disableAllSelect ? 'Select building' : 'All Buildings'
        }
        selectStyle={selectStyle}
        isSingleSelect={isSingleSelect}
        allowAllSelect={!disableAllSelect}
        textColor={textColor}
        dependencyIds={dependencyIds}
        disabled={disabled}
        queryApiKey='useGetBuildingListQuery'
        queryFilters={{
          ...(projectIds && { projectIds: projectIds }),
          ...(locationIds && { locationIds: locationIds }),
        }}
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

export default BuildingSelect
