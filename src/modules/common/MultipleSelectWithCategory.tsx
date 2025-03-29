import { FC, useState, useMemo, useRef } from 'react'
import { Box, Popover, Paper, Typography, Stack, SxProps } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'

import { ISelectItemWithCategory } from '../../types/common'
import useFullscreen from '../../hooks/useFullscreen'
import deepCopy from '../../helpers/deepCopy'

interface IItemWithCategory {
  isCategory: boolean
  item: ISelectItemWithCategory | null
  categoryName: string
}

interface IProps {
  selectedItems: ISelectItemWithCategory[]
  disabledItemValues?: number[] | string[]
  items: ISelectItemWithCategory[]
  labelForAll: string
  onChange: (items: ISelectItemWithCategory[]) => void
  sx?: SxProps
  sxBtn?: SxProps
  hiddenAllSelect?: boolean
  isSingleSelect?: boolean
  textColor?: string
}

const MultipleSelectWithCategory: FC<IProps> = ({
  items,
  selectedItems,
  onChange,
  labelForAll,
  sx,
  sxBtn,
  hiddenAllSelect,
  disabledItemValues,
  textColor,
  isSingleSelect,
}) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const refContainer = useRef<HTMLDivElement | null>(null)
  const allSelect: IItemWithCategory = {
    isCategory: false,
    item: {
      label: labelForAll || 'All',
      value: null,
      category: '',
    },
    categoryName: '',
  } as IItemWithCategory

  const { isFullscreen } = useFullscreen()

  const [open, setOpen] = useState(false)

  const selectedItemValues = useMemo(() => {
    return selectedItems.map((item) => item.value)
  }, [selectedItems])

  const itemList = useMemo(() => {
    const itemCategoryMap: { [key: string]: ISelectItemWithCategory[] } = {}
    for (const item of items) {
      const { category: categoryName } = item
      if (categoryName) {
        if (!itemCategoryMap[categoryName]) {
          itemCategoryMap[categoryName] = []
        }
        itemCategoryMap[categoryName].push(item)
      }
    }

    const itemList: IItemWithCategory[] = []
    for (const categoryName of Object.keys(itemCategoryMap)) {
      itemList.push({ isCategory: true, item: null, categoryName })
      for (const item of itemCategoryMap[categoryName]) {
        itemList.push({ isCategory: false, item: item, categoryName })
      }
    }

    return itemList
  }, [items])

  const handleToggleOpen = (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    event.stopPropagation()
    setOpen(!open)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSelect = (item: ISelectItemWithCategory) => {
    if (item.value === null) {
      onChange([])
      return
    }

    if (isSingleSelect) {
      onChange([deepCopy(item)])
    } else {
      const idx = selectedItems.findIndex((_item) => _item.value === item.value)
      const newLocations = [...selectedItems]
      if (idx >= 0) {
        newLocations.splice(idx, 1)
      } else {
        newLocations.push(item)
      }
      onChange(newLocations)
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
            color={(theme) =>
              selectedItems.length === 0
                ? theme.palette.grey[500]
                : textColor || theme.palette.grey[500]
            }
            fontWeight={700}
            lineHeight='16px'
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
        <Paper sx={{ py: 1.25, px: 1.5, minWidth: ref.current?.clientWidth || ' 100%' }}>
          <Stack
            sx={{
              mt: 1.5,
              width: '100%',
              maxHeight: '400px',
              overflowY: 'auto',
            }}
            gap={0.25}
          >
            {[...(hiddenAllSelect ? [] : [allSelect]), ...itemList].map(
              (itemWithCategory, idx: any) => {
                const { isCategory, item, categoryName } = itemWithCategory
                const isAll = isCategory === false && item !== null && item.value === null
                const isSelected =
                  isCategory === false &&
                  item !== null &&
                  ((item?.value === null && selectedItemValues.length === 0) ||
                    selectedItemValues.includes(item.value))
                const disabledIndex = (disabledItemValues || ([] as number[] | string[])).findIndex(
                  (i) => item && i === item.value
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
                      pl: 1,
                      pr: 1,
                      cursor: disabled || isCategory ? 'default' : 'pointer',
                      borderRadius: '5px',
                      width: isCategory || isAll ? '100%' : 'calc(100% - 20px)',
                      ml: isCategory || isAll ? 0 : '20px',
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
                      ...(!isCategory
                        ? {
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
                          }
                        : {}),
                    }}
                    onClick={() => !disabled && item && handleSelect(item)}
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
                      {isCategory ? categoryName : item?.label || '-'}
                    </Typography>
                    {!disabled && isSelected && !isSingleSelect && (
                      <CheckRoundedIcon
                        sx={{ color: (theme) => theme.palette.primary.main, fontSize: 20 }}
                      />
                    )}
                  </Box>
                )
              }
            )}
          </Stack>
        </Paper>
      </Popover>
    </Box>
  )
}

export default MultipleSelectWithCategory
