import { Box, Checkbox, Stack, Typography } from "@mui/material"
import { IField } from "../FormBuilder"
import { FC } from "react"
import TextFieldWithLabel from "../../../../common/TextFieldWithLabel"

interface IProps {
  field: IField
  onChange: (value: IField) => void
}

const DateSetting:FC<IProps> = ({
  field,
  onChange
}) => {
  return (
    <Box>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} gap={2} flexWrap={'wrap'} >
        <Typography variant="h4">Date Picker</Typography>
        <Stack direction={'row'} alignItems={'center'} >
          <Checkbox checked={field.value.required} onChange={(e) => onChange({...field, value: {...field.value, required: e.target.checked}})} />
          <Typography color={'text.secondary'}>Required</Typography>
        </Stack>
      </Stack>
      <Box my={1}>
        <TextFieldWithLabel
          label='Field Name'
          sx={{
            '& .MuiInputBase-input':{ bgcolor: '#ffffff', py: 0},
            '& .MuiOutlinedInput-notchedOutline': {border: theme => `1px solid ${theme.palette.divider}`, borderRadius: '6px'}
          }}
          height="32px"
          name='fieldName'
          value={field.fieldName}
          onChange={(e) => onChange({...field, fieldName: e.target.value})}
        />
      </Box>
    </Box>
  )
}

export default DateSetting