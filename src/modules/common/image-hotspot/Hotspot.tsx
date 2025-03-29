import { Box } from '@mui/material'

import { IHotspot } from '../../../types/common'

export default function Hotspot(props: IHotspot) {
  const {
    x,
    y,
    content,
    sx = {
      background: 'white',
      pointerEvents: 'auto',
    },
  } = props

  const hotspotStyle = Object.assign(
    {
      position: 'absolute',
      display: 'block',
      top: y + '%',
      left: x + '%',
    },
    sx
  )

  return <Box sx={hotspotStyle}>{content}</Box>
}
