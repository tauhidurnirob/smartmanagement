import { Box, Typography } from '@mui/material'
import { FC } from 'react'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { useDropzone } from 'react-dropzone'
import { MAX_FILE_SIZES } from '../../../../../helpers/constants'

interface IProps {
  fieldName?: string
  placeholder?: string
}
const fileType = { 'image/jpg': ['.jpg', '.jpeg', '.png', '.bmp'] }

const UploadImage: FC<IProps> = ({ fieldName, placeholder }) => {
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
      {fieldName && (
        <Typography fontWeight='600' fontSize={'14px'} mb='8px'>
          {fieldName}
        </Typography>
      )}
      {placeholder && (
        <Typography fontWeight='600' color={'text.secondary'} fontSize={'14px'} mb='8px'>
          {placeholder}
        </Typography>
      )}
      <Box
        display={'inline-block'}
        border={(theme) => `1px solid ${theme.palette.divider}`}
        p={2}
        boxShadow={'1px 1px 1px rgba(0, 0, 0, 0.1)'}
        borderRadius={'10px'}
        {...getRootProps()}
      >
        <AddPhotoAlternateIcon sx={{ color: (theme) => theme.palette.grey[500] }} />
      </Box>
    </Box>
  )
}

export default UploadImage
