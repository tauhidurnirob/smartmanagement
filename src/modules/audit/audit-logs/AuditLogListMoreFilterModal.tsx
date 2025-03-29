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
import { AUDIT_STATES, tmpAuditOptions } from '../../../helpers/constants'

interface IProps {
  open: boolean
  filters: { performances: number[]; audits: number[] }
  onClose: () => void
  onApply: (filters: { performances: number[]; audits: number[] }) => void
}

const AuditLogListMoreFilterModal: FC<IProps> = ({ open, filters, onClose, onApply }) => {
  const [selectedPerformances, setSelectedPerformances] = useState<ISelectItem[]>([])
  const [selectedAudits, setSelectedAudits] = useState<ISelectItem[]>([])

  const handleDiscard = () => {
    initValues()
    onClose()
  }

  const handleFilter = () => {
    onApply({
      performances: selectedPerformances.map((a) => a.value as number),
      audits: selectedAudits.map((a) => (a.value || 0) as number),
    })
  }

  const handleChangePerformances = (selected: ISelectItem[]) => {
    setSelectedPerformances(selected)
  }

  const handleChangeAudits = (selected: ISelectItem[]) => {
    setSelectedAudits(selected)
  }

  const initValues = () => {
    const newPerformances: ISelectItem[] = []
    filters.performances.forEach((a) => {
      const tmp = AUDIT_STATES.find((b) => b.value === a)
      if (tmp) {
        newPerformances.push(tmp)
      }
    })
    setSelectedPerformances(newPerformances)

    const newAudits: ISelectItem[] = []
    filters.audits.forEach((a) => {
      const tmp = tmpAuditOptions.find((b) => b.value === a)
      if (tmp) {
        newAudits.push(tmp)
      }
    })
    setSelectedAudits(newAudits)
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
              selectedItems={selectedPerformances}
              onChange={handleChangePerformances}
              labelForAll='All Performance Status'
            />
          </Box>
          {/* <Box sx={{ mt: 4 }}>
            <Typography typography='h5' sx={{ fontSize: 18, mb: 2 }}>
              Audit Number
            </Typography>
            <MultipleSelect
              items={tmpAuditOptions}
              selectedItems={selectedAudits}
              onChange={handleChangeAudits}
              labelForAll='All Audits'
            />
          </Box> */}
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

export default AuditLogListMoreFilterModal
