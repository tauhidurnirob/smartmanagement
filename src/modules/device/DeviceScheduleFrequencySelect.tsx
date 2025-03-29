import { Box, Collapse } from '@mui/material'

import { ISelectItem } from '../../types/common'
import FilterLabel from '../common/FilterLabel'
import SimpleSelect from '../common/SimpleSelect'
import { DEVICE_SCHEDULE_FREQUENCYS } from '../../helpers/constants'
import StyledAlert from '../common/StyledAlert'

interface IProps {
  selected: ISelectItem | null
  onChange: (items: ISelectItem) => void
  hiddenLabel?: boolean
  textColor?: string
  showErrorMessage?: boolean
  error?: boolean
  errorMessage?: string
}

const DeviceScheduleFrequencySelect = ({
  selected,
  hiddenLabel,
  onChange,
  textColor,
  showErrorMessage,
  error,
  errorMessage,
}: IProps) => {
  return (
    <Box>
      {!hiddenLabel && <FilterLabel text='Frequecy' />}
      <SimpleSelect
        value={selected}
        placeholder={{ label: 'Frequency', value: '' }}
        options={DEVICE_SCHEDULE_FREQUENCYS.filter((f) => f.value)}
        onChange={(val) => onChange(val)}
        width='100%'
        sx={{ '.MuiSelect-select': { py: '13px' } }}
        color={textColor}
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

export default DeviceScheduleFrequencySelect
