import { Module } from 'vuex';
import { StateInterface } from '../../../../store/index';
import state, { StateTask } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const TaskModule: Module<StateTask, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default TaskModule;
