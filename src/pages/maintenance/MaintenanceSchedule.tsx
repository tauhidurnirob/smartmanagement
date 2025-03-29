import { Box, Button, Typography } from "@mui/material"
import { FileUploadLight } from "../../assets/icons/file-upload-light"
import { CalenderScheduleIcon } from "../../assets/icons/calender-schedule"
import MaintenanceScheduleList from "../../modules/maintanance/schedule/MaintenanceScheduleList"
import { useState } from "react"
import MaintenanceBatchUploadDialog from "../../modules/maintanance/schedule/MaintenanceBatchUploadDialog"
import { useNavigate } from "react-router-dom"


const MaintenanceSchedule = () => {
  const navigate = useNavigate()

  const [openBatchUpload, setOpenBatchUpload] = useState(false)

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: { sm: 'center', xs: 'flex-start' },
          flexDirection: { sm: 'row', xs: 'column' },
          columnGap: 2,
          rowGap: 2,
        }}
      >
        <Typography typography={'h3'}>Schedule</Typography>
        <Box
          sx={{
            marginLeft: 'auto',
            display: 'flex',
            flexWrap: 'wrap',
            width: { sm: 'auto', xs: '100%' },
            flexDirection: { sm: 'row', xs: 'column' },
            columnGap: 2,
            rowGap: 2,
          }}
        >
          <Button
            color='primary'
            variant='contained'
            size='small'
            startIcon={<FileUploadLight />}
            onClick={() => setOpenBatchUpload(true)}
          >
            Batch Upload Maintenance
          </Button>
          <Button
            color='primary'
            variant='contained'
            size='small'
            startIcon={<CalenderScheduleIcon />}
            onClick={() => navigate('create')}
          >
            Add New Maintenance
          </Button>
        </Box>
      </Box>
      <Box mt={3}>
        <MaintenanceScheduleList />
      </Box>
      <MaintenanceBatchUploadDialog open={openBatchUpload} onClose={() => setOpenBatchUpload(false)} />
    </Box>
  )
}

export default MaintenanceSchedule