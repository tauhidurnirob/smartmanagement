import React, { FC,useEffect,useState } from 'react';
import { Box } from '@mui/material';
import PeriodicTable from '../../common/PeriodicTable';
import dayjs from 'dayjs'
import ListOptionButton from '../../common/ListOptionButton'
import { useNavigate } from 'react-router-dom'
import {
  IResList,
  ISelectItem,
  ITableHeadCell,
  OrderDirection,
  TableData,
  TableDataFieldName,
} from '../../../types/common'
import { ITaskList } from '../../../types/performance-management';
import { DATE_FORMAT_WITHOUT_TIME } from '../../../constants/common';
import { parseSlaTime } from '../../../helpers/getSlaTimeString';
import useAuth from '../../../hooks/useAuth';
import { ROLE_PERMISSION_KEYS } from '../../../helpers/constants';
import { toast } from 'react-toastify';

function getDaysInMonth(year: number, month: number): number {
  // Day.js uses 1-based months, so no need to subtract 1 from the month
  const firstDayOfMonth = dayjs(`${year}-${month}-01`);
  const lastDayOfMonth = firstDayOfMonth.endOf('month');

  // The diff() method returns the difference in days
  return lastDayOfMonth.diff(firstDayOfMonth, 'day') + 1;
}

interface IProps {
  data: IResList<ITaskList> | undefined
  loading: boolean
  page: number
  setPage: (page: number) => void
  limit: number
  setLimit: (limit: number) => void
  orderBy: string
  setOrderBy: (sortBy: keyof ITaskList) => void
  orderDir: OrderDirection
  setOrderDir: (orderDir: OrderDirection) => void
  selected: number[]
  setSelected: (ids: number[]) => void
  selectedYear: number
  selectedMonth: number
}

const PeriodicLogList: FC<IProps> = ({
  data,
  loading,
  page,
  setPage,
  limit,
  setLimit,
  orderBy,
  setOrderBy,
  orderDir,
  setOrderDir,
  selected,
  setSelected,
  selectedYear,
  selectedMonth
}) => {
  const navigate = useNavigate()

  const handleDownloadAudit = () => {
   
  }
  const { user } = useAuth(); 
  useEffect(() => {
    if (user && user.role && user.role.permission.permissions.includes(ROLE_PERMISSION_KEYS.taskManagement.taskAllocation.viewDetailsPeriodicTask)) {
      setIsEditable(true);
    }else{
      setIsEditable(false);
    }
  
  }, []);
  const [isEditable, setIsEditable] = useState(true);
  const handleView = (data: ITaskList) => {
    if(isEditable){
      navigate(`/performance-management/task-allocation/periodic-task/${data.id}`)
    }else{
      toast.error('You do not have access to view!')
    }

  }

  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth)
  const estimatedManDaysHeader = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: TableDataFieldName) => {
    const isAsc = orderBy === property && orderDir === 'asc'
    setOrderDir(isAsc ? 'desc' : 'asc')
    setOrderBy(property as keyof ITaskList)
  }


  const headCells: ITableHeadCell[]  = [
    {
      id: 'project',
      name: 'Project',
      render: (item: TableData) => {
        const { project } = item as ITaskList
        return project?.name || '_'
      },
    },
    {
      id: 'premiseCategory',
      name: 'Premise Category',
      render: (item: TableData) => {
        const { premiseCategory } = item as ITaskList
        return premiseCategory?.name || '_'
      },
    },  {
      id: 'taskActivity',
      name: 'Task Activity',
      render: (item: TableData) => {
        const { taskActivity } = item as ITaskList
        return taskActivity?.[0]?.name || '_'
      },
    },
    {
      id: 'frequency',
      name: 'Frequency',
      render: (item: TableData) => {
        const { frequency } = item as ITaskList
        return frequency || '_'
      },
    },
    {
      id: 'startDate',
      name: 'Start Date',
      render: (item: TableData) => {
        const { startDate } = item as ITaskList
        return startDate ? dayjs(startDate).format(DATE_FORMAT_WITHOUT_TIME) : '_'
      },
    },
    {
      id: '',
      name: 'Start Time',
      render: (item: TableData) => {
        const { startTime } = item as ITaskList
        return startTime || '_'
      },
    },
    {
      id: '',
      name: 'Estimated Man Days Required',
      render: (item: TableData) => {
        const { taskDays } = item as ITaskList
        return taskDays || '_'
      },
    },
    {
      id: 'staffAssigned',
      name: 'Staff Assigned',
      render: (item: TableData) => {
        const { taskStaffs } = item as ITaskList
        return taskStaffs?.length > 0 ? taskStaffs?.map((a, idx) => `${a.staff?.fullName}${taskStaffs?.length - 1 !== idx ? ', ' : ''}`) : '_'
      },
      
    },
    ...estimatedManDaysHeader.map((day) => {
      return {
        id: `day-${day}`,
        name: `${day}`,
        render: (item: TableData) => {
          const { startDate, taskDays } = item as ITaskList
          const sla = parseSlaTime(taskDays)
          const startDay = Number(dayjs(startDate).format('DD'))
          const isHighlighted1 = startDate && taskDays && sla?.days ? (startDay < day && (startDay + Number(sla?.days)) > Number(day)) : false
          const isHighlighted2 = startDate ? startDay === Number(day) : false
          const isHighlighted = isHighlighted1 || isHighlighted2
          return (
            <Box 
              style={{ 
                width: '65px',
                height: '65px',
                backgroundColor: isHighlighted ? '#3699FF' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
              }}
            >
              {isHighlighted ? '' : ''}
            </Box>
          )
        },
      };
    }),
    {
      id: 'remarks',
      name: 'Remarks',
      render: (item: TableData) => {
        const { remark } = item as ITaskList
        return remark || '_'
      },
    },
    {
      id: 'action',
      name: 'Action',
      render: (item: TableData) => {
        const data = item as any;
        return (
          <ListOptionButton
            list={[
              { title: 'View', onClick: () => handleView(data) },
              { title: 'Download', onClick: () => handleDownloadAudit() },
            ]}
          />
        );
      },
    },

  ]

  return (
    <Box mt={1.5}>
      <PeriodicTable
        loading={loading}
        totalCount={data?.count || 0}
        data={data?.rows || []}
        page={page}
        rowsPerPage={limit}
        onPageChange={setPage}
        onRowsPerPageChange={setLimit}
        order={orderDir}
        orderBy={orderBy}
        onRequestSort={handleRequestSort}
        headCells={headCells}
        hasCheckbox={true}
        selected={selected}
        onSelect={setSelected}
        onSelectIdFieldName={'id'}
      />
    </Box>
  );
};

export default PeriodicLogList;


