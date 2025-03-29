import { useEffect, useMemo } from 'react'
import { Box, Collapse, SelectChangeEvent } from '@mui/material'
import { ISelectItem } from '../../../types/common'
import FilterLabel from '../../common/FilterLabel'
import SimpleSelect from '../../common/SimpleSelect'
import Api from '../../../api'
import StyledAlert from '../../common/StyledAlert'

interface IProps {
  selected: ISelectItem | null
  onChange: (items: ISelectItem) => void
  hiddenLabel?: boolean
  showErrorMessage?: boolean
  error?: boolean
  errorMessage?: string
}

const SimpleFormTypeSelect = ({ selected, hiddenLabel, onChange, showErrorMessage, error, errorMessage }: IProps) => {
  const { data, isLoading } = Api.useGetAuditFormTypeListQuery({
    page: 1,
    limit: 1000,
  })

  const options = useMemo(() => {
    return data?.rows?.map((row) => ({ label: `Form ${row.name}`, value: row.id })) || []
  }, [data])

  return (
    <Box>
      {!hiddenLabel && <FilterLabel text='Form Type' />}
      <SimpleSelect
        value={selected}
        options={options || []}
        onChange={(val) => onChange(val)}
        width='100%'
        sx={{ '.MuiSelect-select': { py: '13px' } }}
        isLoading={isLoading}
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

export default SimpleFormTypeSelect
