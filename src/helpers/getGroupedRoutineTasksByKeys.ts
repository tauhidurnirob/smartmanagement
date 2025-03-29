import { ITaskRoutine } from "../types/performance-management";

export default function getGroupRoutineTasksByKeys (tasks: ITaskRoutine[] | undefined, objectKey: string){
  const groupedTasks: any = {};

  tasks?.forEach((task) => {
    const key = `${task[objectKey as keyof ITaskRoutine]}`

    if (!groupedTasks[key]) {
      groupedTasks[key] = [];
    }

    groupedTasks[key].push(task);
  });

  return groupedTasks;
}