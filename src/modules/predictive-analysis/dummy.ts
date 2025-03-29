import { IArea, IBuilding, ILevel, IUnit } from '../../api/models'
import {
  IResourceAllocationItem,
  IWashroomStatisticItem,
  IWashroomStatisticItemUnitDetail,
} from '../../types/predictive-analysis'
import { IRole } from '../../types/role'

const tmpBuilding1 = { id: 1, name: 'Building 1' } as IBuilding
const tmpBuilding2 = { id: 2, name: 'Building 2' } as IBuilding
const tmpLevel1 = { id: 1, name: '1' } as ILevel
const tmpLevel2 = { id: 2, name: '2' } as ILevel
const tmpLevel3 = { id: 3, name: '3' } as ILevel
const tmpLevel4 = { id: 4, name: '4' } as ILevel
const tmpUnit1 = {
  id: 1,
  name: 'Female',
  area: { id: 1, name: '1-01', level: tmpLevel1 } as IArea,
} as IUnit
const tmpUnit2 = {
  id: 2,
  name: 'Male',
  area: { id: 2, name: '1-02', level: tmpLevel1 } as IArea,
} as IUnit
const tmpUnit3 = {
  id: 3,
  name: 'Female',
  area: { id: 3, name: '2-01', level: tmpLevel2 } as IArea,
} as IUnit
const tmpUnit4 = {
  id: 4,
  name: 'Male',
  area: { id: 4, name: '2-02', level: tmpLevel2 } as IArea,
} as IUnit
const tmpUnit5 = {
  id: 5,
  name: 'Female',
  area: { id: 5, name: '3-01', level: tmpLevel3 } as IArea,
} as IUnit
const tmpUnit6 = {
  id: 6,
  name: 'Male',
  area: { id: 6, name: '3-02', level: tmpLevel4 } as IArea,
} as IUnit
const tmpWashroomStatisticItemUnitDetails: IWashroomStatisticItemUnitDetail[] = [
  { date: '09:30', value: 25 },
  { date: '10:00', value: 15 },
  { date: '10:30', value: 25 },
  { date: '11:30', value: 45 },
]
const tmpRole1 = { id: 1, name: 'Manager' } as IRole
const tmpRole2 = { id: 2, name: 'Staff' } as IRole
const tmpArea1 = { id: 1, name: 'Classroom' } as IArea
const tmpArea2 = { id: 2, name: 'Washroom' } as IArea
const tmpArea3 = { id: 3, name: 'Hall' } as IArea

export const tmpWashroomStatisticList: IWashroomStatisticItem[] = [
  {
    building: tmpBuilding1,
    items: [
      { unit: tmpUnit1, items: tmpWashroomStatisticItemUnitDetails },
      { unit: tmpUnit2, items: tmpWashroomStatisticItemUnitDetails },
      { unit: tmpUnit3, items: tmpWashroomStatisticItemUnitDetails },
      { unit: tmpUnit4, items: tmpWashroomStatisticItemUnitDetails },
      { unit: tmpUnit5, items: tmpWashroomStatisticItemUnitDetails },
      { unit: tmpUnit6, items: tmpWashroomStatisticItemUnitDetails },
    ],
  },
  {
    building: tmpBuilding2,
    items: [
      { unit: tmpUnit1, items: tmpWashroomStatisticItemUnitDetails },
      { unit: tmpUnit2, items: tmpWashroomStatisticItemUnitDetails },
      { unit: tmpUnit3, items: tmpWashroomStatisticItemUnitDetails },
      { unit: tmpUnit4, items: tmpWashroomStatisticItemUnitDetails },
      { unit: tmpUnit5, items: tmpWashroomStatisticItemUnitDetails },
      { unit: tmpUnit6, items: tmpWashroomStatisticItemUnitDetails },
    ],
  },
]

export const tmpResourceAllocationList: IResourceAllocationItem[] = [
  {
    role: tmpRole1,
    items: [
      {
        area: tmpArea1,
        items: [
          { date: '09:00', value: 2 },
          { date: '09:30', value: null },
          { date: '10:00', value: null },
          { date: '10:30', value: 1 },
        ],
      },
      {
        area: tmpArea2,
        items: [
          { date: '09:00', value: 4 },
          { date: '10:30', value: 1 },
          { date: '11:30', value: 1 },
        ],
      },
      { area: tmpArea3, items: [{ date: '09:00', value: 1 }] },
    ],
  },
  {
    role: tmpRole2,
    items: [
      {
        area: tmpArea1,
        items: [
          { date: '09:00', value: 6 },
          { date: '09:30', value: null },
          { date: '10:00', value: null },
          { date: '10:30', value: 2 },
        ],
      },
      {
        area: tmpArea2,
        items: [
          { date: '09:00', value: 12 },
          { date: '09:30', value: 4 },
          { date: '10:00', value: 2 },
          { date: '10:30', value: 8 },
          { date: '11:30', value: 3 },
        ],
      },
      {
        area: tmpArea3,
        items: [
          { date: '09:00', value: 1 },
          { date: '11:30', value: 5 },
        ],
      },
    ],
  },
]
