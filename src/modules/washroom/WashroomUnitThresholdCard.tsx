import { FC, useEffect, useMemo, useState } from 'react'
import { Card, Box, Typography, IconButton, Divider, Stack, Checkbox } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import WashroomThresholdEditor from './WashroomThresholdEditor'
import { IWashroomAreaThreshold, IWashroomThresholdValuesEdit } from '../../types/washroom'
import { EditPenUp } from '../../assets/icons/edit-pen-up'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-toastify'
import { ROLE_PERMISSION_KEYS } from '../../helpers/constants'
import Api from '../../api'
interface IProps {
  locationData: any
  locationThresholdValue?: any
  deviceTypeId: number
}

const WashroomUnitThresholdCard: FC<IProps> = (props) => {
  const { locationData, locationThresholdValue, deviceTypeId } = props;

  const [updateLocationThreshold] = Api.useUpdateLocationThresholdMutation()
  const [isEdit, setIsEdit] = useState(false)
  const [thresholds, setThresholds] = useState<IWashroomThresholdValuesEdit>({
    high: locationThresholdValue && locationThresholdValue.high && locationThresholdValue.high.toString() || "" ,
    medium: locationThresholdValue && locationThresholdValue.medium && locationThresholdValue.medium.toString() || "" ,
    normal: locationThresholdValue && locationThresholdValue.normal && locationThresholdValue.normal.toString() || "" ,
  })

  const { areaName, levelName } = useMemo(() => {
    const areaName = locationData?.name || '-'
    const levelName = '-'

    return { areaName, levelName }
  }, [locationData])

  const handleChangeThreshold = (key: string, value: string) => {
    setThresholds({ ...thresholds, [key]: value })
  }

  const handleClickEdit = () => {
    if(isEditable){
      setIsEdit(true)
    }else{
      toast.error('You do not have access to edit!')
    }
  }

  const handleSave = async () => {
    setIsEdit(false)
    if(isEditable){
      const s = await updateLocationThreshold({
        id: locationData.id,
        isAllLocation: false,
        deviceTypeId: deviceTypeId,
        high: Number(thresholds.high),
        medium: Number(thresholds.medium),
        normal: Number(thresholds.normal)
      }).unwrap()

      toast.success(`Updated location threshold`)
    }
  }
  const { user } = useAuth();
  const [isEditable, setEditable] = useState(false);
  useEffect(() => {
    const thresholds = {
      high: locationThresholdValue && locationThresholdValue.high && locationThresholdValue.high.toString() || "" ,
      medium: locationThresholdValue && locationThresholdValue.medium && locationThresholdValue.medium.toString() || "" ,
      normal: locationThresholdValue && locationThresholdValue.normal && locationThresholdValue.normal.toString() || "" ,
    }
    setThresholds(thresholds)
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.washroomManagement.thresholdSettings.editwashroomThresholdSettings)) {
      setEditable(true)
    }
  }, [locationThresholdValue, deviceTypeId])

  return (
    <Card sx={{ boxShadow: 'none' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          pt: 2,
          px: 2,
          pb: 1,
        }}
      >
        <Box>
          <Typography typography={'h4'}>
            {areaName || '-'}
          </Typography>
          <Typography typography={'h5'} sx={{ mt: 1, color: (theme) => theme.palette.grey[500] }}>
            {levelName}
          </Typography>
        </Box>
        <Box>
          {isEdit ? (
            <Box display={'flex'} alignItems={'center'} ml={1.5} onClick={handleSave}>
              <LoadingButton
                variant='contained'
                color='primary'
                size='small'
                // loading={isLoading}
              >
                Save
              </LoadingButton>
            </Box>
          ) : (
            <IconButton size='medium' color='primary' onClick={handleClickEdit} sx={{ p: 0 }}>
              <EditPenUp sx={{ fontSize: '31px' }} />
            </IconButton>
          )}
        </Box>
      </Box>
      <Divider light />
      <Box
        sx={{
          px: 2,
          py: 1.5,
        }}
      >
        <WashroomThresholdEditor
          thresholds={thresholds}
          isEdit={isEdit}
          onChange={handleChangeThreshold}
        />
        <Box sx={{ mt: 1.5, minHeight: '24px' }}>
          {isEdit && (
            <Stack flexDirection={'row'} gap={1} sx={{ mt: 1 }} alignItems={'center'}>
              {/* <Checkbox
                color='primary'
                // checked={!isParentThreshold}
                onChange={(_e) => {
                  // setIsParentThreshold(!isParentThreshold)
                }}
                inputProps={{
                  'aria-label': 'select parent threshold',
                }}
                sx={{ p: 0 }}
                // disabled={isLoading}
              />
               <Typography
                typography={'h4'}
                sx={{
                  fontWeight: 500,
                  lineHeight: 1,
                  color: (theme) => theme.palette.grey[600],
                }}
              >
                customised
              </Typography>  */}
            </Stack>
          )}
        </Box>
      </Box>
    </Card>
  )
}

export default WashroomUnitThresholdCard
