import { Box, Button, Stack, Typography } from '@mui/material'
import { PaperPencilIcon } from '../../assets/icons/PaperPencil'
import AuditFormTemplateTable from '../../modules/audit/audit-form-template/AuditFormTemplateTable'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DeleteDialog from '../../modules/common/DeleteDialog'
import Api from '../../api'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { _auditFormTemplateActions } from '../../store/slices/audit'
import { INITIAL_PAGE_NUMBER,ROLE_PERMISSION_KEYS } from '../../helpers/constants'
import useAuth from '../../hooks/useAuth'

const AuditFormTemplate = () => {
  const [selected, setSelected] = useState<number[]>([])
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false)

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { user } = useAuth();
  const [isAddable, setIsAddable] = useState(true);
  const [isViewableSettings, setIsViewableSettings] = useState(true);
  const handleSelect = (selected: number[]) => {
    setSelected(selected)
  }
  useEffect(() => {
    
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.audit.auditFormTemplate.viewTemplateSettings)) {
      setIsViewableSettings(true);
    }else{
      setIsViewableSettings(false);
    }
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.audit.auditFormTemplate.addAuditFormTemplate)) {
      setIsAddable(true);
    }else{
      setIsAddable(false);
    }
   
  }, []);
  const [deleteForm, { isLoading }] = Api.useDeleteMultipleAuditFormTemplateMutation()

  const handleDelete = () => {
    try {
      deleteForm(selected)
        .unwrap()
        .then((res) => {
          toast.success(`Successfully deleted`)
          dispatch(_auditFormTemplateActions.setPage(INITIAL_PAGE_NUMBER))
        })
        .catch((err) => {
          console.log('Failed to delete ', err)
          toast.error('Failed to delete')
        })
        .finally(() => {
          setSelected([])
          setDeleteDialog(false)
        })
    } catch (err: any) {
      console.error(err)
    }
  }
  const handleCreate = () => {
    if(isAddable){
      navigate('create')
    }else{
      toast.error('You do not have access to add!')
    }
  }
  const viewSettings = () => {
    if(isAddable){
      navigate('rating-view')
    }else{
      toast.error('You do not have access to view setings!')
    }
  }
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
          <Typography variant='h3'>Audit Form Template</Typography>
          <Button variant='contained' color='green' onClick={viewSettings}>
            View Template Settings
          </Button>
        </Stack>
        <Stack direction='row' alignItems='center' gap={2} flexWrap='wrap'>
          {selected.length > 0 && (
            <Button variant='contained' color='error' onClick={() => setDeleteDialog(true)}>
              Delete Selected
            </Button>
          )}
          <Button
            variant='contained'
            color='primary'
            sx={{ fontWeight: '700' }}
            startIcon={<PaperPencilIcon fontSize='small' />}
            onClick={handleCreate}
          >
            Add New Audit Form Template
          </Button>
        </Stack>
      </Stack>
      <AuditFormTemplateTable onChangeSelected={handleSelect} />
      <DeleteDialog
        heading='Are you sure you want to delete?'
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        loading={isLoading}
        onGoBack={() => setDeleteDialog(false)}
        onDelete={handleDelete}
      />
    </Box>
  )
}

export default AuditFormTemplate
