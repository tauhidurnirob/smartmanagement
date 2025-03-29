import { FC } from 'react'
import DialogWrapper from '../../common/DialogWrapper'
import { DialogContent } from '@mui/material'
import PerformanceOjtTrainingDetailForm from './PerformanceOjtTrainingDetailForm'
import Api from '../../../api'
import { IOtjOverviewRes } from '../../../types/performance-management'

interface IProps {
  open: boolean
  onClose: () => void
  ojt: IOtjOverviewRes
  reload: () => void
}

const PerformanceOjtTrainingDetailDialog: FC<IProps> = ({ open, onClose, ojt, reload }) => {
  return (
    <DialogWrapper open={open} onClose={onClose} label='OJT Training Details' maxWidth={'md'}>
      <DialogContent>
        <PerformanceOjtTrainingDetailForm ojt={ojt} onClose={onClose} reload={reload} />
      </DialogContent>
    </DialogWrapper>
  )
}

export default PerformanceOjtTrainingDetailDialog
