import { Box, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material"
import { FC } from "react"
import { ISelectItem } from "../../../../../types/common"

interface IProps {
  name: string
  fieldName: string
  options: ISelectItem[]
}

const SingleChoice:FC<IProps> = ({
  name,
  fieldName,
  options
}) => {
  return (
    <Box>
      <Typography fontWeight='600' fontSize={'14px'} mb='8px'>{fieldName}</Typography>

      <RadioGroup
        name={name}
      >
        {
          options?.map((option, idx) => {
            return (
              <FormControlLabel key={idx} value={option.value} control={<Radio />} label={option.label} />
            )
          })
        }
      </RadioGroup>
    </Box>
  )
}

export default SingleChoice