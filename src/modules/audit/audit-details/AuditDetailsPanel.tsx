import { FC, useMemo, useState } from 'react'
import { Box, Grid, Typography, Paper, Button, Divider, Dialog, Stack } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import dayjs from 'dayjs'

import { IAudit } from '../../../types/audit'
import CustomChip from '../../common/CustomChip'
import { ILocation } from '../../../types/location'
import { DownloadLight } from '../../../assets/icons/download-light'
import { DATE_FORMAT } from '../../../constants/common'
import { getAuditStatusLabelByValue } from '../../../helpers/customFunctions'
import getNameOfAssignmentByAudit from '../../../helpers/getNameOfAssignmentByAudit'
import { Document, Page, pdfjs } from 'react-pdf'
import DialogWrapper from '../../common/DialogWrapper'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

interface IProps {
  audit: IAudit
  location: ILocation | null
  downloadAudit: () => void
  downloadLoading: boolean,
  auditNumber: number
}

const AuditDetailsPanel: FC<IProps> = ({ audit, location, downloadAudit, downloadLoading, auditNumber }) => {
  const [previewAudit, setPreviewAudit] = useState<boolean>(false)
  const [numPages, setNumPages] = useState<number | null>(null);

  function onDocumentLoadSuccess({ numPages }: {numPages: number | null}) {
    setNumPages(numPages);
  }

  const details = useMemo(() => {
    return [
      { label: 'Audit ID', value: audit.id },
      {
        label: 'Date Created',
        value: audit.submittedAt ? dayjs(audit.submittedAt).format(DATE_FORMAT) : '-',
      },
      {
        label: 'Name of the assignment',
        value: getNameOfAssignmentByAudit(audit) || '-',
      },
      {
        label: 'Status',
        value: getAuditStatusLabelByValue(audit.status),
      },
      {
        label: 'User',
        value: audit.user?.fullName || '-',
      },
      {
        label: 'Location Field',
        value: location?.name || '-',
      },
      {
        label: 'Audit Number',
        value: auditNumber || '-',
      },
    ]
  }, [audit])

  return (
    <Box>
      <Paper elevation={0}>
        <Box
          p={3}
          display='flex'
          alignItems='flex-start'
          justifyContent='space-between'
          gap={2}
          flexWrap='wrap'
        >
          <Typography variant='h3'>Audit Details</Typography>
          <Box display='flex' gap={2}>
            <Button variant='contained' color='yellow' onClick={() => setPreviewAudit(true)}>
              Preview Audit {auditNumber || `(${audit.id})`} Form
            </Button>
            <LoadingButton
              variant='contained'
              loading={downloadLoading}
              startIcon={<DownloadLight sx={{ fontSize: 15 }} />}
              onClick={downloadAudit}
            >
              Download Audit {auditNumber || `(${audit.id})`} Form
            </LoadingButton>
          </Box>
        </Box>
        <Divider />
        <Box p={3}>
          <Grid container alignItems='center' mt={3} gap={1}>
            <Grid item xs={5}>
              <Typography variant='h4'>Location</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography fontSize={'16px'} color={(theme) => theme.palette.grey[800]}>{location?.name}</Typography>
            </Grid>
          </Grid>
          <Grid container alignItems='center' mt={3} gap={1}>
            <Grid item xs={5}>
              <Typography variant='h4'>MTR</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography fontSize={'16px'} color={(theme) => theme.palette.grey[800]}>
                {location?.mtr || '-'}
              </Typography>
            </Grid>
          </Grid>
          <Grid container alignItems='center' mt={3} gap={1}>
            <Grid item xs={5}>
              <Typography variant='h4'>70% of MTR</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography fontSize={'16px'} color={(theme) => theme.palette.grey[800]}>
                {typeof location?.mtr === 'number' ? (location?.mtr * 0.7).toFixed(2) : '-'}
              </Typography>
            </Grid>
          </Grid>
          <Grid container alignItems='center' mt={3} gap={1}>
            <Grid item xs={5}>
              <Typography variant='h4'>Performance</Typography>
            </Grid>
            <Grid item xs={6}>
              <CustomChip
                type={audit.performance >= 70 ? 'success' : 'error'}
                text={
                  typeof audit.performance === 'number' ? `${audit.performance.toFixed(2)}%` : '-'
                }
              />
            </Grid>
          </Grid>
          <Grid container alignItems='center' mt={3} gap={1}>
            <Grid item xs={5}>
              <Typography variant='h4'>Remarks</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography fontSize={'16px'} color={(theme) => theme.palette.grey[800]}>
                {audit?.remarks || '-'}
              </Typography>
            </Grid>
          </Grid>
          <Grid container alignItems='center' mt={3} gap={1}>
            <Grid item xs={5}>
              <Typography variant='h4'>Formula</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography fontSize={'16px'} color={(theme) => theme.palette.grey[800]}>
                {audit?.formula || '-'}
              </Typography>
            </Grid>
          </Grid>
          <Grid container alignItems='center' mt={3} gap={1}>
            <Grid item xs={5}>
              <Typography variant='h4'>Penalty</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                fontSize={'16px'}
                color={(theme) =>
                  typeof audit?.penalty === 'number'
                    ? theme.palette.error.main
                    : theme.palette.grey[800]
                }
                fontWeight={typeof audit?.penalty === 'number' ? 700 : 400}
              >
                {typeof audit?.penalty === 'number' ? `$${audit?.penalty.toFixed(2)}` : '-'}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Paper elevation={0} sx={{ mt: 3.5, p: 3.5 }}>
        <Grid container direction={'column'} gap={3}>
          {details.map((item, idx) => {
            return (
              <Grid key={idx} item container alignItems='center'>
                <Grid item xs={5}>
                  <Typography variant='h4'>{item.label}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography fontSize={'16px'} color={(theme) => theme.palette.grey[800]}>{item.value}</Typography>
                </Grid>
              </Grid>
            )
          })}
        </Grid>
      </Paper>

      <DialogWrapper
        label='Preview Form'
        maxWidth={'lg'}
        open={previewAudit}
        onClose={() => setPreviewAudit(false)}
      >
        <Box p={4}>
          <Stack direction={'row'} justifyContent={'flex-end'} mb={2} >
            {
              audit?.pdfUrl &&
              <LoadingButton
                variant='contained'
                loading={downloadLoading}
                startIcon={<DownloadLight sx={{ fontSize: 15 }} />}
                onClick={downloadAudit}
              >
                Download Audit {auditNumber || `(${audit.id})`} Form
              </LoadingButton>
            }
          </Stack>
          <Box p={2} border={theme => `1px solid ${theme.palette.grey[600]}`}>
            {
              audit?.pdfUrl &&
              <Document file={audit?.pdfUrl} onLoadSuccess={onDocumentLoadSuccess} >
                {Array.from(
                  new Array(numPages),
                  (el, index) => (
                    <Page
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                      scale={1.8}
                    />
                  ),
                )}
              </Document>
            }
            {
              !audit?.pdfUrl &&
              <Typography align='center'>Preview is not available!</Typography>
            }
          </Box>
        </Box>
      </DialogWrapper>
    </Box>
  )
}

export default AuditDetailsPanel
