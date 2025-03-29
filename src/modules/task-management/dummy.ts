import { IArea, IBuilding, ILevel, IUnit, IUser } from '../../api/models'
import {
  LEAVE_CATEGORY_LIST,
  LEAVE_TYPE_LIST,
  TASK_STAFF_ATTENDANCE_STATUS_LIST,
  TASK_STAFF_LEAVE_STATUS_LIST,
  TASK_STATUS_LIST,
} from '../../helpers/constants'
import { ILocation } from '../../types/location'
import { IProject } from '../../types/project'
import {
  ETaskType,
  ITask,
  ITaskCompletionListItem,
  ITaskOnDutyCleanderListItem,
  ITaskStaffAttendanceListItem,
  ITaskStaffLeaveListItem,
} from '../../types/task'
import { tmpRoles } from '../settings/dummy'

export const tmpTaskCompletionList: ITaskCompletionListItem[] = [
  { date: '10 Jan', completed: 200, scheduled: 300 },
  { date: '15 Jan', completed: 500, scheduled: 500 },
  { date: '20 Jan', completed: 600, scheduled: 400 },
  { date: '25 Jan', completed: 900, scheduled: 700 },
  { date: '1 Feb', completed: 900, scheduled: 800 },
  { date: '5 Feb', completed: 400, scheduled: 120 },
  { date: '10 Feb', completed: 700, scheduled: 700 },
  { date: '15 Feb', completed: 900, scheduled: 1000 },
]

const tmpProject = { id: 1, name: 'TP' } as IProject
const tmpLocation1 = {
  id: 1,
  name: 'Temasek Polytechnic',
  locationCategory: { id: 1, name: '1', project: tmpProject },
} as ILocation
const tmpLocation2 = { id: 2, name: 'Temasek Polytechnic' } as ILocation
const tmpLocation3 = { id: 3, name: 'Nanyang Junior College' } as ILocation
const tmpLocation4 = { id: 4, name: 'Ai Tong School' } as ILocation
const tmpLocation5 = { id: 5, name: 'Catholic High School (Pri)' } as ILocation
const tmpLocation6 = { id: 6, name: 'Jurong Pioneer Junior College' } as ILocation
const tmpLocation7 = { id: 7, name: 'Beacon Primary School ' } as ILocation
const tmpLocation8 = { id: 8, name: 'Cedar Primary School' } as ILocation
const tmpBuilding1 = { id: 1, name: '1' } as IBuilding
const tmpBuilding2 = { id: 2, name: '2' } as IBuilding
const tmpLevel1 = { id: 1, name: '12' } as ILevel
const tmpLevel2 = { id: 2, name: '4' } as ILevel
const tmpArea1 = { id: 1, name: 'Toilet' } as IArea
const tmpUnit1 = { id: 1, name: 'Washroom' } as IUnit
const tmpUser1 = { id: 1, fullName: 'Sarah Jay' } as IUser
const tmpUser2 = { id: 2, fullName: 'Samantha Lee' } as IUser

export const tmpTaskStaffAttendanceList: ITaskStaffAttendanceListItem[] = [
  {
    id: 1,
    date: '2020-10-30',
    staff: { id: 1, fullName: 'Karina Clark', role: tmpRoles[5] } as IUser,
    location: { ...tmpLocation1 },
    clockedInTime: '7:30 AM',
    clockedOutTime: null,
    status: TASK_STAFF_ATTENDANCE_STATUS_LIST[0].value as string,
  },
  {
    id: 1,
    date: '2020-10-30',
    staff: { id: 1, fullName: 'Karina Clark', role: tmpRoles[5] } as IUser,
    location: { ...tmpLocation1 },
    clockedInTime: null,
    clockedOutTime: null,
    status: TASK_STAFF_ATTENDANCE_STATUS_LIST[1].value as string,
  },
  {
    id: 1,
    date: '2020-10-30',
    staff: { id: 1, fullName: 'Karina Clark', role: tmpRoles[5] } as IUser,
    location: { ...tmpLocation1 },
    clockedInTime: '7:30 AM',
    clockedOutTime: '8:30 AM',
    status: TASK_STAFF_ATTENDANCE_STATUS_LIST[1].value as string,
  },
  {
    id: 1,
    date: '2020-10-30',
    staff: { id: 1, fullName: 'Karina Clark', role: tmpRoles[5] } as IUser,
    location: { ...tmpLocation1 },
    clockedInTime: '10:30 AM',
    clockedOutTime: '10:40 AM',
    status: TASK_STAFF_ATTENDANCE_STATUS_LIST[2].value as string,
  },
  {
    id: 1,
    date: '2020-10-30',
    staff: { id: 1, fullName: 'Karina Clark', role: tmpRoles[5] } as IUser,
    location: { ...tmpLocation1 },
    clockedInTime: '10:30 AM',
    clockedOutTime: '10:40 AM',
    status: TASK_STAFF_ATTENDANCE_STATUS_LIST[2].value as string,
  },
]

export const tmpTaskStaffLeveList: ITaskStaffLeaveListItem[] = [
  {
    id: 1,
    staff: { id: 1, fullName: 'Karina Clark', role: tmpRoles[5] } as IUser,
    applicationDate: '2020-10-30',
    category: LEAVE_CATEGORY_LIST[0].value as string,
    type: LEAVE_TYPE_LIST[0].value as string,
    startDate: '2023-10-30',
    endDate: '2023-10-30',
    status: TASK_STAFF_LEAVE_STATUS_LIST[0].value as string,
  },
  {
    id: 2,
    staff: { id: 1, fullName: 'Robert Doe', role: tmpRoles[5] } as IUser,
    applicationDate: '2020-10-30',
    category: LEAVE_CATEGORY_LIST[0].value as string,
    type: LEAVE_TYPE_LIST[1].value as string,
    startDate: '2023-10-30',
    endDate: '2023-11-02',
    status: TASK_STAFF_LEAVE_STATUS_LIST[2].value as string,
  },
  {
    id: 3,
    staff: { id: 1, fullName: 'Neil Owen', role: tmpRoles[5] } as IUser,
    applicationDate: '2020-10-30',
    category: LEAVE_CATEGORY_LIST[1].value as string,
    type: LEAVE_TYPE_LIST[2].value as string,
    startDate: '2023-10-30',
    endDate: '2023-11-02',
    status: TASK_STAFF_LEAVE_STATUS_LIST[1].value as string,
  },
  {
    id: 4,
    staff: { id: 1, fullName: 'Olivia Wild', role: tmpRoles[5] } as IUser,
    applicationDate: '2020-10-30',
    category: LEAVE_CATEGORY_LIST[0].value as string,
    type: LEAVE_TYPE_LIST[0].value as string,
    startDate: '2023-10-30',
    endDate: '2023-11-02',
    status: TASK_STAFF_LEAVE_STATUS_LIST[1].value as string,
  },
  {
    id: 5,
    staff: { id: 1, fullName: 'Sean Bean', role: tmpRoles[5] } as IUser,
    applicationDate: '2020-10-30',
    category: LEAVE_CATEGORY_LIST[0].value as string,
    type: LEAVE_TYPE_LIST[0].value as string,
    startDate: '2023-10-30',
    endDate: '2023-11-02',
    status: TASK_STAFF_LEAVE_STATUS_LIST[1].value as string,
  },
]
