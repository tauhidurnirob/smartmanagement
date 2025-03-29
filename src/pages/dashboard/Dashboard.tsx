import { Outlet } from 'react-router-dom'
import SuspensedView from '../../modules/common/SuspensedView'

const Dashboard = () => {
  return (
    <SuspensedView>
      <Outlet />
    </SuspensedView>
  )
}

export default Dashboard
