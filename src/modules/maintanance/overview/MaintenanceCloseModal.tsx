import { FC, useState } from "react"
import DialogWrapper from "../../common/DialogWrapper"
import { Box, Button, DialogActions, Divider, Stack, Typography } from "@mui/material"
import TextareaWithLabel from "../../common/TextareaWithLabel"
import { ImageDropzoneWithView } from "../../common/ImageDropzoneWithView"
import { FileRejection } from "react-dropzone"
import deepCopy from "../../../helpers/deepCopy"
import { toast } from "react-toastify"


interface IProps {
  open: boolean
  onClose: () => void
}

const MaintenanceCloseModal:FC<IProps> = ({
  open,
  onClose
}) => {
  const [pictures, setPictures] = useState<string[]>([])

  const handleChangeImage = (files: File[], fileRejections?: FileRejection[]) => {
    const imgs = deepCopy(pictures)
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (file) {
        const reader = new FileReader()
        reader.onload = () => {
          imgs.push((reader.result as string))
          setPictures(imgs)
        }
        reader.readAsDataURL(file)
      }
    }
    if(fileRejections && fileRejections?.length > 3) {
      toast.error('Max 3 items can be uploaded together')
    }
  }

  return (
    <DialogWrapper
    open={open}
    onClose={onClose}
    label="Close Event"
    maxWidth={'md'}
    >
      <Box p={3}>
        <TextareaWithLabel
          label={'Comments'}
          name={'comment'}
          placeholder={'Write a Comment'}
          rows={4}
        />
        <Box sx={{ my: 3.5 }}>
          <Typography typography='h5' sx={{ fontSize: 18 }}>
            Upload Photo(s)
          </Typography>
          <Typography mb={1}>Supported format: jpg, jpeg, png. Max file size is 5 MB</Typography>
          <ImageDropzoneWithView
            maxFiles={3}
            onDrop={handleChangeImage}
            images={pictures}
            sx={{ width: pictures.length ? 'auto' : '90px', height: pictures.length ? '180px' : '90px' }}
          />
        </Box>
        <Divider />
        <DialogActions>
          <Stack direction='row' justifyContent='flex-end' px={4} py={2} gap={2}>
            <Button
              variant='text'
              color='inherit'
              sx={{ color: (theme) => theme.palette.grey[300], fontWeight: 500 }}
            >
              Cancel
            </Button>
            <Button variant='contained' size='large' color='primary' sx={{px: 3}}>
              Submit
            </Button>
          </Stack>
        </DialogActions>
      </Box>
    </DialogWrapper>
  )
}

export default MaintenanceCloseModal