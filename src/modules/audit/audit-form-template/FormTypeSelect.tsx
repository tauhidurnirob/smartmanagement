import { Box, Collapse, SxProps } from '@mui/material'
import InfiniteMultipleSelect from '../../common/InfiniteMultipleSelect'
import { ISelectItem } from '../../../types/common'
import FilterLabel from '../../common/FilterLabel'
import StyledAlert from '../../common/StyledAlert'
import { IAuditFormType } from '../../../types/audit'

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
  projectIds?: number[]
  textColor?: string
}

const FormTypeSelect = ({
  selected,
  onChange,
  hiddenLabel,
  selectStyle,
  isSingleSelect,
  disableAllSelect,
  hiddenErrorMessage,
  error,
  helperText,
  projectIds,
  textColor,
}: IProps) => {
  const handleParseItem = (item: IAuditFormType) => {
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
      {!hiddenLabel && <FilterLabel text='Form Type' />}
      <InfiniteMultipleSelect
        selectedItems={selected}
        onChange={handleChange}
        limit={10}
        labelForAll={disableAllSelect ? 'Select Form Type' : 'All Form Type'}
        selectStyle={selectStyle}
        isSingleSelect={isSingleSelect}
        allowAllSelect={!disableAllSelect}
        withCategory={true}
        dependencyIds={projectIds}
        textColor={textColor}
        queryApiKey='useGetAuditFormTypeListQuery'
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

export default FormTypeSelect
