import { Box } from '@mui/material'

import { ISelectItem } from '../../types/common'
import FilterLabel from '../common/FilterLabel'
import SimpleSelect from '../common/SimpleSelect'
import { TASK_COMPLETION_TIMEFRAMES } from '../../helpers/constants'

interface IProps {
  selected: ISelectItem | null
  onChange: (items: ISelectItem) => void
  hiddenLabel?: boolean
}

const TaskCompletionTimeframeSelect = ({ selected, hiddenLabel, onChange }: IProps) => {
  return (
    <Box>
      {!hiddenLabel && <FilterLabel text='Time Frame' />}
      <SimpleSelect
        value={selected}
        options={TASK_COMPLETION_TIMEFRAMES}
        onChange={(val) => onChange(val)}
        width='100%'
        placeholder={{ label: 'Select time frame', value: null }}
        sx={{
          '.MuiSelect-select': { py: 1.5, borderRadius: `0.75rem !important` },
          '.MuiSvgIcon-root': { color: 'grey.900' },
        }}
        color='grey.900'
      />
    </Box>
  )
}

export default TaskCompletionTimeframeSelect
