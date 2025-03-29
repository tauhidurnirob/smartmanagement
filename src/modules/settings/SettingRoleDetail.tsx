import { FC, useState, useMemo } from 'react';
import { Box, Card, Checkbox, Divider, Switch, Typography, Button, Grid } from '@mui/material';

import { IRole, IRolePermissionItem, IRoleSubPermissionItem } from '../../types/role';
import deepCopy from '../../helpers/deepCopy';
import { ROLE_MOBILE_KEYS, ROLE_PERMISSION_LIST } from '../../helpers/constants';
import getAllPermissionsForWebUser from '../../helpers/getAllPermissionsForWebUser';
import getAllPermissionsForStaff from '../../helpers/getAllPermissionsForStaff';

interface IProps {
  role: IRole;
  onChange: (role: IRole) => void;
}

const SettingRoleDetail: FC<IProps> = ({ role, onChange }) => {
  const [permissions, setPermissions] = useState<string[]>([]);
  const [initPermissions, setInitPermissions] = useState<string[]>([]);

  const initialIsAuditor: boolean = typeof role.isAuditor === 'boolean' ? role.isAuditor : false;
  const initialIsCleaner: boolean = typeof role.isCleaner === 'boolean' ? role.isCleaner : false;
  const initialIsSupervisor: boolean = typeof role.isSupervisor === 'boolean' ? role.isSupervisor : false;

  const [isAuditor, setIsAuditor] = useState<boolean>(initialIsAuditor);
  const [isCleaner, setIsCleaner] = useState<boolean>(initialIsCleaner);
  const [isSupervisor, setIsSupervisor] = useState<boolean>(initialIsSupervisor);

  console.log('role',ROLE_PERMISSION_LIST)
  
  useMemo(() => {
    const { isAuditor, isCleaner, isSupervisor } = role;
    const newPermissions = [...(role.permission.permissions || [])];

    if (isCleaner) {
      newPermissions.push(ROLE_MOBILE_KEYS.cleaner);
    }

    if (isSupervisor) {
      newPermissions.push(ROLE_MOBILE_KEYS.supervisor);
    }

    if (isAuditor) {
      newPermissions.push(ROLE_MOBILE_KEYS.auditor);
    }

    setPermissions(newPermissions);
    setIsAuditor(isAuditor || false);
    setIsCleaner(isCleaner || false);
    setIsSupervisor(isSupervisor || false);
    setInitPermissions([...(role.permission.permissions || [])]);
  }, [role]);


  const handleChangePermission = (key: string, isChecked: boolean) => {
    let newPermissions = [...permissions];
  
    // Update the permissions array based on the switch state
    if (isChecked) {
      newPermissions.push(key);
    } else {
      newPermissions = newPermissions.filter(item => item !== key);
    }
  
    // Update the state of sub-permissions based on the switch state
    const updatedSubPermissions = ROLE_PERMISSION_LIST.flatMap(item => {
      if (item.key === key && item.subPermissions) {
        return item.subPermissions.map(subItem => subItem.key);
      }
      return [];
    });
  
    const updatedPermissions = isChecked
      ? [...permissions, ...updatedSubPermissions]
      : permissions.filter(item => !updatedSubPermissions.includes(item));
  
    setPermissions(updatedPermissions);
  
    // Update the state of the primary switch based on the child switches and checkboxes
    const isPrimaryChecked = updatedPermissions.includes(key);
    if (isChecked && !isPrimaryChecked) {
      setPermissions([...updatedPermissions, key]);
    } else if (!isChecked && isPrimaryChecked) {
      setPermissions(updatedPermissions.filter(item => item !== key));
    }
  };
  
  const handleChangeIsStaff = (isStaff: boolean) => {
    let newPermissions: string[] = [];
    if (!isStaff) {
      newPermissions = getAllPermissionsForWebUser();
      onChange({
        ...role,
        isStaff,
        isAuditor: false,
        isCleaner: false,
        isSupervisor: false,
        permission: { ...(role.permission || {}), permissions: newPermissions },
      });
    } else {
      newPermissions = [ROLE_MOBILE_KEYS.root];
      onChange({
        ...role,
        isStaff,
        isAuditor: true,
        isCleaner: true,
        isSupervisor: true,
        permission: { ...(role.permission || {}), permissions: newPermissions },
      });
    }
  };

  const handleSave = () => { 
    console.log("permissions#")
    console.log(permissions)
    const updatedRole = {
      ...role,
      isAuditor,
      isCleaner,
      isSupervisor,
      permission: { ...(role.permission || {}), permissions },
    };
    onChange(updatedRole);
  };

  return (
    <Box>
      <Grid container alignItems="center">
        <Grid item xs={6}>
          <Typography typography={'h2'} sx={{ fontWeight: 600, color: 'grey.800' }}>
            {role.name}
          </Typography>
        </Grid>
        <Grid item xs={6} textAlign="right">
          <Button variant="contained" color="primary" onClick={() => handleSave()}>
            Save
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 0.5,
            alignItems: 'center',
            mt: 1.5,
            mb: 2.5,
          }}
        >
          <Typography typography={'h5'} sx={{ color: 'grey.800' }}>
            Allow this role to be inside staff list
          </Typography>
          <Switch checked={!!role.isStaff} onChange={(e) => handleChangeIsStaff(e.target.checked)} />
        </Box>
        {ROLE_PERMISSION_LIST.map((item, idx) => {
          const { label, items, subPermissions, key } = item;
          const isCheckedPrimary = permissions.includes(key);
          return (
            <Card key={`permission-main-list-${idx}`} sx={{ pt: 3.5, pl: 5, pr: 3.5, pb: 4 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography typography={'h4'} sx={{ fontSize: '1.125rem', color: 'grey.800' }}>
                  {label}
                </Typography>
                <Switch checked={isCheckedPrimary} onChange={(e) => handleChangePermission(key, e.target.checked)} />
              </Box>
              <Divider light sx={{ mt: 3 }} />
              {!!items && items?.length > 0 && (
                <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 3.75, pl: 2.5 }}>
                  {items.map((permissionItem, itemIdx) => {
                    const { label: itemLabel, key: itemKey } = permissionItem;
                    const isCheckedItem = permissions.includes(itemKey);
                    return (
                      <Box
                        key={`permission-main-item-${itemIdx}`}
                        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 3 }}
                      >
                        <Checkbox
                          sx={{ p: 0 }}
                          size='small'
                          checked={isCheckedItem}
                          disabled={!isCheckedPrimary}
                          onChange={(e) => handleChangePermission(itemKey, e.target.checked)}
                        />
                        <Typography
                          typography={'h4'}
                          sx={{ color: isCheckedItem ? 'grey.800' : 'grey.600' }}
                        >
                          {itemLabel}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              )}
              {!!subPermissions && subPermissions?.length > 0 && (
                <Box sx={{ mt: 2.75, display: 'flex', flexDirection: 'column', pl: 2.5 }}>
                  {subPermissions.map((subPermission, subPermissionIdx) => {
                    const { label: subPermissionLabel, items: subItems, key: subKey } = subPermission;
                    const isLast = subPermissions.length === subPermissionIdx + 1;
                    const isCheckedSub = useMemo(() => {
                      // Calculate isCheckedSub based on permissions and isCheckedPrimary
                      return permissions.includes(subKey) && isCheckedPrimary;
                    }, [permissions, isCheckedPrimary, subKey]);
                    return (
                      <Box key={`permission-sub-list-${subPermissionIdx}`}>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <Typography typography={'h4'} sx={{ color: 'grey.800' }}>
                            {subPermissionLabel}
                          </Typography>
                          <Switch
                            checked={isCheckedSub}
                            disabled={!isCheckedPrimary}
                            onChange={(e) => handleChangePermission(subKey, e.target.checked)}
                          />
                        </Box>

                        {!!subItems && subItems?.length > 0 && (
                          <Box
                            sx={{
                              mt: 1.5,
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 3.75,
                            }}
                          >
                            {subItems.map((subItem, subItemIdx) => {
                              const { label: subItemLabel, key: subItemKey } = subItem;
                              const isCheckedSubItem = permissions.includes(subItemKey);
                              return (
                                <Box
                                  key={`permission-submain-item-${subItemIdx}`}
                                  sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 3,
                                  }}
                                >
                                  <Checkbox
                                    sx={{ p: 0 }}
                                    size='small'
                                    checked={isCheckedSubItem}
                                    disabled={!isCheckedSub}
                                    onChange={(e) => handleChangePermission(subItemKey, e.target.checked)}
                                  />
                                  <Typography
                                    typography={'h4'}
                                    sx={{ color: isCheckedSubItem ? 'grey.800' : 'grey.600' }}
                                  >
                                    {subItemLabel}
                                  </Typography>
                                </Box>
                              );
                            })}
                          </Box>
                        )}
                        {!isLast && <Divider light sx={{ mt: 5.75, mb: 5 }} />}
                      </Box>
                    );
                  })}
                </Box>
              )}
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default SettingRoleDetail;

