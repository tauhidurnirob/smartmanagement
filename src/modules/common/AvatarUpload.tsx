import { FC } from 'react'
import { Box, Typography } from '@mui/material'
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone'

import { FileUpload as FileUploadIcon } from '../../assets/icons/file-upload'
import BackDrop from './BackDrop'

const AvatarUpload: FC<{
  maxSize?: number
  onDrop: (files: File[], fileRejections?: FileRejection[], event?: DropEvent) => void
  sx?: object
  loading?: boolean
  image?: string | null
  avatarName?: string
  disabled?: boolean
}> = ({ maxSize, onDrop, sx, loading, image, avatarName, disabled }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/jpg': ['.jpg', '.bmp', '.png', '.jpeg'] },
    maxFiles: 1,
    maxSize,
    onDrop,
    disabled: loading || disabled,
  })

  return (
    <Box
      sx={{
        alignItems: 'center',
        borderRadius: 4,
        cursor: disabled ? 'default' : loading ? 'not-allowed' : 'pointer',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        outline: 'none',
        width: '100%',
        bgcolor: image ? '#ffffff' : '#FFD7A3',
        py: 2,
        ...(sx || {}),
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {loading ? (
        <Box sx={{ position: 'relative', height: '69px' }}>
          <BackDrop size='40px' />
        </Box>
      ) : image ? (
        <img
          src={image}
          alt='Uploaded'
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            maxWidth: '100%',
            maxHeight: '100%',
          }}
        />
      ) : avatarName ? (
        <Typography variant='h5' sx={{ fontSize: 150, fontWeight: 700, color: '#ffffff' }}>
          {avatarName}
        </Typography>
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
    </Box>
  )
}

export default AvatarUpload
