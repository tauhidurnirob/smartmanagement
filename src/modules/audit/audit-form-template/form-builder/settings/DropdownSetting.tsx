import { Box, Checkbox, Stack, Typography } from "@mui/material"
import { IField } from "../FormBuilder"
import { FC } from "react"
import TextFieldWithLabel from "../../../../common/TextFieldWithLabel"
import { AddIcon } from "../../../../../assets/icons/audit-form/add"
import { ISelectItem } from "../../../../../types/common"
import { TrashIcon } from "../../../../../assets/icons/trash"


interface IProps {
  field: IField
  onChange: (value: IField) => void
}

const DropdownSetting:FC<IProps> = ({
  field,
  onChange
}) => {
  return (
    <Box>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} gap={2} flexWrap={'wrap'} >
        <Typography variant="h4">Dropdown Field</Typography>
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
          name='fieldLabel'
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
      <Box>
        <Stack direction={'row'} gap={1}>
          <Typography variant="h4">Dropdown Option</Typography>
          <AddIcon
            fontSize="medium"
            onClick={() =>onChange({...field, value: {...field.value, options: [...field.value.options, {label: `Text${field.value.options?.length + 1}`, value: field.value.options?.length + 1}] }})}
          />
        </Stack>

        {
          field.value.options?.map((option: ISelectItem) => {
            return (
              <Stack direction={'row'} alignItems={'center'} my={2} gap={1}>
                <TextFieldWithLabel
                  showLabel={false}
                  sx={{
                    '& .MuiInputBase-input':{ bgcolor: '#ffffff', py: 0},
                    '& .MuiOutlinedInput-notchedOutline': {border: theme => `1px solid ${theme.palette.divider}`, borderRadius: '6px'}
                  }}
                  height="32px"
                  name='placeholder'
                  value={option.label}
                  onChange={(e) => onChange({...field, value: {...field.value, options: field.value.options?.map((opt: ISelectItem) => opt.value === option.value ? {...opt, label: e.target.value} : opt )}})}
                />
                <TrashIcon
                  sx={{color: theme=> theme.palette.grey[500]}}
                  fontSize="small"
                  onClick={() => onChange({...field, value: {...field.value, options: field.value.options?.filter((opt: ISelectItem) => opt.value !== option.value)}})}
                />
              </Stack>
            )
          })
        }
      </Box>
    </Box>
  )
}

export default DropdownSetting