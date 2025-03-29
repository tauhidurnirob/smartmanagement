import { FC } from 'react'
import { Box, Typography, DialogContent } from '@mui/material'
import { DropEvent, FileRejection } from 'react-dropzone'
import { toast } from 'react-toastify'
import FileSaver from 'file-saver'

import DialogWrapper from '../common/DialogWrapper'
import { FileDropzone } from '../common/FileDropzone'
import { ButtonFileUpload } from '../common/ButtonFileUpload'
import { EXCEL_FILE_TYPE, MAX_FILE_SIZES } from '../../helpers/constants'
import Api from '../../api'
import { Download } from '../../assets/icons/download'

const fileType = { 'application/vnd.ms-excel': ['.xlsx', '.xls'] }

interface IProps {
  open: boolean
  onClose: () => void
  onRefresh: () => void
}

const UserBatchUploadDialog: FC<IProps> = (props) => {
  const { onClose, open, onRefresh } = props

  const [batchUpload, { isLoading: isUploading }] = Api.useBatchUploadUsersMutation()
  const [downloadTemplate, { isLoading: isDownloading }] =
    Api.useDownloadTemplateUserUploadMutation()

  const handleDropFiles = (files: File[], fileRejections?: FileRejection[], event?: DropEvent) => {
    if (event) {
      event.stopPropagation()
    }

    if (fileRejections && fileRejections?.length > 0) {
      toast.error('Files must be the supported and valid files.')
    } else {
      if (files.length > 0) {
        batchUpload(files[0])
          .unwrap()
          .then(() => {
            toast.success('Users uploaded')
            onClose()
            onRefresh()
          })
          .catch((err) => {
            console.log('Failed to upload file: ', err)
            if (err.data?.data) {
              for (const error of err.data?.data || []) {
                toast.error(
                  (error.message || 'Failed to parse data') + ' in row ' + (error.rowNumber || '-')
                )
              }
            } else {
              toast.error('Failed to upload file')
            }
          })
      }
    }
  }

  const handleDownloadTemplate = () => {
    downloadTemplate()
      .unwrap()
      .then((res) => {
        if (res) {
          const fileType = EXCEL_FILE_TYPE
          const blob = new Blob([res], {
            type: fileType,
          })
          FileSaver.saveAs(blob, 'user_batch upload template.xlsx')
        }
      })
      .catch((err) => {
        console.log('Failed to download a template: ', err)
        toast.error('Failed to download a template')
      })
  }

  return (
    <DialogWrapper label={'Batch Upload Users'} onClose={onClose} open={open} maxWidth={'802px'}>
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
              Use the provided template to batch upload project site from excel format
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
          description={`Drag & Drop or choose file from computer`}
          sx={{ mt: 3.5 }}
          maxFiles={1}
          loading={isUploading}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <ButtonFileUpload
            accept={fileType}
            maxSize={MAX_FILE_SIZES}
            onDrop={handleDropFiles}
            maxFiles={1}
            loading={isUploading}
          />
        </Box>
      </DialogContent>
    </DialogWrapper>
  )
}

export default UserBatchUploadDialog
