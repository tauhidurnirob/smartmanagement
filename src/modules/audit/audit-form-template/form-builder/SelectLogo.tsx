import { Box, Typography } from "@mui/material"
import { FC } from "react"


interface IProps {
  logo: string
  setLogo: (v: string) => void
}

const SelectLogo:FC<IProps> = ({
  logo,
  setLogo
}) => {
  const fileChangedHandler = (event: any) => {
    setLogo(event.target.files[0])
  }
  return (
    <Box>
      <input
        hidden
        type='file'
        accept='image/*'
        name='upload_logo'
        id='upload_logo'
        onChange={fileChangedHandler}
      />
      {(!logo || typeof logo === 'string') && (
        <Box
          position={'relative'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          sx={{borderTop: theme => `2px dashed ${theme.palette.divider}`}}
        >
          <label
            htmlFor={'upload_logo'}
          >
            <Typography color={'text.secondary'} fontWeight={700} sx={{ background: theme => theme.palette.background.default, mt: '-10px', px: 2}} >
              + Add Your Logo
            </Typography>
          </label>
        </Box>
      )}
      {logo && typeof logo !== 'string' && (
        <figure style={{maxWidth: '300px', margin: '0'}}>
          <img width={'100%'} src={URL.createObjectURL(logo)} alt='Img' />
        </figure>
      )}
    </Box>
  )
}

export default SelectLogo