export interface SchoolPerformance {
    name: string;
    averagePerformance: number | null;
}

export interface IResDashboardData {
    perf: SchoolPerformance[];
    main: number;
    feed: number;
}
export interface IReqDashboard {
    startDate: string
    endDate: string
    locationIds: string
    projectIds: string
}


