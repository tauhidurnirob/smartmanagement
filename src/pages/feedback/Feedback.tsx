import { Box } from "@mui/material"
import SuspensedView from "../../modules/common/SuspensedView"
import { Outlet } from "react-router-dom"


const Feedback = () => {
  return (
    <Box>
      <SuspensedView>
        <Outlet />
      </SuspensedView>
    </Box>
  )
}

export default Feedback