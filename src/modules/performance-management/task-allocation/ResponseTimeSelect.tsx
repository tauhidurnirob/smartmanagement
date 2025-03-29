import { Box, Collapse } from '@mui/material'
import { ISelectItem } from '../../../types/common'
import FilterLabel from '../../common/FilterLabel'
import SimpleSelect from '../../common/SimpleSelect'
import StyledAlert from '../../common/StyledAlert'
import { RESPONSE_TIME_LIST } from '../../../helpers/constants'

interface IProps {
  selected: ISelectItem | null
  onChange: (items: ISelectItem) => void
  hiddenLabel?: boolean
  showErrorMessage?: boolean
  error?: boolean
  errorMessage?: string
  textColor?: string
}

const ResponseTimeSelect = ({
  selected,
  hiddenLabel,
  onChange,
  showErrorMessage,
  error,
  errorMessage,
  textColor
}: IProps) => {

  return (
    <Box>
      {!hiddenLabel && <FilterLabel text='Form Type' />}
      <SimpleSelect
        value={selected}
        placeholder={{ label: 'Select Response Time', value: null }}
        options={RESPONSE_TIME_LIST || []}
        onChange={(val) => onChange(val)}
        width='100%'
        sx={{ '.MuiSelect-select': { py: '13px' } }}
        isLoading={false}
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

export default ResponseTimeSelect