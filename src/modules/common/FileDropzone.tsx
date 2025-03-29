import { FC } from 'react'
import { Box, Typography } from '@mui/material'
import { Accept, DropEvent, FileRejection, useDropzone } from 'react-dropzone'

import { FileUpload as FileUploadIcon } from '../../assets/icons/file-upload'
import BackDrop from './BackDrop'

export const FileDropzone: FC<{
  accept?: Accept
  maxFiles?: number
  maxSize?: number
  onDrop: (files: File[], fileRejections?: FileRejection[], event?: DropEvent) => void
  description?: string
  sx?: object
  loading?: boolean
}> = ({ accept, maxFiles, maxSize, onDrop, sx, description, loading }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: accept,
    maxFiles,
    maxSize,
    onDrop,
    disabled: loading,
  })

  return (
    <Box
      sx={{
        alignItems: 'center',
        borderRadius: 1,
        borderStyle: 'dashed',
        borderWidth: 1.5,
        cursor: loading ? 'not-allowed' : 'pointer',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        outline: 'none',
        width: '100%',
        borderColor: loading ? 'primary.light' : 'primary.main',
        backgroundColor: loading ? 'action.disabledBackground' : 'primary.light',
        py: 2,
        ...(isDragActive && {
          borderColor: loading ? 'primary.light' : 'primary.main',
          backgroundColor: loading ? 'action.disabledBackground' : 'action.hover',
        }),
        '&:hover': {
          borderColor: loading ? 'primary.light' : 'primary.main',
          backgroundColor: loading ? 'action.disabledBackground' : 'action.hover',
        },
        ...(sx || {}),
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {loading ? (
        <Box sx={{ position: 'relative', height: '69px' }}>
          <BackDrop size='40px' />
        </Box>
      ) : (
        <FileUploadIcon
          sx={{
            color: (theme) =>
              loading ? theme.palette.action.disabledBackground : theme.palette.primary.main,
            width: 69,
            height: 'auto',
          }}
        />
      )}
      <Typography
        align='center'
        sx={{
          mt: 2.5,
          color: (theme) => theme.palette.grey['600'],
        }}
        variant='h4'
      >
        {description || 'Select files'}
      </Typography>
    </Box>
  )
}
