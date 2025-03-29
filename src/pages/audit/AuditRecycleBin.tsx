import { useState,useEffect } from 'react'
import { Box, Typography, Tabs, Tab, Button } from '@mui/material'
import { toast } from 'react-toastify'

import AuditRecycleBinDeleteModal from '../../modules/audit/recycle-bin/AuditRecycleBinDeleteModal'
import { AUDIT_TABLE_PROCESSED, INITIAL_PAGE_NUMBER,ROLE_PERMISSION_KEYS } from '../../helpers/constants'
import AuditScheduleList from '../../modules/audit/audit-schedule/AuditScheduleList'
import AuditRecycleBinProjectSiteList from '../../modules/audit/recycle-bin/AuditRecycleBinProjectSiteList'
import AuditFormTemplateTable from '../../modules/audit/audit-form-template/AuditFormTemplateTable'
import AuditRecycleBinSetting from '../../modules/audit/recycle-bin/AuditRecycleBinSetting'
import AuditLogListRecycle from '../../modules/audit/audit-logs/AuditLogListRecycle'
import Api from '../../api'
import { useDispatch } from 'react-redux'
import {
  _auditFormTemplateRecycleActions,
  _auditLogRecycleActions,
  _auditProjectSiteRecycleActions,
  _auditScheduleRecycleActions,
} from '../../store/slices/audit'
import DeleteDialog from '../../modules/common/DeleteDialog'
import useAuth from '../../hooks/useAuth'

const TAB_LIST = [
  { id: 'audit-log', label: 'Audit Log' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'project-site', label: 'Project Site' },
  { id: 'audit-form-templete', label: 'Audit Form Template' },
  { id: 'Setting', label: 'Setting' },
]

const AuditRecycleBin = () => {
  const [restoreAuditLogs, { isLoading: restoreLogLoading }] =
    Api.useRestoreAuditLogListInRecycleBinMutation()
  const [deleteAuditLogs] = Api.useDeleteAuditLogListPermanentlyInRecycleBinMutation()
  const [restoreAuditSchedules, { isLoading: restoreScheduleLoading }] =
    Api.useRestoreAuditScheduleListInRecycleBinMutation()
  const [deleteAuditSchedules] = Api.useDeleteAuditScheduleListPermanentlyInRecycleBinMutation()
  const [restoreAuditProjectSites, { isLoading: restoreProjectLoading }] =
    Api.useRestoreAuditProjectSiteListInRecycleBinMutation()
  const [deleteAuditProjectSites] =
    Api.useDeleteAuditProjectSiteListPermanentlyInRecycleBinMutation()
  const [restoreAuditFormTemplates, { isLoading: restoreFormLoading }] =
    Api.useRestoreAuditFormTemplateListInRecycleBinMutation()
  const [deleteAuditFormTemplates] =
    Api.useDeleteAuditFormTemplateListPermanentlyInRecycleBinMutation()

  const [selectedTab, setSelectedTab] = useState<number>(0)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [processed, setProcessed] = useState<null | AUDIT_TABLE_PROCESSED>(null)
  const [restoreDialogOn, setRestoreDialogOn] = useState(false)

  const dispatch = useDispatch()
  const { user } = useAuth();
  const [isDeletableRestorable, setIsDeletableRestorable] = useState(true);
  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.audit.recycle.deleteOrRestoreRecycle)) {
      setIsDeletableRestorable(true);
    }else{
      setIsDeletableRestorable(false);
    }
  }, [])
  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue)
    setSelectedIds([])
  }

  const handleOpenDelete = () => {
    if(isDeletableRestorable){
      setOpenDeleteModal(true)
    }else{
      toast.error('You do not have access to delete!')
    }
    
  }

  const handleOpenRestore = () => {
    if(isDeletableRestorable){
      setRestoreDialogOn(true)
    }else{
      toast.error('You do not have access to restore!')
    }
    
  }
  
  const handleCloseDelete = (deleted?: boolean) => {
    setOpenDeleteModal(false)
    if (deleted) {
      if (selectedTab === 0) {
        deleteAuditLogs(selectedIds)
          .unwrap()
          .then(() => {
            setProcessed(AUDIT_TABLE_PROCESSED.deleted)
            dispatch(_auditLogRecycleActions.setPage(INITIAL_PAGE_NUMBER))
          })
          .catch((err) => {
            console.log('Failed to delete audit logs: ', err)
            toast.error('Failed to delete audit logs')
          })
      } else if (selectedTab === 1) {
        // Delete schedule
        deleteAuditSchedules(selectedIds)
          .unwrap()
          .then(() => {
            setProcessed(AUDIT_TABLE_PROCESSED.deleted)
            dispatch(_auditScheduleRecycleActions.setPage(INITIAL_PAGE_NUMBER))
          })
          .catch((err) => {
            console.log('Failed to delete audit schedules: ', err)
            toast.error('Failed to delete audit schedules')
          })
      } else if (selectedTab === 2) {
        // Delete project site
        deleteAuditProjectSites(selectedIds)
          .unwrap()
          .then(() => {
            setProcessed(AUDIT_TABLE_PROCESSED.deleted)
            dispatch(_auditProjectSiteRecycleActions.setPage(INITIAL_PAGE_NUMBER))
          })
          .catch((err) => {
            console.log('Failed to delete audit project sites: ', err)
            toast.error('Failed to delete audit project sites')
          })
      } else if (selectedTab === 3) {
        // Delete form template
        deleteAuditFormTemplates(selectedIds)
          .unwrap()
          .then(() => {
            setProcessed(AUDIT_TABLE_PROCESSED.deleted)
            dispatch(_auditFormTemplateRecycleActions.setPage(INITIAL_PAGE_NUMBER))
          })
          .catch((err) => {
            console.log('Failed to delete audit form template: ', err)
            toast.error('Failed to delete audit form template')
          })
      }
    }
  }

  const handleStore = () => {
    if (selectedTab === 0) {
      restoreAuditLogs(selectedIds)
        .unwrap()
        .then(() => {
          setProcessed(AUDIT_TABLE_PROCESSED.restored)
          setRestoreDialogOn(false)
        })
        .catch((err) => {
          console.log('Failed to restore audit logs: ', err)
          toast.error('Failed to restore audit logs')
        })
    } else if (selectedTab === 1) {
      // Restore schedule
      restoreAuditSchedules(selectedIds)
        .unwrap()
        .then(() => {
          setProcessed(AUDIT_TABLE_PROCESSED.restored)
          setRestoreDialogOn(false)
        })
        .catch((err) => {
          console.log('Failed to restore audit schedules: ', err)
          toast.error('Failed to restore audit schedules')
        })
    } else if (selectedTab === 2) {
      // Restore project site
      restoreAuditProjectSites(selectedIds)
        .unwrap()
        .then(() => {
          setProcessed(AUDIT_TABLE_PROCESSED.restored)
          setRestoreDialogOn(false)
        })
        .catch((err) => {
          console.log('Failed to restore audit project sites: ', err)
          toast.error('Failed to restore audit project sites')
        })
    } else if (selectedTab === 3) {
      // Restore form template
      restoreAuditFormTemplates(selectedIds)
        .unwrap()
        .then(() => {
          setProcessed(AUDIT_TABLE_PROCESSED.restored)
          setRestoreDialogOn(false)
        })
        .catch((err) => {
          console.log('Failed to restore audit form templates: ', err)
          toast.error('Failed to restore audit form templates')
        })
    }
  }

  const handleChangeSelected = (selected: number[]) => {
    setSelectedIds(selected)
  }

  const handleRemoveNotification = () => {
    setProcessed(null)
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <Typography typography={'h3'}>Recycle Bin</Typography>
      </Box>
      <Box
        mt={3}
        sx={{
          background: '#ffffff',
          pl: 3.75,
          pr: 1.75,
          mb: 3,
          borderRadius: 1.5,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <Box display={'flex'} alignItems={'flex-end'}>
          <Tabs
            value={selectedTab}
            onChange={handleChangeTab}
            aria-label='audit recycle bin'
            sx={{ overflowX: 'auto', '.MuiTabs-flexContainer': { gap: 3 } }}
            variant='scrollable'
            scrollButtons='auto'
          >
            {TAB_LIST.map((tab) => {
              return (
                <Tab
                  key={tab.id}
                  label={tab.label}
                  id={tab.id}
                  aria-controls={`audit-form-template-panel-${tab.id}`}
                  sx={{ px: 1, py: 2, minWidth: 0 }}
                />
              )
            })}
          </Tabs>
        </Box>
        {selectedTab !== 4 && selectedIds.length > 0 && (
          <Box display={'flex'} gap={1.75} sx={{ py: 1 }}>
            <Button variant='contained' color='primary' onClick={handleOpenRestore}>
              Restore
            </Button>
            <Button variant='contained' color='error' onClick={handleOpenDelete}>
              Permanently Delete
            </Button>
          </Box>
        )}
      </Box>
      <AuditRecycleBinDeleteModal
        open={openDeleteModal}
        onClose={handleCloseDelete}
        type={selectedTab}
        ids={[]}
      />
      <Box mt={3.75}>
        {selectedTab === 0 && (
          <AuditLogListRecycle
            onChangeSelected={handleChangeSelected}
            processed={processed}
            onRemoveNotification={handleRemoveNotification}
          />
        )}
        {selectedTab === 1 && (
          <AuditScheduleList
            onChangeSelected={handleChangeSelected}
            processed={processed}
            onRemoveNotification={handleRemoveNotification}
            isRecycleBin={true}
          />
        )}
        {selectedTab === 2 && (
          <AuditRecycleBinProjectSiteList
            onChangeSelected={handleChangeSelected}
            processed={processed}
            onRemoveNotification={handleRemoveNotification}
          />
        )}
        {selectedTab === 3 && (
          <AuditFormTemplateTable
            onChangeSelected={handleChangeSelected}
            processed={processed}
            onRemoveNotification={handleRemoveNotification}
            isRecycleBin={true}
          />
        )}
        {selectedTab === 4 && <AuditRecycleBinSetting />}
      </Box>
      <DeleteDialog
        open={restoreDialogOn}
        onClose={() => setRestoreDialogOn(false)}
        onGoBack={() => setRestoreDialogOn(false)}
        onDelete={() => handleStore()}
        loading={
          restoreLogLoading || restoreProjectLoading || restoreScheduleLoading || restoreFormLoading
        }
        heading={'Are you sure want to restore?'}
        labelBtnDelete='Restore'
        submitBtnColor='primary'
        hasCancel
      />
    </Box>
  )
}

export default AuditRecycleBin
