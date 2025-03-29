import { FC, useMemo, useState } from 'react'
import { Group, Rect } from 'react-konva'
import { Html } from 'react-konva-utils'
import { Box, Typography } from '@mui/material'
import Konva from 'konva'

import { IDeviceHotspot } from '../../types/common'
import getDeviceTypeIcon from '../../helpers/getDeviceTypeIcon'
import { DEVICE_STATUS_LIST } from '../../helpers/constants'
import getDeviceStatusInfo from '../../helpers/getDeviceStatusInfo'
import { WarningTriangleRounded } from '../../assets/icons/warning-triangle-rounded'
import { IDeviceType } from '../../api/models'

const DeviceTooltip = ({ text, show }: { x: number; y: number; text: string; show: boolean }) => {
  return (
    <Html
      transform
      divProps={{ style: { display: show ? 'flex' : 'none', width: 'fit-content', zIndex: 1 } }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -40,
          left: '-150px',
          filter: 'drop-shadow(0px 5px 3px #00000055)',
        }}
      >
        <Box
          sx={{
            pt: 0.75,
            pb: 0.5,
            px: 1.25,
            background: '#ffffff',
            borderRadius: 2,
          }}
        >
          <Typography
            variant='h5'
            sx={{ whiteSpace: 'nowrap', color: 'primary.main', fontSize: '0.875rem' }}
          >
            {text}
          </Typography>
        </Box>
        <Box
          sx={{
            width: 0,
            height: 0,
            mt: '-1px',
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderTop: '8px solid #fff',
            mx: 'auto',
          }}
        />
      </Box>
    </Html>
  )
}

const DeviceIcon = ({
  width,
  height,
  type,
  isOn,
  status,
  isSelected,
}: {
  width: number
  height: number
  type?: IDeviceType
  isOn?: boolean
  isSelected?: boolean
  status?: string
}) => {
  const DeviceTypeIcon = useMemo(() => {
    const DeviceTypeIcon = getDeviceTypeIcon(type?.deviceType || '')
    return DeviceTypeIcon
  }, [type])

  const { iconColor, isLowBattery } = useMemo(() => {
    const statusInfo = getDeviceStatusInfo(status || '')
    const isError = status === DEVICE_STATUS_LIST[3].value
    const isLowBattery = status === DEVICE_STATUS_LIST[2].value
    const isOffline = status === DEVICE_STATUS_LIST[1].value
    let iconColor = isSelected ? '#ffffff' : 'success.main'

    if (isError || isLowBattery) {
      iconColor = isLowBattery ? '#F8BC19' : statusInfo.color
    } else if (isOffline) {
      iconColor = 'grey.300'
    } else {
      if (isOn === false) {
        iconColor = 'grey.500'
      }
    }

    return { iconColor, isLowBattery }
  }, [isOn, status, isSelected])

  return (
    <Html
      transform
      divProps={{
        style: {
          width: `${width}px`,
          height: `${height}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 1,
        },
      }}
    >
      <DeviceTypeIcon sx={{ color: iconColor, fontSize: 20 }} />
      {isLowBattery && (
        <Box
          sx={{
            position: 'absolute',
            top: -11,
            right: -10,
            backgroundColor: 'grey.50',
            boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.25)',
            width: 18,
            height: 18,
            borderRadius: '50%',
            display: 'flex',
          }}
        >
          <WarningTriangleRounded sx={{ m: 'auto', fontSize: 10, color: '#F8BC19' }} />
        </Box>
      )}
    </Html>
  )
}

interface IProps {
  hotspot: IDeviceHotspot
  scale: number
  draggable?: boolean
  onChangePos?: (x: number, y: number) => void
  onSelect?: (hotspot: IDeviceHotspot) => void
}

const DeviceHotSpot: FC<IProps> = ({ hotspot, scale, draggable, onChangePos, onSelect }) => {
  const { x, y, type, isOn, status, isSelected } = hotspot
  const [tooltipVisible, setTooltipVisible] = useState(false)

  const { width, height, backgroundColor, offset } = useMemo(() => {
    const width = 25
    const height = 25
    const backgroundColor = isSelected ? '#F8BC19' : '#F5F8FA'
    const offset = {
      x: width / 2,
      y: height / 2,
    }
    return {
      width,
      height,
      backgroundColor,
      offset,
    }
  }, [isSelected])

  const handleMouseEnter = () => {
    setTooltipVisible(true)
  }

  const handleMouseLeave = () => {
    setTooltipVisible(false)
  }

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    const pos = e.target.getPosition()
    if (onChangePos) {
      onChangePos(pos.x, pos.y)
    }
  }

  const handleSelect = () => {
    if (onSelect) {
      onSelect(hotspot)
    }
  }

  return (
    <Group
      draggable={draggable}
      scale={{ x: scale, y: scale }}
      x={x}
      y={y}
      offset={offset}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onDragEnd={handleDragEnd}
      onClick={handleSelect}
      onDragStart={() => !isSelected && handleSelect()}
    >
      <Rect width={width} height={height} fill={backgroundColor} cornerRadius={6} />
      <DeviceIcon
        width={width}
        height={width}
        type={type}
        isOn={isOn}
        status={status}
        isSelected={isSelected}
      />
      <DeviceTooltip
        x={x}
        y={y}
        text='Drag the point to justify the location of the device'
        show={!!draggable && tooltipVisible}
      />
    </Group>
  )
}

export default DeviceHotSpot
