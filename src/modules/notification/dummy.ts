import { INotification, INotificationListItemByProject } from '../../types/notification'
import { ILocation } from '../../types/location'
import { IProject } from '../../types/project'
import { IArea, IBuilding, IUnit } from '../../api/models'

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
      } as IBuilding,
    },
  } as IArea,
} as IUnit

export const tmpNotifications: INotification[] = [
  {
    id: 1,
    title:
      'The server connection is not established. Please wait for a few minutes and restart your device',
    description: 'Please assign someone immediately',
    unit: tmpUnit,
    createdAt: '2023-03-10T10:24:00.000Z',
    isRead: false,
  },
  {
    id: 2,
    title:
      'The server connection is not established. Please wait for a few minutes and restart your device',
    description: 'Please assign someone immediately',
    unit: tmpUnit,
    createdAt: '2023-03-10T10:24:00.000Z',
    isRead: true,
  },
  {
    id: 3,
    title:
      'The server connection is not established. Please wait for a few minutes and restart your device',
    description: 'Please assign someone immediately',
    unit: tmpUnit,
    createdAt: '2023-03-10T10:24:00.000Z',
    isRead: false,
  },
  {
    id: 4,
    title:
      'The server connection is not established. Please wait for a few minutes and restart your device',
    description: 'Please assign someone immediately',
    unit: tmpUnit,
    createdAt: '2023-03-10T10:24:00.000Z',
    isRead: false,
  },
  {
    id: 5,
    title:
      'The server connection is not established. Please wait for a few minutes and restart your device',
    description: 'Please assign someone immediately',
    unit: tmpUnit,
    createdAt: '2023-03-10T10:24:00.000Z',
    isRead: false,
  },
  {
    id: 6,
    title:
      'The server connection is not established. Please wait for a few minutes and restart your device',
    description: 'Please assign someone immediately',
    unit: tmpUnit,
    createdAt: '2023-03-10T10:24:00.000Z',
    isRead: false,
  },
  {
    id: 7,
    title:
      'The server connection is not established. Please wait for a few minutes and restart your device',
    description: 'Please assign someone immediately',
    unit: tmpUnit,
    createdAt: '2023-03-10T10:24:00.000Z',
    isRead: false,
  },
  {
    id: 8,
    title:
      'The server connection is not established. Please wait for a few minutes and restart your device',
    description: 'Please assign someone immediately',
    unit: tmpUnit,
    createdAt: '2023-03-10T10:24:00.000Z',
    isRead: true,
  },
]

const tmpProjectNotification = {
  project: tmpProject,
  notifications: {
    // device: tmpNotifications,
    // maintenance: tmpNotifications.slice(0, 5),
    // incident: tmpNotifications,
    // feedback: tmpNotifications,
    audit: tmpNotifications.slice(0, 6),
  },
}