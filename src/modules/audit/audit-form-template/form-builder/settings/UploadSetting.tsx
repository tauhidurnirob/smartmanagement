import { Box, Checkbox, Stack, Typography } from "@mui/material"
import { IField } from "../FormBuilder"
import { FC } from "react"
import TextFieldWithLabel from "../../../../common/TextFieldWithLabel"

interface IProps {
  field: IField
  onChange: (value: IField) => void
  settingName: 'File' | 'Image' | 'Video'
}

const UploadSetting:FC<IProps> = ({
  field,
  onChange,
  settingName
}) => {
  return (
    <Box>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} gap={2} flexWrap={'wrap'} >
        <Typography variant="h4">Upload {settingName} Field</Typography>
        <Stack direction={'row'} alignItems={'center'} >
          <Checkbox checked={field.value.required} onChange={(e) => onChange({...field, value: {...field.value, required: e.target.checked}})} />
          <Typography color={'text.secondary'}>Required</Typography>
        </Stack>
      </Stack>
      <Box my={1}>
        <TextFieldWithLabel
          label='Field Label'
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
      <Box my={3}>
        <TextFieldWithLabel
          label='Field Box Description'
          sx={{
            '& .MuiInputBase-input':{ bgcolor: '#ffffff', py: 0},
            '& .MuiOutlinedInput-notchedOutline': {border: theme => `1px solid ${theme.palette.divider}`, borderRadius: '6px'}
          }}
          height="32px"
          name='placeholder'
          value={field.value.placeholder}
          onChange={(e) => onChange({...field, value: {...field.value, placeholder: e.target.value}})}
        />
      </Box>
      {
        settingName === 'File' &&
        <Box my={3}>
          <TextFieldWithLabel
            label='Upload Button Field'
            sx={{
              '& .MuiInputBase-input':{ bgcolor: '#ffffff', py: 0},
              '& .MuiOutlinedInput-notchedOutline': {border: theme => `1px solid ${theme.palette.divider}`, borderRadius: '6px'}
            }}
            height="32px"
            name='buttonLabel'
            value={field.value.buttonLabel}
            onChange={(e) => onChange({...field, value: {...field.value, buttonLabel: e.target.value}})}
          />
        </Box>
      }
      <Box>
        <Typography variant="h4">Upload {settingName} Option</Typography>
        {
          settingName === 'File' &&
          <Typography color={'text.secondary'} mt={1} >Max file uploaded is 5 MB, supported file pdf, xls, xlsx, ppt, doc, docx</Typography>
        }
      </Box>
      <Stack direction={'row'} alignItems={'center'} gap={1} >
        <Checkbox checked={field.value.multiple} onChange={(e) => onChange({...field, value: {...field.value, multiple: e.target.checked}})} />
        <Typography fontSize={16}>Allow multiple {settingName.toLowerCase()}s to be uploaded </Typography>
      </Stack>
    </Box>
  )
}

export default UploadSetting