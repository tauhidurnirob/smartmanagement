import { Label } from "@mui/icons-material"
import { Box, Button, Checkbox, Divider, IconButton, Menu, Stack, Typography } from "@mui/material"
import { FC, useState } from "react"
import SearchField from "../../common/SearchField"
import { ISelectItem } from "../../../types/common"

interface IProps {
  labels: ISelectItem[]
}
const LabelDialog:FC<IProps> = ({
  labels
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }
  const open = Boolean(anchorEl)

  return (
    <Box>
      <IconButton
        size="small"
        sx={{color: 'grey.500', background: theme => theme.palette.grey[100], borderRadius: '6px'}}
        onClick={handleClick}
      >
        <Label />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={() => setAnchorEl(null)}
        sx={{ '& .MuiMenu-paper': { p: '0', minWidth: '200px', maxWidth: '280px', width: '100%' } }}
      >
        <Box p={3}>
          <SearchField
            placeholder='Search labels'
            sx={{
              background: (theme) => theme.palette.grey[100],
              minWidth: 0,
              height: '40px',
              justifyContent: 'center',
            }}
          />
          <Stack gap={2} mt={3}>
            {
              labels?.map((label) => {
                return (
                  <Stack direction={'row'} justifyContent={'space-between'} >
                    <Typography fontWeight={700} color={'text.secondary'} >{label.label}</Typography>
                    <Checkbox sx={{p: 0}} />
                  </Stack>
                )
              })
            }
          </Stack>
        </Box>
        <Divider />
        <Stack justifyContent={'center'} px={3} py={2}>
          <Button
            variant="contained"
            color="primary"
          >
            Manage Labels
          </Button>
        </Stack>
      </Menu>
    </Box>
  )
}

export default LabelDialog