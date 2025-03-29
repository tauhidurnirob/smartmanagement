import { useEffect, useState } from 'react'
import { Stack, Typography, Card, Grid, Divider, Box } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import Api from '../../api'
import { ISelectItem } from '../../types/common'
import { PREDICTIVE_ANALYSIS_SETTING_TIMEFRAMES } from '../../helpers/constants'
import TimeframeSelect from '../../modules/audit/recycle-bin/TimeframeSelect'

const PredictiveAnalysisConfiguration = () => {
  const { data: recycleBinSettings } = Api.useGetAuditRecycleBinSettingQuery()
  // const [updateSettings, { isLoading: isUpdating }] = Api.useUpdateAuditRecycleBinSettingMutation()

  const [selectedTimeframe, setSelectedTimeframe] = useState<ISelectItem | null>(null)

  const handleChangeTimeframe = (selected: ISelectItem) => {
    setSelectedTimeframe(selected)
  }

  const handleSave = () => {
    if (selectedTimeframe) {
      // updateSettings({
      //   deleteAfter: selectedTimeframe.value as string,
      // })
      //   .unwrap()
      //   .then((res) => {
      //     console.log('res: ', res)
      //     toast.success('Updated settings')
      //   })
    }
  }

  useEffect(() => {
    if (recycleBinSettings?.deleteAfter) {
      const timeframe = PREDICTIVE_ANALYSIS_SETTING_TIMEFRAMES.find(
        (t) => t.value === recycleBinSettings?.deleteAfter
      )
      setSelectedTimeframe(timeframe || null)
    }
  }, [recycleBinSettings])

  return (
    <Card sx={{ boxShadow: 'none', height: '100%' }}>
      <Grid container spacing={2} sx={{ pt: 4, pb: 1.5, px: 4 }}>
        <Grid item lg={4} xs={12}>
          <Typography variant='subtitle1' sx={{ fontSize: 15, mt: 1, color: 'grey.800' }}>
            Prediction Config:
          </Typography>
        </Grid>
        <Grid item lg={8} xs={12}>
          <TimeframeSelect
            selected={selectedTimeframe}
            onChange={handleChangeTimeframe}
            hiddenLabel={true}
          />
        </Grid>
      </Grid>
      <Divider sx={{ mt: 5 }} />
      <Stack sx={{ pt: 2.5, px: 3.75, pb: 3.75 }} justifyContent={'flex-end'} direction={'row'}>
        <Box>
          <LoadingButton
            variant='contained'
            color='primary'
            // loading={isUpdating}
            onClick={handleSave}
            disabled={!selectedTimeframe}
          >
            Save
          </LoadingButton>
        </Box>
      </Stack>
    </Card>
  )
}

export default PredictiveAnalysisConfiguration
