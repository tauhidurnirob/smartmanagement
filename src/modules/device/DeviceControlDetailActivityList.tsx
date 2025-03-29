import { FC, useState, useEffect } from 'react'

import DetailActivityList from '../common/DetailActivityList'
import { IResList, ISelectItem } from '../../types/common'
import Api from '../../api'
import { IActivityLog } from '../../types/activity'

interface IParentFilters {
  buildings: ISelectItem[]
  levels: ISelectItem[]
  areas: ISelectItem[]
  units: ISelectItem[]
}

interface IProps {
  locationId: number
  filters: IParentFilters
}

const DeviceControlDetailActivityList: FC<IProps> = ({ locationId, filters }) => {
  const [getDeviceActivityList] = Api.useLazyGetDeviceActivityListQuery()
  const [logs, setLogs] = useState<IResList<IActivityLog>>({ count: 0, rows: [] })

  const loadData = (options?: { page: number; limit: number }) => {
    const buildingIds = filters.buildings.map((p) => Number(p.value))
    const levelIds = filters.levels.map((p) => Number(p.value))
    const areaIds = filters.areas.map((p) => Number(p.value))
    const unitIds = filters.units.map((p) => Number(p.value))
    const locationIds = [locationId]

    const params = {
      page: options?.page ? options?.page : 1,
      limit: options?.limit ? options?.limit : 10,
      locationIds,
      buildingIds,
      levelIds,
      areaIds,
      unitIds,
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
    loadData()
  }, [locationId, filters])

  return <DetailActivityList onLoad={handleChangeData} logList={logs} />
}

export default DeviceControlDetailActivityList
