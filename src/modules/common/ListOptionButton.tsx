import { useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Button, Menu, MenuItem, Stack, Typography } from '@mui/material'

interface IProps {
  list: { title: string; icon?: any; onClick: () => void }[]
}

const ListOptionButton = ({ list }: IProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <>
      <Button
        aria-controls={open ? 'audit-list-opt-btn-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        variant='contained'
        sx={{
          background: (theme) => theme.palette.grey[100],
          color: (theme) => theme.palette.grey[700],
          '&:hover': { background: (theme) => theme.palette.grey[200] },
        }}
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Options
      </Button>
      <Menu
        MenuListProps={{
          'aria-labelledby': 'audit-list-opt-btn',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiMenuItem-root': { color: 'text.secondary', fontWeight: 700 },
          '& .MuiMenuItem-root:hover': {
            background: (theme) => theme.palette.primary.light,
            color: 'primary.main',
            '& h4': { color: 'primary.main' }
          },
          '& .MuiPaper-root': { boxShadow: '0px 1px 15px rgba(0, 0, 0, 0.1)', px: 1, py: .5 },
        }}
      >
        {list.map((item, idx) => {
          const { title, icon, onClick } = item
          const Icon = icon
          return (
            <MenuItem
              key={idx}
              color='primary'
              onClick={() => {
                onClick()
                handleClose()
              }}
            >
              {!icon && title}
              {
                icon &&
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={2} flex={1} my={.5} >
                  <Typography variant='h4'>{title}</Typography>
                  <Icon />
                </Stack>
              }
            </MenuItem>
          )
        })}
      </Menu>
    </>
  )
}

export default ListOptionButton
