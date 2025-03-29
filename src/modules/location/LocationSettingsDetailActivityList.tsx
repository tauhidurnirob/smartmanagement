import { FC, useState, useEffect } from 'react'

import DetailActivityList from '../common/DetailActivityList'
import Api from '../../api'
import { IResList } from '../../types/common'
import { IActivityLog } from '../../types/activity'

interface IProps {
  locationId: number
}

const LocationSettingsDetailActivityList: FC<IProps> = ({ locationId }) => {
  const [getDeviceActivityList] = Api.useLazyGetDeviceActivityListQuery()
  const [logs, setLogs] = useState<IResList<IActivityLog>>({ count: 0, rows: [] })

  const loadData = (options?: { page: number; limit: number }) => {
    const params = {
      page: options?.page ? options?.page : 1,
      limit: options?.limit ? options?.limit : 10,
      locationIds: [locationId],
    }
    getDeviceActivityList(params)
      .unwrap()
      .then((res) => {
        setLogs(logs)
      })
      .catch((err) => {
        console.error('Failed to get device activity list: ', err)
        setLogs({ ...logs, rows: [] })
      })
  }

  const handleChangeData = (params: { page: number; limit: number }) => {
    loadData(params)
  }

  useEffect(() => {
    if (locationId) {
      loadData()
    }
  }, [locationId])

  return <DetailActivityList onLoad={handleChangeData} logList={logs} />
}

export default LocationSettingsDetailActivityList
