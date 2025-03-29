import { Box, Checkbox, FormControlLabel, FormGroup, Radio, RadioGroup, Typography } from "@mui/material"
import { FC } from "react"
import { ISelectItem } from "../../../../../types/common"

interface IProps {
  fieldName: string
  options: ISelectItem[]
}

const MultipleChoice:FC<IProps> = ({
  fieldName,
  options
}) => {
  return (
    <Box>
      <Typography fontWeight='600' fontSize={'14px'} mb='8px'>{fieldName}</Typography>

      <FormGroup>
        {
          options?.map((option, idx) => {
            return (
              <FormControlLabel key={idx} control={<Checkbox />} label={option.label} />
            )
          })
        }
      </FormGroup>
    </Box>
  )
}

export default MultipleChoice