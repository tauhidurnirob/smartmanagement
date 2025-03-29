import { Box } from "@mui/material"
import { ChevronRightDuotoneIcon } from "../../../assets/icons/chevron-right-duotone"
import { ChevronLeftDuotoneIcon } from "../../../assets/icons/chevron-left-duotone"
import { FC } from "react"

interface IProps {
  open: boolean
  onOpen: () => void
  onClose: () => void
  leftAlign?: boolean
}

const ExpandCollapseButton:FC<IProps> = ({
  open,
  onOpen,
  onClose,
  leftAlign
}) => {
  return (
    <Box
      width="26px"
      height="27px"
      p="7px 0 0 5px"
      position="absolute"
      top="15px"
      right="3px"
      sx={{background: "#ffffff", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius: "4px", zIndex: 1, cursor: "pointer"}}
      onClick={() => open ? onClose() : onOpen()}
    >
      {
        !open ?
        <ChevronRightDuotoneIcon color="primary" sx={{fontSize: '16px'}}/>
        : <ChevronLeftDuotoneIcon color="primary" sx={{fontSize: '16px'}} />
      }
    </Box>
  )
}

export default ExpandCollapseButton