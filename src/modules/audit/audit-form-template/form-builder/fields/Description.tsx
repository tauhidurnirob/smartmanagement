import { Box, TextField } from "@mui/material"
import TextFieldWithLabel from "../../../../common/TextFieldWithLabel"
import { FC } from "react"

interface IProps {
  fieldName: string
  long?: boolean
}

const Description:FC<IProps> = ({
  fieldName,
  long
}) => {
  return (
    <Box sx={{background: "#ffffff"}}>
      {
        !long &&
          <TextField
            fullWidth
            variant="outlined"
            value={fieldName === 'Short Description' ? '' : fieldName}
            placeholder={fieldName}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {border: 'none !important'},
              '& .MuiInputBase-input': {p: 1, fontSize: '20px', fontWeight: 'bold', '&::placeholder': {fontSize: '20px', fontWeight: 'bold'}},
            }}
          />
      }
      {
        long &&
          <TextField
            fullWidth
            variant="outlined"
            value={fieldName === 'Long Description' ? '' : fieldName}
            placeholder={fieldName}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {border: 'none !important'},
              '& .MuiInputBase-input': {p: 1, fontSize: '20px', fontWeight: 'bold', '&::placeholder': {fontSize: '20px', fontWeight: 'bold'}}
            }}
            rows={4}
            multiline
          />
      }
    </Box>
  )
}

export default Description