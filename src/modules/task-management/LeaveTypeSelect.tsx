import { Box, SxProps } from '@mui/material'

import { ISelectItem } from '../../types/common'
import FilterLabel from '../common/FilterLabel'
import MultipleSelect from '../common/MultipleSelect'
import { LEAVE_TYPE_LIST } from '../../helpers/constants'

interface IProps {
  placeholder?: string
  selected: ISelectItem[]
  onChange: (items: ISelectItem[]) => void
  hiddenLabel?: boolean
  selectStyle?: SxProps
}

const LeaveTypeSelect = ({ selected, hiddenLabel, onChange, selectStyle, placeholder }: IProps) => {
  const handleChange = (items: ISelectItem[]) => {
    onChange(items)
  }

  return (
    <Box>
      {!hiddenLabel && <FilterLabel text='Leave Type' />}
      <MultipleSelect
        items={LEAVE_TYPE_LIST}
        selectedItems={selected}
        onChange={handleChange}
        labelForAll={placeholder ? placeholder : 'All Leave Type'}
        sxBtn={selectStyle}
      />
    </Box>
  )
}

export default LeaveTypeSelect
