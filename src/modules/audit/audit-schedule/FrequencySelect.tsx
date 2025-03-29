import { Box, Collapse, SelectChangeEvent } from '@mui/material'
import { ISelectItem } from '../../../types/common'
import FilterLabel from '../../common/FilterLabel'
import SimpleSelect from '../../common/SimpleSelect'
import { AUDIT_SCHEDULE_FREQUENCYS } from '../../../helpers/constants'
import StyledAlert from '../../common/StyledAlert'

interface IProps {
  selected: ISelectItem
  onChange: (items: ISelectItem) => void
  hiddenLabel?: boolean
  textColor?: string
  options: ISelectItem[]
  hiddenErrorMessage?: boolean
  error?: boolean
  helperText?: string
}

const FrequencySelect = ({
  selected,
  hiddenLabel,
  onChange,
  textColor,
  options,
  hiddenErrorMessage,
  error,
  helperText,
}: IProps) => {
  return (
    <Box>
      {!hiddenLabel && <FilterLabel text='Location' />}
      <SimpleSelect
        value={selected}
        placeholder={{ label: 'Frequency', value: '' }}
        options={options.filter((f) => f.label)}
        onChange={(val) => onChange(val)}
        width='100%'
        sx={{ '.MuiSelect-select': { py: '13px' } }}
        color={textColor}
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

export default FrequencySelect
