import { FC, useEffect, useState } from 'react'
import { Card, Box, Typography, Button } from '@mui/material'

import WashroomThresholdEditor from './WashroomThresholdEditor'
import { IWashroomThresholdValuesEdit } from '../../types/washroom'
import { toast } from 'react-toastify'
import Api from '../../api'
import { ROLE_PERMISSION_KEYS } from '../../helpers/constants'
import useAuth from '../../hooks/useAuth'

interface IProps {
  hiddenNormal?: boolean
  hiddenMedium?: boolean
  deviceTypeId?: number
  refetch?: () => void
}

const WashroomParentThresholdCard: FC<IProps> = ({ hiddenMedium, hiddenNormal, deviceTypeId, refetch }) => {
  const [updateLocationThreshold] = Api.useUpdateLocationThresholdMutation()
  const { user } = useAuth();
  const [isEditable, setEditable] = useState(false);
  const [thresholds, setThresholds] = useState<IWashroomThresholdValuesEdit>({
    high: '',
    medium: '',
    normal: '',
  })

  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.washroomManagement.thresholdSettings.editwashroomThresholdSettings)) {
      setEditable(true)
    }
    setThresholds({
      high: '',
      medium: '',
      normal: '',
    })
  }, [deviceTypeId])

  const handleChangeThreshold = (key: string, value: string) => {
    setThresholds({ ...thresholds, [key]: value })
  }

  const handleApplyToAll = async () => {
    if(deviceTypeId && isEditable) {
      const s = await updateLocationThreshold({
        id: 0,
        isAllLocation: true,
        deviceTypeId: deviceTypeId,
        high: Number(thresholds.high),
        medium: Number(thresholds.medium),
        normal: Number(thresholds.normal)
      }).unwrap()
      if (refetch) {
        refetch()
      }
      toast.success(`Updated all location threshold`)
    }
  }

  return (
    <Card sx={{ py: 2, pr: 3.5, pl: 2.5, boxShadow: 'none' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography typography={'h3'} sx={{ fontSize: '1.125rem' }}>
          Parent Threshold
        </Typography>
        <Button sx={{}} color='primary' variant='contained' onClick={handleApplyToAll} disabled={!isEditable}>
          Apply to All Locations
        </Button>
      </Box>
      <Box
        sx={{
          mt: 1.25,
          borderRadius: 3,
          border: '1px solid #DADADA',
          boxShadow: '0px 0px 20px 0px rgba(76, 87, 125, 0.02)',
          px: 2,
          pt: 1.5,
          pb: 2,
        }}
      >
        <WashroomThresholdEditor
          thresholds={thresholds}
          isEdit={true}
          onChange={handleChangeThreshold}
          hiddenMedium={hiddenMedium}
          hiddenNormal={hiddenNormal}
        />
      </Box>
    </Card>
  )
}

export default WashroomParentThresholdCard
