import { Box, SelectChangeEvent } from '@mui/material'

import { ISelectItem } from '../../../types/common'
import FilterLabel from '../../common/FilterLabel'
import SimpleSelect from '../../common/SimpleSelect'
import { AUDIT_RATING_STYLES } from '../../../helpers/constants'

interface IProps {
  selected: ISelectItem | null
  onChange: (item: ISelectItem) => void
  hiddenLabel?: boolean
  height?: 'small' | 'medium' | 'large'
  disabled?: boolean
}

const RatingStyleSelect = ({ selected, hiddenLabel, onChange, height, disabled }: IProps) => {
  return (
    <Box>
      {!hiddenLabel && <FilterLabel text='Rating Style' />}
      <SimpleSelect
        value={selected}
        options={AUDIT_RATING_STYLES}
        onChange={(val) => onChange(val)}
        width='100%'
        placeholder={{ label: 'Select rating style', value: null }}
        height={height}
        disabled={disabled}
      />
    </Box>
  )
}

export default RatingStyleSelect
