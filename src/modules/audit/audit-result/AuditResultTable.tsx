import {
  Box,
  Button,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { FC, Fragment, useMemo } from 'react'
import CustomChip from '../../common/CustomChip'
import { IAuditResult } from '../../../types/audit'
import { createArrayByLength } from '../../../helpers/customFunctions'
import BackDrop from '../../common/BackDrop'
import { AUDIT_PASSED_THRESHOLDER } from '../../../helpers/constants'

const getOverAllResults = (auditResult: IAuditResult) => {
  const audits = auditResult.audits
  let totalPerformance = 0
  let performanceCount = 0

  let overallPenalty = 0
  let iuPenalty = 0
  let totalPenalty = 0

  for (const audit of audits) {
    if (audit.performance) {
      totalPerformance += audit.performance
      performanceCount++
    }
    if (audit.penalty && audit.status === 1) {
      overallPenalty += audit.penalty
    }
    if (audit.penalty && audit.status === 2) {
      iuPenalty += audit.penalty
    }
    if (audit.penalty) {
      totalPenalty += audit.penalty
    }
  }
  const avgPerformance = performanceCount > 0 ? totalPerformance / performanceCount : 0

  return {
    avgPerformance,
    overallPenalty,
    iuPenalty,
    totalPenalty,
  }
}
interface IProps {
  data: IAuditResult[]
  loading: boolean
  viewClicked: (result: IAuditResult) => void
  selected: number[]
  setSelected: (f: number[]) => void
}

const AuditResultTable: FC<IProps> = ({ data, loading, viewClicked, selected, setSelected }) => {
  const maxAudits: any[] = useMemo(() => {
    let maxVal = 0
    for (let i = 0; i < data.length; i++) {
      if (data[i].audits.length > maxVal) {
        maxVal = data[i].audits.length
      }
    }
    return createArrayByLength(maxVal)
  }, [data])

  const totalCount = data?.length || 0
  const numSelected = selected?.length || 0

  const handleSelectAll = (selectAll: boolean) => {
    if (selectAll) {
      setSelected(data.map((v) => v.audits?.[0]?.locationId))
    } else {
      setSelected([])
    }
  }
  const handleSelect = (id: number) => {
    if (selected?.includes(id)) {
      setSelected(selected?.filter((itemId) => itemId !== id) || [])
    } else {
      setSelected([id, ...(selected || [])])
    }
  }

  return (
    <Box>
      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: '12px' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: '#F5F8FA50' }}>
              <TableCell colSpan={5}></TableCell>
              {maxAudits?.map((name, idx) => {
                return (
                  <TableCell key={idx} align='center' colSpan={4}>
                    <Typography variant='h5'>Audit {idx + 1}</Typography>
                  </TableCell>
                )
              })}
              <TableCell align='center' colSpan={4}>
                <Typography variant='h5'>Overall</Typography>
              </TableCell>
              <TableCell align='center' colSpan={4}></TableCell>
            </TableRow>
            <TableRow sx={{ background: '#F5F8FA50' }}>
              <TableCell padding='checkbox'>
                <Checkbox
                  color='primary'
                  indeterminate={numSelected > 0 && numSelected < totalCount}
                  checked={totalCount > 0 && numSelected === totalCount}
                  onChange={(e) => {
                    handleSelectAll(e.target.checked)
                  }}
                  inputProps={{
                    'aria-label': 'select all desserts',
                  }}
                />
              </TableCell>
              <TableCell>Project</TableCell>
              <TableCell>Location Category</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>MTR</TableCell>
              <TableCell>70% of MTR</TableCell>
              {maxAudits?.map((item, idx) => {
                return (
                  <Fragment key={idx}>
                    <TableCell>Performance</TableCell>
                    <TableCell>Remarks</TableCell>
                    <TableCell>Formula</TableCell>
                    <TableCell>Penalty</TableCell>
                  </Fragment>
                )
              })}
              <TableCell>Average Performance</TableCell>
              <TableCell>Overall Penalty</TableCell>
              <TableCell>IU Penalty</TableCell>
              <TableCell>Total Penalty</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item, index) => {
              const { avgPerformance, overallPenalty, iuPenalty, totalPenalty } =
                getOverAllResults(item)
              const missedAuditLength = maxAudits.length - (item.audits || []).length
              const missedAudits = createArrayByLength(missedAuditLength)
              return (
                <TableRow key={index}>
                  <TableCell padding='checkbox'>
                    <Checkbox
                      color='primary'
                      checked={selected.includes(item.audits?.[0]?.locationId)}
                      onClick={() => {
                        handleSelect(item.audits?.[0]?.locationId)
                      }}
                    />
                  </TableCell>
                  <TableCell>{item.locationCategory?.project?.name || '-'}</TableCell>
                  <TableCell>{item.locationCategory?.name || '-'}</TableCell>
                  <TableCell>{item.name || '-'}</TableCell>
                  <TableCell>{typeof item.mtr === 'number' ? item.mtr : '-'}</TableCell>
                  <TableCell>
                    {typeof item.mtr === 'number' ? (item.mtr * 0.7).toFixed(2) : '-'}
                  </TableCell>
                  {/* {item.audits?.map((obj, idx) => {
                    return (
                      <Fragment key={idx}>
                        <TableCell>
                          <CustomChip
                            text={
                              typeof obj.performance === 'number'
                                ? `${obj.performance.toFixed(2)}%`
                                : '-'
                            }
                            type={obj.performance >= AUDIT_PASSED_THRESHOLDER ? 'success' : 'error'}
                          />
                        </TableCell>
                        <TableCell>{obj.remarks}</TableCell>
                        <TableCell>{obj.formula || '-'}</TableCell>
                        <TableCell>
                          <Typography
                            color={(theme) =>
                              typeof obj?.penalty === 'number'
                                ? theme.palette.error.main
                                : theme.palette.grey[800]
                            }
                            fontWeight={700}
                          >
                            {typeof obj?.penalty === 'number' ? `$${obj?.penalty.toFixed(2)}` : '-'}
                          </Typography>
                        </TableCell>
                      </Fragment>
                    )
                  })} */}
                  {item.audits?.map((obj, idx) => {
                    return (
                      <Fragment key={idx}>
                        <TableCell>
                          {obj.pdfUrl && (
                            <a href={obj.pdfUrl} download="audit_report.pdf" target="_blank" rel="noopener noreferrer">
                              <CustomChip
                                text={
                                  typeof obj.performance === 'number'
                                    ? `${obj.performance.toFixed(2)}%`
                                    : '-'
                                }
                                type={obj.performance >= AUDIT_PASSED_THRESHOLDER ? 'success' : 'error'}
                              />
                            </a>
                          )}
                          {!obj.pdfUrl && (
                            <CustomChip
                              text="-"
                              type="error"
                            />
                          )}
                        </TableCell>
                        <TableCell>{obj.remarks}</TableCell>
                        <TableCell>{obj.formula || '-'}</TableCell>
                        <TableCell>
                          <Typography
                            color={(theme) =>
                              typeof obj?.penalty === 'number'
                                ? theme.palette.error.main
                                : theme.palette.grey[800]
                            }
                            fontWeight={700}
                          >
                            {typeof obj?.penalty === 'number' ? `$${obj?.penalty.toFixed(2)}` : '-'}
                          </Typography>
                        </TableCell>
                      </Fragment>
                    );
                  })} 
                  {missedAudits.map((_, idx) => {
                    return (
                      <Fragment key={idx}>
                        <TableCell>-</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>-</TableCell>
                      </Fragment>
                    )
                  })}
                  <TableCell>{avgPerformance.toFixed(2)}</TableCell>
                  <TableCell>{overallPenalty.toFixed(2)}</TableCell>
                  <TableCell>{iuPenalty.toFixed(2)}</TableCell>
                  <TableCell>{totalPenalty.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button
                      variant='contained'
                      color='inherit'
                      sx={{
                        backgroundColor: (theme) => theme.palette.grey[100],
                        color: (theme) => theme.palette.grey[700],
                        '&:hover': { background: (theme) => theme.palette.grey[200] },
                      }}
                      onClick={() => viewClicked(item)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        {loading ? (
          <Box sx={{ position: 'relative', height: '60px' }}>
            <BackDrop />
          </Box>
        ) : !data?.length ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <Typography color='textSecondary' variant='h6'>
              No Available Records
            </Typography>
          </Box>
        ) : null}
      </TableContainer>
    </Box>
  )
}

export default AuditResultTable
