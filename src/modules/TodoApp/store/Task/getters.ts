import { GetterTree } from 'vuex';
import { StateInterface } from '../../../../store/index';
import { StateTask } from './state';

const getters: GetterTree<StateTask, StateInterface> = {
  getLoading(context) {
    return context.isLoading;
  },
  getAllTask(context) {
    return context.task;
  },
  getFilterTask(context) {
    return context.filterTask;
  },
  getSearchFilter(context) {
    return context.searchTask;
  },
};

export default getters;
