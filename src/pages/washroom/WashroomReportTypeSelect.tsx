import { Box, SxProps } from '@mui/material'
import { ISelectItem } from '../../types/common'
import { WASHROOM_REPORT_TYPE_LIST } from '../../helpers/constants'
import FilterLabel from '../../modules/common/FilterLabel'
import MultipleSelect from '../../modules/common/MultipleSelect'

interface IProps {
  placeholder?: string
  selected: ISelectItem[]
  onChange: (items: ISelectItem[]) => void
  hiddenLabel?: boolean
  selectStyle?: SxProps
}

const WashroomReportTypeSelect = ({
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
      {!hiddenLabel && <FilterLabel text='Report Type' />}
      <MultipleSelect
        items={WASHROOM_REPORT_TYPE_LIST}
        selectedItems={selected}
        onChange={handleChange}
        labelForAll={placeholder ? placeholder : 'All Report'}
        sxBtn={selectStyle}
      />
    </Box>
  )
}

export default WashroomReportTypeSelect
