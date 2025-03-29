import { Box, Card, Divider, Grid, Stack, Typography } from "@mui/material"
import { Fragment, useMemo } from "react"
import CustomChip from "../../common/CustomChip"


const FeedbackFormDetails = () => {
  const details = useMemo(() => {
    return [
      {
        label: 'Feedback Form Template Name',
        value: '[Form A] Toilet Feedback Benchmark Performance Assessment For Smart Toilet IoT system',
      },
      {
        label: 'Feedback Type',
        value: 'Complement',
      },
      {
        label: 'Project',
        value: 'TP',
      },
      {
        label: 'Location',
        value: 'Temasek Polytechnic',
      },
      {
        label: 'Created On',
        value: '25/08/2022',
      },
      {
        label: 'Created By',
        value: 'Grace Chia (QSM Superadmin)',
      },
    ]
  }, [])
  const recipientDetails = useMemo(() => {
    return [
      {
        label: 'Recipient(s)',
        value: ['Grace Ng (Team Lead)', 'Grace Ng (Team Lead)'],
      },
      {
        label: 'CC Recipient(s)',
        value: [],
      },
    ]
  }, [])
  return (
    <Fragment>
      <Card sx={{mt: 3}}>
        <Box py={3} px={3.5} >
          <Typography fontSize={20} fontWeight={600} >Form Details</Typography>
        </Box>
        <Divider />
        <Box p={3.5}>
          <Stack direction={'row'} gap={2} mb={2.5}>
            <Typography fontSize={18} fontWeight={700}>Form ID</Typography>
            <Typography fontSize={'16px'} color={(theme) => theme.palette.grey[800]}>F32158979</Typography>
          </Stack>
          <Grid container direction={'column'} gap={3}>
            {details.map((item, idx) => {
              return (
                <Grid key={idx} item container alignItems='center'>
                  <Grid item xs={5}>
                    <Typography fontSize={18} fontWeight={700}>{item.label}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography fontSize={'16px'} color={(theme) => theme.palette.grey[800]}>{item.value}</Typography>
                  </Grid>
                </Grid>
              )
            })}
          </Grid>
        </Box>
      </Card>
      <Card sx={{mt: 3}}>
        <Box py={3} px={3.5} >
          <Typography fontSize={20} fontWeight={600} >Assigned Recipient(s) </Typography>
        </Box>
        <Divider />
        <Box p={3.5}>
          <Grid container direction={'column'} rowSpacing={2.5}>
            {recipientDetails.map((item, idx) => {
              const label = item.label
              const value = item.value
              const isArray = value.length
              return (
                <Grid key={idx} item container spacing={1}>
                  <Grid item lg={2} xs={12}>
                    <Typography fontSize={18} fontWeight={700} >{label}</Typography>
                  </Grid>
                  <Grid item lg={10} xs={12}>
                    {isArray ? (
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          rowGap: 2.5,
                          columnGap: 3,
                          '> div': {
                            borderRadius: 2.5,
                            py: 1,
                          },
                        }}
                      >
                        {value.map((t, valueIdx) => {
                          return (
                            <CustomChip key={`recipient-${valueIdx}`} type={'default'} text={t} />
                          )
                        })}
                      </Box>
                    ) : (
                      <Typography variant='h5' sx={{ color: (theme) => theme.palette.grey[600] }}>
                        _
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              )
            })}
          </Grid>
        </Box>
      </Card>
    </Fragment>
  )
}

export default FeedbackFormDetails