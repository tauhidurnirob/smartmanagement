import { Box, Typography } from "@mui/material"
import { FC } from "react"

interface IProps {
  color?: any
  text: string
  number: number
}

const DashedBox:FC<IProps> = ({color, text, number}) => {
  return (
    <Box
      sx={{
        border: theme => `1px dashed ${theme.palette.divider}`,
        px: 2,
        py: 1,
        minWidth: '130px'
      }}
    >
      <Typography variant="h2" color={color || "text.parimary"} mb={1} >{number}</Typography>
      <Typography variant="h5" color="text.secondary" >{text}</Typography>
    </Box>
  )
}

export default DashedBox