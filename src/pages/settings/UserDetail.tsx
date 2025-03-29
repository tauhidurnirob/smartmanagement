import { useEffect, useMemo, useState } from 'react'
import { To, useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Card, Divider, Stack, Typography, Tabs, Tab } from '@mui/material'
import dayjs from 'dayjs'
import DeleteIcon from '@mui/icons-material/Delete'
import { LoadingButton } from '@mui/lab'
import { toast } from 'react-toastify'
import ButtonBack from '../../modules/common/ButtonBack'
import { DATE_FORMAT_WITHOUT_MIN } from '../../constants/common'
import AvatarUpload from '../../modules/common/AvatarUpload'
import { PenWithOutlineIcon } from '../../assets/icons/pen-with-outline'
import UserDetailActivityList from '../../modules/user/UserDetailActivityList'
import UserCreateEdit from '../../modules/user/UserCreateEdit'
import Api from '../../api'
import BackDrop from '../../modules/common/BackDrop'
import ImageDropzoneByIcon from '../../modules/common/ImageDropzoneByIcon'
import DeleteDialog from '../../modules/common/DeleteDialog'
import isDataImage from '../../helpers/isDataImage'
import useAuth from '../../hooks/useAuth'
import { ROLE_PERMISSION_KEYS } from '../../helpers/constants'
const TAB_LIST = [
  { id: 'overview', label: 'Overview' },
  { id: 'activity-log', label: 'Activity Log' },
]

const UserDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth(); // Accessing getRoutesInfo function from useAuth hook
  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.taskManagement.staff.deleteStaff)) {
      setIsDeletable(true);
    }else{
      setIsDeletable(false);
    }
  
  }, []);
  const [isDeletable, setIsDeletable] = useState(true);
  const userId = Number(id)

  const [selectedTab, setSelectedTab] = useState<number>(0)
  const [openDeleteProfile, setDeleteProfile] = useState<boolean>(false)
  const [userAvatar, setUserAvatar] = useState<string | null>(null)

  const { data: userData, isLoading: isReading } = Api.useGetUserByIdQuery(userId, {
    skip: !isFinite(userId),
  })
  const [deleteUsers, { isLoading: isDeleting }] = Api.useDeleteUsersMutation()
  const [updateUserById, { isLoading: isUpdating }] = Api.useUpdateUserByIdMutation()
  const [uploadAvatar, { isLoading: isUpdatingAvatar }] = Api.useUploadFileMutation()

  const { strLastSignIn, fullName, roleName } = useMemo(() => {
    const lastSignIn = userData?.lastSignInAt
    const fullName = userData?.fullName
    const roleName = userData?.role?.name || '-'

    const strLastSignIn = lastSignIn ? dayjs(lastSignIn).format(DATE_FORMAT_WITHOUT_MIN) : '-'

    return { strLastSignIn, fullName, roleName }
  }, [userData])

  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue)
  }

  const handleChangeAvatar = async (files: File[]) => {
    const file = files[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const url = (reader.result as string) || null
        setUserAvatar(url)
      }
      reader.readAsDataURL(file)

      let urlAvatar = ''
      urlAvatar = await uploadAvatar(file)
        .unwrap()
        .then((res) => res.fileUrl)
        .catch((err) => {
          console.error('Failed to upload a user profile: ', err)
          toast.error('Failed to upload a user profile')
          return ''
        })

      updateUserById({ id: userData?.id, data: { avatarUri: urlAvatar || '' } })
        .unwrap()
        .then(() => {
          toast.success('Update the user')
        })
        .catch((err) => {
          console.error('Failed to update the user: ', err)
          toast.error(err.data.message || 'Failed to update the user')
        })
        .finally(() => {
          setDeleteProfile(false)
        })
    }
  }

  const handleOpenDeleteProfile = () => {
    setDeleteProfile(true)
  }

  const handleDeleteProfileAvatar = () => {
    updateUserById({ id: userData?.id, data: { avatarUri: '' } })
      .unwrap()
      .then(() => {
        toast.success('Update the user')
      })
      .catch((err) => {
        console.error('Failed to update the user: ', err)
        toast.error(err.data.message || 'Failed to update the user')
      })
      .finally(() => {
        setDeleteProfile(false)
      })
  }

  const handleDeleteUser = () => {
    if(isDeletable){
      deleteUsers({ ids: [userData.id] })
      .unwrap()
      .then(() => {
        toast.success('Deleted the user')
        navigate('/settings/users')
      })
      .catch((err) => {
        console.error('Failed to delete the user: ', err)
        toast.error('Failed to delete the user')
      })
    }else{
      toast.error('You do not have permission to delete!')
    }
    
  }

  useEffect(() => {
    if (userData) {
      setUserAvatar(userData.avatarUri || null)
    }
  }, [userData])

  return (
    <Box>
      <ButtonBack to={-1 as To} />
      <Typography variant='h3' mt={4.75} ml={2.75}>
        Staff Details
      </Typography>
      {isReading ? (
        <Card
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 3,
            py: 3.75,
            px: 4,
          }}
        >
          <Box sx={{ position: 'relative', height: '30px' }}>
            <BackDrop size={30} />
          </Box>
        </Card>
      ) : (
        <>
          <Card sx={{ mt: 3, pt: 3.75, pb: 0, pl: 4.375, pr: 4 }}>
            <Stack
              sx={{
                display: 'flex',
                flexDirection: { lg: 'row', xs: 'column' },
                flexWrap: 'wrap',
                gap: 2,
                justifyContent: 'space-between',
                alignItems: { lg: 'center', xs: 'flex-start' },
                height: '100%',
                width: '100%',
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', gap: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', gap: 1 }}>
                  <AvatarUpload
                    onDrop={handleChangeAvatar}
                    image={userAvatar}
                    sx={{ width: '160px', height: '160px' }}
                    avatarName={fullName?.[0] || ''}
                    disabled={true}
                    loading={isUpdating || isUpdatingAvatar}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <ImageDropzoneByIcon
                      onDrop={handleChangeAvatar}
                      loading={isUpdating || isUpdatingAvatar}
                    />
                    <LoadingButton
                      size='small'
                      sx={{ p: 1, backgroundColor: 'grey.50', minWidth: 0 }}
                      onClick={handleOpenDeleteProfile}
                      loading={isUpdating || isUpdatingAvatar}
                    >
                      <DeleteIcon sx={{ fontSize: 16 }} />
                    </LoadingButton>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='h2' color='grey.800'>
                    {fullName}
                  </Typography>
                  <Typography variant='h5' color='grey.400'>
                    {roleName}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  height: '100%',
                  width: { lg: 'auto', xs: '100%' },
                }}
              >
                <Box sx={{}}>
                  <LoadingButton
                    variant='contained'
                    color='error'
                    sx={{ px: 2.5, py: 1.5, lineHeight: 1 }}
                    onClick={handleDeleteUser}
                    loading={isDeleting || isUpdating || isUpdatingAvatar}
                  >
                    Delete User
                  </LoadingButton>
                </Box>
                <Stack
                  sx={{
                    display: 'flex',
                    gap: 4,
                    mt: { lg: 10.25, xs: 2 },
                    mb: 2,
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Typography variant='h5' color='grey.400'>
                    Last Sign-in On
                  </Typography>
                  <Typography variant='h5'>{strLastSignIn}</Typography>
                </Stack>
              </Box>
            </Stack>
            <Divider light sx={{ mt: 4 }} />
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
          </Card>
          <Box sx={{ mt: 2.5 }}>
            {selectedTab === 0 && <UserCreateEdit user={userData} />}
            {selectedTab === 1 && <UserDetailActivityList user={userData} />}
          </Box>
        </>
      )}
      <DeleteDialog
        open={openDeleteProfile}
        onClose={() => setDeleteProfile(false)}
        heading={'Are you sure you want to delete this profile?'}
        onDelete={() => handleDeleteProfileAvatar()}
        onGoBack={() => setDeleteProfile(false)}
        loading={isUpdating}
      />
    </Box>
  )
}

export default UserDetail
