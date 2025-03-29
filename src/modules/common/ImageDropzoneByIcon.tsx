import { FC } from 'react'
import { LoadingButton } from '@mui/lab'
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone'

import { PenWithOutlineIcon } from '../../assets/icons/pen-with-outline'

const ImageDropzoneByIcon: FC<{
  onDrop: (files: File[], fileRejections?: FileRejection[], event?: DropEvent) => void
  loading?: boolean
}> = ({ onDrop, loading }) => {
  const acceptTypes = ['.jpg', '.bmp', '.png', '.jpeg']

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/jpg': acceptTypes },
    maxFiles: 1,
    noDrag: true,
    noDragEventsBubbling: true,
    onDrop,
  })

  return (
    <LoadingButton
      size='small'
      sx={{ p: 1, backgroundColor: 'grey.50', minWidth: 0 }}
      loading={loading}
      {...getRootProps()}
    >
      <input {...getInputProps()} />

      <PenWithOutlineIcon sx={{ fontSize: 16 }} />
    </LoadingButton>
  )
}

export default ImageDropzoneByIcon
