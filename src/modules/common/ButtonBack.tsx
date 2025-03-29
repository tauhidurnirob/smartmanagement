import { Box, Typography, Button, Card, Grid, TextField, IconButton } from '@mui/material'
import { LeftDuotoneIcon } from '../../assets/icons/left-duotone'
import { Link, To, useNavigate } from 'react-router-dom'

interface IProps {
  to?: To
  onClick?: () => void
}

const ButtonBack = ({ to, onClick }: IProps) => {
  const navigate = useNavigate()

  const handleClickGoto = () => {
    if(to) {
      navigate(to)
    }
    else if(onClick) {
      onClick()
    }
  }

  return (
    <Button
      variant='text'
      color='primary'
      sx={{ display: 'flex', alignItems: 'center' }}
      onClick={handleClickGoto}
    >
      <LeftDuotoneIcon />
      <Typography variant='h4' sx={{ ml: 2, color: (theme) => theme.palette.grey[800] }}>
        Back
      </Typography>
    </Button>
  )
}

export default ButtonBack
