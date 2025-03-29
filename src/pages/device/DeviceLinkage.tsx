import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { ITableHeadCell, TableData, TableDataFieldName } from '../../types/common'
import { IDeviceLinkageListFilters, IDeviceLinkageConditionItem } from '../../types/device'
import ListOptionButton from '../../modules/common/ListOptionButton'
import EnhancedTable from '../../modules/common/EnhancedTable'
import { BlockScene } from '../../assets/icons/block-scene'
import DeviceLinkageListFilterbar from '../../modules/device/DeviceLinkageListFilterbar'
import getDeviceLinkageConditionStatusInfo from '../../helpers/getDeviceLinkageConditionStatusInfo'
import { IDeviceLinkage, IDeviceLinkageMap, IReqDeviceLinkageMapCreate } from '../../api/models'
import Api from '../../api'
import { _getDeviceLinkageList } from '../../store/_selectors'
import _actions from '../../store/_actions'
import useDebounce from '../../hooks/useDebounce'
import DeleteDialog from '../../modules/common/DeleteDialog'
import { EDeviceLinkageControlType, EDeviceLinkageType,ROLE_PERMISSION_KEYS } from '../../helpers/constants'
import useAuth from '../../hooks/useAuth'
const DeviceLinkageItem = ({ cond }: { cond: IDeviceLinkageMap }) => {
  const { strCondDevices, statusInfo } = useMemo(() => {
    const { isAll, isOn, deviceLinkageDetails, deviceType } = cond

    const typeName = deviceType?.deviceType
    const typeId = deviceType?.id
    const statusInfo = getDeviceLinkageConditionStatusInfo(
      isOn ? EDeviceLinkageControlType.On : EDeviceLinkageControlType.Off
    )
    const deviceList: { [key: string]: { typeName: string; identificationNo: string }[] } = {}

    for (const detail of deviceLinkageDetails || []) {
      const { identificationNo } = detail.device || {}
      if (typeId && typeName) {
        if (typeof deviceList[typeId] === 'undefined') {
          deviceList[typeId] = []
        }
        deviceList[typeId].push({ typeName: typeName, identificationNo: identificationNo || '-' })
      }
    }

    const deviceNames = []
    for (const typeId of Object.keys(deviceList)) {
      const strDeviceName = `${deviceList[typeId][0].typeName} ${deviceList[typeId]
        .map((e) => e.identificationNo)
        .join(',')}`
      deviceNames.push(strDeviceName)
    }

    const strCondDevices = isAll ? `All ${typeName}` : deviceNames.join(', ')

    return {
      strCondDevices,
      statusInfo,
    }
  }, [cond])
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center',
        gap: 2,
        borderRadius: 2,
        border: (theme) => `1px dashed #00A3FF`,
        py: 2,
        px: 2.5,
      }}
    >
      <Typography variant='h4' sx={{ fontWeight: 700, color: '#00A3FF' }}>
        {strCondDevices}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          borderRadius: 1,
          backgroundColor: 'grey.50',
          p: 0.5,
        }}
      >
        <Typography variant='h4' sx={{ color: 'grey.800' }}>
          {statusInfo?.label || '-'}
        </Typography>
      </Box>
    </Box>
  )
}

const DeviceLinkage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useAuth();
    const [isAddable, setAddable] = useState(false);
    
    useEffect(() => {
      if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.device.deviceLinkage.addNewScence)) {
        setAddable(true)
      }
    }, [])
  const [deleteDeviceLinkagesByIds, { isLoading: isDeleting }] =
    Api.useBatchDeleteDeviceLinkagesMutation()

  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const { pagination, filters } = _getDeviceLinkageList()

  const debouncedSearch = useDebounce(filters.search, 300)

  const projectIds = useMemo(() => {
    return filters.projects.map((p) => Number(p.value))
  }, [filters.projects])

  const locationIds = useMemo(() => {
    return filters.locations.map((p) => Number(p.value))
  }, [filters.locations])

  const buildingIds = useMemo(() => {
    return filters.buildings.map((p) => Number(p.value))
  }, [filters.buildings])

  const levelIds = useMemo(() => {
    return filters.levels.map((p) => Number(p.value))
  }, [filters.levels])

  const areaIds = useMemo(() => {
    return filters.areas.map((p) => Number(p.value))
  }, [filters.areas])

  const unitIds = useMemo(() => {
    return filters.units.map((p) => Number(p.value))
  }, [filters.units])

  const handleGotoNewLinkage = () => {
    if(isAddable){
      navigate('/device/linkage/create')
    }else{
      toast.error('You do not have access to create!')
    } 
  }

  const handleSelect = (selected: number[]) => {
    setSelectedIds(selected)
  }

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: TableDataFieldName) => {
    const isAsc = pagination.orderBy === property && pagination.orderDir === 'asc'
    dispatch(_actions.devices.linkage.setDeviceLinkageListOrderDir(isAsc ? 'desc' : 'asc'))
    dispatch(_actions.devices.linkage.setDeviceLinkageListOrderBy(property as keyof IDeviceLinkage))
  }

  const handleChangeLimit = (limit: number) => {
    dispatch(_actions.devices.linkage.setDeviceLinkageListLimit(limit))
  }

  const handleChangePage = (page: number) => {
    dispatch(_actions.devices.linkage.setDeviceLinkageListPage(page))
  }

  const handleEdit = (data: IDeviceLinkage) => {
    navigate(`/device/linkage/${data?.id}`)
  }

  const handleChangeFilters = (newFilters: IDeviceLinkageListFilters) => {
    dispatch(_actions.devices.linkage.setDeviceLinkageListFilters({ ...filters, ...newFilters }))
  }

  const handleDelete = (data: IDeviceLinkage) => {
    setSelectedIds([data.id])
    setOpenDeleteModal(true)
  }

  const handleDeleteSelected = () => {
    deleteDeviceLinkagesByIds(selectedIds)
      .then(() => {
        toast.success('Device Linkages have been deleted')
        setOpenDeleteModal(false)
      })
      .catch((err) => {
        console.log('Failed to delete device linkages: ', err)
        toast.error('Failed to delete device linkages')
      })
  }

  const { data, isLoading, refetch, isUninitialized } = Api.useGetDeviceLinkageListQuery({
    page: pagination.page,
    limit: pagination.limit,
    orderDir: pagination.orderDir,
    orderBy: pagination.orderBy,
    text: debouncedSearch,
    projectIds: projectIds,
    locationIds: locationIds,
    buildingIds: buildingIds,
    levelIds: levelIds,
    areaIds: areaIds,
    unitIds: unitIds,
  })

  useEffect(() => {
    if (!isUninitialized) {
      refetch()
    }
  }, [])

  const headCells: ITableHeadCell[] = [
    {
      id: '',
      name: 'Linkage Name',
      render: (item: TableData) => {
        const { linkageName } = item as IDeviceLinkage
        return linkageName || '-'
      },
    },
    {
      id: '',
      name: 'Project',
      render: (item: TableData) => {
        const { project } = item as IDeviceLinkage
        return project?.name || '-'
      },
    },
    {
      id: '',
      name: 'Location',
      render: (item: TableData) => {
        const { location } = item as IDeviceLinkage
        return location?.name || '-'
      },
    },
    {
      id: '',
      name: 'Building',
      render: (item: TableData) => {
        const { building } = item as IDeviceLinkage
        return building?.name || '-'
      },
    },
    {
      id: '',
      name: 'Level',
      render: (item: TableData) => {
        const { level } = item as IDeviceLinkage
        return level?.name || '-'
      },
    },
    {
      id: '',
      name: 'Area',
      render: (item: TableData) => {
        const { area } = item as IDeviceLinkage
        return area?.name || '-'
      },
    },
    {
      id: '',
      name: 'Unit',
      render: (item: TableData) => {
        const { unit } = item as IDeviceLinkage
        return unit?.name || '-'
      },
    },
    {
      id: '',
      name: 'If',
      render: (item: TableData) => {
        const { deviceLinkageMaps } = item as IDeviceLinkage
        const condIf = (deviceLinkageMaps || []).filter((t) => t.type === EDeviceLinkageType.If)
        return (
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5, flexWrap: 'nowrap' }}>
            {condIf.map((cond, idx) => {
              return <DeviceLinkageItem key={`cond-if-item-${idx}`} cond={cond} />
            })}
          </Box>
        )
      },
    },
    {
      id: '',
      name: 'Then',
      render: (item: TableData) => {
        const { deviceLinkageMaps } = item as IDeviceLinkage
        const condThen = (deviceLinkageMaps || []).filter((t) => t.type === EDeviceLinkageType.Then)
        return (
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5, flexWrap: 'nowrap' }}>
            {condThen.map((cond, idx) => {
              return <DeviceLinkageItem key={`cond-then-item-${idx}`} cond={cond} />
            })}
          </Box>
        )
      },
    },
    {
      id: '',
      name: 'Action',
      render: (item: TableData) => {
        const data = item as IDeviceLinkage
        return (
          <ListOptionButton
            list={[
              { title: 'View', onClick: () => handleEdit(data) },
              { title: 'Delete', onClick: () => handleDelete(data) },
            ]}
          />
        )
      },
    },
  ]

  return (
    <Box>
      <Stack
        direction={'row'}
        flexWrap={'wrap'}
        gap={2}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Typography variant='h3'>Device Linkage</Typography>
        <Stack direction={'row'} flexWrap={'wrap'} gap={3} alignItems={'center'}>
          {selectedIds.length > 0 && (
            <Button variant='contained' color='error' onClick={() => setOpenDeleteModal(true)}>
              Delete Selected
            </Button>
          )}
          <Button
            color='primary'
            variant='contained'
            size='small'
            startIcon={<BlockScene sx={{ color: '#4DBFFF' }} />}
            onClick={handleGotoNewLinkage}
          >
            Add New Scene
          </Button>
        </Stack>
      </Stack>
      <Box mt={3.25}>
        <DeviceLinkageListFilterbar filters={filters} onChange={handleChangeFilters} />
        <Box mt={3}>
          <EnhancedTable
            loading={isLoading}
            totalCount={data?.count || 0}
            data={data?.rows || []}
            page={pagination.page}
            rowsPerPage={pagination.limit}
            onPageChange={(p) => handleChangePage(p)}
            onRowsPerPageChange={(l) => handleChangeLimit(l)}
            order={pagination.orderDir}
            orderBy={pagination.orderBy}
            onRequestSort={handleRequestSort}
            headCells={headCells}
            hasCheckbox={true}
            selected={selectedIds}
            onSelect={handleSelect}
            onSelectIdFieldName={'id'}
          />
        </Box>
      </Box>
      <DeleteDialog
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        heading={
          <span style={{ letterSpacing: '-0.055em' }}>
            Are you sure you want to delete the selected linkage(s)?
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
        loading={isDeleting}
      />
    </Box>
  )
}

export default DeviceLinkage
