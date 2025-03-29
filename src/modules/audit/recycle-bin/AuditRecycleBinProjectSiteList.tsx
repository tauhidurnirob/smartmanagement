import { FC, useEffect, useMemo, useState } from 'react'
import { Box, Typography, Card, Grid } from '@mui/material'

import { ISelectItem } from '../../../types/common'
import LocationSelect from '../../location/LocationSelect'
import ProjectSelect from '../project-sites/ProjectSelect'
import { AUDIT_TABLE_PROCESSED } from '../../../helpers/constants'
import ProjectSiteBatchUploadDialog from '../project-sites/ProjectSiteBatchUploadDialog'
import SearchField from '../../common/SearchField'
import ProjectSiteItem from '../project-sites/ProjectSiteItem'
import RecycleBinNotificationBar from './RecycleBinNotificationBar'
import { ILocation } from '../../../types/location'
import Api from '../../../api'
import BackDrop from '../../common/BackDrop'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { IReqAuditProjectSiteList } from '../../../types/audit'
import { useDispatch } from 'react-redux'
import { _getAuditProjectSiteRecycleState } from '../../../store/_selectors'
import { _auditProjectSiteRecycleActions } from '../../../store/slices/audit'

const LIST_LIMIT = 30
interface IProps {
  processed: null | AUDIT_TABLE_PROCESSED
  onChangeSelected?: (selected: number[]) => void
  onRemoveNotification: () => void
}

const AuditRecycleBinProjectSiteList: FC<IProps> = ({
  processed,
  onChangeSelected,
  onRemoveNotification,
}) => {
  const dispatch = useDispatch()
  const state = _getAuditProjectSiteRecycleState()

  const [openBatchUpload, setOpenBatchUpload] = useState(false)
  const [selected, setSelected] = useState<number[]>([])

  const projectIds = useMemo(() => {
    return state.selectedProjects.map((p) => Number(p.value))
  }, [state.selectedProjects])

  const locationIds = useMemo(() => {
    return state.selectedLocations.map((p) => Number(p.value))
  }, [state.selectedLocations])

  const {
    data: projectSiteList,
    isLoading,
    isFetching,
    refetch,
  } = Api.useGetAuditProjectSiteListInRecycleBinQuery({
    page: state.page,
    limit: LIST_LIMIT,
    projectIds: projectIds,
    locationIds: locationIds,
  })

  const { totalPages, hasNextPage, projectSites } = useMemo(() => {
    const totalPages = Math.ceil((projectSiteList?.count || 0) / LIST_LIMIT)
    const projectSites = projectSiteList?.rows || []

    return {
      totalPages,
      hasNextPage: state.page < totalPages,
      projectSites,
    }
  }, [projectSiteList, state.page])

  const handleChangeSelectedLocations = (items: ISelectItem[]) => {
    dispatch(_auditProjectSiteRecycleActions.setSelectedLocations(items))
  }

  const handleChangeSelectedProjects = (items: ISelectItem[]) => {
    dispatch(_auditProjectSiteRecycleActions.setSelectedProjects(items))
    if (state.selectedLocations.length > 0) {
      dispatch(_auditProjectSiteRecycleActions.setSelectedLocations([]))
    }
  }

  const handleCloseBatchUpload = () => {
    setOpenBatchUpload(false)
  }

  const handleSelect = (projectSite: ILocation) => {
    let newSelected: number[] = []
    if (selected.includes(projectSite.id)) {
      newSelected = selected.filter((f) => f !== projectSite.id)
    } else {
      newSelected = [...selected, projectSite.id]
    }

    setSelected(newSelected)
    if (onChangeSelected) {
      onChangeSelected(newSelected)
    }
  }

  const loadMore = () => {
    dispatch(_auditProjectSiteRecycleActions.setPage(Math.min(totalPages, state.page + 1)))
  }

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: loadMore,
    rootMargin: '0px 0px 10px 0px',
  })

  useEffect(() => {
    if (
      processed === AUDIT_TABLE_PROCESSED.restored ||
      processed === AUDIT_TABLE_PROCESSED.deleted
    ) {
      refetch()
    }
  }, [processed])

  useEffect(() => {
    refetch()
  }, [])

  return (
    <Box>
      <Box>
        <Card sx={{ pt: 4.5, pb: 3.75, px: 3.75, boxShadow: 'none', height: '100%' }}>
          <Grid container spacing={2}>
            <Grid item lg={4} xs={12}>
              <Typography
                typography='h4'
                sx={{ fontWeight: 500, mb: 1, color: (theme) => theme.palette.grey[600] }}
              >
                Seach
              </Typography>
              <SearchField
                placeholder='Search by Keyword'
                sx={{
                  background: (theme) => theme.palette.grey[100],
                  minWidth: 0,
                  height: '40px',
                  justifyContent: 'center',
                }}
              />
            </Grid>
            <Grid item lg={4} xs={12}>
              <Typography
                typography='h4'
                sx={{ fontWeight: 500, mb: 1, color: (theme) => theme.palette.grey[600] }}
              >
                Project
              </Typography>
              <ProjectSelect
                hiddenLabel={true}
                selected={state.selectedProjects}
                onChange={handleChangeSelectedProjects}
                isRecycleBin={true}
              />
            </Grid>
            <Grid item lg={4} xs={12}>
              <Typography
                typography='h4'
                sx={{ fontWeight: 500, mb: 1, color: (theme) => theme.palette.grey[600] }}
              >
                Location
              </Typography>
              <LocationSelect
                hiddenLabel={true}
                selected={state.selectedLocations}
                onChange={handleChangeSelectedLocations}
                isRecycleBin={true}
                projectIds={projectIds}
              />
            </Grid>
          </Grid>
        </Card>
      </Box>
      <RecycleBinNotificationBar processed={processed} onRemove={onRemoveNotification} />

      <Box mt={3}>
        <Grid container spacing={2}>
          {projectSites.map((projectSite, idx) => {
            const isSelected = selected.includes(projectSite.id)
            return (
              <Grid key={idx} item lg={6} xs={12}>
                <ProjectSiteItem
                  projectSite={projectSite}
                  readonly={true}
                  selected={isSelected}
                  onSelect={handleSelect}
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

export default AuditRecycleBinProjectSiteList
