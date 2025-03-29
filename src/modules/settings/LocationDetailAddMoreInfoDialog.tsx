import { FC, useState } from 'react'
import {
  Typography,
  DialogContent,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material'

import DialogWrapper from '../../modules/common/DialogWrapper'
import LocationDetailAddMoreInfoBuilding from './LocationDetailAddMoreInfoBuilding'
import LocationDetailAddMoreInfoLevel from './LocationDetailAddMoreInfoLevel'
import LocationDetailAddMoreInfoArea from './LocationDetailAddMoreInfoArea'
import LocationDetailAddMoreInfoUnit from './LocationDetailAddMoreInfoUnit'

const MORE_LIST = [
  { label: 'Add New Building', value: 'add-new-building' },
  { label: 'Add New Level', value: 'add-new-level' },
  { label: 'Add New Area', value: 'add-new-area' },
  { label: 'Add New Unit', value: 'add-new-unit' },
]

interface IProps {
  open: boolean
  onClose: () => void
  locationId?: number
}

const LocationDetailAddMoreInfoDialog: FC<IProps> = ({ onClose, open, locationId }) => {
  const [selectedType, setSelectedType] = useState<string>(MORE_LIST[0].value)

  const handleCloseBuilding = () => {
    onClose()
    setSelectedType(MORE_LIST[0].value)
  }

  return (
    <DialogWrapper
      label={'Add New Location'}
      onClose={handleCloseBuilding}
      open={open}
      maxWidth={'699px'}
    >
      <DialogContent sx={{ pt: 3.5, px: 5, pb: 3.5 }}>
        <FormControl>
          <RadioGroup
            aria-labelledby='location-add-group-label'
            value={selectedType}
            name='add-types'
            onChange={(e) => setSelectedType(e.target.value)}
            sx={{ gap: 3.5 }}
          >
            {MORE_LIST.map((item, idx) => {
              return (
                <FormControlLabel
                  key={`more-item-${idx}`}
                  value={item.value}
                  control={<Radio size='small' sx={{ p: 0, mr: 1.5 }} />}
                  label={
                    <Typography variant='h5' sx={{ fontSize: '1.125rem', color: 'grey.800' }}>
                      {item.label}
                    </Typography>
                  }
                />
              )
            })}
          </RadioGroup>
        </FormControl>
      </DialogContent>

      {selectedType === MORE_LIST[0].value && (
        <LocationDetailAddMoreInfoBuilding locationId={locationId} onClose={handleCloseBuilding} />
      )}
      {selectedType === MORE_LIST[1].value && (
        <LocationDetailAddMoreInfoLevel locationId={locationId} onClose={handleCloseBuilding} />
      )}
      {selectedType === MORE_LIST[2].value && (
        <LocationDetailAddMoreInfoArea locationId={locationId} onClose={handleCloseBuilding} />
      )}
      {selectedType === MORE_LIST[3].value && (
        <LocationDetailAddMoreInfoUnit locationId={locationId} onClose={handleCloseBuilding} />
      )}
    </DialogWrapper>
  )
}

export default LocationDetailAddMoreInfoDialog
