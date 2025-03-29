import { FC } from 'react'
import { Box, Stack, IconButton } from '@mui/material'
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'

import BackDrop from './BackDrop'
import { CloseCrossCircle } from '../../assets/icons/close-cross-circle'
import { IMedia } from '../../types/common'

export const MediaDropzoneWithView: FC<{
  maxFiles?: number
  maxSize?: number
  onDrop: (files: File[], fileRejections?: FileRejection[], event?: DropEvent) => void
  description?: string
  sx?: object
  loading?: boolean
  medias?: IMedia[]
  onChange?: (medias: IMedia[]) => void
}> = ({ maxFiles, maxSize, onDrop, sx, loading, medias, onChange }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/jpg': ['.jpg', '.jpeg', '.png'],
      'image/png': ['.png'],
      'video/mpeg4': ['.mp4'],
    },
    maxFiles,
    maxSize,
    onDrop,
    disabled: loading,
  })

  const handleRemove = (idx: number) => {
    if (onChange) {
      const newMedias = [...(medias || [])]
      newMedias.splice(idx, 1)
      onChange(newMedias)
    }
  }

  return (
    <Stack sx={{ display: 'flex', flexDirection: { lg: 'row', xs: 'column' }, gap: 3 }}>
      <Box
        display={'inline-block'}
        sx={{
          width: '117px',
          height: '121px',
          filter: 'drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.25))',
          background: '#ffffff',
          borderRadius: 1.25,
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
        ) : (
          <AddPhotoAlternateIcon sx={{ color: (theme) => theme.palette.grey[500], fontSize: 40 }} />
        )}
      </Box>
      {!!medias && medias.length > 0 && (
        <Stack sx={{ flex: 1, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 3 }}>
          {medias.map((file, idx) => {
            return (
              <Box
                key={idx}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '117px',
                  height: '117px',
                  filter: 'drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.25))',
                  background: '#ffffff',
                  borderRadius: 1.25,
                  position: 'relative',
                }}
              >
                {file.type === 'image' && (
                  <img
                    src={file.url}
                    alt='Uploaded image'
                    style={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'contain',
                      maxWidth: '100%',
                      maxHeight: '100%',
                    }}
                  />
                )}
                {file.type === 'video' && (
                  <video
                    controls
                    style={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'contain',
                      maxWidth: '100%',
                      maxHeight: '100%',
                    }}
                  >
                    <source src={file.url} type={file.type} />
                  </video>
                )}
                <IconButton
                  sx={{ position: 'absolute', top: -5, right: -9, p: 0 }}
                  onClick={() => handleRemove(idx)}
                >
                  <CloseCrossCircle
                    sx={{ color: (theme) => theme.palette.error.main, fontSize: 19 }}
                  />
                </IconButton>
              </Box>
            )
          })}
        </Stack>
      )}
    </Stack>
  )
}
