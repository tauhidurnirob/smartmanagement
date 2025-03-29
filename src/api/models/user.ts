import { IReqFilter } from '../../types/common'
import { ILocation } from '../../types/location'
import { IProject } from '../../types/project'
import { IRole } from '../../types/role'
import { IStaffOtj, IUserTraining, TWorkPass, UserGender } from '../../types/user'

// User
export interface ReqUserLogin {
  email: string
  password: string
}

export interface ReqUserRequestPassword {
  email: string
}

export interface ReqUserValidateOtp {
  email: string
  otp: string
}

export interface ReqUserChangePasswordByEmail {
  email: string
  otp: string
  newPassword: string
}

export type IUserWorkHour = { start: string; end: string } | null
export interface IUserWorkHourList {
  monday: IUserWorkHour
  tuesday: IUserWorkHour
  wednesday: IUserWorkHour
  thursday: IUserWorkHour
  friday: IUserWorkHour
  saturday: IUserWorkHour
  sunday: IUserWorkHour
  publicHoliday: IUserWorkHour
}

export interface IUser {
  id: number
  phoneNumber: string
  email: string
  fullName: string
  dob: string
  avatarUri: string
  isActive: boolean
  isAdmin: boolean
  address?: any
  address2?: any
  postalCode: string
  lat: number
  lng: number
  gender: UserGender
  age: number
  citizenship?: string
  workPassType?: TWorkPass
  vehicleNumber?: string
  staffTraining?: IUserTraining[]
  staffOtj?: IStaffOtj[]
  userType: string
  nricFin: string
  icUris: any[]
  passportNumber: string
  passportUris: any[]
  nationality: string
  registrationToken: string
  countryCode?: any
  singpassUUID?: any
  loginType: string
  roleId?: number
  role?: IRole
  boothId: string
  deviceUUID?: string
  locations?: ILocation[]
  projects?: IProject[]
  lastSignInAt?: string
  workingHours?: IUserWorkHourList
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
  value?: number
}

export interface IChangeEmailPayload {
  password: string
  oldEmail: string
  newEmail: string
}
export interface IChangePasswordPayload {
  email: string
  oldPassword: string
  newPassword: string
}

export interface IReqUserList extends IReqFilter {
  text?: string
  projectIds?: number[]
  locationIds?: number[]
  roleIds?: number[] | number
}

export interface IReqUserBatchDelete {
  ids: number[]
}

export interface IReqUserSettingCreate {
  phoneNumber: string
  email: string
  gender: UserGender | null
  fullName: string
  avatarUri?: string
  roleId: number
  locationIds?: number[]
  projectIds: number[]
  workingHours?: IUserWorkHourList
  password?: string
  age: number
  citizenship: string
  workPassType?: TWorkPass
  vehicleNumber?: string
  staffTraining?: IUserTraining[]
}

export interface IReqUserSettingUpdate {
  id: number
  data: Partial<IReqUserSettingCreate>
}

export interface IReqUserActivityList extends IReqFilter {
  userId?: number
}
export interface IreqRefreshTokenPayload {
  appType: string
  id: number
  refreshToken: string // Assuming timeOffset is a number
}



