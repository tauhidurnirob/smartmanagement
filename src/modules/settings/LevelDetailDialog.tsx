import { FC, useEffect, useMemo, useState } from 'react'
import { Box, Typography, DialogContent, Divider, Button, Grid } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { retry } from '@reduxjs/toolkit/dist/query'
import { toast } from 'react-toastify'

import DialogWrapper from '../common/DialogWrapper'
import DeviceFloorMap from '../device/DeviceFloorMap'
import { EDeviceMapType, MAX_FILE_SIZES } from '../../helpers/constants'
import TextareaWithLabel from '../common/TextareaWithLabel'
import { FileDropzone } from '../common/FileDropzone'
import { ButtonFileUpload } from '../common/ButtonFileUpload'
import Api from '../../api'
import { ILevel, IReqLevelUpdate } from '../../api/models'
import { UploadApi } from '../../api/upload-api'

const fileType = { 'image/jpg': ['.jpg', '.bmp', '.png', '.jpeg'] }

interface IProps {
  level: ILevel | null
  onClose: () => void
}

const LevelDetailDialog: FC<IProps> = (props) => {
  const { onClose, level } = props

  const open = !!level

  const [updateLevel, { isLoading: isUpdating }] = Api.useUpdateLevelMutation()
  const [updateFile, { isLoading: isUpdatingImage }] = Api.useUploadFileMutation()

  const [imgFloorPlan, setImgFloorPlan] = useState<{ url: string; file: File | null }>({
    url: '',
    file: null,
  })
  const [remark, setRemark] = useState<string>()

  const { buildingName, levelName } = useMemo(() => {
    const buildingName = level?.building?.name || '-'
    const levelName = level?.name || '-'

    return { buildingName, levelName }
  }, [level])

  const handleReplaceFloorPlan = () => {
    setImgFloorPlan({ url: '', file: null })
  }

  const handleChangeFloorPlan = (files: File[]) => {
    const file = files[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImgFloorPlan({ url: (reader.result as string) || '', file: file })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    if (level === null) {
      return
    }

    const newLevel: IReqLevelUpdate = {
      id: level.id,
      remark: remark,
    }

    if (imgFloorPlan.file) {
      const url = await updateFile(imgFloorPlan.file)
        .unwrap()
        .then((res) => res.fileUrl)
        .catch((err) => {
          console.log('Failed to upload floor image: ', err)
          return ''
        })

      if (url) {
        newLevel.floorPlanImgUrl = url
      }
    }

    updateLevel(newLevel)
      .unwrap()
      .then(() => {
        toast.success('Updated the level')
        onClose()
      })
      .catch((err) => {
        console.log('Failed to update the level: ', err)
        toast.error('Failed to update the level')
      })
  }

  useEffect(() => {
    const floor = level?.floorPlanImgUrl || ''
    setImgFloorPlan({ url: floor, file: null })
    setRemark(level?.remark || '')
  }, [level])

  return (
    <DialogWrapper label={'Floor Plan'} onClose={onClose} open={open} maxWidth={'777px'}>
      <DialogContent sx={{ pt: 3, px: 5, pb: 5 }}>
        <Grid container columnSpacing={2.5}>
          <Grid item lg={8} xs={12}>
            <Box sx={{ width: '100%', height: '100%', minHeight: '430px' }}>
              {imgFloorPlan.url ? (
                <DeviceFloorMap
                  src={imgFloorPlan.url || ''}
                  hotspots={[]}
                  unitPoints={[]}
                  onChangeHotspots={() => {}}
                  editType={EDeviceMapType.OnlyView}
                />
              ) : (
                <Box>
                  <FileDropzone
                    accept={fileType}
                    maxSize={MAX_FILE_SIZES}
                    onDrop={handleChangeFloorPlan}
                    description={`Drag & Drop or choose floor plan from computer`}
                    sx={{ mt: 0, minHeight: '392px' }}
                    maxFiles={1}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1.5 }}>
                    <ButtonFileUpload
                      accept={fileType}
                      maxSize={MAX_FILE_SIZES}
                      onDrop={handleChangeFloorPlan}
                      maxFiles={1}
                    />
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item lg={4} xs={12}>
            <Box>
              <Typography variant='h3' sx={{ color: 'grey.800' }}>
                Building
              </Typography>
              <Typography variant='h3' sx={{ color: 'grey.700', fontWeight: 400 }}>
                {buildingName}
              </Typography>
              <Typography variant='h3' sx={{ color: 'grey.800', mt: 5 }}>
                Level
              </Typography>
              <Typography variant='h3' sx={{ color: 'grey.700', fontWeight: 400 }}>
                {levelName}
              </Typography>
              {imgFloorPlan.url && (
                <Button
                  variant='contained'
                  color='primary'
                  size='small'
                  sx={{ mt: 5 }}
                  onClick={handleReplaceFloorPlan}
                >
                  Replace Floor Plan
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3 }}>
          <Typography variant='h3' sx={{ color: 'grey.800' }}>
            Remarks
          </Typography>
          <TextareaWithLabel
            name='remark'
            placeholder='Write a Remark'
            rows={4}
            showLabel={false}
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            sx={{
              mt: 1,
              '& .MuiInputBase-input': { bgcolor: '#ffffff' },
              '& .MuiOutlinedInput-notchedOutline': {
                border: `1px solid #000`,
                borderRadius: 3,
              },
            }}
          />
        </Box>
      </DialogContent>
      <Divider light />
      <Box sx={{ pt: 4.5, px: 3, pb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <LoadingButton
            variant='text'
            color='inherit'
            size='large'
            sx={{ color: 'grey.400', fontWeight: 500 }}
            loading={isUpdating || isUpdatingImage}
          >
            Discard
          </LoadingButton>
          <LoadingButton
            variant='contained'
            color='primary'
            size='large'
            loading={isUpdating || isUpdatingImage}
            onClick={() => handleSave()}
            sx={{ ml: 3 }}
          >
            Save
          </LoadingButton>
        </Box>
      </Box>
    </DialogWrapper>
  )
}

export default LevelDetailDialog
