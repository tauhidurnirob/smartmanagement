import { FC } from 'react'
import { Accept, useDropzone } from 'react-dropzone'
import { LoadingButton } from '@mui/lab'

export const ButtonFileUpload: FC<{
  accept?: Accept
  maxFiles?: number
  maxSize?: number
  onDrop: (files: File[]) => void
  label?: string
  sx?: object
  loading?: boolean
}> = ({ accept, maxFiles, maxSize, onDrop, loading }) => {
  const { getRootProps } = useDropzone({
    accept: accept,
    maxFiles,
    maxSize,
    onDrop,
    noDrag: true,
    noDragEventsBubbling: true,
    disabled: loading,
  })

  return (
    <LoadingButton
      variant='contained'
      color='primary'
      size='large'
      loading={loading}
      {...getRootProps()}
    >
      Browse file
    </LoadingButton>
  )
}
