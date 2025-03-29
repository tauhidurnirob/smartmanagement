import { Box, Slider, Typography } from "@mui/material"
import { FC, useState } from "react"

interface IProps {
  fieldName: string
}

const ScaleField:FC<IProps> = ({
  fieldName
}) => {
  const [value, setValue] = useState<number[]>([20, 37]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  return (
    <Box>
      <Typography fontWeight='600' fontSize={'14px'} mb='8px'>{fieldName}</Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
      />
    </Box>
  )
}

export default ScaleField