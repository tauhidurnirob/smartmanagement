import { useEffect, useMemo, useRef, useState } from 'react'
import { Box, Button, Slider, Stack, SxProps, Typography, alpha } from '@mui/material'
import { Stage, Layer, Image } from 'react-konva'
import useImage from 'use-image'
import Konva from 'konva'

import { exitFullscreen, requestFullscreen } from '../../helpers/fullscreenHelper'
import { Fullscreen } from '../../assets/icons/fullscreen'
import { IDeviceHotspot, IUnitPoint } from '../../types/common'
import DeviceHotSpot from './DeviceHotSpot'
import UnitPolygon from './UnitPolygon'
import { EDeviceMapType } from '../../helpers/constants'
import deepCopy from '../../helpers/deepCopy'
import { Vector2d } from 'konva/lib/types'
import getImageSize from '../../helpers/getImageSize'

const ZOOM_STEP = 0.1
const MAX_ZOOM = 5
const MIN_ZOOM = 1

const convertPercentPosToImgPos = (percetPos: number, offset: number, width: number) => {
  return offset + (percetPos / 100) * width
}

const convertImgPosToPercetPos = (imgPos: number, offset: number, width: number) => {
  return ((imgPos - offset) / width) * 100
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
  scale: number
  isFullscreen: boolean
}

interface IProps {
  src: string
  sx?: SxProps
  hotspots?: IDeviceHotspot[]
  unitPoints?: IUnitPoint[]
  editType?: EDeviceMapType
  showFullscreen?: boolean
  editableUnitHotspot?: boolean
  selectedDeviceIds?: number[]
  onChangeHotspots?: (spots: IDeviceHotspot[]) => void
  onSelectHotspot?: (spot: IDeviceHotspot) => void
  onChangeUnitPoints?: (spots: IUnitPoint[]) => void
  onEditableHotspot?: (isEdit: boolean) => void
}

const DeviceFloorMap: React.FC<IProps> = ({
  src,
  sx,
  hotspots,
  unitPoints,
  editType = EDeviceMapType.OnlyView,
  showFullscreen,
  editableUnitHotspot,
  selectedDeviceIds,
  onChangeHotspots,
  onChangeUnitPoints,
  onEditableHotspot,
  onSelectHotspot,
}) => {
  const [srcImage, imgLoadstatus] = useImage(src)

  const containerRef = useRef<any>(null)
  const rootRef = useRef<any>(null)
  const fullscreenStartRef = useRef<any>(null)
  const fullscreenEndRef = useRef<any>(null)

  const [selectedUnitPointIdx, setSelectedUnitPointIdx] = useState<number | null>(null)
  const [isSelectableHotspot, setIsSelectableHotspot] = useState<boolean>(false)
  const [isSelectedUnit, setIsSelectedUnit] = useState<boolean>(false)
  const [isAddingNewUnitPoint, setIsAddingNewUnitPoint] = useState<boolean | null>(
    unitPoints && unitPoints?.length > 0 ? false : null
  )
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
    scale: MIN_ZOOM,
    isFullscreen: false,
  })

  const { unitNodes, offsetContainerX, offsetContainerY } = useMemo(() => {
    const offsetContainerX = imgContainer.container.width / 2
    const offsetContainerY = imgContainer.container.height / 2

    const unitNodes = []
    for (const p of unitPoints || []) {
      const x = convertPercentPosToImgPos(
        p.x,
        imgContainer.image.offset.x,
        imgContainer.image.width
      )
      const y = convertPercentPosToImgPos(
        p.y,
        imgContainer.image.offset.y,
        imgContainer.image.height
      )
      unitNodes.push({ x, y })
    }

    return { unitNodes, offsetContainerX, offsetContainerY }
  }, [imgContainer, unitPoints])

  const handleZoomIn = (event: any) => {
    setImgContainer((prevImgContainer) => ({
      ...prevImgContainer,
      scale: Math.max(0, prevImgContainer.scale - ZOOM_STEP),
    }))
    event.preventDefault()
  }

  const handleZoomOut = (event: any) => {
    setImgContainer((prevImgContainer) => ({
      ...prevImgContainer,
      scale: Math.max(0, prevImgContainer.scale + ZOOM_STEP),
    }))
    event.preventDefault()
  }

  const handleChangeZoom = (scale: number) => {
    setImgContainer((prevImgContainer) => ({
      ...prevImgContainer,
      scale,
    }))
  }

  const onWindowResize = () => {
    setImgContainer((state) => {
      const { offsetWidth: width, offsetHeight: height } = containerRef.current
      const fullscreen = state.isFullscreen

      const { width: imgWidth, height: imgHeight } = getImageSize(
        { width: width * (fullscreen ? 0.9 : 1), height: height * (fullscreen ? 0.9 : 1) },
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
        scale: MIN_ZOOM,
        draggable: false,
      }
    })
  }

  const toggleFullscreen = () => {
    if (!imgContainer.isFullscreen) {
      setImgContainer((prevImgContainer) => ({
        ...prevImgContainer,
        isFullscreen: true,
        container: {
          width: 0,
          height: 0,
        },
      }))
      requestFullscreen(containerRef.current)
        .then(() => {
          onWindowResize()
        })
        .catch((err) => {})
    } else {
      setImgContainer((prevImgContainer) => ({
        ...prevImgContainer,
        isFullscreen: false,
        container: {
          width: 0,
          height: 0,
        },
      }))
      exitFullscreen()
        .then((res) => {
          onWindowResize()
        })
        .catch((err) => {})
    }
  }

  const handleChangeSelectHotspot = () => {
    setIsSelectableHotspot(true)
  }

  const handleChangeEditableHotspot = () => {
    if (onEditableHotspot) {
      onEditableHotspot(true)
    }
  }

  const handleChangeDevicePos = (idx: number, x: number, y: number) => {
    if (![EDeviceMapType.AddableDevice, EDeviceMapType.EditableDevice].includes(editType)) return

    if (hotspots && onChangeHotspots) {
      const newSpots = [...hotspots]
      newSpots[idx] = {
        ...hotspots[idx],
        x: convertImgPosToPercetPos(x, imgContainer.image.offset.x, imgContainer.image.width),
        y: convertImgPosToPercetPos(y, imgContainer.image.offset.y, imgContainer.image.height),
      }

      onChangeHotspots([...newSpots])
    }
  }

  const handleMouseDownImage = (e: Konva.KonvaEventObject<DragEvent>) => {
    if (editType === EDeviceMapType.AddableDevice) {
      if (onChangeHotspots) {
        const newPos = e.target.getRelativePointerPosition()
        onChangeHotspots([
          {
            x: convertImgPosToPercetPos(newPos?.x as number, 0, imgContainer.image.width),
            y: convertImgPosToPercetPos(newPos?.y as number, 0, imgContainer.image.height),
          },
        ])
      }
    } else if (editType === EDeviceMapType.EditableUnitNodes) {
      const addNewPoint = () => {
        if (onChangeUnitPoints) {
          const newPos = e.target.getRelativePointerPosition()
          const newPoints = deepCopy(unitPoints || [])
          newPoints.push({
            x: convertImgPosToPercetPos(newPos?.x as number, 0, imgContainer.image.width),
            y: convertImgPosToPercetPos(newPos?.y as number, 0, imgContainer.image.height),
          })
          onChangeUnitPoints(newPoints)
          setSelectedUnitPointIdx(newPoints.length - 1)
        }
      }
      if (isAddingNewUnitPoint === null) {
        if (unitPoints && unitPoints.length === 0) {
          addNewPoint()
        }
        setIsAddingNewUnitPoint(true)
      } else if (isAddingNewUnitPoint) {
        addNewPoint()
      } else {
        setSelectedUnitPointIdx(null)
        setIsSelectedUnit(false)
      }
    }
  }

  const handleEndAddingNewUnitPoint = () => {
    if (editType === EDeviceMapType.EditableUnitNodes) {
      if (isAddingNewUnitPoint === true) {
        setIsAddingNewUnitPoint(false)
      }
    }
  }

  const handleChangeSelectedUnitPointIndex = (idx: number | null) => {
    setSelectedUnitPointIdx(idx)
  }

  const handleChangeUnitPoints = (nodes: Vector2d[]) => {
    const newPoints = nodes.map((node) => {
      return {
        x: convertImgPosToPercetPos(node.x, imgContainer.image.offset.x, imgContainer.image.width),
        y: convertImgPosToPercetPos(node.y, imgContainer.image.offset.y, imgContainer.image.height),
      }
    })
    if (onChangeUnitPoints) onChangeUnitPoints(newPoints)
  }

  const handleSelectUnit = (selected: boolean) => {
    setIsSelectedUnit(selected)
  }

  const handleSelect = (spot: IDeviceHotspot) => {
    if (onSelectHotspot) {
      onSelectHotspot(spot)
    }
  }

  useEffect(() => {
    if (imgLoadstatus === 'loaded' && srcImage) {
      const { naturalWidth: initialWidth, naturalHeight: initialHeight } = srcImage
      const { width: containerWidth, height: containerHeight } = imgContainer.container

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
        image: {
          ...prevState.image,
          originalWidth: initialWidth,
          originalHeight: initialHeight,
          width,
          height,
          offset: imgOffset,
        },
        scale: MIN_ZOOM,
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
        scale: MIN_ZOOM,
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
    setImgContainer((prevImgContainer) => ({
      ...prevImgContainer,
      container: {
        ...prevImgContainer.container,
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      },
      scale: MIN_ZOOM,
      isFullscreen: false,
    }))
  }, [])

  useEffect(() => {
    if (!src) {
      setImgContainer((prevImgContainer) => ({ ...prevImgContainer, scale: MIN_ZOOM }))
    }
  }, [src, editableUnitHotspot])

  useEffect(() => {
    const handleKeyDownMap = (e: KeyboardEvent) => {
      if (e.code === 'Delete') {
        if (selectedUnitPointIdx !== null) {
          if (unitPoints && unitPoints.length > 0 && onChangeUnitPoints) {
            const newNodes = deepCopy(unitPoints)
            newNodes.splice(selectedUnitPointIdx, 1)
            onChangeUnitPoints(deepCopy(newNodes))
            setSelectedUnitPointIdx(null)
          }
        }

        if (isSelectedUnit) {
          if (onChangeUnitPoints) onChangeUnitPoints([])
          setIsAddingNewUnitPoint(null)
          setIsSelectedUnit(false)
          setSelectedUnitPointIdx(null)
        }
      }
    }

    document.addEventListener('keydown', handleKeyDownMap, false)

    return () => {
      document.removeEventListener('keydown', handleKeyDownMap)
    }
  }, [selectedUnitPointIdx, isSelectedUnit, unitPoints])

  return (
    <Stack sx={{ display: 'flex', flexDirection: 'column', height: '100%', ...(sx || {}) }}>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          width: '100%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          ref={rootRef}
          sx={{
            display: 'flex',
            width: '100%',
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: src ? 'pointer' : 'default',
          }}
        >
          <Box
            ref={containerRef}
            sx={{
              display: 'flex',
              width: '100%',
              height: '100%',
              position: 'relative',
              overflow: 'hidden',
              justifyContent: 'center',
              alignItems: 'center',
              ...(!imgContainer.isFullscreen && { border: '1px solid #D9D9D9', borderRadius: 3 }),
              background: '#ffffff',
            }}
          >
            {src && (
              <Stage
                width={imgContainer.container.width}
                height={imgContainer.container.height}
                draggable={[EDeviceMapType.OnlyView].includes(editType)}
                offset={{ x: offsetContainerX, y: offsetContainerY }}
                scale={{ x: imgContainer.scale, y: imgContainer.scale }}
                x={offsetContainerX}
                y={offsetContainerY}
              >
                <Layer x={0} y={0}>
                  <Image
                    image={srcImage}
                    width={imgContainer.image.width}
                    height={imgContainer.image.height}
                    x={imgContainer.image.offset.x}
                    y={imgContainer.image.offset.y}
                    onMouseDown={handleMouseDownImage}
                    zIndex={0}
                  />
                  {unitPoints && unitPoints.length > 0 && (
                    <UnitPolygon
                      points={unitNodes}
                      scale={1 / imgContainer.scale}
                      editable={
                        editType === EDeviceMapType.EditableUnitNodes && editableUnitHotspot
                      }
                      selectedNodeIdx={selectedUnitPointIdx}
                      onChangePoints={handleChangeUnitPoints}
                      onSelectNode={handleChangeSelectedUnitPointIndex}
                      selectedUnit={isSelectedUnit}
                      onSelectUnit={handleSelectUnit}
                      onEndAdding={handleEndAddingNewUnitPoint}
                    />
                  )}
                  {!!src &&
                    hotspots &&
                    hotspots.map((hotspot, index) => {
                      const x = convertPercentPosToImgPos(
                        hotspot.x,
                        imgContainer.image.offset.x,
                        imgContainer.image.width
                      )
                      const y = convertPercentPosToImgPos(
                        hotspot.y,
                        imgContainer.image.offset.y,
                        imgContainer.image.height
                      )
                      const isSelected =
                        (selectedDeviceIds || []).findIndex((id) => id === hotspot.deviceId) !== -1
                      return (
                        <DeviceHotSpot
                          key={index}
                          hotspot={{ ...hotspot, x, y, isSelected }}
                          scale={1 / imgContainer.scale}
                          onChangePos={(x, y) => handleChangeDevicePos(index, x, y)}
                          onSelect={(h) => handleSelect(h)}
                          draggable={[
                            EDeviceMapType.AddableDevice,
                            EDeviceMapType.EditableDevice,
                          ].includes(editType)}
                        />
                      )
                    })}
                </Layer>
              </Stage>
            )}
            {!src && (
              <Typography
                variant='h3'
                color='text.secondary'
                sx={{ fontWeight: 700, textAlign: 'center' }}
              >
                No available floor plan
              </Typography>
            )}
            {!!src && imgContainer.isFullscreen && (
              <Box sx={{ position: 'absolute', top: '25px', right: '25px' }}>
                <Button
                  ref={fullscreenEndRef}
                  style={{
                    width: '30px',
                    height: '30px',
                    border: 'none',
                    background: '#ffffff',
                    color: '#212121',
                    boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.5)',
                    minWidth: '0px',
                  }}
                  onClick={() => {
                    toggleFullscreen()
                  }}
                >
                  X
                </Button>
              </Box>
            )}
          </Box>
          {showFullscreen && (
            <Box
              sx={{
                position: 'absolute',
                bottom: { lg: '10px', xs: '10px' },
                right: { xs: 0, lg: '10px' },
              }}
            >
              <Box
                ref={fullscreenStartRef}
                sx={{
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#FFFFFF',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  width: '28px',
                  height: '28px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  toggleFullscreen()
                }}
              >
                <Fullscreen sx={{ fontSize: 20, color: (theme) => theme.palette.grey[700] }} />
              </Box>
            </Box>
          )}
        </Box>

        {!!src && EDeviceMapType.AddableDevice === editType && !isSelectableHotspot && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              background: 'rgba(63, 66, 84, 0.7)',
              borderRadius: 3,
            }}
          >
            <Button
              variant='contained'
              color='inherit'
              sx={{ color: (theme) => theme.palette.primary.main, backgroundColor: '#ffffff' }}
              onClick={handleChangeSelectHotspot}
            >
              <Typography
                variant='caption'
                sx={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: (theme) => theme.palette.primary.main,
                }}
              >
                Select the location
              </Typography>
            </Button>
          </Box>
        )}

        {!!src && EDeviceMapType.EditableUnitNodes === editType && !editableUnitHotspot && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              background: 'rgba(63, 66, 84, 0.7)',
              borderRadius: 3,
            }}
          >
            <Button
              variant='contained'
              color='inherit'
              sx={{ color: (theme) => theme.palette.primary.main, backgroundColor: '#ffffff' }}
              onClick={handleChangeEditableHotspot}
            >
              <Typography
                variant='caption'
                sx={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: (theme) => theme.palette.primary.main,
                }}
              >
                Edit Location
              </Typography>
            </Button>
          </Box>
        )}
      </Box>
      {!!src && [EDeviceMapType.OnlyView].includes(editType) && (
        <Stack display={'flex'} flexDirection={'row'} flexWrap={'nowrap'} mt={1.25}>
          <Box
            sx={{
              display: 'flex',
              width: '2rem',
              height: '1.25rem',
              backgroundColor: (theme) => theme.palette.grey[400],
              borderRadius: '50px 0px 0px 50px',
              alignItems: 'center',
              justifyContent: 'flex-start',
              cursor: 'pointer',
              paddingLeft: 1.25,
            }}
            onClick={handleZoomIn}
          >
            <Typography
              variant='h4'
              sx={{ color: (theme) => theme.palette.grey[600], userSelect: 'none' }}
            >
              -
            </Typography>
          </Box>
          <Slider
            color='secondary'
            defaultValue={50}
            aria-label='Default'
            max={MAX_ZOOM}
            min={MIN_ZOOM}
            step={ZOOM_STEP}
            value={imgContainer.scale}
            onChange={(e, scale) => handleChangeZoom(scale as number)}
            sx={{
              padding: '8px 0 !important',
              '.MuiSlider-rail': {
                height: '1.25rem',
                borderRadius: 0,
                backgroundColor: (theme) => theme.palette.grey[100],
              },
              '.MuiSlider-track': {
                height: '1.25rem',
                borderRadius: 0,
                border: 'none',
                backgroundColor: 'rgba(126, 130, 153, 0.5)',
              },
              '.MuiSlider-thumb': {
                height: '1.125rem',
                width: '1.125rem',
                backgroundColor: (theme) => theme.palette.grey[600],
                '&:hover, &.Mui-focusVisible': {
                  boxShadow: (theme) => `0px 0px 0px 8px ${alpha(theme.palette.grey[600], 0.16)}`,
                },
              },
            }}
          />
          <Box
            sx={{
              display: 'flex',
              width: '2rem',
              height: '1.25rem',
              backgroundColor: (theme) => theme.palette.grey[400],
              borderRadius: '0px 50px 50px 0px',
              alignItems: 'center',
              justifyContent: 'flex-end',
              cursor: 'pointer',
              paddingTop: '1px',
              paddingRight: 1.25,
            }}
            onClick={handleZoomOut}
          >
            <Typography
              variant='h5'
              sx={{ color: (theme) => theme.palette.grey[600], userSelect: 'none' }}
            >
              +
            </Typography>
          </Box>
        </Stack>
      )}
    </Stack>
  )
}

export default DeviceFloorMap
