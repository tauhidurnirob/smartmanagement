import { FC, useEffect, useMemo, useRef, useState } from 'react'
import { Box, Typography, DialogContent, Button, Grid, Tooltip } from '@mui/material'
import dayjs from 'dayjs'
import useImage from 'use-image'

import DialogWrapper from '../common/DialogWrapper'
import TextareaWithLabel from '../common/TextareaWithLabel'
import { IAlert } from '../../types/alert'
import { DATE_FORMAT_WITHOUT_ATSIGN } from '../../constants/common'
import { WarningTriangleRounded } from '../../assets/icons/warning-triangle-rounded'
import getImageSize from '../../helpers/getImageSize'
import { IAlertData } from '../../api/models/alert'

const convertPercentPosToImgPos = (percetPos: number, offset: number, width: number) => {
  return offset + (percetPos / 100) * width
}

interface IImageContainer {
  container: {
    width: number
    height: number
  }
  image: {
    width: number
    height: number
    originalWidth: number
    originalHeight: number
    offset: {
      x: number
      y: number
    }
  }
}

interface IProps {
  alert: IAlertData | null
  locationName: string
  comment: string
  onChangeComment: (comment: string) => void
  onRemind: () => void
}

const AlertDetailDialogComment: FC<IProps> = (props) => {
  const { onRemind, alert, comment, onChangeComment, locationName } = props

  const containerRef = useRef<any>(null)

  const [imgContainer, setImgContainer] = useState<IImageContainer>({
    container: {
      height: 0,
      width: 0,
    },
    image: {
      height: 0,
      width: 0,
      originalWidth: 0,
      originalHeight: 0,
      offset: {
        x: 0,
        y: 0,
      },
    },
  })

  const {
    strCreatedAtDate,
    unitName,
    areaName,
    buildingName,
    levelName,
    title,
    description,
    floorImgUrl,
    pointXPercent,
    pointYPercent,
  } = useMemo(() => {
    const { createdAt, title, unit, description, area, building, comments, id, isRead, level } =
      alert || {}
    const dayCreateAt = dayjs(createdAt)
    const isDay = dayCreateAt.isValid()
    const strCreatedAtDate = isDay ? dayCreateAt.format(DATE_FORMAT_WITHOUT_ATSIGN) : '-'
    const unitName = unit?.name || '-'
    const areaName = area?.name || '-'
    const levelName = level?.name || '-'
    const buildingName = building?.name || '-'

    const floorImgUrl = '/assets/images/custom/tmp-alert.png'
    const pointXPercent = 70
    const pointYPercent = 20

    return {
      strCreatedAtDate,
      unitName,
      areaName,
      buildingName,
      levelName,
      locationName,
      title,
      description,
      floorImgUrl,
      pointXPercent,
      pointYPercent,
    }
  }, [alert])

  const [srcImage, imgLoadstatus] = useImage(floorImgUrl)

  const { pointX, pointY } = useMemo(() => {
    const pointX = convertPercentPosToImgPos(
      pointXPercent,
      imgContainer.image.offset.x,
      imgContainer.image.width
    )
    const pointY = convertPercentPosToImgPos(
      pointYPercent,
      imgContainer.image.offset.y,
      imgContainer.image.height
    )

    return { pointX, pointY }
  }, [alert, pointXPercent, pointYPercent, imgContainer])

  const onWindowResize = () => {
    setImgContainer((state) => {
      const { offsetWidth: width, offsetHeight: height } = containerRef.current

      const { width: imgWidth, height: imgHeight } = getImageSize(
        { width: width, height: height },
        { width: state.image.originalWidth, height: state.image.originalHeight }
      )
      const imgOffset = {
        x: (width - imgWidth) / 2,
        y: (height - imgHeight) / 2,
      }

      return {
        ...state,
        container: {
          ...state.container,
          width,
          height,
        },
        image: {
          ...state.image,
          width: imgWidth,
          height: imgHeight,
          offset: imgOffset,
        },
      }
    })
  }

  useEffect(() => {
    if (imgLoadstatus === 'loaded' && srcImage) {
      const { naturalWidth: initialWidth, naturalHeight: initialHeight } = srcImage
      const containerWidth = containerRef.current.offsetWidth
      const containerHeight = containerRef.current.offsetHeight

      const { width, height } = getImageSize(
        { width: containerWidth, height: containerHeight },
        {
          width: initialWidth,
          height: initialHeight,
        }
      )
      const imgOffset = {
        x: (containerWidth - width) / 2,
        y: (containerHeight - height) / 2,
      }

      setImgContainer((prevState: any) => ({
        ...prevState,
        container: {
          ...prevState.container,
          width: containerWidth,
          height: containerHeight,
        },
        image: {
          ...prevState.image,
          originalWidth: initialWidth,
          originalHeight: initialHeight,
          width,
          height,
          offset: imgOffset,
        },
      }))
    } else {
      setImgContainer((prevState) => ({
        ...prevState,
        image: {
          ...prevState.image,
          originalWidth: 0,
          originalHeight: 0,
          width: 0,
          height: 0,
          offset: { x: 0, y: 0 },
        },
      }))
    }
  }, [imgLoadstatus])

  useEffect(() => {
    window.addEventListener('resize', onWindowResize)

    return () => {
      window.removeEventListener('resize', onWindowResize)
    }
  }, [])

  useEffect(() => {
    if (containerRef.current && alert && floorImgUrl) {
      setImgContainer((prevImgContainer) => ({
        ...prevImgContainer,
        container: {
          ...prevImgContainer.container,
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        },
      }))
    }
  }, [alert, floorImgUrl])

  return (
    <Box>
      <DialogContent sx={{ pt: 2.5, px: 4.5, pb: 2 }}>
        <Grid container spacing={2}>
          <Grid item lg={6} xs={12}>
            <Box
              ref={containerRef}
              sx={{ width: '100%', height: '100%', minHeight: '362px', position: 'relative' }}
            >
              <img
                src={floorImgUrl}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
              {floorImgUrl &&
                imgContainer.container.width > 0 &&
                imgContainer.container.height > 0 && (
                  <Tooltip
                    title='Emergency Button Triggered'
                    arrow
                    placement='bottom'
                    open={true}
                    slotProps={{
                      tooltip: {
                        sx: {
                          bgcolor: '#F24C75',
                          fontSize: '14px',
                          p: 1,
                          borderRadius: 1.5,
                          fontWeight: 400,
                        },
                      },
                      arrow: { sx: { color: '#F24C75' } },
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: pointY,
                        left: pointX,
                        borderRadius: '50%',
                        bgcolor: '#F24C75',
                        width: '1.5rem',
                        height: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <WarningTriangleRounded sx={{ fontSize: 14, color: '#fff', mt: '-1px' }} />
                    </Box>
                  </Tooltip>
                )}
            </Box>
          </Grid>
          <Grid item lg={6} xs={12}>
            <Box>
              <Typography variant='h3' sx={{ fontWeight: 700, color: 'grey.800' }}>
                {title}
              </Typography>
              <Typography
                variant='h4'
                sx={{ fontSize: '15px', fontWeight: 500, color: 'grey.800', mt: 0.25 }}
              >
                {description}
              </Typography>
              <Typography variant='h2' sx={{ fontSize: '1.125rem', color: 'grey.800', mt: 2 }}>
                Location
              </Typography>
              <Typography variant='h4' sx={{ color: 'grey.700', fontWeight: 400, mt: 0.5 }}>
                {locationName}
              </Typography>
              <Typography variant='h4' sx={{ color: 'grey.700', fontWeight: 400, mt: 1 }}>
                {buildingName} - {levelName} - {areaName} - {unitName}
              </Typography>
              <Typography variant='h3' sx={{ fontSize: '1.125rem', color: 'grey.800', mt: 3.75 }}>
                Date & Time
              </Typography>
              <Typography variant='h4' sx={{ color: 'grey.700', fontWeight: 400, mt: 0.5 }}>
                {strCreatedAtDate}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4.5 }}>
          <Typography variant='h3' sx={{ color: 'grey.800' }}>
            Comments
          </Typography>
          <TextareaWithLabel
            name='comment'
            placeholder='Write your comments here'
            rows={5}
            showLabel={false}
            value={comment}
            onChange={(e) => onChangeComment(e.target.value)}
            sx={{
              mt: 1,
              '& .MuiInputBase-input': { bgcolor: '#ffffff' },
              '& .MuiOutlinedInput-notchedOutline': {
                border: (theme) => `1px solid #000`,
                borderRadius: 3,
              },
            }}
          />
        </Box>
      </DialogContent>
      <Box sx={{ pt: 2, px: 3, pb: 2.75 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant='text' color='inherit' sx={{ color: 'grey.400', fontWeight: 500 }}>
            Cancel
          </Button>
          <Button variant='contained' color='primary' sx={{ ml: 10 }} onClick={onRemind}>
            Remind
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default AlertDetailDialogComment
