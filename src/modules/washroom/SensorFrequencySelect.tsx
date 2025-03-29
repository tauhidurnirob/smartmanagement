import { Box, Collapse } from '@mui/material'

import { ISelectItem } from '../../types/common'
import SimpleSelect from '../common/SimpleSelect'
import FilterLabel from '../common/FilterLabel'
import StyledAlert from '../common/StyledAlert'
import { SENSOR_FREQUENCY_LIST } from '../../helpers/constants'

interface IProps {
  selected: ISelectItem | null
  onChange: (items: ISelectItem) => void
  hiddenLabel?: boolean
  showErrorMessage?: boolean
  error?: boolean
  errorMessage?: string
}

const SensorFrequencySelect = ({
  selected,
  hiddenLabel,
  onChange,
  showErrorMessage,
  error,
  errorMessage,
}: IProps) => {
  return (
    <Box>
      {!hiddenLabel && <FilterLabel text='Sensor Frequency' />}
      <SimpleSelect
        value={selected}
        options={SENSOR_FREQUENCY_LIST}
        onChange={(val) => onChange(val)}
        width='100%'
        sx={{ '.MuiSelect-select': { py: '13px' } }}
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

export default SensorFrequencySelect
