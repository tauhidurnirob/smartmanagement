import { FC } from 'react'
import { Box, Typography, DialogContent } from '@mui/material'
import { DropEvent, FileRejection } from 'react-dropzone'
import { toast } from 'react-toastify'
import FileSaver from 'file-saver'

import DialogWrapper from '../../common/DialogWrapper'
import { ButtonFileUpload } from '../../common/ButtonFileUpload'
import { MAX_FILE_SIZES } from '../../../helpers/constants'
import { FileDropzone } from '../../common/FileDropzone'
import { Download } from '../../../assets/icons/download'
import Api from '../../../api'

const fileType = { 'application/vnd.ms-excel': ['.xlsx', '.xls'] }

interface IProps {
  open: boolean
  onClose: () => void
}

const MaintenanceBatchUploadDialog: FC<IProps> = (props) => {
  const { onClose, open } = props

  const isLoading = false

  const handleDropFiles = (files: File[], fileRejections?: FileRejection[], event?: DropEvent) => {
    if (event) {
      event.stopPropagation()
    }

    if (fileRejections && fileRejections?.length > 0) {
      toast.error('Files must be the supported and valid images.')
    } else {
    }
  }

  const handleDownloadTemplate = () => {}

  return (
    <DialogWrapper
      label={'Batch Upload Project Site'}
      onClose={onClose}
      open={open}
      maxWidth={'802px'}
    >
      <DialogContent sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant='h4' sx={{ fontSize: 26 }}>
              Batch Upload Maintenance
            </Typography>
            <Typography
              variant='subtitle1'
              sx={{
                mt: 1,
                fontSize: '18px !important',
                color: (theme) => theme.palette.grey[500],
              }}
            >
              Use the provided template to batch upload maintenance from excel format
            </Typography>
          </Box>
          <Box
            sx={{
              px: 2,
              pt: 2,
              pb: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: '1px solid #B5B5C3',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
            onClick={() => handleDownloadTemplate()}
          >
            <Download color='primary' />
            <Typography
              variant='h6'
              sx={{
                mt: 1,
                fontWeight: 700,
                color: (theme) => theme.palette.grey[600],
                whiteSpace: 'break-spaces',
              }}
            >
              Download
              <br />
              Template
            </Typography>
          </Box>
        </Box>
        <FileDropzone
          accept={fileType}
          maxSize={MAX_FILE_SIZES}
          onDrop={handleDropFiles}
          description={`Drag & Drop or choose files from computer`}
          sx={{ mt: 3.5 }}
          maxFiles={1}
          loading={isLoading}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <ButtonFileUpload
            accept={fileType}
            maxSize={MAX_FILE_SIZES}
            onDrop={handleDropFiles}
            maxFiles={1}
            loading={isLoading}
          />
        </Box>
      </DialogContent>
    </DialogWrapper>
  )
}

export default MaintenanceBatchUploadDialog
