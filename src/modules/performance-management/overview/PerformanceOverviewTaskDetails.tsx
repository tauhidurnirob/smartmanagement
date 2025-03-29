import { Box, Button, Card, Divider, Stack, Typography } from "@mui/material"
import { DATE_FORMAT } from "../../../constants/common"
import dayjs from "dayjs"
import PerformanceOverviewTaskActivityLog from "./PerformanceOverviewTaskActivityLog"


const PerformanceOverviewTaskDetails = () => {
  return (
    <Box mt={4}>
      <Typography fontSize={20} fontWeight={500} >Task Details</Typography>
      <Card sx={{p: 5, mt: 4}} >
        <Stack direction={'row'} justifyContent={'space-between'} >
          <Box>
            <Typography variant="h3">Cleaning Glass Door</Typography>
            <Typography
                variant='subtitle1'
                sx={{
                  fontSize: 14,
                  display: 'inline-flex',
                  mt: 2,
                  color: (theme) => theme.palette.grey[500],
                  span: {
                    fontSize: 14,
                    ml: 3,
                    color: (theme) => theme.palette.text.primary,
                  },
                }}
              >
                Created On: <span>{dayjs('2023-10-17T02:17:03.116Z').format(DATE_FORMAT)}</span>
              </Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="error"
            >
              Delete Task
            </Button>
          </Box>
        </Stack>
        <Stack direction={'row'} gap={2} mt={5} flexWrap={'wrap'}>
          <Stack maxWidth={'180px'} justifyContent={'space-between'} gap={1} flex={1} border={theme => `1px dashed ${theme.palette.divider}`} borderRadius={'6px'} py={1.5} px={2} >
            <Typography variant="h4" >120 mins</Typography>
            <Typography>SLA Resolve Time</Typography>
          </Stack>
          <Box>
            <Button
              variant="contained"
              color="primary"
            >
              Change SLA Resolve Time
            </Button>
          </Box>
        </Stack>
      </Card>
      <Card sx={{mt: 3}} >
        <Box
          sx={{
            px: 5,
            pt: 5.25,
            pb: 2.5,
            display: 'flex',
            flex: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant='h3'>Activity Log</Typography>
        </Box>
        <Divider light />
        <Box>
          <PerformanceOverviewTaskActivityLog/>
        </Box>
      </Card>
    </Box>
  )
}

export default PerformanceOverviewTaskDetails