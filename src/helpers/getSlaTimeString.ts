import { ISlaTime } from "../types/performance-management";

export function getSlaTimeString(time: ISlaTime | null): string | null {
  if(!time) return null
  const { days, hours, minutes } = time;
  const parts = [];

  if (days !== null && days !== undefined && days !== 0) {
    parts.push(`${days} day${days !== 1 ? 's' : ''}`);
  }

  if (hours !== null && hours !== undefined && hours !== 0) {
    parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
  }

  if (minutes !== null && minutes !== undefined && minutes !== 0) {
    parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
  }

  return parts.join(' ');
}


export function parseSlaTime(input: string): ISlaTime | null {
  if(!input) return null
  
  const timeParts = input.split(' ');

  let days: number | null = null;
  let hours: number | null = null;
  let minutes: number | null = null;

  for (let i = 0; i < timeParts.length; i++) {
    const value = parseInt(timeParts[i]);
    if (!isNaN(value)) {
      const unit = timeParts[i + 1]?.toLowerCase(); // Check the unit after the number

      if (unit === 'day' || unit === 'days') {
        days = value;
      } else if (unit === 'hour' || unit === 'hours') {
        hours = value;
      } else if (unit === 'minute' || unit === 'minutes') {
        minutes = value;
      } else {
        // If no unit is specified, assume it's minutes if it's a single number
        if (timeParts.length === 1) {
          minutes = value;
        }
      }
    }
  }

  return { days, hours, minutes };
}