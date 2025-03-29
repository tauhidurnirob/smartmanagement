import { Box, Typography } from '@mui/material'
import { FC } from 'react'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { useDropzone } from 'react-dropzone'
import { MAX_FILE_SIZES } from '../../../../../helpers/constants'
import { VideoIcon } from '../../../../../assets/icons/audit-form/video'

interface IProps {
  fieldName: string
  placeholder: string
}
const fileType = { 'video/mp4': ['.mp4', '.MP4'] }

const UploadVideo: FC<IProps> = ({ fieldName, placeholder }) => {
  const { getRootProps } = useDropzone({
    accept: fileType,
    maxFiles: 3,
    maxSize: MAX_FILE_SIZES,
    onDrop(acceptedFiles, fileRejections, event) {},
    noDrag: true,
    noDragEventsBubbling: true,
  })
  return (
    <Box>
      <Typography fontWeight='600' fontSize={'14px'} mb='8px'>
        {fieldName}
      </Typography>
      <Typography fontWeight='600' color={'text.secondary'} fontSize={'14px'} mb='8px'>
        {placeholder}
      </Typography>
      <Box
        display={'inline-block'}
        border={(theme) => `1px solid ${theme.palette.divider}`}
        p={2}
        boxShadow={'1px 1px 1px rgba(0, 0, 0, 0.1)'}
        borderRadius={'10px'}
        {...getRootProps()}
      >
        <VideoIcon />
      </Box>
    </Box>
  )
}

export default UploadVideo
