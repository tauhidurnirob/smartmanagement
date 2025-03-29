import { Box } from "@mui/material"
import { FC } from "react"
import TextareaWithLabel from "../../../../common/TextareaWithLabel"

interface IProps {
  name: string
  fieldName: string
  placeholder: string
}

const ParagraphField:FC<IProps> = ({
  name,
  fieldName,
  placeholder
}) => {
  return (
    <Box sx={{background: "#ffffff"}}>
      <TextareaWithLabel
        label={fieldName}
        sx={{
          '& .MuiInputBase-input':{ bgcolor: '#ffffff'},
          '& .MuiOutlinedInput-notchedOutline': {border: theme => `1px solid ${theme.palette.divider}`, borderRadius: '6px'}
        }}
        name={name}
        placeholder={placeholder}
        rows={4}
      />
    </Box>
  )
}

export default ParagraphField