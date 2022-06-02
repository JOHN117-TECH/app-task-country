import generateId from 'src/utils/GenerateId';
import { MutationTree } from 'vuex';
import { PropsCompletedMutation, Task } from '../../models/Task';
import { StateTask } from './state';

const mutation: MutationTree<StateTask> = {
  addTask(state: StateTask, { title, description, complete }: Task) {
    state.task.push({ id: generateId(), title, description, complete });
  },
  deleteTask(state: StateTask, id) {
    state.task = state.task.filter((Task) => Task.id !== id);
  },
  toggleCompleted(state: StateTask, { index, val }: PropsCompletedMutation) {
    state.task[index].complete = val;
  },
  toggleLoading(state: StateTask) {
    state.isLoading = !state.isLoading;
  },
  filterToCompleteTask(state: StateTask) {
    state.filterTask = state.task.filter((Task) => Task.complete === true);
    state.searchTask = [];
  },
  filterToIncompleteTask(state: StateTask) {
    state.filterTask = state.task.filter((Task) => Task.complete === false);
    state.searchTask = [];
  },
  searchToTask(state: StateTask, { value, changeFilter }) {
    changeFilter
      ? (state.searchTask = state.task.filter((Task) =>
        Task.description.includes(value)
      ))
      : (state.searchTask = state.task.filter((Task) =>
        Task.title.includes(value)
      ));
  },
  resetFilter(state: StateTask) {
    state.filterTask = [];
  },
};

export default mutation;
