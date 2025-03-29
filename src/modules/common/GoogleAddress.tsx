import { FC, useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { usePlacesWidget } from 'react-google-autocomplete'

import TextFieldWithLabel from './TextFieldWithLabel'

import { GOOGLE_MAP_API } from '../../helpers/constants'

interface IParams {
  address: string
  lat: number | null
  lng: number | null
}

interface IProps {
  error?: boolean
  helperText?: string
  onChange: (params: IParams) => void
  hiddenLabel?: boolean
}

const GoogleAddress: FC<IProps> = ({ error, helperText, onChange, hiddenLabel }) => {
  const [address, setAddress] = useState<string>('')
  const [params, setParams] = useState<IParams>({ address: '', lat: null, lng: null })

  const { ref } = usePlacesWidget<HTMLInputElement>({
    apiKey: GOOGLE_MAP_API,
    options: {
      types: [],
      componentRestrictions: undefined,
      strictBounds: undefined,
    },
    onPlaceSelected: (place) => {
      if (!place.geometry) {
        console.log('Failed to read geometry: ', place)
      }
      const location = place.geometry?.location
      const params = {
        address: place.formatted_address || '',
        lat: location ? location.lat() : 0,
        lng: location ? location.lng() : 0,
      }
      setParams(params)
      setAddress(params.address)
    },
  })

  const handleChangeAddress = (addr: string) => {
    setAddress(addr)
    const params = {
      address: '',
      lat: null,
      lng: null,
    }
    setParams(params)
  }

  useEffect(() => {
    onChange(params)
  }, [params])

  return (
    <Box>
      {!hiddenLabel && (
        <Typography typography={'h5'} sx={{ mb: 0.75 }}>
          Address
        </Typography>
      )}
      <TextFieldWithLabel
        refInput={ref}
        showLabel={false}
        size='small'
        fullWidth
        placeholder='Address'
        name='locationAddress'
        value={address}
        onChange={(e) => handleChangeAddress(e.target.value)}
        error={error}
        helperText={helperText}
      />
    </Box>
  )
}

export default GoogleAddress
