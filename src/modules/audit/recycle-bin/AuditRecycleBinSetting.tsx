import { useEffect, useState } from 'react'
import { Stack, Typography, Card, Grid, Divider, Box } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { toast } from 'react-toastify'

import { ISelectItem } from '../../../types/common'
import TimeframeSelect from './TimeframeSelect'
import Api from '../../../api'
import { AUDIT_SETTING_TIMEFRAMES } from '../../../helpers/constants'

const AuditRecycleBinSetting = () => {
  const { data: recycleBinSettings } = Api.useGetAuditRecycleBinSettingQuery()
  const [updateSettings, { isLoading: isUpdating }] = Api.useUpdateAuditRecycleBinSettingMutation()

  const [selectedTimeframe, setSelectedTimeframe] = useState<ISelectItem | null>(null)

  const handleChangeTimeframe = (selected: ISelectItem) => {
    setSelectedTimeframe(selected)
  }

  const handleSave = () => {
    if (selectedTimeframe) {
      updateSettings({
        deleteAfter: selectedTimeframe.value as string,
      })
        .unwrap()
        .then((res) => {
          toast.success('Updated settings')
        })
    }
  }

  useEffect(() => {
    if (recycleBinSettings?.deleteAfter) {
      const timeframe = AUDIT_SETTING_TIMEFRAMES.find(
        (t) => t.value === recycleBinSettings?.deleteAfter
      )
      setSelectedTimeframe(timeframe || null)
    }
  }, [recycleBinSettings])

  return (
    <Card sx={{ boxShadow: 'none', height: '100%' }}>
      <Grid container spacing={2} sx={{ pt: 4, pb: 1.5, px: 4 }}>
        <Grid item lg={4} xs={12}>
          <Typography variant='subtitle1' sx={{ fontSize: 15, mt: 1 }}>
            Delete After:
          </Typography>
        </Grid>
        <Grid item lg={8} xs={12}>
          <TimeframeSelect
            selected={selectedTimeframe}
            onChange={handleChangeTimeframe}
            hiddenLabel={true}
          />
          <Typography color='primary' variant='subtitle1' sx={{ mt: 1 }}>
            After the selected period, items in the recycle bin will be automatically deleted from
            the system
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 1.5 }} />
      <Stack sx={{ pt: 2.5, px: 3.75, pb: 3.75 }} justifyContent={'flex-end'} direction={'row'}>
        <Box>
          <LoadingButton
            variant='contained'
            color='primary'
            loading={isUpdating}
            onClick={handleSave}
            disabled={!selectedTimeframe || isUpdating}
          >
            Save
          </LoadingButton>
        </Box>
      </Stack>
    </Card>
  )
}

export default AuditRecycleBinSetting
