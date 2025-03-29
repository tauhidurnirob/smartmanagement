import { Box } from '@mui/material'
import FileSaver from 'file-saver'
import { toast } from 'react-toastify'
import { FC, useMemo, useState } from 'react'
import dayjs from 'dayjs'

import { ISelectItem } from '../../../types/common'
import Api from '../../../api'
import AuditDetailsOverview from '../audit-details/AuditDetailsOverview'
import { MONTHS } from '../../../helpers/constants'
import { IAudit } from '../../../types/audit'
import { useSearchParams } from 'react-router-dom'
import { generateYearOptions } from '../../../helpers/generateYearOptions'
import getFileNameByAudit from '../../../helpers/getFileNameByAudit'

interface IProps {
  locationId: number
  year: string | null
  month: string | null
  formTypeId: number | null
}

const AuditDetailsByLocation: FC<IProps> = ({ locationId, year: yy, month: mm, formTypeId }) => {
  const mon = MONTHS.find((f) => Number(f.value) === Number(dayjs().month()) + 1) as ISelectItem
  const yearItems = generateYearOptions()
  const newMon = MONTHS.find((f) => Number(f.value) === Number(mm))

  const [year, setYear] = useState<ISelectItem>(yy ? { label: yy, value: yy } : yearItems[0])
  const [month, setMonth] = useState<ISelectItem>(newMon ?? mon)

  const [ searchParams, setSearchParams] = useSearchParams()

  const handleChangeForm = (formTypeId: number) => {
    searchParams.set("formTypeId", String(formTypeId));
    setSearchParams(searchParams);
  }

  const { data: auditList, isLoading } = Api.useGetAuditListByLocationQuery({
    id: Number(locationId),
    month: month.value as string,
    year: year.value as string,
    formTypeId: Number(formTypeId)
  })

  const { sortedAudits } = useMemo(() => {
    const sortedAudits = [...(auditList?.audits || [])]
    sortedAudits
      .sort((a, b) => {
        const aSubmitted = new Date(a.submittedAt || new Date().toISOString()).getTime()
        const bSubmitted = new Date(b.submittedAt || new Date().toISOString()).getTime()

        return aSubmitted < bSubmitted ? -1 : aSubmitted > bSubmitted ? 1 : 0
      })
      .sort((a, b) => {
        const aNumber = a.auditNumber || 0
        const bNumber = b.auditNumber || 0

        return aNumber < bNumber ? -1 : aNumber > bNumber ? 1 : 0
      })

    return { sortedAudits }
  }, [auditList])
  const [downloadAlllAudit, { isLoading: downloadAllLoading }] =
    Api.useDownloadAllAuditByLocationIdMutation()
  const [downloadAudit, { isLoading: downloadLoading }] = Api.useDownloadAuditByIdMutation()

  const handleDownloadAll = (locationId: number | undefined) => {
    const y = Number(year.value)
    const m = Number(month.value)
    const d = new Date(y, m, 0)
    const startDate = dayjs(d).startOf('month').toISOString()
    const endDate = dayjs(d).endOf('month').toISOString()

    if (locationId) {
      const params = {
        locationId,
        fileFormat: 'pdf',
        startDate: startDate,
        endDate: endDate,
      }
      downloadAlllAudit(params)
        .unwrap()
        .then((res) => {
          if (res) {
            const fileType = 'application/zip'
            const blob = new Blob([res], {
              type: fileType,
            })
            FileSaver.saveAs(blob, `audits-${locationId}.zip`)
            toast.success('Download successful!')
          }
        })
        .catch((err) => {
          console.log('Failed to download audit details: ', err)
          toast.error('Failed to download audit forms')
        })
    }
  }

  const handleDownload = (audit: IAudit) => {
    if (audit) {
      downloadAudit({ id: audit.id })
        .unwrap()
        .then((res) => {
          if (res) {
            const fileType = 'application/pdf'
            let locationName = auditList?.location?.name;

            // Check if locationName is defined before trying to use it
            if (locationName !== undefined) {
              locationName = locationName.replace(/ /g, '_');
                // Use stringWithUnderscores here
            } else {
                // Handle the case where locationName is undefined
                console.error("locationName is undefined");
            }
            
            const fileNameWithoutExtension = getFileNameByAudit(audit)
            const fileName= `${fileNameWithoutExtension}.pdf`
            const blob = new Blob([res], {
              type: fileType,
            })
            FileSaver.saveAs(blob, fileName)
            toast.success('Download successful!')
          }
        })
        .catch((err) => {
          console.log('Failed to download audit details: ', err)
          toast.error(err?.data?.message || 'Failed to download audit form')
        })
    }
  }

  return (
    <Box>
      <AuditDetailsOverview
        location={auditList?.location || null}
        audits={sortedAudits}
        isLoading={isLoading}
        downloadAllLoading={downloadAllLoading}
        handleDownloadAll={handleDownloadAll}
        downloadAudit={handleDownload}
        downloadLoading={downloadLoading}
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
        selectedForm={formTypeId}
        handleChangeForm={handleChangeForm}
      />
    </Box>
  )
}

export default AuditDetailsByLocation
