import React, { useMemo } from 'react'
import { Box, SxProps, Collapse } from '@mui/material'
import { ISelectItem } from '../../types/common'
import FilterLabel from '../common/FilterLabel'
import InfiniteMultipleSelect from '../common/InfiniteMultipleSelect'
import StyledAlert from '../common/StyledAlert'
import { ILevel } from '../../api/models'

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
  disabled?: boolean
}

const LevelSelect = ({
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
  disabled,
}: IProps) => {
  const dependencyIds = useMemo(() => {
    return [...(projectIds || []), ...(locationIds || []), ...(buildingIds || [])]
  }, [projectIds, locationIds, buildingIds])

  const handleParseItem = (item: ILevel) => {
    return {
      value: item.id,
      label: item.name,
      item: item,
    }
  }

  const handleChange = (items: ISelectItem[]) => {
    onChange(items)
  }

  return (
    <Box>
      {!hiddenLabel && <FilterLabel text='Level' />}
      <InfiniteMultipleSelect
        selectedItems={selected}
        onChange={handleChange}
        limit={10}
        labelForAll={placeholder ? placeholder : disableAllSelect ? 'Select level' : 'All Levels'}
        selectStyle={selectStyle}
        isSingleSelect={isSingleSelect}
        allowAllSelect={!disableAllSelect}
        textColor={textColor}
        dependencyIds={dependencyIds}
        disabled={disabled}
        queryApiKey='useGetLevelListQuery'
        onParseItem={handleParseItem}
        queryFilters={{
          ...(projectIds && { projectIds }),
          ...(locationIds && { locationIds }),
          ...(buildingIds && { buildingIds }),
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

export default LevelSelect
