// dummy data

import { IUser } from "../../../api/models";
import { ILocation } from "../../../types/location";
import { IMaintenance } from "../../../types/maintenance";
import { IProject } from "../../../types/project";

const location = {
  id: 1957,
  name: 'Temasek Polytechnic',
  locationCategory: { project: { name: 'TP', id: 29 } },
} as ILocation
const location1 = {
  id: 2002,
  name: 'Temasek Polytechnic',
  locationCategory: { project: { name: 'TP', id: 29 } },
} as ILocation
const user = { id: 6, fullName: 'Samantha Chan' } as IUser
const user1 = { id: 6, fullName: 'Samantha Chan' } as IUser
const user2 = { id: 7, fullName: 'Melvin Khow' } as IUser

const step = {
  text: 'Make sure the doors are still functional before proceed to maintenance',
  images: ['https://picsum.photos/seed/toliet/200/200', 'https://picsum.photos/seed/toliet/200/200', 'https://picsum.photos/seed/toliet/200/200']
}
const procedure = {
  id: 1,
  name: 'Robot Maintenance',
  remark: 'Remark',
  steps: [step, step]
}
const procedure1 = {
  id: 2,
  name: 'Robot Maintenance 1',
  remark: 'Remark',
  steps: [step, step]
}
const procedure2 = {
  id: 3,
  name: 'Robot Maintenance 1',
  remark: 'Remark',
  steps: [step, step]
}

export const tmpMaintenanceProcedures = [procedure, procedure1, procedure2]

export const tmpMaintenances: IMaintenance[] = [
  {
    id: 0,
    name: 'Equipment Maintenance',
    project: {name: 'TP'} as IProject,
    location: {name: 'Temasek Polytechnic'} as ILocation,
    triggeredAt: '2023-06-06T03:10:27.000Z',
    endAt: '2023-06-06T03:10:27.000Z',
    status: 'Pending Acknowledge',
    createdAt: '2023-06-12T05:23:00.000000Z',
    updatedAt: '2023-06-12T05:23:00.000000Z',
    remark: 'Remark',
    recipents: [user, user1, user2],
    procedures: [procedure, procedure1],
    frequency: 'Daily'
  },
  {
    id: 1,
    name: 'Equipment Maintenance',
    project: {name: 'TP'} as IProject,
    location: {name: 'Temasek Polytechnic'} as ILocation,
    triggeredAt: '2023-06-06T03:10:27.000Z',
    endAt: '2023-06-06T03:10:27.000Z',
    status: 'In Progress',
    updatedAt: '2023-06-12T05:23:00.000000Z',
    remark: 'Remark',
    recipents: [user, user1, user2],
    procedures: [procedure, procedure1],
    frequency: 'Monthly'
  },
  {
    id: 2,
    name: 'Equipment Maintenance',
    project: {name: 'TP'} as IProject,
    location: {name: 'Temasek Polytechnic'} as ILocation,
    triggeredAt: '2023-06-06T03:10:27.000Z',
    endAt: '2023-06-06T03:10:27.000Z',
    status: 'Overdue',
    updatedAt: '2023-06-12T05:23:00.000000Z',
    remark: 'Remark',
    recipents: [user, user1, user2],
    procedures: [procedure],
    frequency: 'Daily'
  },
  {
    id: 3,
    name: 'Equipment Maintenance',
    project: {name: 'TP'} as IProject,
    location: {name: 'Temasek Polytechnic'} as ILocation,
    triggeredAt: '2023-06-06T03:10:27.000Z',
    endAt: '2023-06-06T03:10:27.000Z',
    status: 'Closed',
    updatedAt: '2023-06-12T05:23:00.000000Z',
    remark: 'Remark',
    recipents: [user, user1, user2],
    procedures: [procedure],
    frequency: 'Daily'
  }
]