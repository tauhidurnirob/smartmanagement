import dayjs, { Dayjs } from 'dayjs';

export default function deepCopy<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    // If the object is null or not of type 'object', return the object as is.
    return obj;
  }

  if (dayjs.isDayjs(obj)) {
    // If the object is a Day.js object, create a new Day.js object with the same value.
    return (obj as Dayjs).clone() as any;
  }

  const copy: any = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = deepCopy(obj[key]);
    }
  }

  return copy;
}