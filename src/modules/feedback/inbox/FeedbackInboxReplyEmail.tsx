import { Box, Button, Card, Divider, IconButton, Stack, Typography } from "@mui/material"
import { ISelectItem } from "../../../types/common"
import { FC, useState } from "react"
import CloseIcon from '@mui/icons-material/Close'
import { Editor } from "react-draft-wysiwyg"
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { TrashDuotoneIcon } from "../../../assets/icons/trash-duotone"
import { AttachmentIcon } from "../../../assets/icons/attachment"

interface ITagProps {
  item: ISelectItem
  onClose: (v: number) => void
}
const Tag:FC<ITagProps> = ({
  item,
  onClose
}) => {
  return (
    <Box display={'inline-flex'} height={'26px'} alignItems={'center'} gap={1} py={.5} px={1} borderRadius={1} sx={{background: theme => theme.palette.grey[100]}} >
      <Typography fontSize={'11px'} fontWeight={500} color={'primary.main'} >{item.label}</Typography>
      <CloseIcon sx={{fontSize: '14px', color: 'grey.600'}} onClick={() => onClose (item.value as number)} />
    </Box>
  )
}

interface IProps {
  to: ISelectItem[]
  cc: ISelectItem[]
  bcc: ISelectItem[]
  feedbackId: number
}

const FeedbackInboxReplyEmail:FC<IProps> = ({
  to,
  cc,
  bcc,
  feedbackId
}) => {
  const [ccOpen, setCcOpen] = useState(false)
  const [bccOpen, setBccOpen] = useState(false)

  const [editorState, setEditorState]: any = useState()

  const onEditorStateChange = (editorState: any) => {
    setEditorState(editorState)
  }

  return (
    <Card sx={{boxShadow: '0px 4px 15px rgba(181, 181, 195, 0.25)', mt: 4}}>
      <Stack direction={'row'} gap={2} p={3} justifyContent={'space-between'} alignItems={'center'} borderBottom={theme => `1px solid ${theme.palette.divider}`} >
        <Typography variant="h4" color={'text.secondary'}>To:</Typography>
        <Stack direction={'row'} gap={2} flexWrap={'wrap'} flex={1} >
          {
            to?.map((item, idx) => {
              return <Tag key={idx} item={item} onClose={() => null} />
            })
          }
        </Stack>
        <Stack direction={'row'} gap={1}>
          <Box px={1} py={.5} onClick={() => setCcOpen(!ccOpen)} borderRadius={1} sx={{background: theme => ccOpen ? theme.palette.primary.light : '', cursor: 'pointer'}} >
            <Typography variant="h4" color={ccOpen ? 'primary.main' : 'grey.500'}>CC</Typography>
          </Box>
          <Box px={1} py={.5} onClick={() => setBccOpen(!bccOpen)} borderRadius={1} sx={{background: theme => bccOpen ? theme.palette.primary.light : '', cursor: 'pointer'}} >
            <Typography variant="h4" color={bccOpen ? 'primary.main' : 'grey.500'} >BCC</Typography>
          </Box>
        </Stack>
      </Stack>
      {
        ccOpen &&
        <Stack direction={'row'} gap={2} p={3} justifyContent={'space-between'} alignItems={'center'} borderBottom={theme => `1px solid ${theme.palette.divider}`} >
          <Typography variant="h4" color={'text.secondary'}>CC:</Typography>
          <Stack direction={'row'} gap={2} flexWrap={'wrap'} flex={1} >
            {
              cc?.map((item) => {
                return <Tag item={item} onClose={() => null} />
              })
            }
          </Stack>
        </Stack>
      }
      {
        bccOpen &&
        <Stack direction={'row'} gap={2} p={3} justifyContent={'space-between'} alignItems={'center'} borderBottom={theme => `1px solid ${theme.palette.divider}`} >
          <Typography variant="h4" color={'text.secondary'}>BCC:</Typography>
          <Stack direction={'row'} gap={2} flexWrap={'wrap'} flex={1} >
            {
              bcc?.map((item) => {
                return <Tag item={item} onClose={() => null} />
              })
            }
          </Stack>
        </Stack>
      }
      <Box p={3} borderBottom={theme => `1px solid ${theme.palette.divider}`}>
        <Typography fontSize={'13px'} >Feedback ID F23458769</Typography>
      </Box>
      <Box>
        <Editor
          editorState={editorState}
          toolbarClassName='draftToolbarClassName'
          wrapperClassName='draftWrapperClassName'
          editorClassName='draftEditorClassName'
          onEditorStateChange={onEditorStateChange}
          placeholder='Type message...'
          editorStyle={{padding: '20px', minHeight: '200px', marginBottom: '5px'}}
          toolbar={{
            options: ['inline','blockType', 'fontSize', 'link'],
            inline: {
              inDropdown: false,
              className: undefined,
              component: undefined,
              dropdownClassName: undefined,
              options: ['bold', 'italic', 'underline', 'monospace'],
            },
          }}
        />
      </Box>
      <Divider />
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} gap={2} flexWrap={'wrap'}>
        <Stack direction={'row'} alignItems={'center'} p={3} gap={1}>
          <Button
            variant="contained"
            color="primary"
          >
            Send
          </Button>
          <IconButton>
            <AttachmentIcon />
          </IconButton>
        </Stack>
        <IconButton sx={{mr: 3}}>
          <TrashDuotoneIcon sx={{color: 'grey.400'}} />
        </IconButton>
      </Stack>
    </Card>
  )
}

export default FeedbackInboxReplyEmail