import { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Menu, MenuItem, Stack, Typography, IconButton } from '@mui/material'

interface IProps {
  list: {
    title: string
    icon?: any
    isFirstIcon?: boolean
    color?: string
    bgColor?: string
    onClick: () => void
  }[]
}

const MoreOptionButton = ({ list }: IProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <>
      <IconButton
        aria-controls={open ? 'more-btn-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        sx={{ p: 0 }}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        MenuListProps={{
          'aria-labelledby': 'audit-list-opt-btn',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiPaper-root': { boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', px: 1, py: 0.5 },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {list.map((item, idx) => {
          const { title, icon, isFirstIcon, color, bgColor, onClick } = item
          const Icon = icon
          return (
            <MenuItem
              key={idx}
              color='primary'
              onClick={(e) => {
                e.stopPropagation()
                onClick()
                handleClose()
              }}
              sx={{
                p: 1.5,
                color: 'grey.800',
                fontWeight: 700,
                '&:hover': {
                  backgroundColor: bgColor ? bgColor : 'primary.light',
                  color: color ? color : 'primary.main',
                  borderRadius: 2,
                  '& h4': { color: color ? color : 'primary.main' },
                },
              }}
            >
              {!icon && title}
              {icon && (
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  justifyContent={isFirstIcon ? 'flex-end' : 'flex-start'}
                  gap={2}
                  flex={1}
                  sx={{ flexDirection: isFirstIcon ? 'row-reverse' : 'row' }}
                >
                  <Typography variant='h4' sx={{ fontWeight: 400 }}>
                    {title}
                  </Typography>
                  <Icon sx={{ fontSize: 20 }} />
                </Stack>
              )}
            </MenuItem>
          )
        })}
      </Menu>
    </>
  )
}

export default MoreOptionButton
