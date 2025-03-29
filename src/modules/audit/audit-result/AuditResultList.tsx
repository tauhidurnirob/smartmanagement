import { createSearchParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import FileSaver from 'file-saver'
import { Box, Grid, Paper, Stack, Typography } from '@mui/material'

import { DownloadLight } from '../../../assets/icons/download-light'
import { useMemo, useState, useEffect } from 'react'
import { ISelectItem, OrderDirection, TDownloadFileFormat } from '../../../types/common'
import FilterLabel from '../../common/FilterLabel'
import SearchField from '../../common/SearchField'
import ProjectSelect from '../project-sites/ProjectSelect'
import LocationSelect from '../../location/LocationSelect'
import { MoreFilters } from '../../../assets/icons/more-filters'
import AuditResultListMoreFilterModal from './AuditResultListMoreFilterModal'
import AuditResultTable from './AuditResultTable'
import Api from '../../../api'
import TablePagination from '../../common/TablePagination'
import useDebounce from '../../../hooks/useDebounce'
import SelectDate from '../../common/SelectDate'
import FormSelect from '../FormSelector'
import { useDispatch } from 'react-redux'
import { _getAuditResultState } from '../../../store/_selectors'
import { _auditResultActions } from '../../../store/slices/audit'
import ButtonDownload from '../../common/ButtonDownload'
import { DOWNLOAD_FILE_TYPES,ROLE_PERMISSION_KEYS } from '../../../helpers/constants'
import dayjs from 'dayjs'
import { IAuditResult } from '../../../types/audit'
import { DATE_FORMAT_FOR_DOWNLOAD } from '../../../constants/common'
import useAuth from '../../../hooks/useAuth'

const AuditResultList = () => {


  const navigate = useNavigate()

  const dispatch = useDispatch()
  const state = _getAuditResultState()

  const { user } = useAuth(); // Accessing getRoutesInfo function from useAuth hook
 
  useEffect(() => {
    
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.audit.result.viewAuditResultDetails)) {
      setIsVisible(true);
    }else{
      setIsVisible(false);
    }
  
  }, []);
  const [isVisible, setIsVisible] = useState(true);
  // Other state variables and functions...

  const [openMoreFilters, setOpenMoreFilters] = useState(false)
  const [orderDir] = useState<OrderDirection>('asc')
  const [orderBy] = useState('name')
  const [selected, setSelected] = useState<number[]>([])

  const debouncedSearch = useDebounce(state.search, 500)
  const projectIds = useMemo(() => {
    return state.selectedProjects.map((p) => Number(p.value))
  }, [state.selectedProjects])

  const locationIds = useMemo(() => {
    return state.selectedLocations.map((p) => Number(p.value))
  }, [state.selectedLocations])

  const handleChangeForm = (form: number) => {
    dispatch(_auditResultActions.setSelectedForm(form))
  }
  const handleChangeSelectedLocations = (items: ISelectItem[]) => {
    dispatch(_auditResultActions.setSelectedLocations(items))
  }

  const handleChangeSelectedProjects = (items: ISelectItem[]) => {
    dispatch(_auditResultActions.setSelectedProjects(items))
  }

  const handleCloseMoreFilters = () => {
    setOpenMoreFilters(false)
  }

  const handleOpenMoreFilters = () => {
    setOpenMoreFilters(true)
  }

  const handleMoreFilters = (inFilters: { states: number[] }) => {
    dispatch(_auditResultActions.setFilters(inFilters))
    setOpenMoreFilters(false)
  }

  const handleView = (result: IAuditResult) => {
  
    if(isVisible){
      const locationId = result?.id
      if (!locationId) {
        toast.error('Audit is not assigned to any location!')
        return
      }
      const month = dayjs(result?.latestSubmittedAt).format('M')
      const year = dayjs(result?.latestSubmittedAt).format('YYYY')
      navigate({
        pathname: `/audit/log/${locationId}`,
        search: `?${createSearchParams({
          month: month,
          year: year,
          formTypeId: String(state.selectedForm)
        })}`,
      })
    }else{
      toast.error('You do not have access to view details!')
    }
    
  }

  const { data, isLoading } = Api.useGetAuditResultListQuery({
    page: state.page,
    limit: state.limit,
    orderDir: orderDir,
    orderBy: orderBy,
    text: debouncedSearch,
    states: state.filters.states,
    projectIds,
    locationIds,
    ...(state.selectedForm !== null ? { formTypeId: state.selectedForm as number } : {}),
    ...(state.startDate ? { startDate: dayjs(state.startDate).startOf('day').toISOString() } : {}),
    ...(state.endDate ? { endDate: dayjs(state.endDate).endOf('day').toISOString() } : {}),
  }, {skip: !state.selectedForm})

  const [downloadResult, { isLoading: downloadLoading }] = Api.useDownloadAuditResultMutation()

  const handleDownload = (format: TDownloadFileFormat) => {
    if (selected.length) {
      downloadResult({
        locationIds: selected,
        fileFormat: format,
        startDate: dayjs(state.startDate).startOf('day').toISOString(),
        endDate: dayjs(state.endDate).endOf('day').toISOString()
      })
        .unwrap()
        .then((res) => {
          if (res) {
            if (format === 'pdf') {
              const blob = new Blob([res])
              FileSaver.saveAs(blob, `audit_results.zip`)
            } else {
              const format = 'aapplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
              const blob = new Blob([res], {
                type: format,
              })
              FileSaver.saveAs(blob, `audit_results.xlsx`)
            }
          } else {
            toast.error('Failed to download audit result')
          }
        })
        .catch((err) => {
          console.log('Failed to download audit result: ', err)
          toast.error('Failed to download audit result')
        })
    } else {
      downloadResult({
        ...(state.filters.states.length ? { states: state.filters.states } : {}),
        ...(projectIds.length ? { projectIds: projectIds } : {}),
        ...(locationIds.length ? { locationIds: locationIds } : {}),
        ...(state.selectedForm !== null ? { formTypeId: state.selectedForm as number } : {}),
        ...(state.startDate
          ? { startDate: dayjs(state.startDate).startOf('day').toISOString() }
          : {}),
        ...(state.endDate ? { endDate: dayjs(state.endDate).endOf('day').toISOString() } : {}),
        fileFormat: format,
      })
        .unwrap()
        .then((res) => {
          const fileName = `audit_results - ${dayjs(state.startDate).format(
            DATE_FORMAT_FOR_DOWNLOAD
          )}_${dayjs(state.endDate).format(DATE_FORMAT_FOR_DOWNLOAD)}`
          if (res) {
            if (format === 'pdf') {
              const blob = new Blob([res])
              FileSaver.saveAs(blob, `${fileName}.zip`)
            } else {
              const format = 'aapplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
              const blob = new Blob([res], {
                type: format,
              })
              FileSaver.saveAs(blob, `${fileName}.xlsx`)
            }
          } else {
            toast.error('Failed to download audit result')
          }
        })
        .catch((err) => {
          console.log('Failed to download audit result: ', err)
          toast.error('Failed to download audit result')
        })
    }
  }

  return (
    <Box>
      <Stack
        direction={'row'}
        flexWrap={'wrap'}
        gap={2}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Stack direction={'row'} flexWrap={'wrap'} gap={3} alignItems={'center'}>
          <Typography variant='h3'>Audit Result</Typography>
          {data && data?.count > 0 && (
            <ButtonDownload
              options={DOWNLOAD_FILE_TYPES}
              onClick={(file) => handleDownload(file.value as TDownloadFileFormat)}
              isLoading={downloadLoading}
            >
              <DownloadLight sx={{ fontSize: 15, mr: 1.25 }} />
              {!selected.length ? 'Download All' : 'Download Selected'}
            </ButtonDownload>
          )}
        </Stack>
        <FormSelect selected={state.selectedForm} onChange={handleChangeForm} />
      </Stack>
      <Paper elevation={0} sx={{ p: 2, mt: 4 }}>
        <Stack
          direction={{ lg: 'row', xs: 'column' }}
          alignItems='flex-start'
          justifyContent='space-between'
          columnGap={{ lg: 1.5, xs: 1 }}
          rowGap={2.5}
        >
          <Grid
            container
            columnSpacing={{ lg: 1.25, xs: 1 }}
            rowSpacing={{ lg: 1.25, xs: 2.5 }}
            flexGrow={1}
          >
            <Grid item md={2} sm={12}>
              <Box>
                <FilterLabel text='Search' />
                <SearchField
                  placeholder='Search by Keyword'
                  sx={{
                    background: (theme) => theme.palette.grey[100],
                    minWidth: 0,
                    height: '40px',
                    justifyContent: 'center',
                  }}
                  value={state.search}
                  onChange={(e) => dispatch(_auditResultActions.setSearch(e.target.value))}
                />
              </Box>
            </Grid>
            <Grid item md={3} sm={12}>
              <ProjectSelect
                selected={state.selectedProjects}
                onChange={handleChangeSelectedProjects}
              />
            </Grid>
            <Grid item md={3} sm={12}>
              <LocationSelect
                selected={state.selectedLocations}
                onChange={handleChangeSelectedLocations}
                projectIds={projectIds}
              />
            </Grid>
            <Grid item md={2} xs={12}>
              <FilterLabel text='Start Date' />
              <SelectDate
                value={state.startDate}
                onAccept={(date) => dispatch(_auditResultActions.setStartDate(date))}
                maxDate={state.endDate}
              />
            </Grid>
            <Grid item md={2} xs={12}>
              <FilterLabel text='End Date' />
              <SelectDate
                value={state.endDate}
                onAccept={(date) => dispatch(_auditResultActions.setEndDate(date))}
                minDate={state.startDate}
              />
            </Grid>
          </Grid>
          <Box>
            <FilterLabel text='More' />
            <Box
              sx={{
                display: 'flex',
                cursor: 'pointer',
                bgcolor: (theme) => theme.palette.grey[200],
                p: 1,
                borderRadius: 1.5,
              }}
              onClick={handleOpenMoreFilters}
            >
              <MoreFilters sx={{ fontSize: 23, color: (theme) => theme.palette.primary.main }} />
            </Box>
          </Box>
        </Stack>
      </Paper>
     
      <Box mt={4}>
        <AuditResultTable
          data={data?.rows || []}
          loading={isLoading}
          viewClicked={handleView}
          selected={selected}
          setSelected={setSelected}
        />
      </Box>
    
      <Box mt={3}>
        <TablePagination
          page={state.page}
          rowsPerPage={state.limit}
          count={data?.count || 0}
          onPageChange={(v) => {
            dispatch(_auditResultActions.setPage(v))
          }}
          onRowsPerPageChange={(v) => {
            dispatch(_auditResultActions.setLimit(v))
          }}
        />
      </Box>

      <AuditResultListMoreFilterModal
        open={openMoreFilters}
        filters={state.filters}
        onApply={handleMoreFilters}
        onClose={handleCloseMoreFilters}
      />
    </Box>
  )
}

export default AuditResultList
