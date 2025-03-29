import { IArea, IBuilding, ILevel, IUnit } from '../../api/models'
import { WASHROOM_STATUS_LIST } from '../../helpers/constants'
import { ILocation } from '../../types/location'
import { ILocationCategory } from '../../types/locationCategory'
import { IProject } from '../../types/project'
import { IWashroomAreaThreshold, IWashroomOverviewListItem } from '../../types/washroom'

const tmpProject1: IProject = {
  id: 1,
  name: 'TP',
  remark: '',
} as IProject

const tmpLocationCategory: ILocationCategory = {
  id: 1,
  name: 'Location Category 1',
  project: tmpProject1,
} as ILocationCategory

const tmpLocation1: ILocation = {
  id: 1,
  name: 'Nanyang JC',
  address: '',
  mtr: 0,
  lat: 0,
  lng: 0,
}
const tmpLocation2: ILocation = {
  id: 2,
  name: 'Nanyang Junior College',
  address: '',
  mtr: 0,
  lat: 0,
  lng: 0,
}

const tmpBuilding1: IBuilding = {
  id: 1,
  name: 'Building 1',
  levelCount: 1,
} as IBuilding

const tmpLevel1: ILevel = {
  id: 1,
  name: 'Level 1',
}

const tmpArea1: IArea = {
  id: 1,
  name: 'Toilet',
} as IArea

const tmpArea2: IArea = {
  id: 2,
  name: 'Internal',
} as IArea

const tmpArea3: IArea = {
  id: 2,
  name: '[1-01]',
} as IArea

const tmpUnit1: IUnit = {
  id: 1,
  name: 'Female Toilet',
} as IUnit

const tmpUnit2: IUnit = {
  id: 2,
  name: 'Washroom 102',
} as IUnit

const tmpUnit3: IUnit = {
  id: 3,
  name: 'Washroom 103',
} as IUnit

const tmpUnit4: IUnit = {
  id: 4,
  name: 'Washroom 104',
} as IUnit

export const tmpWashroomOverviewList: IWashroomOverviewListItem[] = [
  {
    unit: {
      ...tmpUnit1,
      area: {
        ...tmpArea1,
        level: {
          ...tmpLevel1,
          building: {
            ...tmpBuilding1,
            location: { ...tmpLocation1, locationCategory: tmpLocationCategory },
          },
        },
      },
    },
    devices: [
      {
        name: 'Ammonia Sensor',
        status: WASHROOM_STATUS_LIST[2].value as string,
        value: 0.44,
        sensors: [
          { value: 0.45, position: { x: 10, y: 10 } },
          { value: 0.6, position: { x: 10, y: 15 } },
          { value: 0.23, position: { x: 15, y: 20 } },
          { value: 0.32, position: { x: 30, y: 25 } },
          { value: 0.46, position: { x: 50, y: 70 } },
        ],
      },
      {
        name: 'People Counter',
        status: WASHROOM_STATUS_LIST[2].value as string,
        value: 3,
        sensors: [{ value: 3, position: { x: 10, y: 10 } }],
      },
      {
        name: 'Feedback',
        status: WASHROOM_STATUS_LIST[2].value as string,
        value: 15,
        sensors: [
          { value: 0, label: 'Very Poor' },
          { value: 0, label: 'Poor' },
          { value: 2, label: 'Average' },
          { value: 7, label: 'Good' },
          { value: 6, label: 'Excellent' },
        ],
      },
      {
        name: 'Towel Dispenser',
        status: WASHROOM_STATUS_LIST[0].value as string,
        isPercent: true,
        value: 80,
        sensors: [
          { value: 40, position: { x: 10, y: 35 } },
          { value: 42, position: { x: 15, y: 25 } },
          { value: 40, position: { x: 20, y: 15 } },
          { value: 60, position: { x: 30, y: 35 } },
          {
            value: 80,
            position: { x: 50, y: 35 },
            status: WASHROOM_STATUS_LIST[0].value as string,
          },
          { value: 55, position: { x: 70, y: 35 } },
          { value: 45, position: { x: 70, y: 50 } },
        ],
      },
      {
        name: 'Smoke Sensor',
        status: WASHROOM_STATUS_LIST[2].value as string,
        sensors: [{ position: { x: 10, y: 35 } }],
      },
      {
        name: 'Emergency Button',
        status: WASHROOM_STATUS_LIST[2].value as string,
        sensors: [
          { position: { x: 10, y: 35 } },
          { position: { x: 15, y: 15 } },
          { position: { x: 30, y: 25 } },
          { position: { x: 40, y: 55 } },
        ],
      },
      {
        name: 'Wet Floor Sensor',
        status: WASHROOM_STATUS_LIST[2].value as string,
        sensors: [
          { position: { x: 10, y: 35 } },
          { position: { x: 15, y: 15 } },
          { position: { x: 30, y: 25 } },
          { position: { x: 40, y: 55 } },
          { position: { x: 60, y: 75 } },
        ],
      },
      {
        name: 'Smart Bin',
        status: WASHROOM_STATUS_LIST[2].value as string,
        isPercent: true,
        value: 30,
        sensors: [
          { value: 23, position: { x: 10, y: 35 } },
          { value: 21, position: { x: 15, y: 15 } },
          { value: 22, position: { x: 30, y: 25 } },
          { value: 26, position: { x: 40, y: 55 } },
          { value: 26, position: { x: 60, y: 75 } },
          { value: 30, position: { x: 80, y: 70 } },
          { value: 28, position: { x: 70, y: 65 } },
        ],
      },
      {
        name: 'Occupancy Sensor',
        status: WASHROOM_STATUS_LIST[2].value as string,
        value: 1,
        sensors: [
          { position: { x: 10, y: 35 } },
          { value: 1, position: { x: 15, y: 15 } },
          { position: { x: 30, y: 25 } },
        ],
      },
    ],
  },
  {
    unit: {
      ...tmpUnit2,
      area: {
        ...tmpArea2,
        level: {
          ...tmpLevel1,
          building: {
            ...tmpBuilding1,
            location: { ...tmpLocation2, locationCategory: tmpLocationCategory },
          },
        },
      },
    },
    devices: [
      {
        name: 'Ammonia Sensor',
        status: WASHROOM_STATUS_LIST[1].value as string,
        value: 1.5,
        sensors: [
          { value: 0.45, position: { x: 10, y: 10 } },
          { value: 0.6, position: { x: 10, y: 15 } },
          { value: 0.23, position: { x: 15, y: 20 } },
          { value: 0.32, position: { x: 30, y: 25 } },
          { value: 0.46, position: { x: 50, y: 70 } },
        ],
      },
      {
        name: 'People Counter',
        status: WASHROOM_STATUS_LIST[2].value as string,
        value: 3,
        sensors: [{ value: 3, position: { x: 10, y: 10 } }],
      },
      {
        name: 'Feedback',
        status: WASHROOM_STATUS_LIST[2].value as string,
        value: 15,
        sensors: [
          { value: 0, label: 'Very Poor' },
          { value: 0, label: 'Poor' },
          { value: 2, label: 'Average' },
          { value: 7, label: 'Good' },
          { value: 6, label: 'Excellent' },
        ],
      },
      {
        name: 'Towel Dispenser',
        status: WASHROOM_STATUS_LIST[0].value as string,
        isPercent: true,
        value: 80,
        sensors: [
          { value: 40, position: { x: 10, y: 35 } },
          { value: 42, position: { x: 15, y: 25 } },
          { value: 40, position: { x: 20, y: 15 } },
          { value: 60, position: { x: 30, y: 35 } },
          {
            value: 80,
            position: { x: 50, y: 35 },
            status: WASHROOM_STATUS_LIST[0].value as string,
          },
          { value: 55, position: { x: 70, y: 35 } },
          { value: 45, position: { x: 70, y: 50 } },
        ],
      },
      {
        name: 'Smoke Sensor',
        status: WASHROOM_STATUS_LIST[2].value as string,
        sensors: [{ position: { x: 10, y: 35 } }],
      },
      {
        name: 'Emergency Button',
        status: WASHROOM_STATUS_LIST[2].value as string,
        sensors: [
          { position: { x: 10, y: 35 } },
          { position: { x: 15, y: 15 } },
          { position: { x: 30, y: 25 } },
          { position: { x: 40, y: 55 } },
        ],
      },
      {
        name: 'Wet Floor Sensor',
        status: WASHROOM_STATUS_LIST[2].value as string,
        sensors: [
          { position: { x: 10, y: 35 } },
          { position: { x: 15, y: 15 } },
          { position: { x: 30, y: 25 } },
          { position: { x: 40, y: 55 } },
          { position: { x: 60, y: 75 } },
        ],
      },
      {
        name: 'Smart Bin',
        status: WASHROOM_STATUS_LIST[2].value as string,
        isPercent: true,
        value: 30,
        sensors: [
          { value: 23, position: { x: 10, y: 35 } },
          { value: 21, position: { x: 15, y: 15 } },
          { value: 22, position: { x: 30, y: 25 } },
          { value: 26, position: { x: 40, y: 55 } },
          { value: 26, position: { x: 60, y: 75 } },
          { value: 30, position: { x: 80, y: 70 } },
          { value: 28, position: { x: 70, y: 65 } },
        ],
      },
      {
        name: 'Occupancy Sensor',
        status: WASHROOM_STATUS_LIST[2].value as string,
        value: 1,
        sensors: [
          { position: { x: 10, y: 35 } },
          { value: 1, position: { x: 15, y: 15 } },
          { position: { x: 30, y: 25 } },
        ],
      },
    ],
  },
  {
    unit: {
      ...tmpUnit3,
      area: {
        ...tmpArea2,
        level: {
          ...tmpLevel1,
          building: {
            ...tmpBuilding1,
            location: { ...tmpLocation2, locationCategory: tmpLocationCategory },
          },
        },
      },
    },
    devices: [
      {
        name: 'Ammonia Sensor',
        status: WASHROOM_STATUS_LIST[1].value as string,
        value: 1.5,
        sensors: [
          { value: 0.45, position: { x: 10, y: 10 } },
          { value: 0.6, position: { x: 10, y: 15 } },
          { value: 0.23, position: { x: 15, y: 20 } },
          { value: 0.32, position: { x: 30, y: 25 } },
          { value: 0.46, position: { x: 50, y: 70 } },
        ],
      },
      {
        name: 'People Counter',
        status: WASHROOM_STATUS_LIST[2].value as string,
        value: 3,
        sensors: [{ value: 3, position: { x: 10, y: 10 } }],
      },
      {
        name: 'Feedback',
        status: WASHROOM_STATUS_LIST[2].value as string,
        value: 15,
        sensors: [
          { value: 0, label: 'Very Poor' },
          { value: 0, label: 'Poor' },
          { value: 2, label: 'Average' },
          { value: 7, label: 'Good' },
          { value: 6, label: 'Excellent' },
        ],
      },
      {
        name: 'Towel Dispenser',
        status: WASHROOM_STATUS_LIST[0].value as string,
        isPercent: true,
        value: 80,
        sensors: [
          { value: 40, position: { x: 10, y: 35 } },
          { value: 42, position: { x: 15, y: 25 } },
          { value: 40, position: { x: 20, y: 15 } },
          { value: 60, position: { x: 30, y: 35 } },
          {
            value: 80,
            position: { x: 50, y: 35 },
            status: WASHROOM_STATUS_LIST[0].value as string,
          },
          { value: 55, position: { x: 70, y: 35 } },
          { value: 45, position: { x: 70, y: 50 } },
        ],
      },
      {
        name: 'Smoke Sensor',
        status: WASHROOM_STATUS_LIST[2].value as string,
        sensors: [{ position: { x: 10, y: 35 } }],
      },
      {
        name: 'Emergency Button',
        status: WASHROOM_STATUS_LIST[2].value as string,
        sensors: [
          { position: { x: 10, y: 35 } },
          { position: { x: 15, y: 15 } },
          { position: { x: 30, y: 25 } },
          { position: { x: 40, y: 55 } },
        ],
      },
      {
        name: 'Wet Floor Sensor',
        status: WASHROOM_STATUS_LIST[2].value as string,
        sensors: [
          { position: { x: 10, y: 35 } },
          { position: { x: 15, y: 15 } },
          { position: { x: 30, y: 25 } },
          { position: { x: 40, y: 55 } },
          { position: { x: 60, y: 75 } },
        ],
      },
      {
        name: 'Smart Bin',
        status: WASHROOM_STATUS_LIST[2].value as string,
        isPercent: true,
        value: 30,
        sensors: [
          { value: 23, position: { x: 10, y: 35 } },
          { value: 21, position: { x: 15, y: 15 } },
          { value: 22, position: { x: 30, y: 25 } },
          { value: 26, position: { x: 40, y: 55 } },
          { value: 26, position: { x: 60, y: 75 } },
          { value: 30, position: { x: 80, y: 70 } },
          { value: 28, position: { x: 70, y: 65 } },
        ],
      },
      {
        name: 'Occupancy Sensor',
        status: WASHROOM_STATUS_LIST[2].value as string,
        value: 1,
        sensors: [
          { position: { x: 10, y: 35 } },
          { value: 1, position: { x: 15, y: 15 } },
          { position: { x: 30, y: 25 } },
        ],
      },
    ],
  },
  {
    unit: {
      ...tmpUnit4,
      area: {
        ...tmpArea2,
        level: {
          ...tmpLevel1,
          building: {
            ...tmpBuilding1,
            location: { ...tmpLocation2, locationCategory: tmpLocationCategory },
          },
        },
      },
    },
    devices: [
      {
        name: 'Ammonia Sensor',
        status: WASHROOM_STATUS_LIST[1].value as string,
        value: 1.5,
        sensors: [
          { value: 0.45, position: { x: 10, y: 10 } },
          { value: 0.6, position: { x: 10, y: 15 } },
          { value: 0.23, position: { x: 15, y: 20 } },
          { value: 0.32, position: { x: 30, y: 25 } },
          { value: 0.46, position: { x: 50, y: 70 } },
        ],
      },
      {
        name: 'People Counter',
        status: WASHROOM_STATUS_LIST[2].value as string,
        value: 3,
        sensors: [{ value: 3, position: { x: 10, y: 10 } }],
      },
      {
        name: 'Feedback',
        status: WASHROOM_STATUS_LIST[2].value as string,
        value: 15,
        sensors: [
          { value: 0, label: 'Very Poor' },
          { value: 0, label: 'Poor' },
          { value: 2, label: 'Average' },
          { value: 7, label: 'Good' },
          { value: 6, label: 'Excellent' },
        ],
      },
      {
        name: 'Towel Dispenser',
        status: WASHROOM_STATUS_LIST[0].value as string,
        isPercent: true,
        value: 80,
        sensors: [
          { value: 40, position: { x: 10, y: 35 } },
          { value: 42, position: { x: 15, y: 25 } },
          { value: 40, position: { x: 20, y: 15 } },
          { value: 60, position: { x: 30, y: 35 } },
          {
            value: 80,
            position: { x: 50, y: 35 },
            status: WASHROOM_STATUS_LIST[0].value as string,
          },
          { value: 55, position: { x: 70, y: 35 } },
          { value: 45, position: { x: 70, y: 50 } },
        ],
      },
      {
        name: 'Smoke Sensor',
        status: WASHROOM_STATUS_LIST[2].value as string,
        sensors: [{ position: { x: 10, y: 35 } }],
      },
      {
        name: 'Emergency Button',
        status: WASHROOM_STATUS_LIST[2].value as string,
        sensors: [
          { position: { x: 10, y: 35 } },
          { position: { x: 15, y: 15 } },
          { position: { x: 30, y: 25 } },
          { position: { x: 40, y: 55 } },
        ],
      },
      {
        name: 'Wet Floor Sensor',
        status: WASHROOM_STATUS_LIST[2].value as string,
        sensors: [
          { position: { x: 10, y: 35 } },
          { position: { x: 15, y: 15 } },
          { position: { x: 30, y: 25 } },
          { position: { x: 40, y: 55 } },
          { position: { x: 60, y: 75 } },
        ],
      },
      {
        name: 'Smart Bin',
        status: WASHROOM_STATUS_LIST[2].value as string,
        isPercent: true,
        value: 30,
        sensors: [
          { value: 23, position: { x: 10, y: 35 } },
          { value: 21, position: { x: 15, y: 15 } },
          { value: 22, position: { x: 30, y: 25 } },
          { value: 26, position: { x: 40, y: 55 } },
          { value: 26, position: { x: 60, y: 75 } },
          { value: 30, position: { x: 80, y: 70 } },
          { value: 28, position: { x: 70, y: 65 } },
        ],
      },
      {
        name: 'Occupancy Sensor',
        status: WASHROOM_STATUS_LIST[2].value as string,
        value: 1,
        sensors: [
          { position: { x: 10, y: 35 } },
          { value: 1, position: { x: 15, y: 15 } },
          { position: { x: 30, y: 25 } },
        ],
      },
    ],
  },
]

export const tmpLocationList = {
  count: 5,
  rows: [
    { ...tmpLocation1, locationCategory: tmpLocationCategory },
    { ...tmpLocation1, locationCategory: tmpLocationCategory },
    { ...tmpLocation1, locationCategory: tmpLocationCategory },
    { ...tmpLocation1, locationCategory: tmpLocationCategory },
    { ...tmpLocation1, locationCategory: tmpLocationCategory },
  ],
}

export const tmpAreaThresholdList: IWashroomAreaThreshold[] = [
  {
    areaId: tmpArea3.id,
    area: {
      ...tmpArea3,
      level: {
        ...tmpLevel1,
        building: {
          ...tmpBuilding1,
          location: {
            ...tmpLocation1,
            locationCategory: { ...tmpLocationCategory, project: tmpProject1 },
          },
        },
      },
    },
    thresholds: { high: 2.5, medium: 1.5, normal: 1 },
  },
  {
    areaId: tmpArea3.id,
    area: {
      ...tmpArea3,
      level: {
        ...tmpLevel1,
        building: {
          ...tmpBuilding1,
          location: {
            ...tmpLocation1,
            locationCategory: { ...tmpLocationCategory, project: tmpProject1 },
          },
        },
      },
    },
    thresholds: { high: 2.5, medium: 1.5, normal: 1 },
  },
  {
    areaId: tmpArea3.id,
    area: {
      ...tmpArea3,
      level: {
        ...tmpLevel1,
        building: {
          ...tmpBuilding1,
          location: {
            ...tmpLocation1,
            locationCategory: { ...tmpLocationCategory, project: tmpProject1 },
          },
        },
      },
    },
    thresholds: { high: 2.5, medium: 1.5, normal: 1 },
  },
  {
    areaId: tmpArea3.id,
    area: {
      ...tmpArea3,
      level: {
        ...tmpLevel1,
        building: {
          ...tmpBuilding1,
          location: {
            ...tmpLocation1,
            locationCategory: { ...tmpLocationCategory, project: tmpProject1 },
          },
        },
      },
    },
    thresholds: { high: 2.5, medium: 1.5, normal: 1 },
  },
  {
    areaId: tmpArea3.id,
    area: {
      ...tmpArea3,
      level: {
        ...tmpLevel1,
        building: {
          ...tmpBuilding1,
          location: {
            ...tmpLocation1,
            locationCategory: { ...tmpLocationCategory, project: tmpProject1 },
          },
        },
      },
    },
    thresholds: { high: 2.5, medium: 1.5, normal: 1 },
  },
  {
    areaId: tmpArea3.id,
    area: {
      ...tmpArea3,
      level: {
        ...tmpLevel1,
        building: {
          ...tmpBuilding1,
          location: {
            ...tmpLocation1,
            locationCategory: { ...tmpLocationCategory, project: tmpProject1 },
          },
        },
      },
    },
    thresholds: { high: 2.5, medium: 1.5, normal: 1 },
  },
  {
    areaId: tmpArea3.id,
    area: {
      ...tmpArea3,
      level: {
        ...tmpLevel1,
        building: {
          ...tmpBuilding1,
          location: {
            ...tmpLocation1,
            locationCategory: { ...tmpLocationCategory, project: tmpProject1 },
          },
        },
      },
    },
    thresholds: { high: 2.5, medium: 1.5, normal: 1 },
  },
  {
    areaId: tmpArea3.id,
    area: {
      ...tmpArea3,
      level: {
        ...tmpLevel1,
        building: {
          ...tmpBuilding1,
          location: {
            ...tmpLocation1,
            locationCategory: { ...tmpLocationCategory, project: tmpProject1 },
          },
        },
      },
    },
    thresholds: { high: 2.5, medium: 1.5, normal: 1 },
  },
  {
    areaId: tmpArea3.id,
    area: {
      ...tmpArea3,
      level: {
        ...tmpLevel1,
        building: {
          ...tmpBuilding1,
          location: {
            ...tmpLocation1,
            locationCategory: { ...tmpLocationCategory, project: tmpProject1 },
          },
        },
      },
    },
    thresholds: { high: 2.5, medium: 1.5, normal: 1 },
  },
  {
    areaId: tmpArea3.id,
    area: {
      ...tmpArea3,
      level: {
        ...tmpLevel1,
        building: {
          ...tmpBuilding1,
          location: {
            ...tmpLocation1,
            locationCategory: { ...tmpLocationCategory, project: tmpProject1 },
          },
        },
      },
    },
    thresholds: { high: 2.5, medium: 1.5, normal: 1 },
  },
  {
    areaId: tmpArea3.id,
    area: {
      ...tmpArea3,
      level: {
        ...tmpLevel1,
        building: {
          ...tmpBuilding1,
          location: {
            ...tmpLocation1,
            locationCategory: { ...tmpLocationCategory, project: tmpProject1 },
          },
        },
      },
    },
    thresholds: { high: 2.5, medium: 1.5, normal: 1 },
  },
  {
    areaId: tmpArea3.id,
    area: {
      ...tmpArea3,
      level: {
        ...tmpLevel1,
        building: {
          ...tmpBuilding1,
          location: {
            ...tmpLocation1,
            locationCategory: { ...tmpLocationCategory, project: tmpProject1 },
          },
        },
      },
    },
    thresholds: { high: 2.5, medium: 1.5, normal: 1 },
  },
]
