import { useLocation } from 'react-router-dom'
import Header from '../../modules/common/header/Header'
import { Fragment, useMemo, useState } from 'react'
import { navRouteInfos } from '../routes'
import { useDispatch } from 'react-redux'
import appSlice from '../../store/slices/app'
import useAuth from '../../hooks/useAuth'
import { IUser } from '../../api/models'
import DeleteDialog from '../../modules/common/DeleteDialog'

const HeaderWrapper = () => {
  const location = useLocation()
  const { user, logout } = useAuth()
  const dispatch = useDispatch()

  const [logoutModalOn, setLogoutModalOn] = useState(false)

  const { modulenName, subModuleName, threeModule, chlidrenModule } = useMemo(() => {
    const module = navRouteInfos.find((f) => location.pathname.startsWith(f.path))
    let chlidrenModule = ''
    let threeModule: any = ''
    const subModule = module?.children?.find((v) => {
      if (v.childrenLabel) {
        chlidrenModule = v.childrenLabel
      } else {
        chlidrenModule = ''
      }
      if (v?.children && v?.children.length) {
        threeModule = v.children.find((v2) => location.pathname.includes(v2.path))
        return location.pathname.includes(v.path)
      } else {
        return location.pathname.includes(v.path)
      }
    })
    return {
      modulenName: module?.label,
      subModuleName: subModule?.label,
      threeModule: threeModule?.label,
      chlidrenModule,
    }
  }, [location.pathname])

  const handleSignOut = () => {
    logout()
  }

  return (
    <Fragment>
      <Header
        moduleName={modulenName as string}
        subModuleName={subModuleName as string}
        threeModule={threeModule as string}
        chlidrenModuleName={chlidrenModule as string}
        handleSidebarOpen={() => {
          dispatch(appSlice.actions.setSidebarOpen(true))
          dispatch(appSlice.actions.setMobileSidebarOpen(true))
        }}
        user={user as IUser}
        handleSignOut={() => setLogoutModalOn(true)}
      />
      <DeleteDialog
        open={logoutModalOn}
        onClose={() => setLogoutModalOn(false)}
        maxWidth={'sm'}
        heading='Are you sure you want to Log Out?'
        subHeading=''
        onGoBack={() => setLogoutModalOn(false)}
        onDelete={handleSignOut}
        loading={false}
        isSignOut
      />
    </Fragment>
  )
}

export default HeaderWrapper
