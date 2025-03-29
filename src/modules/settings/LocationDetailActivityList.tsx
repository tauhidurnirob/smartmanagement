import { FC, useEffect, useState } from 'react'

import DetailActivityList from '../common/DetailActivityList'
import Api from '../../api'
import { IActivityLog } from '../../types/activity'
import { IResList } from '../../types/common'
import { IUser } from '../../api/models'

interface IProps {
  locationId?: number
}

const LocationDetailActivityList: FC<IProps> = ({ locationId }) => {
  const [getUserActivityList] = Api.useLazyGetUserActivityListInLocationQuery()
  const [logs, setLogs] = useState<IResList<IActivityLog>>({ count: 0, rows: [] })

  const loadData = (options?: { page: number; limit: number }) => {
    if (!locationId) return

    const params = {
      page: options?.page ? options?.page : 1,
      limit: options?.limit ? options?.limit : 10,
      locationId,
    }
    getUserActivityList(params)
      .unwrap()
      .then((res) => {
        const logs = res.rows.map((item) => {
          return {
            id: item.id,
            createdAt: item.createdAt,
            action: item.title,
            actor: { id: item.userId, fullName: item.userName } as IUser,
            recordId: item.locationId ? item.locationId.toString() : '-',
            actorId: item.userId,
          } as IActivityLog
        })
        setLogs({ count: res.count, rows: logs })
      })
      .catch((err) => {
        console.error('Failed to get activity list: ', err)
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

export default LocationDetailActivityList
