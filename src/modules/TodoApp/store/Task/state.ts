import { Task } from '../../models/Task';

export interface StateTask {
  task: Task[];
  filterTask: Task[];
  searchTask: Task[];
  isLoading: boolean;
}

function state(): StateTask {
  return {
    task: [],
    searchTask: [],
    filterTask: [],
    isLoading: false,
  };
}

export default state;
