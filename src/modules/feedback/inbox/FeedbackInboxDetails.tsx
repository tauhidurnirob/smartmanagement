import { Box, IconButton, Menu, Stack, Typography } from "@mui/material"
import { useState } from "react"
import FeedbackInboxDetailsBar from "./FeedbackInboxDetailsBar"
import { tmpEmails } from "./dummy"
import { useNavigate } from "react-router-dom"
import CloseIcon from '@mui/icons-material/Close'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { IUser } from "../../../api/models"
import ReplyIcon from '@mui/icons-material/Reply'
import FeedbackInboxReplyEmail from "./FeedbackInboxReplyEmail"
import { ISelectItem } from "../../../types/common"

const MoreUsersDialog = ({users}: {users: Partial<IUser>[] | undefined}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }
  const open = Boolean(anchorEl)

  return (
    <Box>
      <IconButton onClick={handleClick}>
        <ExpandMoreIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={() => setAnchorEl(null)}
        sx={{ '& .MuiMenu-paper': { p: '20px' } }}
      >
        <Stack gap={1}>
          {
            users?.map((user) => {
              return (
                <Typography variant="h4" key={user.id}>{user.fullName}</Typography>
              )
            })
          }
        </Stack>
      </Menu>
    </Box>
  )
}

const FeedbackInboxDetails = () => {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)

  const data = tmpEmails[1]
  const firstUsers = data.sendTo?.slice(0, 4)
  const otherUsers = data.sendTo?.slice(4)

  return (
    <Box>
      <FeedbackInboxDetailsBar
        page={page}
        setPage={setPage}
        data={tmpEmails}
        onBack={() => navigate(`/feedback/inbox`)}
      />
      <Box p={4}>
        <Typography fontSize={'18px'} fontWeight={'500'} variant="h4" >Feedback ID F23458769</Typography>
        <Box mt={2}>
        {
          data.label &&
          <Box display={'inline-flex'} gap={1} py={.5} px={1} borderRadius={1} sx={{background: theme => theme.palette.grey[100]}} >
            <Typography fontSize={'9px'} fontWeight={500} color={'text.secondary'} >{data.label}</Typography>
            <CloseIcon sx={{fontSize: '12px', color: 'grey.600'}} />
          </Box>
        }
        </Box>
        <Stack direction={'row'} mt={2} alignItems={'center'}>
          <Typography variant="h4">
            To: 
            <Box component={'span'} color={'text.secondary'}>
              {firstUsers?.slice(0, 4).map((user, idx) => user.fullName + (idx+1 === firstUsers.length ? '' :', ') )}
            </Box>
          </Typography>
          <MoreUsersDialog users={otherUsers} />
        </Stack>
        <Stack direction={'row'} justifyContent={'flex-end'} alignItems={'center'} >
          <Typography fontSize={'13px'} fontWeight={'600'} color={'grey.500'}>{data.receivedAt}</Typography>
          <IconButton sx={{color: 'grey.400'}}>
            <ReplyIcon />
          </IconButton>
        </Stack>
        <Box>
          {data.content}
        </Box>
        <FeedbackInboxReplyEmail
          to={data?.sendTo?.map((user) => ({label: user.fullName, value: user.id})) as ISelectItem[]}
          cc={data?.sendTo?.map((user) => ({label: user.fullName, value: user.id})) as ISelectItem[]}
          bcc={data?.sendTo?.map((user) => ({label: user.fullName, value: user.id})) as ISelectItem[]}
          feedbackId={data.id}
        />
      </Box>
    </Box>
  )
}

export default FeedbackInboxDetails