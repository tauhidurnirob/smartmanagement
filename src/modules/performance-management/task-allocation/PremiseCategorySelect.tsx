import { Box, Collapse, SxProps } from '@mui/material'
import { ISelectItem } from '../../../types/common'
import FilterLabel from '../../common/FilterLabel'
import SimpleSelect from '../../common/SimpleSelect'
import StyledAlert from '../../common/StyledAlert'
import { PREMISE_CATEGORY_LIST } from '../../../helpers/constants'
import Api from '../../../api'
import InfiniteMultipleSelect from '../../common/InfiniteMultipleSelect'
import { IPremiseCategory, IResPremiseCategory } from '../../../types/premiseCategory'

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

const PremiseCategorySelect = ({
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
  const handleChange = (items: ISelectItem[]) => {
    onChange(items)
  }

  const handleParseItem = (item: IResPremiseCategory) => {
    return {
      value: item.id,
      label: item.name,
    }
  }

  return (
    <Box>
      {!hiddenLabel && <FilterLabel text='Form Type' />}
      <InfiniteMultipleSelect
        selectedItems={selected}
        onChange={handleChange}
        limit={10}
        labelForAll={disableAllSelect ? 'Select Premise Category' : 'All premise Categories'}
        selectStyle={selectStyle}
        isSingleSelect={isSingleSelect}
        allowAllSelect={!disableAllSelect}
        withCategory={true}
        dependencyIds={projectIds}
        textColor={textColor}
        allowRemoval={allowRemoval}
        queryApiKey='useGetTaskPremiseListQuery'
        onParseItem={handleParseItem}
        queryFilters={{ ...(projectIds && { projectIds }) }}
      />
      {!hiddenErrorMessage && (
        <Collapse in={error}>
          <StyledAlert severity='error' variant='outlined' sx={{ mt: '5px' }}>
            {helperText ? helperText : hiddenErrorMessage}
          </StyledAlert>
        </Collapse>
      )}
    </Box>
  )
}

export default PremiseCategorySelect
