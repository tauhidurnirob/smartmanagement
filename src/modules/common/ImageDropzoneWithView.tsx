import { FC } from 'react'
import { Box, Stack } from '@mui/material'
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'

import BackDrop from './BackDrop'

export const ImageDropzoneWithView: FC<{
  accept?: string[]
  maxFiles?: number
  maxSize?: number
  onDrop: (files: File[], fileRejections?: FileRejection[], event?: DropEvent) => void
  description?: string
  sx?: object
  loading?: boolean
  image?: string | null
  images?: string[]
}> = ({ accept, maxFiles, maxSize, onDrop, sx, loading, image, images }) => {
  const acceptTypes = accept || ['.jpg', '.bmp', '.png', '.jpeg']

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/jpg': acceptTypes },
    maxFiles,
    maxSize,
    onDrop,
    disabled: loading,
  })

  return (
    <Box
      display={'inline-block'}
      sx={{
        boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)',
        borderRadius: '10px',
        cursor: 'pointer',
        ...(isDragActive && {
          borderColor: loading ? 'primary.light' : 'primary.main',
          backgroundColor: loading ? 'action.disabledBackground' : 'action.hover',
        }),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...(sx || {}),
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {loading ? (
        <Box sx={{ position: 'relative', height: '69px' }}>
          <BackDrop size='40px' />
        </Box>
      ) : (images?.length) ?
        <Stack direction={'row'} gap={3}>
        {
          images?.map((image, idx) => (
            <img
              key={`img_${idx}`}
              src={image}
              alt='Uploaded'
              style={{
                width: '100%',
                height: '100px',
                objectFit: 'contain',
                maxWidth: '100%',
                maxHeight: '100%',
              }}
            />
          ))
        }
        </Stack>
       : image ? (
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
      ) : (
        <AddPhotoAlternateIcon sx={{ color: (theme) => theme.palette.grey[500], fontSize: 40 }} />
      )}
    </Box>
  )
}
