import React from 'react'
import { Table, TableHead, TableBody, TableRow, TableCell, Box, Typography } from '@mui/material'
import { IStaffOtj } from '../../types/user'
import CustomChip from '../common/CustomChip'
import getTaskStaffOtjStatusInfo from '../../helpers/getTaskStaffOtjStatusInfo'

const UserOtj: React.FC<{ otjs: IStaffOtj[] }> = ({ otjs }) => {
  const tableStyle: React.CSSProperties = {
    border: '1px solid #000',
    borderCollapse: 'collapse',
    width: '100%',
  }

  const thStyle: React.CSSProperties = {
    border: '1px solid #000',
    backgroundColor: '#f0f0f0',
    padding: '8px',
    textAlign: 'left',
    background: '#fff',
    fontSize: '18px',
    color: '#3F4254',
  }

  const tdStyle: React.CSSProperties = {
    borderBottom: '1px dashed #DADADA',
    borderRight: '1px solid #000',
    padding: '8px',
    textAlign: 'left',
    fontSize: '16px',
    color: '#3F4254',
  }

  const firstColumnWidth = '60%'
  const otherColumnsWidth = '20%'

  return (
    <Box sx={{ pt: 3.5, pr: 4, pb: 5, pl: 5 }}>
      <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
        <Typography typography={'h5'} sx={{ fontSize: '1.125rem' }}>
          OJT (On-The-Job)
        </Typography>
      </Box>
      <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
        <Table style={tableStyle}>
          <TableHead>
            <TableRow style={thStyle}>
              <TableCell style={{ ...thStyle, width: firstColumnWidth }}>SOP List</TableCell>
              <TableCell style={{ ...thStyle, width: otherColumnsWidth }}>Time Taken</TableCell>
              <TableCell style={{ ...thStyle, width: otherColumnsWidth }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {otjs.map((otj) => {
              const statusInfo = getTaskStaffOtjStatusInfo(Number(otj.status))
              const chip = (
                <CustomChip
                  text={statusInfo?.label || '_'}
                  type={statusInfo?.chipType || 'error'}
                />
              )

              return (
                <TableRow>
                  <TableCell style={{ ...tdStyle, width: firstColumnWidth }}>{otj.sop}</TableCell>
                  <TableCell style={{ ...tdStyle, width: otherColumnsWidth }}>
                    {otj.time} {otj.unit}
                  </TableCell>
                  <TableCell style={{ ...tdStyle, width: otherColumnsWidth }}>{chip}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Box>
    </Box>
  )
}

export default UserOtj
