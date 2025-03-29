import { ReactNode, useState } from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import { ISelectItem } from '../../types/common'
import { LoadingButton } from '@mui/lab'

interface IProps {
  children: ReactNode
  options: ISelectItem[]
  onClick: (v: ISelectItem) => void
  isLoading: boolean
}

const ButtonDownload = ({ options, onClick, children, isLoading }: IProps) => {
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
      <LoadingButton
        aria-controls={open ? 'download-btn-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        variant='contained'
        color='primary'
        disableElevation
        onClick={handleClick}
        loading={isLoading}
      >
        {children}
      </LoadingButton>
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
          },
          '& .MuiPaper-root': { boxShadow: '0px 1px 15px rgba(0, 0, 0, 0.1)' },
        }}
      >
        {options.map((item, idx) => {
          return (
            <MenuItem
              key={`item-${idx}`}
              color='primary'
              onClick={() => {
                onClick(item)
                handleClose()
              }}
            >
              {item.label}
            </MenuItem>
          )
        })}
      </Menu>
    </>
  )
}

export default ButtonDownload
