import { Box, Typography } from "@mui/material"
import { FC } from "react"
import TextFieldWithLabel from "../../../../common/TextFieldWithLabel"


interface IProps {
  name: string
  fieldName: string
  placeholder: string
}

const SignatureField:FC<IProps> = ({
  name,
  fieldName,
  placeholder
}) => {
  return (
    <Box>
      <TextFieldWithLabel
        label={fieldName}
        sx={{
          '& .MuiInputBase-input':{ bgcolor: '#ffffff'},
          '& .MuiOutlinedInput-notchedOutline': {border: theme => `1px solid ${theme.palette.divider}`, borderRadius: '6px'}
        }}
        height="42px"
        name={name}
        placeholder={placeholder}
      />
      <Box mt={2}>
        <Box height={120} maxWidth={250} sx={{background: theme => theme.palette.grey[50], borderRadius: 4}} ></Box>
      </Box>
    </Box>
  )
}

export default SignatureField