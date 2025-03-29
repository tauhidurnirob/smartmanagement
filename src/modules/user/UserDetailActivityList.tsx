import { FC, useEffect, useState } from 'react'

import DetailActivityList from '../common/DetailActivityList'
import { IUser } from '../../api/models'
import Api from '../../api'
import { IResList } from '../../types/common'
import { IActivityLog } from '../../types/activity'

interface IProps {
  user?: IUser
}

const UserDetailActivityList: FC<IProps> = ({ user }) => {
  const [getUserActivityList] = Api.useLazyGetUserActivityListQuery()
  const [logs, setLogs] = useState<IResList<IActivityLog>>({ count: 0, rows: [] })

  const loadData = (options?: { page: number; limit: number }) => {
    const params = {
      page: options?.page ? options?.page : 1,
      limit: options?.limit ? options?.limit : 10,
      userId: user?.id,
    }
    getUserActivityList(params)
      .unwrap()
      .then((res) => {
        setLogs(logs)
      })
      .catch((err) => {
        console.error('Failed to get user activity list: ', err)
        setLogs({ ...logs, rows: [] })
      })
  }

  const handleChangeData = (params: { page: number; limit: number }) => {
    loadData(params)
  }

  useEffect(() => {
    if (user?.id) {
      loadData()
    }
  }, [user])

  return <DetailActivityList onLoad={handleChangeData} logList={logs} />
}

export default UserDetailActivityList
