import { Box, IconButton, Stack, Typography } from '@mui/material'
import { FC } from 'react'
import TextFieldWithLabel from '../../common/TextFieldWithLabel'
import { FileRejection, useDropzone } from 'react-dropzone'
import { MAX_FILE_SIZES } from '../../../helpers/constants'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import Delete from '@mui/icons-material/Delete'
import { ACCEPT_IMG_FILE_TYPES } from '../../../constants/common'
import { CloseCrossCircle } from '../../../assets/icons/close-cross-circle'
import deepCopy from '../../../helpers/deepCopy'
import { IImg, IPerformanceSopTrainingCreateEdit } from '../../../types/performance-management'
import { FormikProps } from 'formik'

interface IProps {
  label: string
  error: boolean
  errorMsg: string
  fieldName: string
  placeholder: string
  images: IImg[]
  text: string
  index: number
  onRemove: () => void
  setImages: (imgs: IImg[], index: number) => void
  handleTextChange: (idx: number, text: string) => Promise<void>
  handleImageRemove: (imgIdx: number, listIdx: number) => void
}

const MaintenanceProcedureStep: FC<IProps> = ({
  label,
  error,
  errorMsg,
  fieldName,
  placeholder,
  images,
  onRemove,
  text,
  index,
  setImages,
  handleTextChange,
  handleImageRemove,
}) => {
  const onDrop = (files: File[]) => {
    const file = files[0]
    const newImgs = [...images]
    if (file) {
      const url = URL.createObjectURL(file)
      newImgs.push({ url, file })
      setImages(newImgs, index)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/jpg': ACCEPT_IMG_FILE_TYPES },
    maxFiles: 1,
    maxSize: MAX_FILE_SIZES,
    onDrop,
  })

  return (
    <Box>
      <Stack direction={'row'} justifyContent={'space-between'} gap={2}>
        <Box flex={1}>
          <Typography variant='h5' my={1}>
            {label}
          </Typography>
          <TextFieldWithLabel
            showLabel={false}
            name={fieldName}
            error={error}
            helperText={errorMsg}
            placeholder={placeholder}
            value={text}
            onChange={(e) => handleTextChange(index, e.target.value)}
          />
        </Box>
        <Box
          display={'inline-block'}
          sx={{
            borderRadius: '10px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '42px',
            height: '42px',
            background: (theme) => theme.palette.grey[50],
            mt: 4.4
          }}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <AddPhotoAlternateIcon sx={{ color: (theme) => theme.palette.grey[500], fontSize: 20 }} />
        </Box>
        <Box
          display={'inline-block'}
          sx={{
            borderRadius: '10px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '42px',
            height: '42px',
            background: (theme) => theme.palette.grey[50],
            mt: 4.4
          }}
          onClick={() => onRemove()}
        >
          <Delete sx={{ color: '#dc3545', fontSize: 20 }} />
        </Box>
      </Stack>
      {!!images && images.length > 0 && (
        <Stack
          sx={{ flex: 1, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 3, my: 2 }}
        >
          {images.map((img, idx) => {
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
                <img
                  src={img.url}
                  alt='Uploaded image'
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    maxWidth: '100%',
                    maxHeight: '100%',
                  }}
                />
                <IconButton
                  sx={{ position: 'absolute', top: -5, right: -9, p: 0 }}
                  onClick={() => handleImageRemove(idx, index)}
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
    </Box>
  )
}

export default MaintenanceProcedureStep
