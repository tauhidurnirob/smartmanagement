import { FC, useEffect, useState, useMemo } from 'react'
import { Box, Card, Divider, Typography, Button, IconButton } from '@mui/material'

import { ITableHeadCell, OrderDirection, TableData, TableDataFieldName } from '../../types/common'

import EnhancedTable from '../common/EnhancedTable'
import DeleteDialog from '../common/DeleteDialog'
import { ROW_PER_PAGE_OPTIONS } from '../../helpers/constants'
import { CloseCrossCircle } from '../../assets/icons/close-cross-circle'
import LevelDetailDialog from './LevelDetailDialog'
import Api from '../../api'
import { ILevel } from '../../api/models'
import { toast } from 'react-toastify'

interface IProps {
  locationId?: number
  projectId: number
}

const FloorPlanList: FC<IProps> = ({ locationId, projectId }) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(ROW_PER_PAGE_OPTIONS[0])
  const [orderDir, setOrderDir] = useState<OrderDirection>('asc')
  const [orderBy, setOrderBy] = useState<keyof ILevel>('name')
  const [selectedLevel, setSelectedLevel] = useState<ILevel | null>(null)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const [updateLevel] = Api.useUpdateLevelMutation()
  const [batchDeleteLevels] = Api.useBatchDeleteLevelsMutation()

  const locationIds = useMemo(() => {
    if (typeof locationId === 'number') {
      return [locationId]
    }

    return []
  }, [locationId])

  const handleSelect = (selected: number[]) => {
    setSelectedIds(selected)
  }

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: TableDataFieldName) => {
    const isAsc = orderBy === property && orderDir === 'asc'
    setOrderDir(isAsc ? 'desc' : 'asc')
    setOrderBy(property as keyof ILevel)
  }

  const handleView = (level: ILevel) => {
    setSelectedLevel(level)
  }

  const handleCloseLevelDetail = () => {
    setSelectedLevel(null)
  }

  const handleDeleteSelected = () => {
    batchDeleteLevels(selectedIds)
      .then(() => {
        toast.success('Levels have been deleted')
        setOpenDeleteModal(false)
      })
      .catch((err) => {
        console.log('Failed to delete levels: ', err)
        toast.error('Failed to delete levels')
      })
  }

  const handleRemoveFloor = (item: ILevel) => {
    updateLevel({
      id: item.id,
      floorPlanImgUrl: '',
    })
      .unwrap()
      .catch((err) => {
        console.log('Failed to remove floor plan: ', err)
      })
  }

  const { data, isLoading, refetch, isUninitialized } = Api.useGetLevelListQuery({
    page,
    limit,
    orderDir,
    orderBy,
    projectIds: [projectId],
    locationIds: locationIds,
  })

  useEffect(() => {
    if (!isUninitialized) {
      refetch()
    }
  }, [])

  const headCells: ITableHeadCell[] = [
    {
      id: '',
      name: 'Building',
      render: (item: TableData) => {
        const { building } = item as ILevel
        return building?.name || '-'
      },
    },
    {
      id: '',
      name: 'Level',
      render: (item: TableData) => {
        const { name } = item as ILevel
        return name || '-'
      },
    },
    {
      id: '',
      name: 'Remark',
      render: (item: TableData) => {
        const { remark } = item as ILevel
        return remark || '-'
      },
    },
    {
      id: '',
      name: 'Upload',
      render: (item: TableData) => {
        const { floorPlanImgUrl } = item as ILevel
        if (!floorPlanImgUrl) return null
        return (
          <Box
            sx={{
              width: 50,
              height: 45,
              borderRadius: 2.5,
              backgroundColor: '#fff',
              boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.25)',
              position: 'relative',
            }}
          >
            <img
              src={floorPlanImgUrl}
              alt='Uploaded'
              style={{
                borderRadius: 2.5,
                width: '100%',
                height: '100px',
                objectFit: 'contain',
                maxWidth: '100%',
                maxHeight: '100%',
              }}
            />
            <IconButton
              sx={{ position: 'absolute', top: -5, right: -9, p: 0 }}
              onClick={() => handleRemoveFloor(item as ILevel)}
            >
              <CloseCrossCircle sx={{ color: 'error.main', fontSize: 18 }} />
            </IconButton>
          </Box>
        )
      },
    },
    {
      id: '',
      name: 'Action',
      render: (item: TableData) => {
        const data = item as ILevel
        return (
          <Button
            variant='contained'
            sx={{
              background: (theme) => theme.palette.grey[100],
              color: (theme) => theme.palette.grey[500],
              '&:hover': { background: (theme) => theme.palette.grey[200] },
            }}
            disableElevation
            onClick={() => handleView(data)}
          >
            View
          </Button>
        )
      },
    },
  ]

  return (
    <Box>
      <Card sx={{ display: 'flex', flexDirection: 'column', mt: 3.75 }}>
        <Box sx={{ pl: 3.75, pr: 3, pt: 3.75, pb: 3 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant='h3'>{'Floor Plan'}</Typography>

            {selectedIds.length > 0 && (
              <Button
                variant='contained'
                color='error'
                onClick={() => setOpenDeleteModal(true)}
                size='small'
              >
                Delete Selected
              </Button>
            )}
          </Box>
        </Box>
        <Divider light />
        <Box mt={2.75}>
          <EnhancedTable
            loading={isLoading}
            totalCount={data?.count || 0}
            data={data?.rows || []}
            page={page}
            rowsPerPage={limit}
            onPageChange={(p) => setPage(p)}
            onRowsPerPageChange={(l) => setLimit(l)}
            order={orderDir}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            headCells={headCells}
            hasCheckbox={true}
            selected={selectedIds}
            onSelect={handleSelect}
            onSelectIdFieldName={'id'}
          />
        </Box>
      </Card>
      <DeleteDialog
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        heading={
          <span style={{ letterSpacing: '-0.055em' }}>
            Are you sure you want to delete the selected level(s)?
          </span>
        }
        subHeading={
          <span>
            This action cannot be undone, <br />
            so please be sure before proceeding.
          </span>
        }
        onDelete={() => handleDeleteSelected()}
        onGoBack={() => setOpenDeleteModal(false)}
        loading={false}
      />
      <LevelDetailDialog level={selectedLevel} onClose={handleCloseLevelDetail} />
    </Box>
  )
}

export default FloorPlanList
