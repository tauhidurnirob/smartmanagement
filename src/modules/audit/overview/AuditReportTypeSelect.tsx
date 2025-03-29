import { Box, SxProps } from '@mui/material'

import { ISelectItem } from '../../../types/common'
import FilterLabel from '../../common/FilterLabel'
import MultipleSelect from '../../common/MultipleSelect'
import { AUDIT_STATES, AUDIT_STATES_AVG } from '../../../helpers/constants'

interface IProps {
  placeholder?: string
  selected: ISelectItem[]
  onChange: (items: ISelectItem[]) => void
  hiddenLabel?: boolean
  selectStyle?: SxProps
  isMap?: boolean
}

const AuditReportTypeSelect = ({
  selected,
  hiddenLabel,
  onChange,
  selectStyle,
  placeholder,
  isMap
}: IProps) => {
  const handleChange = (items: ISelectItem[]) => {
    onChange(items)
  }

  return (
    <Box>
      {!hiddenLabel && <FilterLabel text='Report Type' />}
      <MultipleSelect
        items={isMap ? AUDIT_STATES_AVG : AUDIT_STATES}
        selectedItems={selected}
        onChange={handleChange}
        labelForAll={placeholder ? placeholder : 'All Performance Status'}
        sxBtn={selectStyle}
      />
    </Box>
  )
}

export default AuditReportTypeSelect
