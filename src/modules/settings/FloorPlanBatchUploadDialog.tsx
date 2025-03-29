import { FC } from 'react'
import { Box, Typography, DialogContent } from '@mui/material'
import { DropEvent, FileRejection } from 'react-dropzone'
import { toast } from 'react-toastify'

import DialogWrapper from '../common/DialogWrapper'
import { FileDropzone } from '../common/FileDropzone'
import { MAX_FILE_SIZES } from '../../helpers/constants'
import { ButtonFileUpload } from '../common/ButtonFileUpload'

const fileType = { 'image/jpeg': ['.jpg', '.bmp', '.png', '.jpeg'] }

interface IProps {
  open: boolean
  loading: boolean
  onClose: () => void
  onSelectFloorPlan: (files: File[]) => void
}

const FloorPlanBatchUploadDialog: FC<IProps> = ({ onClose, open, onSelectFloorPlan, loading }) => {
  const handleDropFiles = (files: File[], fileRejections?: FileRejection[], event?: DropEvent) => {
    if (event) {
      event.stopPropagation()
    }

    if (fileRejections && fileRejections?.length > 0) {
      toast.error('Files must be the supported and valid images.')
    } else {
      onSelectFloorPlan(files)
    }
  }

  return (
    <DialogWrapper
      label={'Batch Upload Floor Plan'}
      onClose={onClose}
      open={open}
      maxWidth={'802px'}
    >
      <DialogContent sx={{ pt: 6.25, px: 6, pb: 8.25 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant='h4' sx={{ fontSize: 26 }}>
              Quick batch file upload
            </Typography>
            <Typography
              variant='subtitle1'
              sx={{
                mt: 1,
                fontSize: '18px !important',
                color: (theme) => theme.palette.grey[500],
              }}
            >
              Supported format: jpg, jpeg, png, mp4. Max per file is 5 MB
              <br />
              Format name: Project_Location_Building_Level
            </Typography>
          </Box>
        </Box>
        <FileDropzone
          accept={fileType}
          maxSize={MAX_FILE_SIZES}
          onDrop={handleDropFiles}
          description={`Drag & Drop or choose file from computer`}
          sx={{ mt: 3.5 }}
          loading={loading}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <ButtonFileUpload
            accept={fileType}
            maxSize={MAX_FILE_SIZES}
            onDrop={handleDropFiles}
            loading={loading}
          />
        </Box>
      </DialogContent>
    </DialogWrapper>
  )
}

export default FloorPlanBatchUploadDialog
