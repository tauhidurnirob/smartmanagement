import { FC, useEffect, useState } from 'react'
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Divider,
  Stack,
  Typography,
  Grid,
} from '@mui/material'

import DialogWrapper from '../common/DialogWrapper'
import TextFieldWithLabel from '../common/TextFieldWithLabel'
import { IDevice } from '../../api/models'
import Api from '../../api'
import { toast } from 'react-toastify'
import { _getAuth } from '../../store/_selectors'
import { LoadingButton } from '@mui/lab'

interface IProps {
  device: IDevice | null
  onClose: () => void
}

const DeviceSwapModal: FC<IProps> = ({ device, onClose }) => {
  const [swapDevice, {isLoading}] = Api.useSwapDeviceMutation()
  const { user } = _getAuth()

  const [newIdentificationNo, setNewIdentificationNo] = useState<string>('')

  const handleChangeNewIdNo = (val: string) => {
    setNewIdentificationNo(val)
  }

  const handleUnmap = () => {
    const data = {
      currentIdentityNo: device?.identificationNo as string,
      swapUserId: user?.id as number
    }
    swapDevice(data)
      .then(() => {
        toast.success('Device has been unmapped')
        onClose()
      })
      .catch((err) => {
        console.log('Failed to unmap device: ', err)
        toast.error('Failed to unmap device')
      })
    initValues()
  }

  const handleSave = () => {
    const data = {
      currentIdentityNo: device?.identificationNo as string,
      newIdentityNo: newIdentificationNo,
      swapUserId: user?.id as number
    }
    swapDevice(data)
      .then(() => {
        toast.success('Device has been swapped')
        onClose()
      })
      .catch((err) => {
        console.log('Failed to swap device: ', err)
        toast.error('Failed to swap device')
      })
  }

  const initValues = () => {
    setNewIdentificationNo('')
  }

  useEffect(() => {
    if (device !== null) {
      initValues()
    }
  }, [device])

  return (
    <>
      <DialogWrapper
        maxWidth='802px'
        label={'Device Swap'}
        open={!!device}
        onClose={() => onClose()}
      >
        <DialogContent sx={{ px: 2.5, py: 4 }}>
          <Box sx={{}}>
            <Grid container spacing={1} alignItems={'center'}>
              <Grid item lg={4} xs={12}>
                <Typography typography='h4' sx={{ fontWeight: 500 }}>
                  Current Identification No.
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <Box sx={{ borderRadius: 2, backgroundColor: 'grey.100', py: 1.5, px: 2 }}>
                  <Typography typography='h5' sx={{ fontWeight: 700, color: 'grey.800' }}>
                    {device?.identificationNo}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Divider light sx={{ mt: 5, mb: 4, borderStyle: 'dashed' }} />
          <Box sx={{}}>
            <Grid container spacing={1} alignItems={'center'}>
              <Grid item lg={4} xs={12}>
                <Typography typography='h4' sx={{ fontWeight: 500 }}>
                  New Identification No.
                </Typography>
              </Grid>
              <Grid item lg={8} xs={12}>
                <TextFieldWithLabel
                  showLabel={false}
                  name='curIdentificationNo'
                  placeholder='Identification No.'
                  value={newIdentificationNo}
                  onChange={(e) => handleChangeNewIdNo(e.target.value)}
                  height='42px'
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Stack
            direction='row'
            justifyContent='center'
            px={4}
            py={2}
            gap={2.5}
            sx={{ width: '100%' }}
          >
            <Button variant='contained' color='primary' size='large' onClick={handleUnmap}>
              Unmap
            </Button>
            <LoadingButton
              variant='contained'
              size='large'
              color='primary'
              onClick={() => handleSave()}
              disabled={!newIdentificationNo}
            >
              Save
            </LoadingButton>
          </Stack>
        </DialogActions>
      </DialogWrapper>
    </>
  )
}

export default DeviceSwapModal
