import { Box, Checkbox, Stack, Typography } from "@mui/material"
import { IField } from "../FormBuilder"
import { FC } from "react"
import TextFieldWithLabel from "../../../../common/TextFieldWithLabel"

interface IProps {
  field: IField
  onChange: (value: IField) => void
}

const ButtonSetting:FC<IProps> = ({
  field,
  onChange
}) => {

  return (
    <Box>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} gap={2} flexWrap={'wrap'} >
        <Typography variant="h4">Button Field</Typography>
      </Stack>
      <Box my={1}>
        <TextFieldWithLabel
          label='Button Label'
          sx={{
            '& .MuiInputBase-input':{ bgcolor: '#ffffff', py: 0},
            '& .MuiOutlinedInput-notchedOutline': {border: theme => `1px solid ${theme.palette.divider}`, borderRadius: '6px'}
          }}
          height="32px"
          name='fieldName'
          value={field.value}
          onChange={(e) => onChange({...field, value: e.target.value})}
        />
      </Box>
    </Box>
  )
}

export default ButtonSetting