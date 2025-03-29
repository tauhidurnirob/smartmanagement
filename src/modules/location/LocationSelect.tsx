import { Box, SxProps, Collapse } from '@mui/material'
import InfiniteMultipleSelect from '../../modules/common/InfiniteMultipleSelect'
import { ISelectItem, ISelectList } from '../../types/common'
import FilterLabel from '../common/FilterLabel'
import Api from '../../api'
import StyledAlert from '../common/StyledAlert'
import { ILocation } from '../../types/location'

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
  projectIds?: number[]
  textColor?: string
  sx?: SxProps
  allowRemoval?: boolean
}

const LocationSelect = ({
  selected,
  isRecycleBin,
  hiddenLabel,
  onChange,
  selectStyle,
  isSingleSelect,
  disableAllSelect,
  hiddenErrorMessage,
  error,
  helperText,
  projectIds,
  textColor,
  sx,
  allowRemoval,
}: IProps) => {
  const handleParseItem = (item: ILocation) => {
    return {
      value: item.id,
      label: item.name,
      category: item.locationCategory?.name,
    }
  }

  const handleChange = (items: ISelectItem[]) => {
    onChange(items)
  }

  return (
    <Box sx={{ ...(sx || {}) }}>
      {!hiddenLabel && <FilterLabel text='Location' className='label' />}
      <InfiniteMultipleSelect
        selectedItems={selected}
        onChange={handleChange}
        limit={10}
        labelForAll={disableAllSelect ? 'Select Location' : 'All Locations'}
        selectStyle={selectStyle}
        isSingleSelect={isSingleSelect}
        allowAllSelect={!disableAllSelect}
        withCategory={true}
        dependencyIds={projectIds}
        textColor={textColor}
        allowRemoval={allowRemoval}
        queryApiKey='useGetLocationListQuery'
        onParseItem={handleParseItem}
        queryFilters={{ ...(projectIds && { projectIds }) }}
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

export default LocationSelect
