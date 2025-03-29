import { Collapse } from "@mui/material"
import { FC } from "react"
import StyledAlert from "./StyledAlert"

interface IProps {
  error: boolean
  text: string
}

const ErrorText:FC<IProps> = ({
  error,
  text
}) => {
  return (
    <Collapse in={error}>
      <StyledAlert severity='error' variant='outlined' sx={{ mt: '5px' }}>
        {text}
      </StyledAlert>
    </Collapse>
  )
}

export default ErrorText