import { Box, Card, Divider, Stack, TableSortLabel, Typography } from "@mui/material"
import useInfiniteScroll from "react-infinite-scroll-hook"
import BackDrop from "../../common/BackDrop"
import { useEffect, useMemo, useState } from "react"
import Api from "../../../api"
import { IDirection } from "../../../types/common"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { _getAuditInsightState } from "../../../store/_selectors"
import dayjs from "dayjs"


const AuditInsightLocationPerformance = () => {
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [isLoading, setIsLoading] = useState(false)
  const [items, setItems] = useState<any[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [orderDir, setOrderDir] = useState<IDirection>('asc')
  const [orderBy, setOrderBy] = useState('name')

  const [getlocations, {isLoading: locationsLoading}] = Api.useGetAuditInsightAvgPerformanceLocationsMutation()
  const state = _getAuditInsightState()

  const { totalPages, hasNextPage } = useMemo(() => {
    const totalPages = Math.ceil(totalCount / limit)

    return {
      totalPages,
      hasNextPage: page < totalPages,
    }
  }, [totalCount, page])

  const startDate = dayjs(state.startDate).startOf('day').toISOString();
  const endDate = dayjs(state.endDate).endOf('day').toISOString()

  const loadData = (page: number, limit: number, orderBy: string, orderDir: IDirection, startDate: string, endDate: string) => {
    setIsLoading(true)
    getlocations({page, limit, orderBy, orderDir, startDate, endDate})
      .unwrap()
      .then((res) => {
        setPage(page)
        setTotalCount(res.count)
        if (page > 1) {
          setItems([...items, ...res.rows])
        } else {
          setItems(res.rows)
        }
      })
      .catch((_err) => {
        setItems([])
        setTotalCount(0)
        setPage(0)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const loadMore = () => {
    const nextPage = Math.min(totalPages, page + 1)
    loadData(nextPage, limit, orderBy, orderDir, startDate, endDate)
  }

  const [sentryRef, {rootRef}] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: loadMore,
    rootMargin: '0px 0px 10px 0px',
  })

  useEffect(() => {
    loadData(1, limit, orderBy, orderDir, startDate, endDate)
  }, [orderDir, startDate, endDate])

  return (
    <Card sx={{ p: 0, width: '100%', height: '100%' }}>
      <Box sx={{ px: 2, pt: 3, pb: 2 }}>
        <Typography
          variant='h4'
          sx={{ textAlign: 'center', color: (theme) => theme.palette.grey[700] }}
        >
          Average Performance
        </Typography>
      </Box>
      <Divider light />
      <Stack direction={'column'}>
        <Stack direction={'row'} justifyContent={'space-between'} sx={{ pt: 2, pb: 0.5, px: 5 }}>
          <TableSortLabel
            active={orderBy === 'name'}
            direction={orderDir}
            onClick={() => {
              setOrderDir(orderDir === 'asc' ? 'desc' : 'asc')
              setOrderBy('name')
            }}
            IconComponent={ExpandMoreIcon}
            sx={{
              '&.Mui-active': {
                fontSize: 14,
                fontWeight: 600,
                color: (theme) => theme.palette.grey[500]
              }
            }}
          >
            LOCATION
          </TableSortLabel>
          <TableSortLabel
            active={orderBy === 'performance'}
            direction={orderDir}
            onClick={() => {
              setOrderDir(orderDir === 'asc' ? 'desc' : 'asc')
              setOrderBy('performance')
            }}
            IconComponent={ExpandMoreIcon}
            sx={{
              '&.Mui-active': {
                fontSize: 14,
                fontWeight: 600,
                color: (theme) => theme.palette.grey[500]
              }
            }}
            disabled={locationsLoading}
          >
            AVG PERFORMANCE %
          </TableSortLabel>
        </Stack>
        <Divider light sx={{ mb: 1 }} />
        <Box
          ref={rootRef}
          sx={{
            py: 0.5,
            pl: 5,
            pr: 3,
            maxHeight: '400px',
            overflowY: 'auto',
            position: 'relative',
          }}
        >
          {items?.map((item, idx) => {
            return (
              <Stack
                key={idx}
                direction={'row'}
                justifyContent={'space-between'}
                sx={{
                  py: 1,
                  alignItems: 'center',
                  '&:not(&:last-of-type)': {
                    borderBottom: '1px dashed rgba(218, 218, 218, 0.3)',
                  },
                }}
              >
                <Typography
                  variant='subtitle1'
                  sx={{ fontWeight: 700, color: (theme) => theme.palette.grey[800] }}
                >
                  {item.location.name}
                </Typography>
                <Box
                  sx={{
                    width: '88px',
                    background: (theme) => theme.palette.success.light,
                    borderRadius: '20px',
                    py: 0.75,
                    px: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    variant='caption'
                    sx={{
                      fontWeight: 700,
                      lineHeight: '14px',
                      color: (theme) => theme.palette.success.main,
                    }}
                  >
                    {item.avgPerformance}
                  </Typography>
                </Box>
              </Stack>
            )
          })}
          {(isLoading || hasNextPage || locationsLoading) && (
            <Box sx={{ position: 'relative', minHeight: '40px', mt: 1 }} ref={sentryRef}>
              <BackDrop size='20px' />
            </Box>
          )}
        </Box>
      </Stack>
    </Card>
  )
}

export default AuditInsightLocationPerformance