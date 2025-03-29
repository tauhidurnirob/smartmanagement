import { IUnit } from '../../api/models'
import { IAlert, IAlertListItemByProject } from '../../types/alert'
import { ILocation } from '../../types/location'
import { IProject } from '../../types/project'

const tmpProject: IProject = { id: 1, name: 'Ai Tong School', remark: '' } as IProject

const tmpUnit: IUnit = {
  id: 1,
  name: 'Washroom A3',
  area: {
    id: 1,
    name: 'Toliet',
    level: {
      id: 1,
      name: 'Level 3',
      building: {
        id: 1,
        name: 'Building 1',
        location: {
          id: 1,
          name: 'Ai Tong Primary School',
          locationCategory: {
            id: 1,
            name: 'Category 1',
            project: tmpProject,
          },
        } as ILocation,
      },
    },
  },
} as IUnit

export const tmpAlertList: IAlert[] = [
  {
    id: 1,
    title: 'Emergency button triggered',
    description: 'Please assign someone immediately',
    unit: tmpUnit,
    createdAt: '2023-03-10T10:24:00.000Z',
    isRead: false,
  },
  {
    id: 2,
    title: 'Emergency button triggered',
    description: 'Please assign someone immediately',
    unit: tmpUnit,
    createdAt: '2023-03-10T10:24:00.000Z',
    isRead: false,
  },
  {
    id: 3,
    title: 'Emergency button triggered',
    description: 'Please assign someone immediately',
    unit: tmpUnit,
    createdAt: '2023-03-10T10:24:00.000Z',
    isRead: false,
  },
  {
    id: 4,
    title: 'Emergency button triggered',
    description: 'Please assign someone immediately',
    unit: tmpUnit,
    createdAt: '2023-03-10T10:24:00.000Z',
    isRead: false,
  },
  {
    id: 5,
    title: 'Emergency button triggered',
    description: 'Please assign someone immediately',
    unit: tmpUnit,
    createdAt: '2023-03-10T10:24:00.000Z',
    isRead: false,
  },
  {
    id: 6,
    title: 'Emergency button triggered',
    description: 'Please assign someone immediately',
    unit: tmpUnit,
    createdAt: '2023-03-10T10:24:00.000Z',
    isRead: false,
  },
  {
    id: 7,
    title: 'Emergency button triggered',
    description: 'Please assign someone immediately',
    unit: tmpUnit,
    createdAt: '2023-03-10T10:24:00.000Z',
    isRead: false,
  },
  {
    id: 8,
    title: 'Emergency button triggered',
    description: 'Please assign someone immediately',
    unit: tmpUnit,
    createdAt: '2023-03-10T10:24:00.000Z',
    isRead: true,
  },
]

export const tmpAlertListByProject: IAlertListItemByProject[] = [
  { project: tmpProject, alerts: tmpAlertList },
  { project: tmpProject, alerts: tmpAlertList },
  { project: tmpProject, alerts: tmpAlertList },
  { project: tmpProject, alerts: tmpAlertList },
  { project: tmpProject, alerts: tmpAlertList },
  { project: tmpProject, alerts: tmpAlertList },
  { project: tmpProject, alerts: tmpAlertList },
]
