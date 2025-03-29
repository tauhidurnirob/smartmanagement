import { FC } from 'react'
import { Box, Typography, Grid, Button, Stack, IconButton } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import { Plus } from '../../assets/icons/plus'
import TextFieldWithLabel from '../../modules/common/TextFieldWithLabel'

import GoogleAddress from '../../modules/common/GoogleAddress'

interface IProjectLocation {
  name: string
  address: string
  mtr: string
  lat: number | null
  lng: number | null
}

interface IProps {
  locations: IProjectLocation[]
  errors: any
  onAdd: () => void
  onRemove: (idx: number) => void
  onChangeName: (idx: number, name: string) => void
  onChangeMtr: (idx: number, mtr: string) => void
  onChangeAddress: (
    idx: number,
    value: { address: string; lat: number | null; lng: number | null }
  ) => void
}

const AuditProjectSiteCreateLocationItem: FC<IProps> = ({
  locations,
  errors,
  onChangeName,
  onChangeAddress,
  onChangeMtr,
  onRemove,
  onAdd,
}) => {
  const handleChangeLocationName = (idx: number, name: string) => {
    onChangeName(idx, name)
  }

  const handleChangeLocationAddress = (
    idx: number,
    params: { address: string; lat: number | null; lng: number | null }
  ) => {
    onChangeAddress(idx, params)
  }

  const handleChangeLocationMtr = (idx: number, mtr: string) => {
    onChangeMtr(idx, mtr)
  }

  const handleRemoveLocation = (idx: number) => {
    onRemove(idx)
  }

  const handleAddNewLocation = () => {
    onAdd()
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography typography={'h5'} sx={{ fontSize: '1.125rem' }}>
          Location
        </Typography>
        <Button
          variant='contained'
          size='small'
          sx={{
            p: 1,
            ml: 3,
            minWidth: 0,
            background: (theme) => theme.palette.primary.light,
            color: (theme) => theme.palette.primary.main,
            '&:hover': {
              color: '#ffffff',
            },
          }}
          onClick={handleAddNewLocation}
        >
          <Plus sx={{ fontSize: '16px' }} />
        </Button>
      </Box>
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={2}
        sx={{ mt: locations.length > 0 ? 2.5 : 0 }}
      >
        {locations.map((location, idx) => {
          const handleChangeAddress = (params: {
            address: string
            lat: number | null
            lng: number | null
          }) => {
            handleChangeLocationAddress(idx, params)
          }
          return (
            <Stack key={idx} flexDirection={'row'} alignItems={'flex-start'} gap={1}>
              <Stack flexGrow={1}>
                <Grid container spacing={{ lg: 2, xs: 1 }} alignItems={'flex-start'}>
                  <Grid item lg={6} xs={12}>
                    <Typography typography={'h5'} sx={{ mb: 0.75 }}>
                      Location Name {idx + 1}
                    </Typography>
                    <TextFieldWithLabel
                      showLabel={false}
                      size='small'
                      fullWidth
                      placeholder='Location Name'
                      name='locationName'
                      value={location.name}
                      onChange={(e) => handleChangeLocationName(idx, e.target.value)}
                      error={!!errors?.[idx]?.name}
                      helperText={errors?.[idx]?.name || ''}
                    />
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <GoogleAddress
                      onChange={handleChangeAddress}
                      error={!!errors?.[idx]?.address}
                      helperText={errors?.[idx]?.address || ''}
                    />
                  </Grid>
                  <Grid item lg={2} xs={12}>
                    <Typography typography={'h5'} sx={{ mb: 0.75 }}>
                      MTR
                    </Typography>
                    <TextFieldWithLabel
                      showLabel={false}
                      type='number'
                      size='small'
                      fullWidth
                      placeholder='MTR'
                      name='locationMTR'
                      value={location.mtr}
                      onChange={(e) => handleChangeLocationMtr(idx, e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Stack>
              <Stack>
                <IconButton sx={{ mt: 3.25 }} onClick={() => handleRemoveLocation(idx)}>
                  <DeleteOutlineIcon />
                </IconButton>
              </Stack>
            </Stack>
          )
        })}
      </Box>
    </Box>
  )
}

export default AuditProjectSiteCreateLocationItem
