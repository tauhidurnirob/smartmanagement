import { Box, Collapse, SxProps } from '@mui/material'
import { ISelectItem } from '../../../types/common'
import FilterLabel from '../../common/FilterLabel'
import StyledAlert from '../../common/StyledAlert'
import InfiniteMultipleSelect from '../../common/InfiniteMultipleSelect'
import { IPremiseCategory } from '../../../types/premiseCategory'
import { ITaskActivityRes } from '../../../types/task'

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
  query?: string
  sx?: SxProps
  allowRemoval?: boolean
}

const TaskActivitySelect = ({
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
  query,
  allowRemoval,
}: IProps) => {
  const handleChange = (items: ISelectItem[]) => {
    onChange(items)
  }

  const handleParseItem = (item: ITaskActivityRes) => {
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
        labelForAll={disableAllSelect ? 'Select Task Activity' : 'All Task Activities'}
        selectStyle={selectStyle}
        isSingleSelect={isSingleSelect}
        allowAllSelect={!disableAllSelect}
        withCategory={true}
        dependencyIds={projectIds}
        textColor={textColor}
        allowRemoval={allowRemoval}
        queryApiKey='useGetTaskActivitiesQuery'
        onParseItem={handleParseItem}
        queryFilters={{ taskType: query ? query : 'Periodic' }}
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

export default TaskActivitySelect
