import { Box, Button, Menu, MenuItem } from "@mui/material"
import CustomChip from "../../common/CustomChip"
import { FC, useState } from "react"
import { ITypeItemWithColor } from "../../../types/common"
import DeleteDialog from "../../common/DeleteDialog"


interface IProps {
  statusInfo: ITypeItemWithColor
  onReOpen: () => void
}

const StatusChip:FC<IProps> = ({
  statusInfo,
  onReOpen
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [reOpen, setReOpen] = useState(false)

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <Box>
      <CustomChip
        text={statusInfo?.label || '_'}
        type={statusInfo?.chipType || 'error'}
        {...(statusInfo.value === 'closed' ? { onClick: (e) => {setAnchorEl(e.target)}} : {})}
      />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '5px'
          },
          '& .MuiList-root': {
            p: 0
          }
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={ ()=> setReOpen(true) }
        >
          Re-open
        </Button>
      </Menu>
      <DeleteDialog
        open={reOpen}
        onClose={()=> setReOpen(false)}
        onGoBack={() => setReOpen(false)}
        loading={false}
        onDelete={onReOpen}
        heading='Are you sure you want to re-open this feedback?'
        submitBtnColor='primary'
        labelBtnDelete='Re-open'
        hasCancel
      />
    </Box>
  )
}

export default StatusChip