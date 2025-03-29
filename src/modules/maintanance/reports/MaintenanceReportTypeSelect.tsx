import { Box, SxProps } from '@mui/material'
import { ISelectItem } from '../../../types/common'
import FilterLabel from '../../common/FilterLabel'
import MultipleSelect from '../../common/MultipleSelect'
import { MAINTENANCE_REPORT_TYPE_LIST } from '../../../helpers/constants'

interface IProps {
  placeholder?: string
  selected: ISelectItem[]
  onChange: (items: ISelectItem[]) => void
  hiddenLabel?: boolean
  selectStyle?: SxProps
}

const MaintenanceReportTypeSelect = ({
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
        items={MAINTENANCE_REPORT_TYPE_LIST}
        selectedItems={selected}
        onChange={handleChange}
        labelForAll={placeholder ? placeholder : 'All Report'}
        sxBtn={selectStyle}
      />
    </Box>
  )
}

export default MaintenanceReportTypeSelect
