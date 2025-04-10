import { IUser } from '../../api/models'

import { ILocation } from '../../types/location'
import { IProject } from '../../types/project'
import { IRole } from '../../types/role'

export const tmpRoles: IRole[] = [
  {
    id: 1,
    name: 'Super Admin',
    userCount: 4,
    permission: { permissions: [] },
  },
  {
    id: 2,
    name: 'Supervisor',
    userCount: 24,
    permission: { permissions: [] },
  },
  {
    id: 3,
    name: 'Manager',
    userCount: 56,
    permission: { permissions: [] },
  },
  {
    id: 4,
    name: 'Auditor',
    userCount: 27,
    permission: { permissions: [] },
  },
  {
    id: 5,
    name: 'Technician',
    userCount: 120,
    permission: { permissions: [] },
  },
  {
    id: 6,
    name: 'Cleaner',
    userCount: 100,
    permission: { permissions: [] },
  },
]

const tmpLocation = {
  id: 1,
  name: 'Temasek Polytechnic',
} as ILocation
const tmpProject = {
  id: 1,
  name: 'TP',
} as IProject
export const tmpUsers: IUser[] = [
  {
    id: 1,
    fullName: 'Aaron Chan',
    email: 'test@gmail.com',
    phoneNumber: '94321456',
    roleId: tmpRoles[0].id,
    role: tmpRoles[0],
    locations: [tmpLocation],
    projects: [tmpProject],
    lastSignInAt: '2022-10-11T09:36:20.0000Z',
  } as IUser,
  {
    id: 2,
    fullName: 'Ariel Tay',
    email: 'test@gmail.com',
    phoneNumber: '94321456',
    roleId: tmpRoles[2].id,
    role: tmpRoles[2],
    locations: [tmpLocation],
    projects: [tmpProject],
    lastSignInAt: '2022-10-11T09:36:20.0000Z',
  } as IUser,
  {
    id: 3,
    fullName: 'Bojan Ansari',
    email: 'test@gmail.com',
    phoneNumber: '94321456',
    roleId: tmpRoles[1].id,
    role: tmpRoles[1],
    locations: [tmpLocation],
    projects: [tmpProject],
    lastSignInAt: '2022-10-11T09:36:20.0000Z',
  } as IUser,
  {
    id: 4,
    fullName: 'Boon Jia Yun',
    email: 'test@gmail.com',
    phoneNumber: '94321456',
    roleId: tmpRoles[3].id,
    role: tmpRoles[3],
    locations: [tmpLocation],
    projects: [tmpProject],
    lastSignInAt: '2022-10-11T09:36:20.0000Z',
  } as IUser,
  {
    id: 5,
    fullName: 'Chew Li Shan',
    email: 'test@gmail.com',
    phoneNumber: '94321456',
    roleId: tmpRoles[1].id,
    role: tmpRoles[1],
    locations: [tmpLocation],
    projects: [tmpProject],
    lastSignInAt: '2022-10-11T09:36:20.0000Z',
  } as IUser,
  {
    id: 6,
    fullName: 'Charles Ng',
    email: 'test@gmail.com',
    phoneNumber: '94321456',
    roleId: tmpRoles[1].id,
    role: tmpRoles[1],
    locations: [tmpLocation],
    projects: [tmpProject],
    lastSignInAt: '2022-10-11T09:36:20.0000Z',
  } as IUser,
  {
    id: 7,
    fullName: 'Diane von Charles',
    email: 'test@gmail.com',
    phoneNumber: '94321456',
    roleId: tmpRoles[0].id,
    role: tmpRoles[0],
    locations: [tmpLocation],
    projects: [tmpProject],
    lastSignInAt: '2022-10-11T09:36:20.0000Z',
  } as IUser,
  {
    id: 8,
    fullName: 'Darren Toh',
    email: 'test@gmail.com',
    phoneNumber: '94321456',
    roleId: tmpRoles[3].id,
    role: tmpRoles[3],
    locations: [tmpLocation],
    projects: [tmpProject],
    lastSignInAt: '2022-10-11T09:36:20.0000Z',
  } as IUser,
  {
    id: 9,
    fullName: 'Eric Lim',
    email: 'test@gmail.com',
    phoneNumber: '94321456',
    roleId: tmpRoles[3].id,
    role: tmpRoles[3],
    locations: [tmpLocation],
    projects: [tmpProject],
    lastSignInAt: '2022-10-11T09:36:20.0000Z',
  } as IUser,
  {
    id: 10,
    fullName: 'Finn Tan',
    email: 'test@gmail.com',
    phoneNumber: '94321456',
    roleId: tmpRoles[2].id,
    role: tmpRoles[2],
    locations: [tmpLocation],
    projects: [tmpProject],
    lastSignInAt: '2022-10-11T09:36:20.0000Z',
  } as IUser,
]
