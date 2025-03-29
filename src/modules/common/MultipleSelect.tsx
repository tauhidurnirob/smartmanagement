import { FC, useState, useMemo, useRef } from 'react'
import { Box, Popover, Paper, Typography, Stack, SxProps } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'

import { ISelectItem } from '../../types/common'
import useFullscreen from '../../hooks/useFullscreen'

interface IProps {
  selectedItems: ISelectItem[]
  disabledItemValues?: number[] | string[]
  items: ISelectItem[]
  labelForAll: string
  onChange: (items: ISelectItem[]) => void
  sx?: SxProps
  sxBtn?: SxProps
  hiddenAllSelect?: boolean
  textColor?: string
  modalWidth?: string
  isSingleSelect?: boolean
}

const MultipleSelect: FC<IProps> = ({
  items,
  selectedItems,
  onChange,
  labelForAll,
  sx,
  sxBtn,
  hiddenAllSelect,
  disabledItemValues,
  textColor,
  modalWidth,
  isSingleSelect,
}) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const refContainer = useRef<HTMLDivElement | null>(null)
  const allSelect: ISelectItem = {
    label: labelForAll || 'All',
    value: null,
  }

  const { isFullscreen } = useFullscreen()

  const [open, setOpen] = useState(false)

  const selectedItemValues = useMemo(() => {
    return selectedItems.map((item) => item.value)
  }, [selectedItems])

  const handleToggleOpen = (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    event.stopPropagation()
    setOpen(!open)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSelect = (item: ISelectItem) => {
    if (item.value === null) {
      onChange([])
      return
    }
    const idx = selectedItems.findIndex((_item) => _item.value === item.value)
    const newLocations = [...selectedItems]
    if (idx >= 0) {
      newLocations.splice(idx, 1)
    } else {
      newLocations.push(item)
    }
    onChange(newLocations)
  }

  const handleSigleSelect = (item: ISelectItem) => {
    if (item.value === null) {
      onChange([])
    } else {
      onChange([item])
    }
  }

  return (
    <Box sx={{ ...(sx || {}) }} ref={refContainer}>
      <Box
        ref={ref}
        sx={{
          background: (theme) => theme.palette.grey[100],
          borderRadius: 1.5,
          p: '12px 35px 12px 16px',
          position: 'relative',
          minHeight: '40px',
          cursor: 'pointer',
          ...(sxBtn ?? {}),
        }}
        onClick={handleToggleOpen}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', rowGap: 0.65, columnGap: 2 }}>
          <Typography
            fontSize={'14px'}
            color={(theme) => textColor || theme.palette.grey[500]}
            fontWeight={700}
            sx={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              maxWidth: 'calc(100% - 24px)',
            }}
          >
            {selectedItems.length === 0
              ? labelForAll
              : selectedItems?.map((a) => a.label).join(', ')}
          </Typography>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: 'calc(50% - 8px)',
            right: 10,
            p: 0,
            color: (theme) => theme.palette.grey[600],
            fontSize: '12px',
          }}
        >
          {open ? (
            <ExpandLessIcon sx={{ fontSize: '16px' }} />
          ) : (
            <ExpandMoreIcon sx={{ fontSize: '16px' }} />
          )}
        </Box>
      </Box>
      <Popover
        open={open}
        anchorEl={ref.current}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        container={() => (isFullscreen ? refContainer.current : document.body)}
      >
        <Paper
          sx={{ py: 1.25, px: 1.5, minWidth: modalWidth || ref.current?.clientWidth || ' 100%' }}
        >
          <Stack
            sx={{
              mt: 1.5,
              width: '100%',
              maxHeight: '400px',
              overflowY: 'auto',
            }}
            gap={0.25}
          >
            {[...(hiddenAllSelect ? [] : [allSelect]), ...items].map((item, idx: any) => {
              const isSelected =
                (item.value === null && selectedItemValues.length === 0) ||
                selectedItemValues.includes(item.value)
              const disabledIndex = (disabledItemValues || ([] as number[] | string[])).findIndex(
                (i) => i === item.value
              )
              const disabled = !isSelected && disabledIndex !== -1
              return (
                <Box
                  key={idx}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 1,
                    pl: 2.75,
                    pr: 2.4,
                    cursor: disabled ? 'default' : 'pointer',
                    borderRadius: '5px',
                    width: '100%',
                    background: (theme) =>
                      disabled
                        ? theme.palette.action.disabledBackground
                        : isSelected
                        ? theme.palette.primary.light
                        : '#ffffff',
                    color: (theme) =>
                      disabled
                        ? theme.palette.grey[500]
                        : isSelected
                        ? theme.palette.primary.main
                        : theme.palette.grey[500],
                    '&:hover': {
                      background: (theme) =>
                        disabled
                          ? theme.palette.action.disabledBackground
                          : theme.palette.primary.light,
                      color: (theme) =>
                        disabled ? theme.palette.grey[500] : theme.palette.primary.dark,
                      '.wardname': {
                        color: (theme) =>
                          disabled ? theme.palette.grey[500] : theme.palette.primary.main,
                      },
                    },
                  }}
                  onClick={() =>
                    !disabled && (isSingleSelect ? handleSigleSelect(item) : handleSelect(item))
                  }
                >
                  <Typography
                    variant='subtitle1'
                    className='wardname'
                    sx={{
                      fontWeight: 700,
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      maxWidth: 'calc(100% - 24px)',
                      color: 'inherit',
                    }}
                  >
                    {item.label}
                  </Typography>
                  {!disabled && isSelected && (
                    <CheckRoundedIcon
                      sx={{ color: (theme) => theme.palette.primary.main, fontSize: 20 }}
                    />
                  )}
                </Box>
              )
            })}
          </Stack>
        </Paper>
      </Popover>
    </Box>
  )
}

export default MultipleSelect
