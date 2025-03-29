import {
  Box,
  CSSObject,
  Collapse,
  Drawer,
  Stack,
  SxProps,
  Theme,
  Typography,
  styled,
  useMediaQuery,
  Badge,
  Avatar,
} from '@mui/material'
import { FC, useEffect, useMemo, useState } from 'react'
import { IRouteInfo } from '../../../types/route'
import { Link, useLocation } from 'react-router-dom'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import RectangleIcon from '@mui/icons-material/Rectangle'
import ExpandCollapseButton from './ExpandCollapseButton'
import Api from '../../../api'

interface IProps {
  open: boolean
  mobileOpen?: boolean
  onClose: () => void
  onOpen: () => void
  links?: IRouteInfo[]
}
interface DrawerContentprops extends IProps {
  openMenu: string[]
  setOpenMenu: (v: string[]) => void
  isMobile: boolean
  depth?: number
}

const subLinkActive: SxProps<Theme> = {
  // background: (theme) => theme.palette.primary.light,
  borderRadius: '4px',
  color: 'primary.main',
}

const drawerWidth = 290
const drawerWidthMobile = 260

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  borderRadius: 0,
  background: 'none',
  boxShadow: 'none',
  border: 0,
  overflow: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  borderRadius: 0,
  boxShadow: 'none',
  background: 'none',
  border: 0,
  width: `calc(${theme.spacing(10)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(10)} + 1px)`,
  },
})

const StyledDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    position: 'relative',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  })
)

const NavList: FC<DrawerContentprops> = ({
  open,
  links,
  openMenu,
  setOpenMenu,
  depth,
  isMobile,
  onOpen,
  onClose,
}) => {
  // const { alertCount, notificationCount } = useMemo(() => {
  //   const alertCount = 20
  //   const notificationCount = 30
  //   return { alertCount, notificationCount }
  // }, [])

  const { data: alertData } = Api.useGetAlertUnreadCountQuery()
  const { data: notificationData } = Api.useGetNotificationUnReadCountQuery()

  const alertCount = alertData?.count || 0
  const notificationCount = notificationData?.count || 0

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: depth && depth > 1 ? 0.5 : 1.5,
      }}
    >
      {links?.map((item, index) => {
        const { label, path, children } = item
        const Icon = item.icon
        const hasChildren = children && children?.length > 0
        const isOpenMenu = openMenu.includes(label)
        const isMatched = location.pathname.startsWith(path)

        let badgeCount = 0
        switch (path) {
          case '/alert':
            badgeCount = alertCount
            break
          case '/notification':
            badgeCount = notificationCount
            break
        }
        const hasBadge = badgeCount > 0

        const handleOpenMenu = (label: string) => {
          const newOpenMenus = [...openMenu].filter((m) => m !== label)
          if (!openMenu.includes(label)) {
            newOpenMenus.push(label)
          }
          setOpenMenu(newOpenMenus)
        }

        const MainIcon = ({ isLink }: { isLink: boolean }) => {
          if (!Icon) return null

          return (
            <Icon
              sx={{
                color: (!open || isLink) && isMatched ? 'primary.main' : 'grey.700',
              }}
            />
          )
        }

        const MainMenu = ({ isLink }: { isLink: boolean }) => {
          return (
            <Stack
              direction='row'
              alignItems='center'
              gap={2}
              sx={{
                height: '32px',
                pl: 2,
                ...(isLink && isMatched
                  ? {
                      bgcolor: 'primary.light',
                      borderRadius: 1,
                    }
                  : {}),
              }}
            >
              {hasBadge ? (
                <Badge
                  color='error'
                  badgeContent=' '
                  variant='dot'
                  overlap='circular'
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >
                  <MainIcon isLink={isLink} />
                </Badge>
              ) : (
                <MainIcon isLink={isLink} />
              )}
              {open &&
                (depth && depth > 1 ? (
                  <Box
                    display='flex'
                    alignItems='center'
                    gap={1.5}
                    p='4px 6px'
                    sx={isLink && isMatched ? subLinkActive : { color: 'grey.700' }}
                  >
                    {depth && depth > 2 ? (
                      <Box
                        sx={{
                          width: '5px',
                          height: '5px',
                          backgroundColor: isMatched ? 'primary.main' : 'grey.700',
                        }}
                      />
                    ) : (
                      <FiberManualRecordIcon sx={{ fontSize: '8px' }} />
                    )}
                    <Typography
                      variant='h5'
                      sx={{ color: 'inherit', fontWeight: 400, lineHeight: '18px' }}
                    >
                      {label}
                    </Typography>
                  </Box>
                ) : (
                  <Stack direction={'row'} gap={1} alignItems={'center'}>
                    <Typography
                      fontSize='13px'
                      color={isLink && isMatched ? 'primary.main' : 'grey.700'}
                    >
                      {label}
                    </Typography>
                    {hasBadge && (
                      <Avatar
                        sx={{
                          bgcolor: '#FD3D00',
                          width: '1.5rem',
                          height: '1.5rem',
                          fontSize: '12px',
                          color: '#fff',
                          fontWeight: 500,
                        }}
                      >
                        {badgeCount}
                      </Avatar>
                    )}
                  </Stack>
                ))}
            </Stack>
          )
        }

        return (
          <Box key={path}>
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='center'
              sx={{ cursor: 'pointer' }}
              key={index}
              onClick={() => handleOpenMenu(label)}
            >
              {hasChildren ? (
                <MainMenu isLink={false} />
              ) : (
                <Link
                  to={path}
                  style={{
                    textDecoration: 'none',
                    color: 'none',
                    backgroundColor: isMatched ? 'grey.50' : 'transparent',
                    width: '100%',
                  }}
                >
                  <MainMenu isLink={true} />
                </Link>
              )}
              {hasChildren && isOpenMenu && open && (
                <ExpandLessIcon
                  sx={{
                    color: (theme) => theme.palette.text.primary,
                    mt: depth && depth > 1 ? -1 : 0,
                  }}
                />
              )}
              {hasChildren && !isOpenMenu && open && (
                <ExpandMoreIcon sx={{ color: 'grey.600', mt: depth && depth > 1 ? -1 : 0 }} />
              )}
            </Stack>
            {open && hasChildren && children && (
              <Collapse in={isOpenMenu} timeout='auto'>
                <Box
                  p={{
                    xs: depth && depth > 1 ? '10px 0 10px 10px' : '10px 0 0 10px',
                    md: depth && depth > 1 ? '5px 0 10px 24px' : '5px 0 0 24px',
                  }}
                >
                  <NavList
                    open={open}
                    onClose={onClose}
                    onOpen={onOpen}
                    links={children}
                    openMenu={openMenu}
                    setOpenMenu={setOpenMenu}
                    isMobile={isMobile}
                    depth={(depth || 0) + 1}
                  />
                </Box>
              </Collapse>
            )}
          </Box>
        )
      })}
    </Box>
  )
}

const DrawerContent: FC<DrawerContentprops> = ({
  open,
  onClose,
  onOpen,
  links,
  openMenu,
  setOpenMenu,
  isMobile,
}) => {
  return (
    <Box
      width={{ xs: '100%', md: 'calc(100% - 18px)' }}
      height='100%'
      sx={{ background: (theme) => theme.palette.common.white }}
    >
      <ExpandCollapseButton open={open} onOpen={onOpen} onClose={onClose} />
      <Box
        px={{ xs: '12px', md: '24px' }}
        py='18px'
        display='flex'
        alignItems='center'
        borderBottom={(theme) => `1px dashed ${theme.palette.divider}`}
      >
        <img src='/assets/images/logo/logo.svg' width='21px' alt='Logo' />
        {open && (
          <Typography fontWeight={700} fontSize={18} color='grey.800' sx={{ ml: '18px' }}>
            Nexus IFM
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          p: { xs: '10px 10px 20px 12px', md: '30px 16px 20px 12px' },
          overflow: 'auto',
          maxHeight: 'calc(100% - 40px)',
        }}
      >
        <NavList
          open={open}
          onClose={onClose}
          onOpen={onOpen}
          links={links}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          isMobile={isMobile}
          depth={1}
        />
      </Box>
    </Box>
  )
}

const Sidebar: FC<IProps> = ({ open, mobileOpen, onClose, onOpen, links }) => {
  const [openMenu, setOpenMenu] = useState<string[]>([])
  const location = useLocation()

  useEffect(() => {
    const menus: string[] = []

    const updateOpenMenu = (links: IRouteInfo[]) => {
      for (const link of links) {
        if (location.pathname.startsWith(link.path)) {
          menus.push(link.label)
        }

        if (link.children && link.children?.length > 0) {
          updateOpenMenu(link.children)
        }
      }
    }
    updateOpenMenu(links || [])
    setOpenMenu(menus)
  }, [])

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  return (
    <>
      {!isMobile && (
        <StyledDrawer variant='permanent' open={open}>
          <DrawerContent
            open={open}
            onClose={onClose}
            onOpen={onOpen}
            links={links}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            isMobile={isMobile}
          />
        </StyledDrawer>
      )}
      {isMobile && (
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={onClose}
          sx={{
            '& .MuiDrawer-paper': { borderRadius: 0, width: drawerWidthMobile },
          }}
        >
          <DrawerContent
            open={open}
            onClose={onClose}
            onOpen={onOpen}
            links={links}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            isMobile={isMobile}
          />
        </Drawer>
      )}
    </>
  )
}

export default Sidebar
