import { FC, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Box, Button, Stack, Typography } from '@mui/material'
import { toast } from 'react-toastify'

import { ITableHeadCell, TableData, TableDataFieldName } from '../../types/common'
import { FileUploadLight } from '../../assets/icons/file-upload-light'
import EnhancedTable from '../../modules/common/EnhancedTable'
import ListOptionButton from '../../modules/common/ListOptionButton'
import DeleteDialog from '../../modules/common/DeleteDialog'
import ProjectListFilterbar from '../../modules/settings/ProjectListFilterbar'
import { IProjectListFilters } from '../../types/project'
import { ILocation } from '../../types/location'
import Api from '../../api'
import useDebounce from '../../hooks/useDebounce'
import FloorPlanBatchUploadDialog from '../../modules/settings/FloorPlanBatchUploadDialog'
import ProjectBatchUploadDialog from '../../modules/settings/ProjectBatchUploadDialog'
import { _getSettingProjects } from '../../store/_selectors'
import _actions from '../../store/_actions'

const SettingProjects: FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const listSettings = _getSettingProjects()

  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openBatchUpload, setOpenBatchUpload] = useState(false)
  const [openBatchUploadFloorPlan, setOpenBatchUploadFloorPlan] = useState(false)
  const [selectedFloorPlanFiles, setSelectedFloorPlanFiles] = useState<File[]>([])

  const [deleteLocations, { isLoading: isDeleting }] = Api.useDeleteLocationsByIdsMutation()
  const [batchUploadFloors, { isLoading: isUploadingFloors }] =
    Api.useBatchUploadFloorPlansMutation()

  const debouncedSearch = useDebounce(listSettings.filters.search, 500)

  const projectIds = useMemo(() => {
    return listSettings.filters.projects.map((p) => Number(p.value))
  }, [listSettings.filters.projects])

  const locationIds = useMemo(() => {
    return listSettings.filters.locations.map((p) => Number(p.value))
  }, [listSettings.filters.locations])

  const handleSelect = (selected: number[]) => {
    setSelectedIds(selected)
  }

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: TableDataFieldName) => {
    const isAsc = listSettings.orderBy === property && listSettings.orderDir === 'asc'
    dispatch(_actions.settings.project.setListOrderDir(isAsc ? 'desc' : 'asc'))
    dispatch(_actions.settings.project.setListOrderBy(property as keyof ILocation))
  }

  const handleEdit = (data: ILocation) => {
    const projectId = data?.locationCategory?.project?.id
    if (projectId) {
      navigate(`/settings/projects/${projectId}?location=${data.id}`)
    }
  }

  const handleChangeFilters = (newFilters: IProjectListFilters) => {
    dispatch(_actions.settings.project.setListFilters({ ...listSettings.filters, ...newFilters }))
  }

  const handleChangePage = (p: number) => {
    dispatch(_actions.settings.project.setListPage(p))
  }

  const handleChangeLimit = (p: number) => {
    dispatch(_actions.settings.project.setListLimit(p))
  }

  const handleDelete = (data: ILocation) => {
    setSelectedIds([data.id])
    setOpenDeleteModal(true)
  }

  const handleCloseBatchUpload = () => {
    setOpenBatchUpload(false)
  }

  const handleOpenBatchUpload = () => {
    setOpenBatchUpload(true)
  }

  const handleCloseBatchUploadFloorPlan = () => {
    setOpenBatchUploadFloorPlan(false)
  }

  const handleOpenBatchUploadFloor = () => {
    setOpenBatchUploadFloorPlan(true)
  }

  const handleSelectFloorPlan = (files: File[]) => {
    setOpenBatchUploadFloorPlan(false)
    setSelectedFloorPlanFiles(files)
  }

  const handleUploadFloorPlan = () => {
    batchUploadFloors(selectedFloorPlanFiles)
      .unwrap()
      .then(() => {
        toast.success('Updated floor plans')
        setSelectedFloorPlanFiles([])
      })
      .catch((err) => {
        console.error('Failed to update floor plans: ', err)
        toast.error(err?.data?.message || 'Failed to update floor plans')
      })
  }

  const { data, isFetching, refetch, isUninitialized } = Api.useGetLocationListQuery({
    page: listSettings.page,
    limit: listSettings.limit,
    orderDir: listSettings.orderDir,
    orderBy: listSettings.orderBy,
    text: debouncedSearch,
    projectIds: projectIds,
    locationIds: locationIds,
  })

  const handleDeleteSelected = () => {
    deleteLocations(selectedIds)
      .then(() => {
        toast.success('Locations have been deleted')
        setOpenDeleteModal(false)
        refetch()
      })
      .catch((err) => {
        console.log('Failed to delete locations: ', err)
        toast.error('Failed to delete locations')
      })
  }

  useEffect(() => {
    if (!isUninitialized) {
      refetch()
    }
  }, [])

  const dataTable = {
    count: data?.count || 0,
    rows: data?.rows || [],
  }

  const headCells: ITableHeadCell[] = [
    {
      id: '',
      name: 'Project',
      render: (item: TableData) => {
        const { locationCategory } = item as ILocation
        const projectNames = locationCategory?.project?.name || '-'
        return projectNames || '-'
      },
    },
    {
      id: '',
      name: 'Location',
      render: (item: TableData) => {
        const { name } = item as ILocation
        return name || '-'
      },
    },
    {
      id: '',
      name: 'Address',
      render: (item: TableData) => {
        const { address } = item as ILocation
        return address || '-'
      },
    },
    {
      id: '',
      name: 'Remark',
      render: (item: TableData) => {
        const { remark } = item as ILocation
        return remark || '-'
      },
    },
    {
      id: '',
      name: 'Action',
      render: (item: TableData) => {
        const data = item as ILocation
        return (
          <ListOptionButton
            list={[
              { title: 'View & Edit', onClick: () => handleEdit(data) },
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
        <Typography variant='h3'>Project List</Typography>
        <Stack direction={'row'} flexWrap={'wrap'} gap={2} alignItems={'center'}>
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
          <Button
            color='primary'
            variant='contained'
            size='small'
            startIcon={<FileUploadLight />}
            onClick={handleOpenBatchUploadFloor}
          >
            Batch Upload Floor Plan
          </Button>
          <Button
            color='primary'
            variant='contained'
            size='small'
            startIcon={<FileUploadLight />}
            onClick={handleOpenBatchUpload}
          >
            Batch Upload Project
          </Button>
        </Stack>
      </Stack>
      <Box mt={3}>
        <ProjectListFilterbar filters={listSettings.filters} onChange={handleChangeFilters} />
        <Box mt={2.75}>
          <EnhancedTable
            loading={isFetching}
            totalCount={dataTable?.count || 0}
            data={dataTable?.rows || []}
            page={listSettings.page}
            rowsPerPage={listSettings.limit}
            onPageChange={(p) => handleChangePage(p)}
            onRowsPerPageChange={(l) => handleChangeLimit(l)}
            order={listSettings.orderDir}
            orderBy={listSettings.orderBy}
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
            Are you sure you want to delete the selected location(s)?
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
      <ProjectBatchUploadDialog open={openBatchUpload} onClose={handleCloseBatchUpload} />
      <FloorPlanBatchUploadDialog
        open={openBatchUploadFloorPlan}
        onClose={handleCloseBatchUploadFloorPlan}
        onSelectFloorPlan={handleSelectFloorPlan}
        loading={false}
      />
      <DeleteDialog
        open={selectedFloorPlanFiles.length > 0}
        onClose={() => setSelectedFloorPlanFiles([])}
        heading={
          <span>
            You have uploaded an identical file.
            <br />
            Do you want to replace the file?
          </span>
        }
        subHeading={'By replacing the file the previous data of the floor plan will be deleted.'}
        onDelete={() => handleUploadFloorPlan()}
        onGoBack={() => setSelectedFloorPlanFiles([])}
        loading={isUploadingFloors}
        labelBtnCancel='Go Back'
        labelBtnDelete='Replace'
      />
    </Box>
  )
}

export default SettingProjects
