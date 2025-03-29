import { IArea, IBuilding, ILevel, IUnit } from '../../../api/models'
import { IFeedback, IFeedbackFormTemplate, IFeedbackLocation } from '../../../types/feedback'
import { ILocation } from '../../../types/location'
import { IProject } from '../../../types/project'

export const tmpFeedbacks: IFeedback[] = [
  {
    id: 0,
    project: { name: 'TP' } as IProject,
    location: { name: 'Temasek Polytechnic' } as ILocation,
    building: { name: '1' } as IBuilding,
    level: { name: 'Level 1' } as ILevel,
    area: { name: 'Classroom' } as IArea,
    unit: { name: '101' } as IUnit,
    feedbackType: 'Rating',
    submittedAt: '30/10/2020 @3:51 PM',
    closedAt: '30/10/2020 @3:51 PM',
    tat: '7 days',
    status: 'Pending Acknowledgement',
    source: 'Digital Form - QR',
    images: [
      'https://picsum.photos/seed/toliet/200/200',
      'https://picsum.photos/seed/toliet/200/200',
    ],
  },
  {
    id: 1,
    project: { name: 'TP' } as IProject,
    location: { name: 'Temasek Polytechnic' } as ILocation,
    building: { name: '1' } as IBuilding,
    level: { name: 'Level 1' } as ILevel,
    area: { name: 'Classroom' } as IArea,
    unit: { name: '101' } as IUnit,
    feedbackType: 'Suggestion',
    submittedAt: '30/10/2020 @3:51 PM',
    closedAt: '30/10/2020 @3:51 PM',
    tat: '5 days',
    status: 'In Progress',
    source: 'Digital Form - QR',
    images: [
      'https://picsum.photos/seed/toliet/200/200',
      'https://picsum.photos/seed/toliet/200/200',
    ],
  },
  {
    id: 2,
    project: { name: 'TP' } as IProject,
    location: { name: 'Temasek Polytechnic' } as ILocation,
    building: { name: '1' } as IBuilding,
    level: { name: 'Level 1' } as ILevel,
    area: { name: 'Classroom' } as IArea,
    unit: { name: '101' } as IUnit,
    feedbackType: 'Complaint',
    submittedAt: '30/10/2020 @3:51 PM',
    closedAt: '30/10/2020 @3:51 PM',
    tat: '7 days',
    status: 'Closed',
    source: 'Digital Form - QR',
    images: [
      'https://picsum.photos/seed/toliet/200/200',
      'https://picsum.photos/seed/toliet/200/200',
    ],
  },
  {
    id: 3,
    project: { name: 'TP' } as IProject,
    location: { name: 'Temasek Polytechnic' } as ILocation,
    building: { name: '1' } as IBuilding,
    level: { name: 'Level 1' } as ILevel,
    area: { name: 'Classroom' } as IArea,
    unit: { name: '101' } as IUnit,
    feedbackType: 'Compliment',
    submittedAt: '30/10/2020 @3:51 PM',
    closedAt: '30/10/2020 @3:51 PM',
    tat: '7 days',
    status: 'Overdue',
    source: 'Digital Form - QR',
    images: [
      'https://picsum.photos/seed/toliet/200/200',
      'https://picsum.photos/seed/toliet/200/200',
    ],
  },
]

export const tmpFeedbackFormTemplates: IFeedbackFormTemplate[] = [
  {
    id: 0,
    project: { name: 'TP' } as IProject,
    location: { name: 'Temasek Polytechnic' } as ILocation,
    name: '[Form A] Toilet Feedback Benchmark Performance Assessment For Smart Toilet IoT system ',
    type: 'Toilet feedback',
    responseRate: '45%',
    updatedAt: '30/10/2020 @3:51 PM',
  },
  {
    id: 0,
    project: { name: 'TP' } as IProject,
    location: { name: 'Temasek Polytechnic' } as ILocation,
    name: '[Form A] Toilet Feedback Benchmark Performance Assessment For Smart Toilet IoT system ',
    type: 'Toilet feedback',
    responseRate: '45%',
    updatedAt: '30/10/2020 @3:51 PM',
  },
  {
    id: 0,
    project: { name: 'TP' } as IProject,
    location: { name: 'Temasek Polytechnic' } as ILocation,
    name: '[Form A] Toilet Feedback Benchmark Performance Assessment For Smart Toilet IoT system ',
    type: 'Toilet feedback',
    responseRate: '45%',
    updatedAt: '30/10/2020 @3:51 PM',
  },
]

export const tmpFeedbackLocations: IFeedbackLocation[] = [
  {
    id: 0,
    project: { name: 'TP' } as IProject,
    location: { name: 'Temasek Polytechnic' } as ILocation,
    feedbackReceived: 30,
    formId: 1,
  },
  {
    id: 1,
    project: { name: 'TP' } as IProject,
    location: { name: 'Temasek Polytechnic' } as ILocation,
    feedbackReceived: 35,
    formId: 1,
  },
  {
    id: 2,
    project: { name: 'TP' } as IProject,
    location: { name: 'Temasek Polytechnic' } as ILocation,
    feedbackReceived: 40,
    formId: 1,
  },
  {
    id: 3,
    project: { name: 'TP' } as IProject,
    location: { name: 'Temasek Polytechnic' } as ILocation,
    feedbackReceived: 25,
    formId: 1,
  },
]
