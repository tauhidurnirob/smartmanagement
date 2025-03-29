import { Box } from "@mui/material"
import TextFieldWithLabel from "../../../../common/TextFieldWithLabel"
import { FC } from "react"

interface IProps {
  name: string
  fieldName: string
  placeholder: string
  inputType?: string
}

const TextField:FC<IProps> = ({
  name,
  fieldName,
  placeholder,
  inputType
}) => {
  return (
    <Box sx={{background: "#ffffff"}}>
      <TextFieldWithLabel
        label={fieldName}
        {...inputType ? {type: inputType} : {}}
        sx={{
          '& .MuiInputBase-input':{ bgcolor: '#ffffff'},
          '& .MuiOutlinedInput-notchedOutline': {border: theme => `1px solid ${theme.palette.divider}`, borderRadius: '6px'}
        }}
        height="42px"
        name={name}
        placeholder={placeholder}
      />
    </Box>
  )
}

export default TextField