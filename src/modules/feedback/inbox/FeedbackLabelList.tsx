import { Box, Divider, IconButton, Stack, Typography } from "@mui/material"
import SearchField from "../../common/SearchField"
import { tmpLabels } from "../../../pages/feedback/FeedbackInbox"
import { EditPenDuotone } from "../../../assets/icons/edit-pen-duotone"
import { TrashDuotoneIcon } from "../../../assets/icons/trash-duotone"
import { useState } from "react"
import DeleteDialog from "../../common/DeleteDialog"
import FeedbackLabelAddEditModal from "./FeedbackLabelAddEditModal"



const FeedbackLabelList = () => {
  const [deleteModalOn, setDeleteModalOn] = useState(false)
  const [selectedLabel, setSelectedLabel] = useState<null | string>(null)

  return (
    <Box>
      <Stack direction={'row'} alignItems={'center'} gap={3} flexWrap={'wrap'} p={4}>
        <Typography variant="h3">Manage Labels</Typography>
        <SearchField
          placeholder='Search labels...'
          sx={{
            background: (theme) => theme.palette.grey[100],
            minWidth: 0,
            height: '40px',
            justifyContent: 'center',
            maxWidth: '400px'
          }}
        />
      </Stack>
      <Divider light />
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} p={4} maxWidth={'500px'} >
        <Typography fontWeight={600} fontSize={'13px'} sx={{textDecoration: 'underline'}}>Label Name</Typography>
        <Typography fontWeight={600} fontSize={'13px'} sx={{textDecoration: 'underline'}}>Actions</Typography>
      </Stack>
      <Divider sx={{borderColor: 'grey.400'}} />
      <Stack p={4} gap={3} maxWidth={'520px'}>
        {
          tmpLabels?.map((label) => {
            return (
              <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Typography fontSize={'12px'} fontWeight={500} >{label.label}</Typography>
                <Stack direction={'row'}>
                  <IconButton sx={{':hover': {color: 'primary.main'}}} onClick={() => setSelectedLabel(label.value)} >
                    <EditPenDuotone fontSize="small" />
                  </IconButton>
                  <IconButton sx={{':hover': {color: 'primary.main'}}} onClick={() => setDeleteModalOn(true)} >
                    <TrashDuotoneIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Stack>
            )
          })
        }
      </Stack>
      <DeleteDialog
        open={deleteModalOn}
        onClose={() => setDeleteModalOn(false)}
        onGoBack={() => setDeleteModalOn(false)}
        onDelete={() => null}
        loading={false}
        heading={'Would you like to delete this label?'}
        subHeading={'This action cannot be undone, so please be sure before proceeding.'}
        hasCancel
      />
      <FeedbackLabelAddEditModal
        open={Boolean(selectedLabel)}
        onClose={() => setSelectedLabel(null)}
        labelId={1}
      />
    </Box>
  )
}

export default FeedbackLabelList