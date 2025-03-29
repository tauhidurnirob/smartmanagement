import { IUserWorkHourList } from '../api/models'
import { ISelectItem } from './common'

export interface IUserListFilters {
  search: string
  projects: ISelectItem[]
  locations: ISelectItem[]
  roles: ISelectItem[]
}

export type UserGender = 'male' | 'female'
export type TWorkPass = '0' | '1' | '2'

export interface IUserCitizensip {
  label: string
  value: string
}

export interface IUserTraining {
  name: string
  code: string
  refNo: string
}

export interface IUserCreate {
  avatarUrl: string
  name: string
  role: ISelectItem[]
  phoneNumber: string
  email: string
  password: string
  projects: ISelectItem[]
  locations: ISelectItem[]
  staffTraining: IUserTraining[]
  workingHours: IUserWorkHourList
  gender: UserGender | null
  age: number | null
  citizenship: ISelectItem[]
  workPassType?: TWorkPass
  vehicleNumber?: string
}

export enum ETimeUnit {
  'minute' = 'minute',
  'hour' = 'hour',
  'day' = 'day',
  'week' = 'week',
  'month' = 'month',
}

export interface IStaffOtj {
  sop: string
  time: number
  unit: ETimeUnit
  status: '0' | '1'
}

export interface ITrainingElementsTouched {
  name: boolean
  code: boolean
  refNo: boolean
}
