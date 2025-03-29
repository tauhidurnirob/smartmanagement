import { FC, useMemo, useState } from 'react'
import {
  Box,
  Stack,
  Typography,
  Button,
  Avatar,
  useMediaQuery,
  Theme,
  IconButton,
  Menu,
} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import { _getAuth } from '../../../store/_selectors'
import MenuIcon from '@mui/icons-material/Menu'
import { IUser } from '../../../api/models'
import { BellIcon } from '../../../assets/icons/Bell'
import HeaderAlertPopover from '../../alert/HeaderAlertPopover'
import { ROLE_PERMISSION_KEYS } from '../../../helpers/constants'

interface IProps {
  moduleName: string
  subModuleName: string
  threeModule: string
  chlidrenModuleName: string
  handleSidebarOpen: () => void
  user: IUser
  handleSignOut: () => void
}

const Header: FC<IProps> = ({
  moduleName,
  subModuleName,
  threeModule,
  chlidrenModuleName,
  handleSidebarOpen,
  user,
  handleSignOut,
}) => {
  const userName = user?.fullName
  const userImg = user?.avatarUri
  const isAdmmin = user?.isAdmin
  const isProd = import.meta.env.PROD
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  // const [openAlert, setOpenAlert] = useState<boolean>(false)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  // const handleOpenAlert = () => {
  //   setOpenAlert(true)
  // }

  const auth = _getAuth()

  const isAllowed = useMemo(() => {
    const permissions = auth.user?.role?.permission?.permissions || []
    const isAllowed = permissions.findIndex((p) => p === ROLE_PERMISSION_KEYS.alert.root) !== -1
    return isAllowed
  }, [auth])

  const open = Boolean(anchorEl)

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  return (
    <Box
      width={{ xs: '100%', md: 'calc(100% + 18px)' }}
      ml={{ xs: '0', md: '-18px' }}
      position='sticky'
      zIndex={100}
      top={0}
      left={0}
      height='82px'
      px={{ xs: '12px', md: '25px' }}
      sx={{
        background: (theme) => theme.palette.common.white,
        filter: 'drop-shadow(0px 4px 30px rgba(0, 0, 0, 0.1))',
      }}
    >
      <Box display={'flex'} height={'100%'}>
        {isMobile && (
          <IconButton color='inherit' onClick={handleSidebarOpen} edge='start' sx={{ mr: 1 }}>
            <MenuIcon />
          </IconButton>
        )}
        <Stack
          height='100%'
          width={'100%'}
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Box display='flex' alignItems='center' gap={3}>
            {chlidrenModuleName ? (
              <Typography variant={isMobile ? 'h2' : 'h1'} sx={{ fontSize: 26.9 }}>
                {chlidrenModuleName}
              </Typography>
            ) : (
              <Typography variant={isMobile ? 'h2' : 'h1'}>{moduleName}</Typography>
            )}
            {subModuleName && (
              <>
                <Box
                  sx={{
                    borderRight: (theme) => `1px solid ${theme.palette.grey[400]}`,
                    height: '40px',
                  }}
                ></Box>
                <Typography
                  variant={isMobile ? 'h5' : 'h4'}
                  color={(theme) => theme.palette.grey[700]}
                >
                  {threeModule ? threeModule : subModuleName}
                </Typography>
              </>
            )}
          </Box>
          <Box display='flex' alignItems='center' gap={2}>
            {/* <SearchIcon color='primary' />
            <CalenderIcon /> */}
            {!isProd && isAllowed && <HeaderAlertPopover />}

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'nowrap',
                gap: { xs: 0, md: 1 },
                alignItems: 'center',
              }}
            >
              <Box sx={{ width: { xs: 33, md: 43 }, height: { xs: 33, md: 43 } }}>
                {userImg ? (
                  <Avatar alt='user avatar' src={userImg} sx={{ width: '100%', height: '100%' }} />
                ) : (
                  <AccountCircleIcon sx={{ width: '100%', height: '100%' }} />
                )}
              </Box>
              <Button
                variant='text'
                sx={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}
                onClick={handleClick}
              >
                <Box>
                  <Typography
                    variant='subtitle2'
                    sx={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: (theme) => theme.palette.grey[900],
                    }}
                  >
                    {userName || '-'}
                  </Typography>
                  {isAdmmin && (
                    <Typography
                      variant='subtitle2'
                      sx={{
                        fontSize: '14px',
                        fontWeight: 400,
                        color: (theme) => theme.palette.grey[900],
                      }}
                    >
                      Admin
                    </Typography>
                  )}
                </Box>
                <KeyboardArrowDownIcon
                  sx={{ ml: 0.75, color: (theme) => theme.palette.grey[900], fontSize: 20 }}
                />
              </Button>
            </Box>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={() => setAnchorEl(null)}
              sx={{ '& .MuiMenu-paper': { p: '0 10px' } }}
            >
              <Button
                variant='text'
                color='inherit'
                size='large'
                sx={{ width: '100%', justifyContent: 'flex-start' }}
                onClick={handleSignOut}
              >
                <Typography variant='h5' sx={{ fontWeight: 500 }}>
                  Sign out
                </Typography>
              </Button>
            </Menu>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}

export default Header
