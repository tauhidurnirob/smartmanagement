import { Box, Button, IconButton, Stack, Typography } from '@mui/material'
import { FC } from 'react'
import { SvgIconComponent } from '@mui/icons-material'
import { FEEDBACK_INBOX_TABS } from '../../../helpers/constants'
import { IFeedbackInboxTab } from '../../../types/feedback'
import AddIcon from '@mui/icons-material/Add'
import { SettingsLightIcon } from '../../../assets/icons/settings-light'
import LabelIcon from '@mui/icons-material/Label'
import { ISelectItem } from '../../../types/common'

interface ITabProps {
  tab: IFeedbackInboxTab
  selected: boolean
  handleClick: () => void
}
const InboxTab: FC<ITabProps> = ({ tab, selected, handleClick }) => {
  const Icon = tab.icon as SvgIconComponent
  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      py={1}
      px={2}
      mb={1}
      gap={2}
      sx={{
        borderRadius: '6px',
        background: selected ? (theme) => theme.palette.grey[100] : null,
        '&:hover': {
          background: (theme) => theme.palette.grey[100],
          '& .MuiSvgIcon-root': { color: 'primary.main' },
          '& .MuiTypography-root': { color: 'primary.main' },
        },
        cursor: 'pointer',
      }}
      onClick={handleClick}
    >
      <Icon sx={{ color: selected ? 'primary.main' : (theme) => theme.palette.grey[500] }} />
      <Typography variant='h4' fontSize={'13px'} color={selected ? 'primary.main' : ''}>
        {tab.label}
      </Typography>
    </Stack>
  )
}

interface IProps {
  inboxType: string
  setInboxType: (value: string) => void
  labels: ISelectItem[]
  onAddClick: () => void
  onSettingsClick: () => void
}

const FeedbackInboxSidebar: FC<IProps> = ({
  inboxType,
  setInboxType,
  labels,
  onAddClick,
  onSettingsClick,
}) => {
  return (
    <Box borderRight={(theme) => `1px solid ${theme.palette.divider}`} p={2}>
      <Box>
        {FEEDBACK_INBOX_TABS?.map((tab) => {
          return (
            <InboxTab
              key={tab.value}
              tab={tab}
              selected={inboxType === tab.value}
              handleClick={() => setInboxType(tab.value)}
            />
          )
        })}
        <Stack direction={'row'} justifyContent={'space-between'} py={1} pl={2} gap={2}>
          <Stack direction={'row'} alignItems={'center'} gap={2}>
            <IconButton onClick={onAddClick}>
              <AddIcon sx={{ color: (theme) => theme.palette.grey[500] }} />
            </IconButton>
            <Typography variant='h4' fontSize={'13px'}>
              Labels
            </Typography>
          </Stack>
          <IconButton onClick={onSettingsClick}>
            <SettingsLightIcon sx={{ color: (theme) => theme.palette.grey[500] }} />
          </IconButton>
        </Stack>
        <Stack px={2.5} gap={2} my={2}>
          {labels?.map((label) => {
            return (
              <Stack direction={'row'} alignItems={'center'} gap={2} key={label.value}>
                <LabelIcon fontSize='small' sx={{ color: (theme) => theme.palette.grey[500] }} />
                <Typography>{label.label}</Typography>
              </Stack>
            )
          })}
        </Stack>
      </Box>
    </Box>
  )
}

export default FeedbackInboxSidebar
