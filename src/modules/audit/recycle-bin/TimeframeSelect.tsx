import { Box, SelectChangeEvent } from '@mui/material'

import { ISelectItem } from '../../../types/common'
import FilterLabel from '../../common/FilterLabel'
import SimpleSelect from '../../common/SimpleSelect'
import { AUDIT_SETTING_TIMEFRAMES } from '../../../helpers/constants'

interface IProps {
  selected: ISelectItem | null
  onChange: (items: ISelectItem) => void
  hiddenLabel?: boolean
}

const TimeframeSelect = ({ selected, hiddenLabel, onChange }: IProps) => {
  return (
    <Box>
      {!hiddenLabel && <FilterLabel text='Time Frame' />}
      <SimpleSelect
        value={selected}
        options={AUDIT_SETTING_TIMEFRAMES}
        onChange={(val) => onChange(val)}
        width='100%'
        placeholder={{ label: 'Select time frame', value: null }}
      />
    </Box>
  )
}

export default TimeframeSelect
