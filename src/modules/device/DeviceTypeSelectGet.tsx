import { FC, useState, useMemo, useRef, useEffect, MouseEvent } from 'react'
import { Box, Popover, Paper, Typography, Stack, Grid, IconButton, SxProps } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'

import SearchField from '../common/SearchField'
import BackDrop from '../common/BackDrop'
import useDebounce from '../../hooks/useDebounce'
import {
  ISelectItem,
  ISelectItemWithCategory,
  ISelectList,
  ISelectListWithCategory,
} from '../../types/common'
import { CloseCrossCircle } from '../../assets/icons/close-cross-circle'
import useFullscreen from '../../hooks/useFullscreen'
import Api from '../../api'

interface IItemWithCategoryOption {
  categoryName: string
  items: ISelectItem[]
  categoryItem?: ISelectItem
}

interface IProps {
  selectedItems: ISelectItem[]
  limit: number
  labelForAll: string
  allowRemoval?: boolean
  allowAllSelect?: boolean
  selectStyle?: SxProps
  onChange: (items: ISelectItem[], data?: any) => void
  onLoad?: (
    page: number,
    limit: number,
    search: string
  ) => Promise<ISelectList | ISelectListWithCategory>
  dependencyIds?: number[]
  textColor?: string
  disabled?: boolean
  queryApiKey: 'useGetDeviceTypeQuery' | 'useGetDeviceListQuery'
  queryFilters?: any
  onParseItem: (item: any) => ISelectItem | ISelectItemWithCategory
  selectableCategory?: boolean
  disableSearch?: boolean

  // TODO: Remove later
  tmpData?: any[]
}

interface ISelectItemProps {
  isSelected: boolean
  item: ISelectItem
  handleSelect: (item: ISelectItem) => void
  isSingleSelect: boolean
  sx?: SxProps
}
const SelectItem: FC<ISelectItemProps> = ({
  isSelected,
  item,
  handleSelect,
  isSingleSelect,
  sx,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        py: 1,
        pl: 2.75,
        pr: 2.4,
        cursor: 'pointer',
        borderRadius: '5px',
        width: '100%',
        background: (theme) => (isSelected ? theme.palette.primary.light : '#ffffff'),
        color: (theme) => (isSelected ? theme.palette.primary.main : theme.palette.grey[500]),
        '&:hover': {
          background: (theme) => theme.palette.primary.light,
          color: (theme) => theme.palette.primary.dark,
          '.wardname': {
            color: (theme) => theme.palette.primary.main,
          },
        },
        ...(sx || {}),
      }}
      onClick={() => handleSelect(item)}
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
      {!isSingleSelect && isSelected && (
        <CheckRoundedIcon sx={{ color: (theme) => theme.palette.primary.main, fontSize: 20 }} />
      )}
    </Box>
  )
}

const DeviceTypeSelect: FC<IProps> = ({
  selectedItems,
  limit = 10,
  onChange,
  allowRemoval,
  allowAllSelect = true,
  selectStyle,
  dependencyIds,
  textColor,
  disabled,
  queryFilters,
  queryApiKey,
  onParseItem,
  selectableCategory,
  labelForAll,
  tmpData,
  disableSearch,
}) => {
  const { isFullscreen } = useFullscreen()

  const ref = useRef<HTMLDivElement | null>(null)
  const refContainer = useRef<HTMLDivElement | null>(null)
  const allSelect: ISelectItem = {
    label: labelForAll || 'All',
    value: null,
  }

  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [items, setItems] = useState<ISelectItem[] | ISelectItemWithCategory[]>([])
  const [search, setSearch] = useState<string>('')

  const [itemsWithCategory, setItemsWithCategory] = useState<IItemWithCategoryOption[]>([])

  const debouncedText = useDebounce(search, 500)

  let data: any = undefined
  let isLoading: any = undefined
  if (queryApiKey) {
    const { data: queryData, isFetching }: any = Api[queryApiKey]({
      page,
      limit,
      text: debouncedText,
      ...(queryFilters || {}),
    })
    data = queryData
    isLoading = isFetching
  }

  const { totalCount } = useMemo(() => {
    const totalCount = tmpData && tmpData.length > 0 ? tmpData.length : data?.count || 0

    return { totalCount }
  }, [data, tmpData])

  const { totalPages, hasNextPage } = useMemo(() => {
    const totalPages = Math.ceil(totalCount / limit)

    return {
      totalPages,
      hasNextPage: page < totalPages,
    }
  }, [totalCount, page])

  const selectedItemValues = useMemo(() => {
    return selectedItems.filter((item) => !item.isCategory).map((item) => item.value)
  }, [selectedItems])

  const selectedCatItemValues = useMemo(() => {
    return selectedItems.filter((item) => item.isCategory).map((item) => item.value)
  }, [selectedItems])

  const strDependencyIds = useMemo(() => {
    return dependencyIds?.join(',')
  }, [dependencyIds])

  const loadMore = () => {
    const nextPage = Math.min(totalPages, page + 1)
    setPage(nextPage)
  }

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: loadMore,
    rootMargin: '0px 0px 10px 0px',
  })

  const handleToggleOpen = (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    event.stopPropagation()

    if (!disabled) {
      setOpen(!open)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    setPage(1)
  }

  const handleSelect = (item: ISelectItem, categoryItem?: ISelectItem) => {
    if (item.value === null) {
      onChange([])
      return
    }
    onChange([{ ...item }], data)
    setOpen(false)
  }

  const handleSelectCat = (item: ISelectItem, items: ISelectItem[]) => {
    if (item.value === null) {
      onChange([])
      return
    }
    onChange([{ ...item }])
    setOpen(false)
  }

  useEffect(() => {
    if (tmpData && tmpData.length > 0) {
      let newItems = tmpData.map((item: any) => onParseItem(item))

      if (search) {
        newItems = newItems.filter((item) =>
          item.label.toLowerCase().includes(search.toLowerCase().trim())
        )
      }
      setItems(newItems)
    } else {
      const newItems = (data?.rows || data || []).map((item: any) => onParseItem(item))
      const updatedItems = [...items]
      if (page > 1) {
        updatedItems.splice((page - 1) * limit, limit, ...newItems)
      } else {
        updatedItems.splice(0, items.length, ...newItems)
      }
      setItems(updatedItems)
    }
  }, [data, tmpData, search])

  useEffect(() => {
    setPage(1)
  }, [strDependencyIds])

  // Handle category
  useEffect(() => {
    const categoriesWithItems: IItemWithCategoryOption[] = []
    for (const item of items) {
      const { category, categoryItem } = item as ISelectItemWithCategory

      const existingCategory = categoriesWithItems.find(
        (categoryObj: any) => categoryObj.categoryName === category
      )

      if (existingCategory) {
        existingCategory.items.push({ ...item, categoryItem })
      } else {
        const newCategory = {
          categoryName: category,
          items: [{ ...item, categoryItem }],
          categoryItem,
        }
        categoriesWithItems.push(newCategory)
      }
    }
    setItemsWithCategory(categoriesWithItems)
  }, [items])

  return (
    <Box ref={refContainer}>
      <Box
        ref={ref}
        sx={{
          bgcolor: 'grey.100',
          borderRadius: 1.5,
          p: '12px 35px 12px 16px',
          position: 'relative',
          minHeight: '40px',
          cursor: disabled ? 'default' : 'pointer',
          ...(selectStyle ?? {}),
        }}
        onClick={handleToggleOpen}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', rowGap: 0.65, columnGap: 2 }}>
          {allowRemoval && selectedItems.length > 0 ? (
            <Grid container spacing={2} flexWrap={'wrap'}>
              {selectedItems.map((item, index) => {
                const handleRemove = (event: MouseEvent<HTMLButtonElement>) => {
                  event.stopPropagation()
                  handleSelect(item)
                }
                return (
                  <Grid key={index} item xs={'auto'}>
                    <Box
                      sx={{
                        position: 'relative',
                        bgcolor: 'primary.light',
                        borderRadius: '20px',
                        py: 1,
                        px: 3,
                      }}
                    >
                      <Typography
                        fontSize={14}
                        color={(!!selectedItems.length && textColor) || 'grey.500'}
                        fontWeight={700}
                        sx={{ lineHeight: 1.143 }}
                      >
                        {item.label}
                      </Typography>
                      <IconButton
                        sx={{ position: 'absolute', top: -5, right: -9, p: 0 }}
                        onClick={handleRemove}
                      >
                        <CloseCrossCircle sx={{ color: 'error.main' }} />
                      </IconButton>
                    </Box>
                  </Grid>
                )
              })}
            </Grid>
          ) : (
            <Typography
              fontSize={14}
              color={(!!selectedItems.length && textColor) || 'grey.500'}
              fontWeight={700}
              sx={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                maxWidth: 'calc(100% - 24px)',
                lineHeight: 1.143,
              }}
            >
              {selectedItems.length === 0
                ? labelForAll
                : selectedItems?.map((a) => a.label).join(', ')}
            </Typography>
          )}
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
          vertical: 'center',
          horizontal: 'center',
        }}
        container={() => (isFullscreen ? refContainer.current : document.body)}
      >
        <Paper sx={{ py: 1.25, px: 1.5, minWidth: ref.current?.clientWidth || ' 100%' }}>
          {!disableSearch && (
            <SearchField
              value={search}
              onChange={handleChangeSearch}
              placeholder='Search...'
              sx={{
                border: '1px solid rgba(0, 0, 0, 0.2)',
                borderRadius: '6px',
                p: '10px 4px',
              }}
            />
          )}
          <Stack
            sx={{
              mt: 1.5,
              width: '100%',
              maxHeight: '400px',
              overflowY: 'auto',
            }}
            gap={0.25}
          >
            {items.length > 0 && (
              <>
                <>
                  {allowAllSelect && (
                    <SelectItem
                      isSingleSelect={true}
                      isSelected={
                        allSelect.value === null &&
                        selectedItemValues.length === 0 &&
                        selectedCatItemValues.length === 0
                      }
                      item={allSelect}
                      handleSelect={handleSelect}
                      sx={{ pl: 1.5 }}
                    />
                  )}
                  {itemsWithCategory.map((itemCat, idx) => {
                    const isSelectedCat =
                      !!itemCat.categoryItem?.value &&
                      selectedCatItemValues.includes(itemCat.categoryItem?.value)
                    const { categoryItem, items: catItems } = itemCat
                    return (
                      <Box key={`cat-${idx}`}>
                        {selectableCategory && categoryItem ? (
                          <SelectItem
                            isSingleSelect={true}
                            isSelected={isSelectedCat}
                            item={categoryItem}
                            handleSelect={(e) => handleSelectCat(e, catItems)}
                            sx={{ pl: 1.5 }}
                          />
                        ) : (
                          <Typography
                            variant='subtitle1'
                            sx={{
                              fontWeight: 700,
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                              maxWidth: 'calc(100% - 24px)',
                              color: 'text.secondary',
                              textTransform: 'uppercase',
                            }}
                          >
                            {itemCat.categoryName}
                          </Typography>
                        )}
                        {itemCat?.items?.map((item) => {
                          const isSelected =
                            (item.value === null && selectedItemValues.length === 0) ||
                            selectedItemValues.includes(item.value)
                          return (
                            <SelectItem
                              key={item.value}
                              isSingleSelect={true}
                              isSelected={isSelected}
                              item={item}
                              handleSelect={(e) => {
                                handleSelect(e, categoryItem)
                              }}
                            />
                          )
                        })}
                      </Box>
                    )
                  })}
                </>
              </>
            )}
            {!isLoading && !items.length && (
              <Typography
                variant='subtitle2'
                color='text.secondary'
                sx={{ fontWeight: 700, textAlign: 'center' }}
              >
                No available records
              </Typography>
            )}
            {(isLoading || hasNextPage) && (
              <Box sx={{ position: 'relative', minHeight: '40px', mt: 1 }} ref={sentryRef}>
                <BackDrop size='20px' />
              </Box>
            )}
          </Stack>
        </Paper>
      </Popover>
    </Box>
  )
}

export default DeviceTypeSelect
