import { Box, Collapse } from '@mui/material'

import { ISelectItem } from '../../../types/common'
import FilterLabel from '../../common/FilterLabel'
import InfiniteMultipleSelect from '../../common/InfiniteMultipleSelect'
import StyledAlert from '../../common/StyledAlert'
import { IProject } from '../../../types/project'

interface IProps {
  selected: ISelectItem[]
  onChange: (items: ISelectItem[]) => void
  hiddenLabel?: boolean
  allowAllSelect?: boolean
  showErrorMessage?: boolean
  error?: boolean
  errorMessage?: string
  textColor?: string
}

const MultipleProjectSelect = ({
  selected,
  hiddenLabel,
  onChange,
  allowAllSelect,
  showErrorMessage,
  error,
  errorMessage,
  textColor,
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
    <Box>
      {!hiddenLabel && <FilterLabel text='User' />}
      <InfiniteMultipleSelect
        selectedItems={selected}
        onChange={handleChange}
        limit={10}
        labelForAll='Select Projects'
        allowRemoval={true}
        allowAllSelect={allowAllSelect}
        textColor={textColor}
        queryApiKey='useGetProjectListQuery'
        onParseItem={handleParseItem}
      />
      {showErrorMessage && (
        <Collapse in={error}>
          <StyledAlert severity='error' variant='outlined' sx={{ mt: '5px' }}>
            {errorMessage}
          </StyledAlert>
        </Collapse>
      )}
    </Box>
  )
}

export default MultipleProjectSelect
