import { FC, useEffect, useState } from 'react'
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import DialogWrapper from '../../common/DialogWrapper'
import MultipleSelect from '../../common/MultipleSelect'
import { ISelectItem } from '../../../types/common'
import { AUDIT_STATES } from '../../../helpers/constants'

interface IProps {
  open: boolean
  filters: { states: number[] }
  onClose: () => void
  onApply: (filters: { states: number[] }) => void
}

const AuditResultListMoreFilterModal: FC<IProps> = ({ open, filters, onClose, onApply }) => {
  const [selectedStates, setSelectedStates] = useState<ISelectItem[]>([])

  const handleDiscard = () => {
    initValues()
    onClose()
  }

  const handleFilter = () => {
    console.log('selectedStates: ', selectedStates)
    onApply({
      states: selectedStates.map((a) => a.value as number),
    })
  }

  const handleChangeStates = (selected: ISelectItem[]) => {
    setSelectedStates(selected)
  }

  const initValues = () => {
    const newStates: ISelectItem[] = []
    filters.states.forEach((a) => {
      const tmp = AUDIT_STATES.find((b) => b.value === a)
      if (tmp) {
        newStates.push(tmp)
      }
    })
    setSelectedStates(newStates)
  }

  useEffect(() => {
    if (open) {
      initValues()
    }
  }, [open, filters])

  return (
    <>
      <DialogWrapper maxWidth='689px' label={'More Filter'} open={open} onClose={() => onClose()}>
        <DialogContent sx={{ p: 4, pb: 5.5 }}>
          <Box>
            <Typography typography='h5' sx={{ fontSize: 18, mb: 2 }}>
              Performance Status
            </Typography>
            <MultipleSelect
              items={AUDIT_STATES}
              selectedItems={selectedStates}
              onChange={handleChangeStates}
              labelForAll='All Performance Status'
            />
          </Box>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Stack direction='row' justifyContent='flex-end' px={4} py={2} gap={2}>
            <Button
              variant='text'
              color='inherit'
              onClick={handleDiscard}
              sx={{ color: (theme) => theme.palette.grey[400], fontWeight: 500 }}
            >
              Cancel
            </Button>
            <Button variant='contained' size='large' color='primary' onClick={() => handleFilter()}>
              Apply Filter
            </Button>
          </Stack>
        </DialogActions>
      </DialogWrapper>
    </>
  )
}

export default AuditResultListMoreFilterModal
