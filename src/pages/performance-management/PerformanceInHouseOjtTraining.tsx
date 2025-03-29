import { Box, Button, Card, Grid, Stack, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import FilterLabel from '../../modules/common/FilterLabel'
import SearchField from '../../modules/common/SearchField'
import { useEffect, useMemo, useState } from 'react'
import ProjectSelect from '../../modules/audit/project-sites/ProjectSelect'
import LocationSelect from '../../modules/location/LocationSelect'
import { ISelectItem } from '../../types/common'
import PerformanceOjtTrainingItem from '../../modules/performance-management/in-house-training/PerformanceOjtTrainingItem'
import PerformanceOjtTrainingDetailDialog from '../../modules/performance-management/in-house-training/PerformanceOjtTrainingDetailDialog'
import { useNavigate } from 'react-router-dom'
import Api from '../../api'
import { _getOjtFilter } from '../../store/_selectors'
import useDebounce from '../../hooks/useDebounce'
import { actions as performanceActions } from '../../store/slices/performanceManagements'
import { useDispatch } from 'react-redux'
import { IOtjOverviewRes, IReqOjtOverview } from '../../types/performance-management'
import BackDrop from '../../modules/common/BackDrop'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import useAuth from '../../hooks/useAuth';
import { ROLE_PERMISSION_KEYS } from '../../helpers/constants';
import { toast } from 'react-toastify';
const LIST_LIMIT = 10

const PerformanceInHouseOjtTraining = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useAuth(); 
  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.taskManagement.inHouseTraining.addOJT)) {
      setIsCreatable(true);
    }else{
      setIsCreatable(false);
    }
  
  }, []);
  const [isCreatable, setIsCreatable] = useState(true);

  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.taskManagement.inHouseTraining.editOJT)) {
      setIsEditable(true);
    }else{
      setIsEditable(false);
    }
  
  }, []);
  const [isEditable, setIsEditable] = useState(true);
  
  const { ojtFilter } = performanceActions
  const [selectedData, setSelectedData] = useState<IOtjOverviewRes | null>(null)
  // Add state variable for toast visibility
  const [isToastVisible, setIsToastVisible] = useState(false);
  // Reset toast visibility when selectedData changes
  useEffect(() => {
    setIsToastVisible(false); // Reset toast visibility when selectedData changes
  }, [selectedData]);
  const {
    limit,
    orderBy,
    orderDir,
    page,
    search,
    selectedLocations,
    selectedProjects,
    status,
    ojts,
    totalOjtsCount,
  } = _getOjtFilter()

  const debouncedSearch = useDebounce(search, 500)
  const projectIds = useMemo(() => {
    return selectedProjects.map((p) => Number(p.value))
  }, [selectedProjects])

  const locationIds = useMemo(() => {
    return selectedLocations.map((p) => Number(p.value))
  }, [selectedLocations])

  const [fetchData, { isLoading, isFetching }] = Api.useLazyGetOtjsQuery()

  const { totalPages, hasNextPage } = useMemo(() => {
    const totalPages = Math.ceil(totalOjtsCount / LIST_LIMIT)

    return {
      totalPages,
      hasNextPage: page < totalPages,
    }
  }, [totalOjtsCount, page])

  const loadData = (page: number) => {
    const params: IReqOjtOverview = {
      limit,
      orderBy,
      orderDir,
      page,
      text: debouncedSearch,
      locationIds,
      projectIds,
      status,
    }
    fetchData(params)
      .unwrap()
      .then((res) => {
        if (page > 1) {
          dispatch(ojtFilter.setOjts([...ojts, ...res.rows]))
        } else {
          dispatch(ojtFilter.setOjts(res.rows))
        }
        dispatch(ojtFilter.setPage(page))
        dispatch(ojtFilter.setTotalOjtsCount(res.count))
      })
      .catch((err) => {
        console.log('Failed to get OJT list: ', err.data.message || err.error)
        dispatch(ojtFilter.setOjts([]))
        dispatch(ojtFilter.setPage(1))
        dispatch(ojtFilter.setTotalOjtsCount(0))
      })
  }

  useEffect(() => {
    loadData(1)
  }, [projectIds, locationIds, debouncedSearch])

  const loadMore = () => {
    loadData(Math.min(totalPages, page + 1))
  }

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: loadMore,
    rootMargin: '0px 0px 10px 0px',
  })

  const onTextChange = (payload: string) => {
    dispatch(ojtFilter.setSearch(payload))
  }

  const onLocationChange = (payload: ISelectItem[]) => {
    dispatch(ojtFilter.setSelectedLocations(payload))
  }

  const onProjectChange = (payload: ISelectItem[]) => {
    dispatch(ojtFilter.setSelectedProjects(payload))
  }
  const handleCreate = () => {
    if(isCreatable){
      navigate('create')
    }else{
      toast.error('You do not have access to create!')
    } 
  }
 
  const handleEditClick = (item: IOtjOverviewRes) => {
    if (isEditable) {
      setSelectedData(item);
    } else if (!selectedData) { // Check if selectedData is not already set
      setIsToastVisible(true); // Show the toast if user doesn't have edit permission
    }
  };
  
  return (
    <Box>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        overflow='wrap'
        gap={2}
      >
        <Stack direction='row' alignItems='center' gap={2} overflow='wrap'>
          <Typography variant='h3'>OJT (On-The-Job)</Typography>
          <Button variant='contained' color='green' onClick={() => navigate('training-status')}>
            View Training Status
          </Button>
        </Stack>
        <Stack direction='row' alignItems='center' gap={2} flexWrap='wrap'>
          <Button
            variant='contained'
            color='primary'
            sx={{ fontWeight: '700' }}
            startIcon={<AddIcon fontSize='small' />}
            onClick={handleCreate}
          >
            OJT Training
          </Button>
        </Stack>
      </Stack>
      <Box>
        <Card sx={{ boxShadow: 'none', height: '100%', mt: 4 }}>
          <Box p={3}>
            <Stack
              direction={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
              gap={2}
              flexWrap={'wrap'}
            >
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
                    value={search}
                    onChange={(e) => onTextChange(e.target.value)}
                  />
                </Box>
              </Box>
              <Box flex={1}>
                <Box minWidth={'200px'}>
                  <ProjectSelect selected={selectedProjects} onChange={onProjectChange} />
                </Box>
              </Box>
              <Box flex={1}>
                <Box minWidth={'200px'}>
                  <LocationSelect
                    selected={selectedLocations}
                    onChange={onLocationChange}
                    projectIds={projectIds}
                  />
                </Box>
              </Box>
            </Stack>
          </Box>
        </Card>
      </Box>
      <Box mt={2.5}>
        <Grid container spacing={2}>
          {ojts.map((item, idx) => {
            return (
              <Grid key={idx} item lg={6} xs={12}>
                <PerformanceOjtTrainingItem item={item} editClicked={() => handleEditClick(item)} />
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
       {/* Dialog component */}
      {/* {selectedData && isEditable && isShowEditBox &&(
        <PerformanceOjtTrainingDetailDialog
          open={!!selectedData}
          ojt={selectedData}
          onClose={() => setSelectedData(null)}
          reload={() => loadData(1)}
        />
      )} */}

      {/* Dialog component */}
      {selectedData && isEditable && (
        <PerformanceOjtTrainingDetailDialog
          open={!!selectedData}
          ojt={selectedData}
          onClose={() => setSelectedData(null)}
          reload={() => loadData(1)}
        />
      )}

      {/* Toast notification */}
      {isToastVisible && (
        toast.error('You do not have access to edit!', {
          autoClose: 3000, // Close the toast after 3 seconds
          onClose: () => setIsToastVisible(false) // Reset toast visibility when closed
        })
      )}
      
    </Box>
  )
}

export default PerformanceInHouseOjtTraining
