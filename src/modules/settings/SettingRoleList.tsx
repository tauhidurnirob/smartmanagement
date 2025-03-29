import { FC, useMemo } from 'react'
import { Box, Button, Card, Stack, Typography } from '@mui/material'

import SearchField from '../common/SearchField'
import { IRole } from '../../types/role'

import RoleListItem from './RoleListItem'
import { AddRoleIcon } from '../../assets/icons/add-role'
import BackDrop from '../common/BackDrop'
import { NEW_ROLE } from '../../helpers/constants'

const NEW_ROLE_ID = -1

interface IProps {
  roles: IRole[]
  selected: IRole | null
  search: string
  isLoading: boolean
  onChangeSearch: (search: string) => void
  onChangeSelected: (selected: IRole) => void
  onChangeRole: (role: IRole, callback?: () => void) => void
  onDeleteRole: (role: IRole, callback?: () => void) => void
  onAddNewRole: () => void
}

const SettingRoleList: FC<IProps> = ({
  roles,
  selected,
  search,
  isLoading,
  onChangeSearch,
  onChangeSelected,
  onChangeRole,
  onDeleteRole,
  onAddNewRole,
}) => {
  const hasNewRole = useMemo(() => {
    const newRole = roles.find((role) => role.id === NEW_ROLE_ID)
    return !!newRole
  }, [roles])

  const handleAddNewRole = () => {
    onAddNewRole()
  }

  return (
    <Card sx={{ pt: 3.25, pb: 3.25 }}>
      <Box sx={{ pl: 2.25, pr: 3 }}>
        <Typography typography={'h3'} sx={{ fontWeight: 500, fontSize: '1.125rem' }}>
          Roles
        </Typography>
        <SearchField
          value={search}
          onChange={(e) => onChangeSearch(e.target.value)}
          placeholder='Search Role'
          sx={{
            mt: 1.5,
            backgroundColor: 'grey.100',
            minWidth: 0,
            height: '42px',
            justifyContent: 'center',
          }}
        />
      </Box>

      {isLoading && (
        <Box sx={{ position: 'relative', height: '60px', my: 1 }}>
          <BackDrop />
        </Box>
      )}
      <Stack sx={{ display: 'flex', flexDirection: 'column', mt: 3.5 }}>
        {roles.map((role, idx) => {
          return (
            <RoleListItem
              key={`role-item-${idx}`}
              role={role}
              selected={role.id === selected?.id}
              onSelect={onChangeSelected}
              onChange={onChangeRole}
              onDelete={onDeleteRole}
            />
          )
        })}
      </Stack>
      {!hasNewRole && (
        <Box sx={{ pl: 2.25, pr: 3, mt: 1 }}>
          <Button
            variant='contained'
            size='large'
            startIcon={<AddRoleIcon sx={{ color: '#C7EBFF' }} />}
            sx={{ width: '100%' }}
            onClick={handleAddNewRole}
          >
            Add Role
          </Button>
        </Box>
      )}
    </Card>
  )
}

export default SettingRoleList
