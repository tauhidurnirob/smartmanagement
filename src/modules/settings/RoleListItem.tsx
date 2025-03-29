import { FC, useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import { IRole } from '../../types/role'
import MoreOptionButton from '../common/MoreOptionButton'
import { TrashTrashIcon } from '../../assets/icons/trash-outline'
import { PenEditIcon } from '../../assets/icons/pen-edit'
import TextFieldWithLabel from '../common/TextFieldWithLabel'
import DeleteDialog from '../common/DeleteDialog'
import deepCopy from '../../helpers/deepCopy'
import { NEW_ROLE_ID } from '../../helpers/constants'

interface IProps {
  role: IRole
  selected: boolean
  onSelect: (role: IRole) => void
  onChange: (role: IRole, callback?: () => void) => void
  onDelete: (role: IRole, callback?: () => void) => void
}

const RoleListItem: FC<IProps> = ({ role, selected, onSelect, onChange, onDelete }) => {
  const [name, setName] = useState<string>('')
  const [isEdit, setEdit] = useState<boolean>(false)
  const [deleteRole, setDeleteRole] = useState<boolean>(false)
  const [isUpdating, setIsUpdating] = useState<boolean>(false)

  const handleEditName = () => {
    setEdit(true)
  }

  const handleChangeName = (name: string) => {
    setName(name)
  }

  const handleSave = () => {
    const updatedRole = deepCopy(role)
    updatedRole.name = name

    setIsUpdating(true)
    onChange(updatedRole, () => {
      setEdit(false)
      setIsUpdating(false)
    })
  }

  const handleOpenDelete = () => {
    setDeleteRole(true)
  }

  const handleDelete = () => {
    setIsUpdating(true)
    onDelete(role, () => {
      setIsUpdating(false)
      setDeleteRole(false)
    })
  }
  const handleCloseDelete = () => {
    setDeleteRole(false)
    setIsUpdating(false)
  }

  useEffect(() => {
    setName(role.name || '')
    if (role.id === NEW_ROLE_ID) {
      setEdit(true)
    }
  }, [role])

  if (isEdit) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1,

          borderTop: '1px solid ',
          borderTopColor: 'grey.100',
          py: 1,
          pr: 1.5,
          pl: 1,
        }}
      >
        <TextFieldWithLabel
          label={''}
          showLabel={false}
          height='44px'
          name={name}
          placeholder={'Role Name'}
          value={name}
          onChange={(e) => handleChangeName(e.target.value)}
          textColor='grey.600'
          disabled={isUpdating}
        />
        <LoadingButton variant='contained' size='small' onClick={handleSave} loading={isUpdating}>
          Save
        </LoadingButton>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        py: 2.25,
        pl: 2.5,
        pr: 1.5,
        backgroundColor: selected ? 'primary.light' : '#ffffff',
        borderTop: '1px solid ',
        borderTopColor: 'grey.100',
        borderLeft: '3px solid',
        borderLeftColor: selected ? 'primary.main' : '#ffffff',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
      }}
      onClick={() => {
        onSelect(role)
      }}
    >
      <Typography typography={'h4'} sx={{ flex: 1, fontWeight: 500, color: 'grey.600' }}>
        {name}
      </Typography>
      <Typography typography={'h4'} sx={{ fontWeight: 500, color: 'grey.600' }}>
        {role.userCount || 0}
      </Typography>
      <MoreOptionButton
        list={[
          {
            title: 'Rename',
            onClick: handleEditName,
            icon: PenEditIcon,
            isFirstIcon: true,
            color: 'grey.800',
            bgColor: 'grey.100',
          },
          {
            title: 'Delete',
            onClick: handleOpenDelete,
            icon: TrashTrashIcon,
            isFirstIcon: true,
            color: 'error.main',
            bgColor: 'error.light',
          },
        ]}
      />
      <DeleteDialog
        open={!!deleteRole}
        onClose={() => handleCloseDelete()}
        heading={'Are you sure you want to delete this role?'}
        subHeading={
          <span>
            You will delete all the user under this role. This action cannot <br /> be undone, so
            please be sure before proceeding.
          </span>
        }
        onDelete={() => handleDelete()}
        onGoBack={() => handleCloseDelete()}
        loading={isUpdating}
      />
    </Box>
  )
}

export default RoleListItem
