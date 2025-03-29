import { Box, Button, Stack, Typography } from "@mui/material"
import Api from "../../api"
import { toast } from "react-toastify"


const DeviceAction = () => {

  const [updateAmmoniaSensor] = Api.useUpdateAmmoniaSensorMutation()
  const [updateSmartBin] = Api.useUpdateSmartBinMutation()

  const handleAmmoniaSensor = (val: number) => {
    updateAmmoniaSensor({ deviceName: 'Air Quality Sensor 13 Female Washroom', level: val })
    .unwrap()
    .then(() => {
      toast.success('Device updated')
    })
    .catch((err) => {
      console.log('Failed to update device: ', err)
      toast.error('Failed to update device')
    })
  }

  const handleSmartBin = (val: number) => {
    updateSmartBin({ deviceName: 'Smart Bin 275', weight: val })
    .unwrap()
    .then(() => {
      toast.success('Device updated')
    })
    .catch((err) => {
      console.log('Failed to update device: ', err)
      toast.error('Failed to update device')
    })
  }

  return (
    <Box p={5} display={'flex'} flexDirection={'column'} justifyContent={'center'} >
      <Typography variant="h2" mb={5}> Device Actions</Typography>
      <Box>
        <Typography variant="h3"> Air Quality Sensor 13 Female Washroom</Typography>
        <Stack direction={'row'} gap={2} mt={3}>
          <Button variant="contained" onClick={()=> handleAmmoniaSensor(64)}>Low</Button>
          <Button variant="contained" onClick={()=> handleAmmoniaSensor(189)}>Medium</Button>
          <Button variant="contained" onClick={()=> handleAmmoniaSensor(418)}>High</Button>
        </Stack>
      </Box>
      <Box mt={6}>
        <Typography variant="h3"> Smart Bin 275</Typography>
        <Stack direction={'row'} gap={2} mt={3}>
          <Button variant="contained" onClick={()=> handleSmartBin(5)}>On</Button>
          <Button variant="contained" onClick={()=> handleSmartBin(0)}>Off</Button>
        </Stack>
      </Box>
    </Box>
  )
}

export default DeviceAction