import { Box } from "@mui/material"
import DialogWrapper from "../../common/DialogWrapper"
import { FC } from "react"
import PerformanceOverviewTaskActivityLog from "./PerformanceOverviewTaskActivityLog"

interface IProps {
  open: boolean
  onClose: () => void
}

const PerformanceOverviewAutomationDetails:FC<IProps> = ({
  open,
  onClose
}) => {
  return (
    <DialogWrapper
      open={open}
      onClose={onClose}
      label="Automation Task Details"
      maxWidth={'md'}
    >
      <Box>
        <PerformanceOverviewTaskActivityLog />
      </Box>
    </DialogWrapper>
  )
}

export default PerformanceOverviewAutomationDetails