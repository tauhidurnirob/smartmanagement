import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { Box, Typography, Button, Card, Grid, TextField, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { ISelectItem } from '../../types/common'
import LocationSelect from '../../modules/location/LocationSelect'
import { BlockBox } from '../../assets/icons/block-box'
import { FileUploadLight } from '../../assets/icons/file-upload-light'
import ProjectSelect from '../../modules/audit/project-sites/ProjectSelect'
import ProjectSiteBatchUploadDialog from '../../modules/audit/project-sites/ProjectSiteBatchUploadDialog'
import ProjectSiteItem from '../../modules/audit/project-sites/ProjectSiteItem'
import Api from '../../api'
import { IReqAuditProjectSiteList } from '../../types/audit'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import BackDrop from '../../modules/common/BackDrop'
import { EVENT_KEYS } from '../../constants/common'
import { useDispatch } from 'react-redux'
import { _getAuditProjectSiteState } from '../../store/_selectors'
import { _auditProjectSiteActions } from '../../store/slices/audit'
import FilterLabel from '../../modules/common/FilterLabel'
import SearchField from '../../modules/common/SearchField'
import useDebounce from '../../hooks/useDebounce'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-toastify'
import { ROLE_PERMISSION_KEYS } from '../../helpers/constants'
const LIST_LIMIT = 30

const AuditProjectSite = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const state = _getAuditProjectSiteState()

  const [openBatchUpload, setOpenBatchUpload] = useState(false)
  const [threshold, setThreshold] = useState<number>(0)

  const debouncedSearch = useDebounce(state.search, 500)

  const [getAuditProjects, { isLoading, isFetching }] = Api.useLazyGetAuditProjectSiteListQuery()
  const [setMTRForAllLocations] = Api.useSetMtrForAllLocationsMutation()
  const [updateLocation] = Api.useUpdateLocationMutation()
  const [deleteProjectSite] = Api.useDeleteProjectSiteByIdMutation()

  const { totalPages, hasNextPage } = useMemo(() => {
    const totalPages = Math.ceil(state.totalCount / LIST_LIMIT)

    return {
      totalPages,
      hasNextPage: state.page < totalPages,
    }
  }, [state.totalCount, state.page])

  const projectIds = useMemo(() => {
    return state.selectedProjects.map((p) => Number(p.value))
  }, [state.selectedProjects])

  const locationIds = useMemo(() => {
    return state.selectedLocations.map((p) => Number(p.value))
  }, [state.selectedLocations])

  const handleChangeSelectedLocations = (items: ISelectItem[]) => {
    dispatch(_auditProjectSiteActions.setSelectedLocations(items))
  }

  const handleChangeSelectedProjects = (items: ISelectItem[]) => {
    dispatch(_auditProjectSiteActions.setSelectedProjects(items))
    if(state.selectedLocations.length > 0) {
      dispatch(_auditProjectSiteActions.setSelectedLocations([]))
    }
  }

  const handleCloseBatchUpload = () => {
    setOpenBatchUpload(false)
  }

  const handleOpenBatchUpload = () => {
    setOpenBatchUpload(true)
  }

  const handleGotoNewProject = () => {
    if(isAddable){
        navigate('/audit/project-site/create')
    }
    else{
      toast.error('You do not have access to create!')
    }
  
  }

  const handleGotoAllFormula = () => {
    
    if(isViewableFormula){
      navigate('/audit/project-site/formula')
    }
    else{
      toast.error('You do not have access to view formula!')
    }
  }

  const handleChangeThreshold = (event: ChangeEvent<HTMLInputElement>) => {
    setThreshold(Number(event.target.value))
  }

  const loadData = (page: number) => {
    const params: IReqAuditProjectSiteList = {
      page: page,
      limit: LIST_LIMIT,
      orderBy: 'name',
      orderDir: 'asc',
      projectIds: projectIds,
      locationIds: locationIds,
      text: debouncedSearch
    }
    getAuditProjects(params)
      .unwrap()
      .then((res) => {
        if (page > 1) {
          dispatch(_auditProjectSiteActions.setProjectSites([...state.projectSites, ...res.rows]))
        } else {
          dispatch(_auditProjectSiteActions.setProjectSites(res.rows))
        }
        dispatch(_auditProjectSiteActions.setPage(page))
        dispatch(_auditProjectSiteActions.setTotalCount(res.count))
      })
      .catch((err) => {
        console.log('Failed to get project list: ', err.data.message || err.error)
        dispatch(_auditProjectSiteActions.setProjectSites([]))
        dispatch(_auditProjectSiteActions.setPage(1))
        dispatch(_auditProjectSiteActions.setTotalCount(0))
      })
  }

  const handleSetMTR = () => {
    setMTRForAllLocations({ mtr: threshold, text: debouncedSearch, projectIds: projectIds, locationIds: locationIds })
      .unwrap()
      .then(() => {
        loadData(state.page)
      })
      .catch((err) => {
        console.log('Failed to set mtr for all locations: ', err)
      })
  }

  const handleReload = () => {
    loadData(1)
  }

  const loadMore = () => {
    loadData(Math.min(totalPages, state.page + 1))
  }

  const handleSave = (projectSiteId: number, mtr: number) => {
    return updateLocation({
      id: projectSiteId,
      mtr: mtr,
    }).unwrap()
  }

  const handleDelete = (projectSiteId: number) => {
    return deleteProjectSite(projectSiteId).unwrap()
  }

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: loadMore,
    rootMargin: '0px 0px 10px 0px',
  })
  const { user } = useAuth();
  const [isAddable, setIsAddable] = useState(true);
  const [isViewableFormula, setIsViewableFormula] = useState(true);
  useEffect(() => {
    loadData(1)
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.audit.projectSite.addProjectSite)) {
      setIsAddable(true);
    }else{
      setIsAddable(false);
    }
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.audit.projectSite.viewProjectSiteFormula)) {
      setIsViewableFormula(true);
    }else{
      setIsViewableFormula(false);
    }
  }, [projectIds, locationIds, debouncedSearch])
  

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: { sm: 'center', xs: 'flex-start' },
          flexDirection: { sm: 'row', xs: 'column' },
          columnGap: 2,
          rowGap: 2,
        }}
      >
        <Box
          sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', columnGap: 5, rowGap: 2 }}
        >
          <Typography typography={'h3'}>Project Site</Typography>
          <Button color='green' variant='contained' size='small' onClick={handleGotoAllFormula}>
            View All Formula
          </Button>
        </Box>
        <Box
          sx={{
            marginLeft: 'auto',
            display: 'flex',
            flexWrap: 'wrap',
            width: { sm: 'auto', xs: '100%' },
            flexDirection: { sm: 'row', xs: 'column' },
            columnGap: 2,
            rowGap: 2,
          }}
        >
          <Button
            color='primary'
            variant='contained'
            size='small'
            startIcon={<BlockBox />}
            onClick={handleGotoNewProject}
          >
            Add New Project Site
          </Button>
          <Button
            color='primary'
            variant='contained'
            size='small'
            startIcon={<FileUploadLight />}
            onClick={handleOpenBatchUpload}
          >
            Batch Upload Project Site
          </Button>
        </Box>
      </Box>
      <Box>
        <Card sx={{ boxShadow: 'none', height: '100%', mt: 4 }}>
          <Box p={3}>
            {/* <Typography mb={2} typography={'h3'} sx={{ fontSize: '1.125rem' }}>
              Parent Threshold
            </Typography> */}
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={2} flexWrap={'wrap'}>
              <Box flex={1}>
                <Box minWidth={'200px'}>
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
                    onChange={(e) => dispatch(_auditProjectSiteActions.setSearch(e.target.value))}
                  />
                </Box>
              </Box>
              <Box flex={1}>
                <Box minWidth={'200px'}>
                  <ProjectSelect
                    selected={state.selectedProjects}
                    onChange={handleChangeSelectedProjects}
                  />
                </Box>
              </Box>
              <Box flex={1}>
                <Box minWidth={'200px'}>
                  <LocationSelect
                    selected={state.selectedLocations}
                    onChange={handleChangeSelectedLocations}
                    projectIds={projectIds}
                  />
                </Box>
              </Box>
            </Stack>
          </Box>
          {/* <Grid container>
            <Grid item lg={9} xs={12}>
              
            </Grid>
            <Grid item lg={3} xs={12}>
              <Box p={3} display={'flex'} justifyContent={'center'} sx={{borderLeft: (theme) => ({xs: 'none', lg: `1px solid ${theme.palette.grey[700]}`}), }}>
                <Stack maxWidth={'220px'} width={'100%'} alignItems={'center'} >
                  <Box p={2} borderRadius={'6px'} border={theme => `1px solid ${theme.palette.grey[500]}`} >
                    <TextField
                      label=''
                      variant='outlined'
                      color='primary'
                      fullWidth
                      sx={{
                        "& input": { p: 0.75, width: '100%', fontSize: '22px', '&::placeholder': {fontSize: '22px'} },
                        '.MuiOutlinedInput-notchedOutline': { borderRadius: '2px' },
                      }}
                      onChange={handleChangeThreshold}
                      placeholder='0'
                      value={threshold === 0 ? '' : threshold}
                      type='number'
                      onKeyDown={(event) => {
                        if (event.key === EVENT_KEYS.enter) {
                          handleSetMTR()
                        }
                      }}
                    />
                    <Typography
                      typography={'subtitle1'}
                      sx={{
                        color: (theme) => theme.palette.grey[500],
                        ml: 0.75,
                        mt: 0.75,
                        lineHeight: '15px',
                      }}
                    >
                      MTR
                    </Typography>
                  </Box>
                  <Button
                    sx={{ marginTop: 1.75 }}
                    color='primary'
                    variant='contained'
                    onClick={handleSetMTR}
                  >
                    Apply to all locations
                  </Button>
                </Stack>
              </Box>
            </Grid>
          </Grid> */}
        </Card>
      </Box>
      <Box mt={3}>
        <Grid container spacing={2}>
          {state.projectSites.map((projectSite, idx) => {
            return (
              <Grid key={idx} item lg={6} xs={12}>
                <ProjectSiteItem
                  projectSite={projectSite}
                  parentThreshold={threshold}
                  onReload={handleReload}
                  onSave={handleSave}
                  onDelete={handleDelete}
                />
              </Grid>
            )
          })}
          <Grid item xs={12}>
            {(isLoading || isFetching || hasNextPage) && (
              <Box sx={{ position: 'relative', minHeight: '40px', mt: 1 }} ref={sentryRef}>
                <BackDrop size='20px' />
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
      <ProjectSiteBatchUploadDialog open={openBatchUpload} onClose={handleCloseBatchUpload} />
    </Box>
  )
}

export default AuditProjectSite
