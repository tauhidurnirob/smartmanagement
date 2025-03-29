import { FC } from 'react'
import { Card, Grid, Stack, Box, Typography, Divider, Button } from '@mui/material'
import { IWashroomOverviewListItem } from '../../types/washroom'
import { ChevronUpDuotoneIcon } from '../../assets/icons/chevron-up-duotone'
import WashroomOverviewListItem from './WashroomOverviewListItem'

interface IProps {
  items: IWashroomOverviewListItem[]
}

const WashroomOverviewList: FC<IProps> = ({ items }) => {
  console.log('items: ', items);
  if (!items || items.length === 0) {
    return (
      <Typography
        variant='body1'
        color='text.secondary'
        sx={{ fontWeight: 700, textAlign: 'center', mt: 5 }}
      >
        No available records
      </Typography>
    )
  }

  return (
    <Stack direction={'column'} rowGap={2}>
      {items.map((item, idx) => {
        return <WashroomOverviewListItem key={`washroom-item-${idx}`} item={item} />
      })}
    </Stack>
  )
}

export default WashroomOverviewList
