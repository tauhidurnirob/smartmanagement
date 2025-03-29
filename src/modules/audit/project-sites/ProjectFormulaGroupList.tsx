import { Box, Button, Stack, Typography } from "@mui/material"
import EnhancedTable from "../../common/EnhancedTable"
import { _getAuditProjectFormulaState } from "../../../store/_selectors"
import { useDispatch } from "react-redux"
import { _auditProjectFormulaActions } from "../../../store/slices/audit"
import { ITableHeadCell, TableData } from "../../../types/common"
import ListOptionButton from "../../common/ListOptionButton"
import SearchField from "../../common/SearchField"
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from "react-router-dom"
import { IFormulaGroup } from "../../../types/formula"
import useDebounce from "../../../hooks/useDebounce"
import Api from "../../../api"
import { useState } from "react"
import DeleteDialog from "../../common/DeleteDialog"
import { toast } from "react-toastify"
import { INITIAL_PAGE_NUMBER } from "../../../helpers/constants"
import ProjectFormulaGroupDialog from "./ProjectFormulaGroupDialog"

const ProjectFormulaGroupList = () => {
  const dispatch = useDispatch()

  const state = _getAuditProjectFormulaState()
  const navigate = useNavigate()
  const [selected, setSelected] = useState<number[]>([])
  const [deleteMultipleModalOn, setDeleteMultipleModalOn] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [viewData, setViewData] = useState<IFormulaGroup | null>(null)

  const debouncedSearch = useDebounce(state.search, 500)

  const { data, isLoading } = Api.useGetAuditFormulaGroupListQuery({
    page: state.page,
    limit: state.limit,
    orderBy: state.orderBy,
    orderDir: state.orderDir,
    text: debouncedSearch
  })
  const [deleteMultiple, {isLoading: multipleDeteleLoading}] = Api.useDeleteAuditFormulaGroupsMutation()
  const [deleteSingle, {isLoading: deleteLoading}] = Api.useDeleteAuditFromulaGroupByIdMutation()

  const handlePageChange = (page: number) => {
    dispatch(_auditProjectFormulaActions.setPage(page))
  }

  const handleRowsPerPageChange = (limit: number) => {
    dispatch(_auditProjectFormulaActions.setLimit(limit))
  }

  const handleDeleteMultiple = () => {
    deleteMultiple({ids: selected})
    .then(() => {
      toast.success('Formula groups have been deleted')
      setDeleteMultipleModalOn(false)
      setSelected([])
      dispatch(_auditProjectFormulaActions.setPage(INITIAL_PAGE_NUMBER))
    })
    .catch((err) => {
      console.log('Failed to delete groups: ', err)
      toast.error('Failed to delete groups')
    })
  }
  const handleDelete = () => {
    deleteSingle(deleteId as number)
    .then(() => {
      toast.success('Formula group has been deleted')
      setDeleteId(null)
      dispatch(_auditProjectFormulaActions.setPage(INITIAL_PAGE_NUMBER))
    })
    .catch((err) => {
      console.log('Failed to delete group: ', err)
      toast.error('Failed to delete group')
    })
  }

  const headCells: ITableHeadCell[] = [
    {
      id: '',
      name: 'SLA Formula Group Name',
      render: (item: TableData) => {
        const { name } = item as IFormulaGroup
        return name
      },
    },
    {
      id: '',
      name: 'Total Formula',
      render: (item: TableData) => {
        const { formulas } = item as IFormulaGroup
        return formulas.length
      },
    },
    {
      id: '',
      name: 'Action',
      render: (item: TableData) => {
        const data = item as IFormulaGroup
        return (
          <ListOptionButton
            list={[
              { title: 'View & Edit', onClick: () =>  setViewData(data)},
              { title: 'Delete', onClick: () =>  setDeleteId(data.id)}
            ]}
          />
        )
      },
    },
  ]

  return (
    <Box>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} flexWrap={'wrap'} >
        <Stack direction={'row'} alignItems={'center'} gap={2} flex={1} flexWrap={'wrap'} >
          <Typography fontSize={16} fontWeight={600} >SLA Formula Group</Typography>
          <SearchField
            placeholder='Search by Keyword'
            sx={{
              background: (theme) => theme.palette.grey[100],
              minWidth: 0,
              maxWidth: '250px',
              height: '40px',
              justifyContent: 'center',
            }}
            value={state.search}
            onChange={(e) => dispatch(_auditProjectFormulaActions.setSearch(e.target.value))}
          />
        </Stack>
        <Stack direction={'row'} gap={2} flexWrap={'wrap'} >
          {
            !!selected?.length &&
            <Button
              variant="contained"
              color="error"
              onClick={() => setDeleteMultipleModalOn(true)}
            >
              Delete Selected
            </Button>
          }
          <Button
            variant="contained"
            color="primary"
            startIcon={
              <AddIcon />
            }
            onClick={() => navigate('add')}
          >
            Formula Group
          </Button>
        </Stack>
      </Stack>
      <Box mt={3}>
        <EnhancedTable
          loading={isLoading}
          totalCount={data?.count || 0}
          data={data?.rows || []}
          page={state.page}
          rowsPerPage={state.limit}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          order={state.orderDir}
          orderBy={state.orderBy}
          onRequestSort={() => null}
          headCells={headCells}
          hasCheckbox={true}
          selected={selected}
          onSelect={(val) => setSelected(val)}
          onSelectIdFieldName={'id'}
          hiddenPagination={false}
        />
      </Box>
      <DeleteDialog
        open={deleteMultipleModalOn}
        onClose={() => setDeleteMultipleModalOn(false)}
        heading={'Are you sure you want to delete the selected formula group(s)?'}
        onDelete={() => handleDeleteMultiple()}
        onGoBack={() => setDeleteMultipleModalOn(false)}
        loading={multipleDeteleLoading}
      />
      <DeleteDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        heading={'Are you sure you want to delete the formula group?'}
        onDelete={() => handleDelete()}
        onGoBack={() => setDeleteId(null)}
        loading={deleteLoading}
      />
      <ProjectFormulaGroupDialog
        open={!!viewData}
        onClose={() => setViewData(null)}
        data={viewData as IFormulaGroup}
      />
    </Box>
  )
}

export default ProjectFormulaGroupList