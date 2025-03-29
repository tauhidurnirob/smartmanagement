import { Box, Button, Card, Stack, Typography } from "@mui/material"
import { IMaintenance } from "../../../types/maintenance"
import { FC } from "react"
import ButtonBack from "../../common/ButtonBack"
import { To } from "react-router-dom"
import MaintenanceCreateEdit from "./MaintenanceCreateEdit"

interface IProps {
  maintenance: IMaintenance
}

const MaintenanceScheduleDetails:FC<IProps> = ({
  maintenance
}) => {
  return (
    <Box>
      <ButtonBack to={-1 as To} />
      <Typography variant="h3" mt={5} >Schedule Details</Typography>
      <Card sx={{ mt: 2.5, py: 4.25, pr: { lg: 8, xs: 3.75 }, pl: 3.75 }}>
        <Stack
          display={'flex'}
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Stack display={'flex'} flexDirection={'column'} rowGap={2}>
            <Typography variant='h3'>{maintenance.name}</Typography>
            <Stack
              display={'flex'}
              flexDirection={'row'}
              flexWrap={'wrap'}
              alignItems={'center'}
              columnGap={1.5}
              rowGap={2}
            >
              <Typography variant='h5' sx={{ color: (theme) => theme.palette.grey[400] }}>
                Date Time Created:
              </Typography>
              <Typography
                variant='h5'
                sx={{ color: (theme) => theme.palette.grey[700], fontWeight: 700 }}
              >
                {maintenance.createdAt}
              </Typography>
            </Stack>
          </Stack>
          <Button variant='contained' color='error' >
            Delete Maintenance
          </Button>
        </Stack>
      </Card>
      <Box>
        <MaintenanceCreateEdit maintenance={maintenance} />
      </Box>
    </Box>
  )
}

export default MaintenanceScheduleDetails