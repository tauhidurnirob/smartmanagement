import { Box, Button, Typography } from '@mui/material'
import { FC } from 'react'
import { useDropzone } from 'react-dropzone'
import { MAX_FILE_SIZES } from '../../../../../helpers/constants'

interface IProps {
  name: string
  fieldName: string
  placeholder: string
  buttonLabel: string
}

const fileType = { 'application/vnd.ms-excel': ['.xlsx', '.xls'], 'application/pdf': ['.pdf'] }

const UploadFile: FC<IProps> = ({ name, fieldName, placeholder, buttonLabel }) => {
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
      <Button variant='contained' {...getRootProps()}>
        {buttonLabel}
      </Button>
    </Box>
  )
}

export default UploadFile
