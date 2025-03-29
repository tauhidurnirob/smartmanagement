import { FC, useMemo } from 'react'
import { Box, DialogContent, Typography } from '@mui/material'
import DialogWrapper from '../../modules/common/DialogWrapper'
import { IDevice } from '../../api/models'

interface IProps {
  device: IDevice | null
  onClose: () => void
}

const DeviceActivityListModal: FC<IProps> = ({ device, onClose }) => {
  const { typeName, unitName } = useMemo(() => {
    const typeName = device?.deviceType?.deviceType || '-'
    const unitName = device?.deviceUnit?.unit?.name || '-'
    return { typeName, unitName }
  }, [device])

  return (
    <DialogWrapper
      maxWidth='778px'
      label={
        <Box>
          <Typography typography='h3' sx={{ mb: 2 }}>
            Activity Log
          </Typography>
          <Box sx={{ display: 'inline-flex' }}>
            <Typography typography='h5' sx={{ fontWeight: 700, mr: 1 }}>
              {typeName}
            </Typography>
            <Typography typography='h5' sx={{ color: 'grey.500' }}>
              - {unitName}
            </Typography>
          </Box>
        </Box>
      }
      open={device !== null}
      onClose={() => onClose()}
      hiddenTopDivider={true}
    >
      <DialogContent sx={{ p: 4, pb: 5.5 }}>
        <Box>
          <Typography typography='h3' sx={{ fontSize: 18, mb: 1 }}>
            Comments
          </Typography>
        </Box>
        <Box sx={{ mt: 3.5 }}>
          <Typography typography='h5' sx={{ fontSize: 18, mb: 2 }}>
            Upload Photo
          </Typography>
        </Box>
      </DialogContent>
    </DialogWrapper>
  )
}

export default DeviceActivityListModal
