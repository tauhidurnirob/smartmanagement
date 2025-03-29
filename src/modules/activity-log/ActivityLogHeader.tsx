import { Stack, Typography, Button } from '@mui/material'

import { PrintIcon } from '../../assets/icons/print'
import { FileUploadLightDuotoneIcon } from '../../assets/icons/file-upload-light-duotone'
import { FC } from 'react'

interface IProps {
  label: string
}

const ActivityLogHeader: FC<IProps> = ({ label }) => {
  return (
    <Stack
      direction={'row'}
      flexWrap={'wrap'}
      gap={2}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <Typography variant='h3'>{label}</Typography>
      <Stack direction={'row'} flexWrap={'wrap'} gap={1.25} alignItems={'center'}>
        <Button
          color='primary'
          variant='contained'
          size='small'
          startIcon={<FileUploadLightDuotoneIcon sx={{ color: 'primary.main' }} />}
        >
          Download CSV
        </Button>
        <Button
          color='primary'
          variant='contained'
          size='small'
          startIcon={<FileUploadLightDuotoneIcon sx={{ color: 'primary.main' }} />}
        >
          Download Excel
        </Button>
        <Button
          color='primary'
          variant='contained'
          size='small'
          startIcon={<FileUploadLightDuotoneIcon sx={{ color: 'primary.main' }} />}
        >
          Download Pdf
        </Button>
        <Button
          color='primary'
          variant='contained'
          size='small'
          startIcon={<PrintIcon sx={{ color: 'primary.main' }} />}
        >
          Print
        </Button>
      </Stack>
    </Stack>
  )
}

export default ActivityLogHeader
