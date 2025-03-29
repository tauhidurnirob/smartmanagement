import { FC, useMemo, useState } from 'react'
import { Box, Divider, Paper, Stack, Tab, Tabs, Typography } from '@mui/material'
import { LoadingButton, TabContext, TabPanel } from '@mui/lab'
import dayjs from 'dayjs'

import { IAudit } from '../../../types/audit'
import DashedBox from './DashedBox'
import { DATE_FORMAT } from '../../../constants/common'
import BackDrop from '../../common/BackDrop'
import AuditDetailsPanel from './AuditDetailsPanel'
import { DownloadLight } from '../../../assets/icons/download-light'
import { ILocation } from '../../../types/location'
import { AUDIT_STATES, MONTHS } from '../../../helpers/constants'
import { WarningTriangleRounded } from '../../../assets/icons/warning-triangle-rounded'
import { ISelectItem } from '../../../types/common'
import SimpleSelect from '../../common/SimpleSelect'
import FormSelect from '../FormSelector'
import { generateYearOptions } from '../../../helpers/generateYearOptions'

interface IProps {
  location: ILocation | null
  audits: IAudit[]
  isLoading: boolean
  handleDownloadAll: (locationId: number | undefined) => void
  downloadAllLoading: boolean
  downloadAudit: (v: IAudit) => void
  downloadLoading: boolean
  month: ISelectItem
  setMonth: (v: ISelectItem) => void
  year: ISelectItem
  setYear: (v: ISelectItem) => void
  selectedForm: number | null
  handleChangeForm: (formId: number) => void
}

const AuditDetailsOverview: FC<IProps> = ({
  location,
  audits,
  isLoading,
  downloadAllLoading,
  handleDownloadAll,
  downloadAudit,
  downloadLoading,
  month,
  setMonth,
  year,
  setYear,
  selectedForm,
  handleChangeForm
}) => {
  const [currentTab, setCurrentTab] = useState(0)

  const { locationName, lastSubmittedAt, mtr, totalAudit, passedAudit, overallFailure, iuFailure} =
    useMemo(() => {
      const passedAudit =
        audits.filter((audit) => audit.status === AUDIT_STATES[0].value).length || 0
      const overallFailure =
        audits.filter((audit) => audit.status === AUDIT_STATES[1].value).length || 0
     const iuFailure = audits.filter((audit) => audit.status === AUDIT_STATES[2].value).length || 0
      const lastSubmittedAt = audits.reduce(
        (s, a) => Math.max(s, a.submittedAt ? new Date(a.submittedAt).getTime() : 0),
        0
      )
      const locationName = location?.name

      return {
        location,
        mtr: location?.mtr || 0,
        totalAudit: audits.length,
        passedAudit,
        overallFailure,
        iuFailure,
        lastSubmittedAt,
        locationName,
      }
    }, [audits, location])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue)
  }

  return (
    <Box position='relative' mt={3}>
      {isLoading && <BackDrop />}
      <TabContext value={String(currentTab)}>
        <Box>
          <Paper elevation={0} sx={{ px: 4, pt: 4 }}>
            <Stack direction='row' justifyContent='space-between' gap={2} flexWrap='wrap'>
              <Box>
                <Typography variant='h3' mb={2}>
                  {locationName || '-'}
                </Typography>
                <Typography variant='h4'>
                  <Typography component='span' color='text.secondary'>
                    MTR:
                  </Typography>{' '}
                  {mtr}
                </Typography>
              </Box>
              {!!audits?.length && (
                <Box>
                  <LoadingButton
                    variant='contained'
                    loading={downloadAllLoading}
                    startIcon={<DownloadLight sx={{ fontSize: 15 }} />}
                    onClick={() => handleDownloadAll(location?.id)}
                  >
                    Download all Audit Form
                  </LoadingButton>
                </Box>
              )}
            </Stack>
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='center'
              gap={2}
              flexWrap='wrap'
              mt={4}
            >
              <Stack direction='row' justifyContent='space-between' gap={2} flexWrap='wrap'>
                <DashedBox number={totalAudit} text='Total Audit' />
                <DashedBox
                  color={(theme: any) => theme.palette.primary.main}
                  number={passedAudit}
                  text='Passed Audit'
                />
                <DashedBox
                  color={(theme: any) => theme.palette.warning.main}
                  number={overallFailure}
                  text='Overall Failure'
                />
                <DashedBox
                  color={(theme: any) => theme.palette.orange.main}
                  number={iuFailure}
                  text='IU Failure'
                />
              </Stack>
              <Box>
                <Typography variant='h4'>
                  <Typography component='span' color='text.secondary'>
                    Last audit submission:
                  </Typography>{' '}
                  {lastSubmittedAt ? dayjs(lastSubmittedAt).format(DATE_FORMAT) : '-'}
                </Typography>
                <Stack
                  mt={2}
                  direction={'row'}
                  gap={2}
                  justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
                >
                  <SimpleSelect
                    width={'100%'}
                    value={month}
                    options={MONTHS}
                    onChange={(val) => setMonth(val)}
                  />
                  <SimpleSelect
                    width={'100%'}
                    value={year}
                    options={generateYearOptions()}
                    onChange={(val) => setYear(val)}
                  />
                </Stack>
              </Box>
            </Stack>
            <Divider sx={{ mt: 4, mb: 1 }} />
            <Box>
              <Tabs
                textColor='primary'
                indicatorColor='primary'
                value={currentTab}
                onChange={handleChange}
                variant='scrollable'
              >
                {audits?.map((item, index) => {
                  const status = item.status
                  return (
                    <Tab
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant='h4' sx={{ fontWeight: 500, color: 'inherit' }}>
                            Audit {index + 1}
                          </Typography>
                          {typeof status !== 'undefined' && status !== AUDIT_STATES[0].value && (
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 18,
                                height: 18,
                                border: '1px solid #DADADA',
                                borderRadius: '50%',
                                background: (theme) => theme.palette.grey[50],
                                ml: 0.5,
                                color: (theme) =>
                                  status === AUDIT_STATES[1].value
                                    ? theme.palette.error.main
                                    : '#FFA15D',
                              }}
                            >
                              <WarningTriangleRounded sx={{ fontSize: 12, mt: -0.25 }} />
                            </Box>
                          )}
                        </Box>
                      }
                      value={index}
                      sx={{ fontSize: '18px' }}
                      key={index}
                    />
                  )
                })}
              </Tabs>
            </Box>
          </Paper>

          <Box mt={3} display={'flex'} justifyContent={'flex-end'} >
            <FormSelect selected={selectedForm} onChange={handleChangeForm} />
          </Box>

          {audits?.map((item, index) => {
            return (
              <TabPanel key={index} value={String(index)} sx={{ p: '0', mt: '30px' }}>
                <AuditDetailsPanel
                  auditNumber={index + 1}
                  audit={item}
                  location={location}
                  downloadAudit={() => downloadAudit(item)}
                  downloadLoading={downloadLoading}
                />
              </TabPanel>
            )
          })}
          {!audits?.length && (
            <Paper sx={{ p: 4, mt: 3 }}>
              <Typography align='center'>No available audits for this month</Typography>
            </Paper>
          )}
        </Box>
      </TabContext>
    </Box>
  )
}

export default AuditDetailsOverview
