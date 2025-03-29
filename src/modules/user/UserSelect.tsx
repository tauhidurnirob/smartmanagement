import { Box, Collapse, SxProps } from '@mui/material'
import InfiniteMultipleSelect from '../common/InfiniteMultipleSelect'
import { ISelectItem } from '../../types/common'
import FilterLabel from '../common/FilterLabel'
import StyledAlert from '../common/StyledAlert'
import { IUser } from '../../api/models'

interface IProps {
  selected: ISelectItem[]
  onChange: (items: ISelectItem[]) => void
  hiddenLabel?: boolean
  allowAllSelect?: boolean
  showErrorMessage?: boolean
  error?: boolean
  errorMessage?: string
  textColor?: string
  isSingleSelect?: boolean
  allowRemoval?: boolean
  labelForAll?: string
  disableAllSelect?: boolean
  hiddenErrorMessage?: boolean
  selectStyle?: SxProps
}

const UserSelect = ({
  selected,
  hiddenLabel,
  isSingleSelect,
  onChange,
  allowAllSelect,
  showErrorMessage,
  error,
  errorMessage,
  textColor,
  allowRemoval = true,
  labelForAll = 'Select User(s)',
  disableAllSelect,
  selectStyle,
}: IProps) => {
  const handleParseItem = (item: IUser) => {
    return {
      value: item.id,
      label: item.fullName || '',
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
        allowAllSelect={allowAllSelect}
        textColor={textColor}
        isSingleSelect={isSingleSelect}
        allowRemoval={allowRemoval}
        labelForAll={labelForAll ? labelForAll : disableAllSelect ? labelForAll : 'All Users'}
        selectStyle={selectStyle}
        queryApiKey={'useGetUserListQuery'}
        onParseItem={handleParseItem}
        queryFilters={{ orderBy: 'fullName' }}
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

export default UserSelect
