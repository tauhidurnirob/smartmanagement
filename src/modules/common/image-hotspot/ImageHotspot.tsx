import { CSSProperties, useEffect, useRef, useState } from 'react'
import { Box, Button, Slider, Stack, SxProps, Typography, alpha } from '@mui/material'

import Hotspot from './Hotspot'
import { Fullscreen } from '../../../assets/icons/fullscreen'
import { IHotspot } from '../../../types/common'

const ZOOM_STEP = 0.1
const MAX_ZOOM = 5
const MIN_ZOOM = 1

interface IProps {
  src: string | null
  alt: string
  hotspots: IHotspot[]
  hideFullscreenControl?: boolean
  hideZoomControls?: boolean
  disableSelectHotspot?: boolean
  disableDraggable?: boolean
  onAddHotspot?: (x: number, y: number) => void
  sx?: SxProps
}

const getImageSize = (container: any, image: any) => {
  const { width: wi, height: hi } = image
  const { width: wc, height: hc } = container
  const kw = wc / wi
  const kh = hc / hi
  const k = Math.min(kw, kh)
  const width = k * wi
  const height = k * hi
  return { width, height }
}

const ImageHotspots = (props: IProps) => {
  const {
    src,
    alt,
    hotspots,
    onAddHotspot,
    hideFullscreenControl,
    hideZoomControls,
    disableSelectHotspot,
    disableDraggable,
    sx,
  } = props

  const containerRef = useRef<any>(null)
  const rootRef = useRef<any>(null)
  const zoomInRef = useRef<any>(null)
  const zoomOutRef = useRef<any>(null)
  const zoomFitRef = useRef<any>(null)
  const fullscreenStartRef = useRef<any>(null)
  const fullscreenEndRef = useRef<any>(null)
  const imgRef = useRef<any>(null)

  const [state, setState] = useState<any>({
    showSelectHotspot: false,
    fullscreen: false,
    container: {
      width: undefined,
      height: undefined,
      background: undefined,
      offsetX: 0,
      offsetY: 0,
    },
    image: {
      initialWidth: undefined,
      initialHeight: undefined,
      width: undefined,
      height: undefined,
      scale: 1,
      isWidth: false,
    } as CSSProperties,
    draggable: !disableDraggable,
    cursorX: undefined,
    cursorY: undefined,
    mcursorX: undefined,
    mcursorY: undefined,
    dragging: undefined,
    isGuideDragging: undefined,
  })

  const { container, image, dragging, draggable } = state
  const imageLoaded = image.initialWidth && image.initialHeight

  const imageStyle = {
    position: 'relative',
    left: container.offsetX,
    top: container.offsetY,
    transform: `scale(${image.scale})`,
  } as CSSProperties

  const hotspotsStyle = {
    position: 'absolute',
    top: container.offsetY,
    left: container.offsetX,
    margin: 'auto',
    pointerEvents: 'none',
  } as CSSProperties

  const buttonStyle = {
    width: '30px',
    height: '30px',
    border: 'none',
    background: '#ffffff',
    color: '#212121',
    boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.5)',
    minWidth: '0px',
  }

  if (imageLoaded) {
    imageStyle.width = image.width
    imageStyle.height = image.height

    hotspotsStyle.height = image.scale * Number(imageStyle.height)
    hotspotsStyle.width = image.scale * Number(imageStyle.width)

    hotspotsStyle.top = (container.height - hotspotsStyle.height) / 2 + container.offsetY
    hotspotsStyle.left = (container.width - hotspotsStyle.width) / 2 + container.offsetX
  }

  const startDrag = (event: any) => {
    const cursorX = event.clientX ?? event.touches[0].clientX
    const cursorY = event.clientY ?? event.touches[0].clientY
    setState((state: any) => {
      return {
        ...state,
        cursorX,
        cursorY,
        mcursorX: cursorX,
        mcursorY: cursorY,
        dragging: true,
      }
    })
    event.preventDefault()
  }

  const whileDrag = (event: any) => {
    setState((state: any) => {
      const { container } = state
      const cursorX = event.clientX ?? event.touches[0].clientX
      const cursorY = event.clientY ?? event.touches[0].clientY
      const deltaX = cursorX - state.cursorX
      const deltaY = cursorY - state.cursorY
      const newOffsetX = container.offsetX + deltaX
      const newOffsetY = container.offsetY + deltaY
      return {
        ...state,
        cursorX,
        cursorY,
        container: {
          ...container,
          offsetX: newOffsetX,
          offsetY: newOffsetY,
        },
      }
    })
    event.preventDefault()
  }

  const stopDrag = (event: any) => {
    setState((state: any) => ({
      ...state,
      dragging: false,
    }))
    event.preventDefault()

    // Add hot position
    const cursorX = event.clientX ?? event.touches[0].clientX
    const cursorY = event.clientY ?? event.touches[0].clientY
    if (cursorX === state.mcursorX && cursorY === state.mcursorY) {
      if (onAddHotspot) {
        const imgWidth = state.image.width
        const imgHeight = state.image.height
        const imgScale = state.image.scale
        const { left: imgLeft, top: imgTop } = imgRef.current.getBoundingClientRect()

        const imgX = imgLeft
        const imgY = imgTop
        const percentX = ((cursorX - imgX) / (imgWidth || 1) / (imgScale || 1)) * 100
        const percentY = ((cursorY - imgY) / (imgHeight || 1) / (imgScale || 1)) * 100
        onAddHotspot(percentX, percentY)
      }
    }
  }

  const onImageLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const image = event.currentTarget
    const { offsetWidth: initialWidth, offsetHeight: initialHeight } = image
    const { container, hideZoomControls } = state

    const { width, height } = getImageSize(container, {
      width: initialWidth,
      height: initialHeight,
    })

    setState((prevState: any) => ({
      ...prevState,
      container: {
        ...prevState.container,
        offsetX: 0,
        offsetY: 0,
      },
      image: {
        ...prevState.image,
        initialWidth,
        initialHeight,
        width,
        height,
        scale: 1,
      },
      hideZoomControls: hideZoomControls,
      draggable: disableDraggable ? false : true,
    }))
  }

  const onWindowResize = () => {
    const { offsetWidth: width, offsetHeight: height } = containerRef.current

    setState((state: any) => {
      const fullscreen = state.fullscreen
      const { width: imgWidth, height: imgHeight } = getImageSize(
        { width: width * (fullscreen ? 0.9 : 1), height: height * (fullscreen ? 0.9 : 1) },
        state.image
      )

      return {
        ...state,
        container: {
          ...state.container,
          width,
          height,
          offsetX: 0,
          offsetY: 0,
        },
        image: {
          ...state.image,
          width: imgWidth,
          height: imgHeight,
          scale: 1,
        },
        draggable: false,
      }
    })
  }

  const toggleFullscreen = () => {
    const { fullscreen } = state
    if (!fullscreen) {
      setState((prevState: any) => ({ ...prevState, fullscreen: true }))
      requestFullscreen(containerRef.current)
        .then(() => {
          onWindowResize()
        })
        .catch((err) => {})
    } else {
      exitFullscreen()
        .then((res) => {
          onWindowResize()
        })
        .catch((err) => {})
    }
  }

  const zoom = (scale: number, isFit?: boolean) => {
    setState((prevState: any) => ({
      ...prevState,
      container: {
        ...prevState.container,
        ...(isFit ? { offsetX: 0, offsetY: 0 } : {}),
      },
      image: {
        ...prevState.image,
        scale,
      },
    }))
  }

  const requestFullscreen = async (element: any) => {
    if (element.requestFullscreen) {
      await element.requestFullscreen()
    } else if (element.mozRequestFullScreen) {
      await element.mozRequestFullScreen()
    } else if (element.webkitRequestFullscreen) {
      await element.webkitRequestFullscreen()
    } else if (element.msRequestFullscreen) {
      await element.msRequestFullscreen()
    }
  }

  const exitFullscreen = async () => {
    if (document.exitFullscreen) {
      await document.exitFullscreen()
    }
  }

  const handleFit = (event: any) => {
    zoom(1, true)
    event.preventDefault()
  }

  const handleZoomOut = (event: any) => {
    setState((prevState: any) => {
      const scale = Math.max(0, prevState.image.scale + ZOOM_STEP)
      return {
        ...prevState,
        container: {
          ...prevState.container,
        },
        image: {
          ...prevState.image,
          scale,
        },
      }
    })
    event.preventDefault()
  }

  const handleZoomIn = (event: any) => {
    setState((prevState: any) => {
      const scale = Math.max(0, prevState.image.scale - ZOOM_STEP)
      return {
        ...prevState,
        container: {
          ...prevState.container,
        },
        image: {
          ...prevState.image,
          scale,
        },
      }
    })
    event.preventDefault()
  }

  const handleChangeZoom = (scale: number) => {
    setState((prevState: any) => {
      return {
        ...prevState,
        container: {
          ...prevState.container,
        },
        image: {
          ...prevState.image,
          scale,
        },
      }
    })
  }

  const handleChangeSelectHotspot = () => {
    setState((prevState: any) => ({
      ...prevState,
      showSelectHotspot: false,
    }))
  }

  useEffect(() => {
    const { offsetWidth: width, offsetHeight: height } = containerRef.current

    setState((state: any) => ({
      ...state,
      container: {
        width,
        height,
        offsetX: 0,
        offsetY: 0,
      },
      image: {
        ...state.image,
        scale: 1,
      },
    }))

    window.addEventListener('resize', onWindowResize)

    return () => {
      window.removeEventListener('resize', onWindowResize)
    }
  }, [])

  useEffect(() => {
    if (document.fullscreenElement === null) {
      setState((state: any) => ({
        ...state,
        fullscreen: false,
        container: {
          ...state.container,
          offsetX: 0,
          offsetY: 0,
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        },
        image: { ...state.image, scale: 1 },
        draggable: disableDraggable ? false : true,
      }))
    } else {
      if (document.fullscreenElement.contains(containerRef.current)) {
        onWindowResize()
      }
    }
  }, [document.fullscreenElement, disableDraggable])

  useEffect(() => {
    const root = rootRef.current
    const isZoomOut = (target: any) => zoomOutRef.current?.contains(target)
    const isZoomIn = (target: any) => zoomInRef.current?.contains(target)
    const isZoomFit = (target: any) => zoomFitRef.current?.contains(target)
    const isFullscreenStart = (target: any) => fullscreenStartRef.current?.contains(target)
    const isFullscreenEnd = (target: any) => fullscreenEndRef.current?.contains(target)
    const touchstart = (event: any) => {
      const target = event?.target
      if (
        !(
          isZoomOut(target) ||
          isZoomIn(target) ||
          isZoomFit(target) ||
          isFullscreenStart(target) ||
          isFullscreenEnd(target)
        )
      ) {
        startDrag(event)
      }
    }
    const touchend = (event: any) => {
      const target = event?.target
      if (isZoomOut(target)) {
        handleZoomOut(event)
      } else if (isZoomIn(target)) {
        handleZoomIn(event)
      } else if (isZoomFit(target)) {
        handleFit(event)
      } else if (isFullscreenStart(target) || isFullscreenEnd(target)) {
        toggleFullscreen()
      } else {
        stopDrag(event)
      }
    }
    const touchmove = (event: any) => {
      const target = event?.target
      if (
        !(
          isZoomOut(target) ||
          isZoomIn(target) ||
          isZoomFit(target) ||
          isFullscreenStart(target) ||
          isFullscreenEnd(target)
        )
      ) {
        whileDrag(event)
      }
    }
    root.addEventListener('touchstart', touchstart)
    root.addEventListener('touchend', touchend)
    root.addEventListener('touchmove', touchmove)
    return () => {
      root.removeEventListener('touchstart', touchstart)
      root.removeEventListener('touchend', touchend)
      root.removeEventListener('touchmove', touchmove)
    }
  }, [])

  useEffect(() => {
    if (!src) {
      setState((prevState: any) => ({
        ...prevState,
        container: {
          ...prevState.container,
          offsetX: 0,
          offsetY: 0,
        },
        image: {
          ...prevState.image,
          width: 0,
          height: 0,
          scale: 1,
        },
        draggable: false,
      }))
    } else {
      setState((prevState: any) => ({
        ...prevState,
        showSelectHotspot: true,
      }))
    }
  }, [src])

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
            cursor: draggable ? 'pointer' : 'default',
          }}
          onMouseOut={(event: React.MouseEvent<HTMLDivElement>) => {
            if (dragging) {
              stopDrag(event)
            }
          }}
          onBlur={(event: React.FocusEvent<HTMLDivElement>) => {
            if (dragging) {
              stopDrag(event)
            }
          }}
          onMouseDown={(event) => {
            if (draggable) {
              startDrag(event)
            }
          }}
          onMouseMove={(event) => {
            if (draggable && dragging) {
              whileDrag(event)
            }
          }}
          onMouseUp={(event) => {
            if (dragging) {
              stopDrag(event)
            }
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
              ...(!state.fullscreen && { border: '1px solid #D9D9D9', borderRadius: 3 }),
            }}
          >
            {!!src && (
              <img src={src} alt={alt} onLoad={onImageLoad} style={imageStyle} ref={imgRef} />
            )}
            {!!src && hotspots && (
              <Box sx={hotspotsStyle}>
                {hotspots.map((hotspot, index) => (
                  <Hotspot {...hotspot} key={index} />
                ))}
              </Box>
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
            {!!src && !hideFullscreenControl && state.fullscreen && (
              <Box sx={{ position: 'absolute', top: '25px', right: '25px' }}>
                <Button
                  ref={fullscreenEndRef}
                  style={buttonStyle}
                  onClick={() => {
                    toggleFullscreen()
                  }}
                >
                  X
                </Button>
              </Box>
            )}
          </Box>
          {!hideFullscreenControl && (
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

        {!!src && !disableSelectHotspot && state.showSelectHotspot && (
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
              zIndex: 1,
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
                sx={{ fontSize: 15, fontWeight: 500, color: (theme) => theme.palette.primary.main }}
              >
                Select the location
              </Typography>
            </Button>
          </Box>
        )}
      </Box>
      {!!src && !hideZoomControls && (
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
            value={state.image.scale}
            onChange={(e, scale) => handleChangeZoom(scale as number)}
            sx={{
              padding: '8px 0',
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

export default ImageHotspots
