import { FC, useState, useEffect } from 'react'

import DetailActivityList from '../common/DetailActivityList'
import { IDevice } from '../../api/models'
import Api from '../../api'
import { IResList } from '../../types/common'
import { IActivityLog, IActivityLogRes } from '../../types/activity'

interface IProps {
  device?: IDevice
}

const DeviceDetailActivityList: FC<IProps> = ({ device }) => {
  const [getDeviceActivityLogList] = Api.useLazyGetDeviceActivityLogListQuery()
  const [logs, setLogs] = useState<IResList<IActivityLog>>({ count: 0, rows: [] })

  const loadData = (options?: { page: number; limit: number }) => {
    if (!device) return
    const params = {
      page: options?.page ? options?.page : 1,
      limit: options?.limit ? options?.limit : 10,
      deviceId: [device.id],
    }
    getDeviceActivityLogList(params)
      .unwrap()
      .then((res) => {
        const fetchedLogs = res.rows || []
        const sanitizedLogs: any = fetchedLogs.map((log: IActivityLogRes) => {
          return {
            id: log.id,
            recordId: log.id,
            createdAt: log.createdAt,
            action: log.action,
            actorId: log.userId,
            actor: {
              fullName: log?.user?.fullName
            },
          }
        });
        setLogs({
          count: res.count,
          rows: sanitizedLogs
        });
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
    if (device?.id) {
      loadData()
    }
  }, [device])

  return <DetailActivityList onLoad={handleChangeData} logList={logs} />
}

export default DeviceDetailActivityList
