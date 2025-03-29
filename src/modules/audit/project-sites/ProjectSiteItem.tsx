import { FC, useEffect, useState } from 'react'
import { Box, Typography, Card, Grid, IconButton, Checkbox, Stack, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { toast } from 'react-toastify'

import { EditPen } from '../../../assets/icons/edit-pen'
import { ILocation } from '../../../types/location'
import { TrashFillIcon } from '../../../assets/icons/trash-fill'
import DeleteDialog from '../../common/DeleteDialog'
import { EVENT_KEYS } from '../../../constants/common'
import useAuth from '../../../hooks/useAuth'
import { ROLE_PERMISSION_KEYS } from '../../../helpers/constants'
interface IProps {
  projectSite: ILocation
  readonly?: boolean
  selected?: boolean
  parentThreshold?: number
  onSelect?: (projectSite: ILocation) => void
  onReload?: () => void
  onSave?: (projectSiteId: number, mtr: number) => Promise<ILocation>
  onDelete?: (projectSiteId: number) => Promise<void>
}

const ProjectSiteItem: FC<IProps> = ({
  projectSite,
  readonly,
  selected,
  parentThreshold,
  onSelect,
  onReload,
  onSave,
  onDelete,
}) => {
  const [isEdit, setIsEdit] = useState(false)
  const [isParentThreshold, setIsParentThreshold] = useState(false)
  const [mtr, setMtr] = useState<number>(0)
  const [deleteOn, setDeleteOn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)

  const handleClickEdit = () => {
    if(isEditable){
      setIsEdit(true)
    }else{
      toast.error('You do not have access to edit!')
    }
  }

  const handleSave = () => {

    if (!onSave) {
      return
    }
    setIsLoading(true)
    onSave(projectSite.id, isParentThreshold ? parentThreshold || 0 : mtr)
      .then((res) => {
        if (onReload) {
          onReload()
        }
        setIsEdit(false)
      })
      .catch((err) => {
        console.log('Failed to update a project site:', err)
        toast.error('Failed to update a project site')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleDeleteOpen = () => {
    setDeleteOn(true)
  }

  const handleDelete = () => {
    if(isDeletable){
      if (!onDelete) {
          return
        }

        setIsLoadingDelete(true)
        onDelete(projectSite.id)
          .then((res) => {
            if (onReload) {
              onReload()
            }
            toast.success('Project site deleted')
          })
          .catch((err) => {
            console.log('Failed to delete a project site:', err)
            toast.error('Failed to delete a project site')
          })
          .finally(() => {
            setIsLoadingDelete(false)
          })
    }else{
      toast.error('You do not have access to delete!')
    }
  
  }
  const { user } = useAuth();
  useEffect(() => {
    if (!readonly && typeof projectSite.mtr === 'number') {
      setMtr(projectSite.mtr)
    }
    
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.audit.projectSite.editProjectSite)) {
      setIsEditable(true);
    }else{
      setIsEditable(false);
    }
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.audit.projectSite.deleteProjectSite)) {
      setIsDeletable(true);
    }else{
      setIsDeletable(false);
    }
  }, [readonly, projectSite.mtr])
  const [isDeletable, setIsDeletable] = useState(true);
  const [isEditable, setIsEditable] = useState(true);
  return (
    <Card sx={{ boxShadow: 'none', p: 0, display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          px: 2,
          py: 1.5,
          borderBottom: '1px dashed rgba(126, 130, 153, 0.5)',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Stack direction={'row'}>
          {typeof selected !== 'undefined' && !!onSelect && (
            <Checkbox
              color='primary'
              checked={selected}
              onChange={(_e) => {
                onSelect(projectSite)
              }}
              sx={{ p: 0, mr: 1 }}
            />
          )}
          <Box>
            <Typography typography={'h4'}>{projectSite.name}</Typography>
            <Typography typography={'h5'} sx={{ mt: 1, color: (theme) => theme.palette.grey[500] }}>
              {projectSite.address || '-'}
            </Typography>
          </Box>
        </Stack>
        <Stack direction={'row'} alignItems={'center'}>
          {typeof selected === 'undefined' && !onSelect && (
            <IconButton color='error' size='medium' onClick={handleDeleteOpen}>
              <TrashFillIcon sx={{fontSize: 28}} color='error' />
            </IconButton>
          )}
          {!readonly && (
            <Box>
              {isEdit ? (
                <Box display={'flex'} alignItems={'center'} ml={1.5} onClick={handleSave}>
                  <LoadingButton
                    variant='contained'
                    color='primary'
                    size='small'
                    loading={isLoading}
                  >
                    Save
                  </LoadingButton>
                </Box>
              ) : (
                <IconButton size='medium' color='primary' onClick={handleClickEdit}>
                  <EditPen fontSize='large' />
                </IconButton>
              )}
            </Box>
          )}
        </Stack>
      </Box>
      <Box sx={{ py: 2.5, px: 2 }}>
        <Box>
          <Grid container spacing={{ lg: 4.5, xs: 1 }} alignItems={'center'}>
            <Grid item lg={4} xs={12}>
              <Typography typography={'h5'}>Project</Typography>
            </Grid>
            <Grid item lg={8} xs={12}>
              <Typography typography={'body1'}>
                {projectSite.locationCategory?.project?.name || '-'}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 1.5 }}>
          <Grid container spacing={{ lg: 4.5, xs: 1 }} alignItems={'center'}>
            <Grid item lg={4} xs={12}>
              <Typography typography={'h5'}>Category</Typography>
            </Grid>
            <Grid item lg={8} xs={12}>
              <Typography typography={'body1'}>{projectSite.locationCategory?.name || '-'}</Typography>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 1.5 }}>
          <Grid container spacing={{ lg: 4.5, xs: 1 }} alignItems={'center'}>
            <Grid item lg={4} xs={12}>
              <Typography typography={'h5'}>Location</Typography>
            </Grid>
            <Grid item lg={8} xs={12}>
              <Typography typography={'body1'}>{projectSite.name || '-'}</Typography>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={{ lg: 4.5, xs: 3 }} alignItems={'flex-start'}>
            <Grid item lg={4} xs={12}>
              <Stack flexDirection={'column'} alignItems={'flex-start'}>
                <Card
                  sx={{
                    boxShadow: 'none',
                    p: '10px 16px',
                    borderRadius: 1.5,
                    width: '100%',
                    borderStyle: readonly ? 'dashed' : 'solid',
                  }}
                  variant='outlined'
                >
                  {!readonly && isEdit ? (
                    <TextField
                      value={isParentThreshold ? parentThreshold : mtr}
                      type='number'
                      onChange={(e) => {
                        setMtr(Number(e.target.value))
                      }}
                      onKeyDown={(event) => {
                        if (event.key === EVENT_KEYS.enter) {
                          handleSave()
                        }
                      }}
                      disabled={isParentThreshold || isLoading}
                      sx={{
                        '.MuiInputBase-input': {
                          px: 0.5,
                          py: 0.25,
                          borderRadius: 1,
                          boxShadow: '1px 1px 2px rgba(0, 0, 0, 0.15)',
                        },
                        '.MuiOutlinedInput-notchedOutline': { borderRadius: 1 },
                      }}
                    />
                  ) : (
                    <Typography
                      typography={'h4'}
                      sx={{
                        color: (theme) => theme.palette.yellow.main,
                      }}
                    >
                      {projectSite.mtr}
                    </Typography>
                  )}
                  <Typography
                    typography={'h5'}
                    sx={{
                      mt: 1,
                      color: (theme) => theme.palette.grey[300],
                    }}
                  >
                    MTR
                  </Typography>
                </Card>
                {!readonly && isEdit && (
                  <Stack flexDirection={'row'} gap={1} sx={{ mt: 1 }} alignItems={'center'}>
                    <Checkbox
                      color='primary'
                      checked={!isParentThreshold}
                      onChange={(_e) => {
                        setIsParentThreshold(!isParentThreshold)
                      }}
                      inputProps={{
                        'aria-label': 'select parent threshold',
                      }}
                      sx={{ p: 0 }}
                      disabled={isLoading}
                    />
                    <Typography
                      typography={'h4'}
                      sx={{
                        fontWeight: 500,
                        lineHeight: 1,
                        color: (theme) => theme.palette.grey[600],
                      }}
                    >
                      customised
                    </Typography>
                  </Stack>
                )}
              </Stack>
            </Grid>
            <Grid item lg={8} xs={12}></Grid>
          </Grid>
        </Box>
      </Box>
      <DeleteDialog
        open={deleteOn}
        onClose={() => setDeleteOn(false)}
        heading={'Are you sure you want to delete this location?'}
        onDelete={() => {
          setDeleteOn(false)
          handleDelete()
        }}
        onGoBack={() => setDeleteOn(false)}
        loading={isLoadingDelete}
      />
    </Card>
  )
}

export default ProjectSiteItem
