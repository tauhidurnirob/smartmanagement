import { Box, SxProps } from '@mui/material'

import { ISelectItem } from '../../types/common'
import FilterLabel from '../common/FilterLabel'
import MultipleSelect from '../common/MultipleSelect'
import { LEAVE_CATEGORY_LIST } from '../../helpers/constants'

interface IProps {
  placeholder?: string
  selected: ISelectItem[]
  onChange: (items: ISelectItem[]) => void
  hiddenLabel?: boolean
  selectStyle?: SxProps
}

const LeaveCategorySelect = ({
  selected,
  hiddenLabel,
  onChange,
  selectStyle,
  placeholder,
}: IProps) => {
  const handleChange = (items: ISelectItem[]) => {
    onChange(items)
  }

  return (
    <Box>
      {!hiddenLabel && <FilterLabel text='Leave Category' />}
      <MultipleSelect
        items={LEAVE_CATEGORY_LIST}
        selectedItems={selected}
        onChange={handleChange}
        labelForAll={placeholder ? placeholder : 'All Leave Category'}
        sxBtn={selectStyle}
      />
    </Box>
  )
}

export default LeaveCategorySelect
