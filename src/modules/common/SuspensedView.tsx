import { FC, ReactNode, Suspense } from 'react'
import TopBarProgress from 'react-topbar-progress-indicator'

// Wrapper for lazy-loading
const SuspensedView: FC<{
  children?: ReactNode
}> = ({ children }) => {
  TopBarProgress.config({
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export default SuspensedView
