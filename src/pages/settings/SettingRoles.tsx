import { useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'

import SettingRoleList from '../../modules/settings/SettingRoleList'
import { IRole } from '../../types/role'
import SettingRoleDetail from '../../modules/settings/SettingRoleDetail'
import deepCopy from '../../helpers/deepCopy'
import Api from '../../api'
import useDebounce from '../../hooks/useDebounce'
import { NEW_ROLE, NEW_ROLE_ID } from '../../helpers/constants'
import useAuth from '../../hooks/useAuth' // Adjust the path if needed

// Inside your component or function

const SettingRoles = () => {
  const [search, setSearch] = useState<string>('')
  const [roles, setRoles] = useState<IRole[]>([])
  const [selectedRole, setSelectedRole] = useState<IRole | null>(null)

  const [updateRoleById] = Api.useUpdateRoleMutation()
  const [createRole] = Api.useCreateRoleMutation()
  const [deleteRole] = Api.useDeleteRoleByIdMutation()

  const debouncedSearch = useDebounce(search, 500)
  const { logout } = useAuth();
  const [getRoleList, { isLoading }] = Api.useLazyGetRoleListQuery()

  const loadData = (text?: string) => {
    const params = {
      page: 1,
      limit: 100,
      ...(text ? { text } : {}),
    }
    getRoleList(params)
      .unwrap()
      .then((res) => {
        const roles = res.rows
        setRoles(roles)
      })
      .catch((err) => {
        console.error('Failed to read roles: ', err)
        setRoles([])
      })
  }

  const handleSelectRole = (role: IRole) => {
    setSelectedRole({ ...role })
  }

  const handleChangeSearch = (search: string) => {
    setSearch(search)
  }

  const handleChangeRole = (role: IRole, callback?: () => void) => {
    const updateRoles = (role: IRole, roleId: number) => {
      setSelectedRole(deepCopy(role))

      const newRoles = roles.map((_role) => {
        if (_role.id === roleId) return deepCopy(role)
        return _role
      })

      setRoles(deepCopy(newRoles))
    }

    updateRoles(role, role.id)

    if (role.id === NEW_ROLE_ID) {
      // create
      const createdRole: any = { ...role }
      delete createdRole.id
      delete createdRole.userCount

      createRole(createdRole)
        .unwrap()
        .then((res) => {
          const newRole = { ...role, id: res.id }
          updateRoles(newRole, NEW_ROLE_ID)
        })
        .catch((err) => {
          console.error('Failed to create a role: ', err)
        })
        .finally(() => {
          if (callback) callback()
        })
    } else {
      // update
      const updatedRole: any = { ...role }
      delete updatedRole.id
      delete updatedRole.userCount

      updateRoleById({ id: role.id, data: updatedRole })
        .unwrap()
        .catch((err) => {
          console.error('Failed to update a role: ', err)
        })
        .finally(() => {
          if (callback) callback()
        })
    }
    logout();
  }

  const handleDeleteRole = (role: IRole, callback?: () => void) => {
    const deleteRoles = (role: IRole) => {
      if (role.id === selectedRole?.id) setSelectedRole(null)

      const newRoles = roles.filter((_role) => {
        return _role.id !== role.id
      })

      setRoles(deepCopy(newRoles))
    }

    // delete
    deleteRole(role.id)
      .unwrap()
      .then(() => {
        deleteRoles(role)
      })
      .catch((err) => {
        console.error('Failed to delete a role: ', err)
      })
      .finally(() => {
        if (callback) callback()
      })
  }

  const handleAddNewRole = () => {
    const newRoles = deepCopy(roles)
    newRoles.push(NEW_ROLE)
    setRoles(deepCopy(newRoles))
  }

  useEffect(() => {
    loadData(debouncedSearch)
  }, [debouncedSearch])

  return (
    <Box>
      <Typography typography={'h3'} mb={2.75}>
        Role and Module Assignment
      </Typography>
      <Grid container columnSpacing={3.25} rowSpacing={3.25}>
        <Grid item lg={4} xs={12}>
          <SettingRoleList
            roles={roles}
            selected={selectedRole}
            search={search}
            onChangeSearch={handleChangeSearch}
            onChangeSelected={handleSelectRole}
            isLoading={isLoading}
            onChangeRole={handleChangeRole}
            onDeleteRole={handleDeleteRole}
            onAddNewRole={handleAddNewRole}
          />
        </Grid>
        <Grid item lg={8} xs={12}>
          {selectedRole && <SettingRoleDetail role={selectedRole} onChange={handleChangeRole} />}
        </Grid>
      </Grid>
    </Box>
  )
}

export default SettingRoles
