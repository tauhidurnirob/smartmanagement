import React, { FC, useMemo } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { ITaskRoutine } from '../../types/performance-management';
import getGroupRoutineTasksByKeys from '../../helpers/getGroupedRoutineTasksByKeys';
import deepCopy from '../../helpers/deepCopy';

function adjustTimes(startTime: string, endTime: string): { adjustedStartTime: string, adjustedEndTime: string } {
  let startHours = Number(startTime.split(':')[0]);
  let endHours = Number(endTime.split(':')[0]);
  const startMins = Number(startTime.split(':')[1]);
  const endMins = Number(endTime.split(':')[1]);

  console.log(startHours, endHours, startMins, endMins)

  if(startMins !== 0) {
    startHours = startHours - 1
  }
  if(endMins !== 0) {
    endHours = endHours + 1
  }
  const adjustedStartTime = `${String(startHours).padStart(2, '0')}:00`;

  const adjustedEndTime = `${String(endHours).padStart(2, '0')}:00`;

  return {
    adjustedStartTime,
    adjustedEndTime,
  };
}

const columnNames = [
  'Name',
  'Role',
  'Sub Location Assigned',
  '07:00-08:00',
  '08:00-09:00',
  '09:00-10:00',
  '10:00-11:00',
  '11:00-12:00',
  '12:00-13:00',
  '13:00-14:00',
  '14:00-15:00',
  '15:00-16:00',
  '16:00-17:00',
  '17:00-18:00',
  '18:00-19:00',
  'Remark',
];

interface TimeSlot {
  start: string;
  end: string;
  activities: string[];
}

function organizeTasksIntoTimeSlots(tasks: ITaskRoutine[]): TimeSlot[] {
  const timeSlots: { [key: string]: TimeSlot } = {};

  tasks.forEach((task: ITaskRoutine) => {
    const { adjustedStartTime, adjustedEndTime } = adjustTimes(task.startTime, task.endTime);
    console.log(adjustedStartTime, adjustedEndTime)

    if (!timeSlots[adjustedStartTime]) {
      timeSlots[adjustedStartTime] = {
        start: adjustedStartTime,
        end: adjustedEndTime,
        activities: [task.taskActivity.name],
      };
    } else {
      timeSlots[adjustedStartTime].activities.push(task.taskActivity.name);
    }
  });

  const timeSlotArray: TimeSlot[] = Object.values(timeSlots);

  return timeSlotArray;
}

// Function to convert time string to minutes for comparison
const timeToMinutes = (time: string) => {
  const splittedTime = time.split(':');
  return Number(splittedTime[0]) * 60 + Number(splittedTime[1]);
};

interface IEnhancedTableProps {
  data: ITaskRoutine[]
  loading: boolean;
  sx?: object;
}

const RoutineTable: FC<IEnhancedTableProps> = ({ data, loading }) => {

  const groupedTasks = useMemo(() => {
    return getGroupRoutineTasksByKeys(data, 'staffId')
  }, [data])
  const tasksArr: ITaskRoutine[][] = Object.values(groupedTasks);
  console.log(tasksArr)

  const generateTimeSlotCells = (tasks: ITaskRoutine[]) => {
    const timeSlots: TimeSlot[] = organizeTasksIntoTimeSlots(tasks);
    const cells: JSX.Element[] = [];

    // Assuming the first 4 columns are not time slots and the last 2 columns are "Remark" and "Action"
    const timeSlotColumns = deepCopy(columnNames).slice(4, -1);

    let lastColEnd = timeToMinutes('07:00');
    for (let i = 0; i < timeSlotColumns.length; i++) {
      const columnName = timeSlotColumns[i];
      const [colStartStr, colEndStr] = columnName ? columnName.split('-') : ['10', '12'];
      const colStart = timeToMinutes(colStartStr);
      const colEnd = timeToMinutes(colEndStr);

      if (lastColEnd < colStart) {
        // Fill in the gap with empty cells
        while (lastColEnd < colStart) {
          cells.push(<TableCell key={`empty-${lastColEnd}`}>-</TableCell>);
          lastColEnd += 60; // move to the next hour
        }
      }
      // Find if there's a slot covering this column
      const slot = timeSlots.find(
        (s) => timeToMinutes(s.start) <= colStart && timeToMinutes(s.end) >= colEnd
      );

      if (slot) {
        const colSpan = (timeToMinutes(slot.end) - colStart) / 60;
        cells.push(
          <TableCell key={`timeslot-${slot.start}-${i}`} colSpan={colSpan} style={{ backgroundColor: '#EDF6FF' }}>
            {slot.activities.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </TableCell>
        );
        lastColEnd = timeToMinutes(slot.end); // update the last covered end time
        i += colSpan - 1; // skip columns covered by colspan
      } else {
        // if no slot starts at this column, add an empty cell
        cells.push(<TableCell key={`empty-${i}`}>-</TableCell>);
        lastColEnd = colEnd; // update the last covered end time
      }
    }
    return cells;
  };

  const lastIndex = columnNames.length - 1;

  const handleView = (id: number) => {

  }

  return (
    <Box position="relative">
      <Typography variant='h2' mb={2} >{data?.[0]?.location?.name}</Typography>
      <TableContainer component={Paper}>
        <Table>
          {/* Table Head */}
          <TableHead>
            <TableRow style={{ width: '100%', overflowX: 'scroll', whiteSpace: 'nowrap' }} >
              {columnNames.map((columnName, index) => ((
                  <TableCell key={index} style={index === lastIndex ? { width: '40%' } : { width: '15%' }} >{columnName}</TableCell>
                )
              ))}

            </TableRow>
          </TableHead>
          <TableBody>
            {tasksArr?.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell>{row[0].staff?.fullName}</TableCell>
                <TableCell>{row[0].staff?.role?.name}</TableCell>
                <TableCell style={{ borderRight: '1px solid #000' }}>{row[0].routine?.subLocationAssigned}</TableCell>
                {generateTimeSlotCells(row)}
                <TableCell >{row[0].remarks}</TableCell>
                <TableCell>
                  {/* <ListOptionButton
                    list={
                      [
                        { title: 'View', icon: "", onClick: () => handleView() }
                      ]
                    }
                  /> */}

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RoutineTable;
