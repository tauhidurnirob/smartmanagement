import { Box } from "@mui/material"
import { FC } from "react"

interface IProps {
  logo: string
}

const PreviewLogo:FC<IProps> = ({logo}) => {
  return (
    <Box>
      {
        logo &&
        <Box>
          <figure style={{width: '220px', margin: '0'}}>
            <img style={{width: 'inherit'}} src={typeof logo === 'string' ? logo : URL.createObjectURL(logo)} alt='Img' />
          </figure>
        </Box>
      }
    </Box>
  )
}
export default PreviewLogo