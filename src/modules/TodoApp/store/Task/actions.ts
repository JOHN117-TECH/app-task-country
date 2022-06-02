import { ActionTree } from 'vuex';
import { StateInterface } from '../../../../store/index';
import { StateTask } from './state';
import { PropsCompletedAction, Task } from '../../models/Task';

const actions: ActionTree<StateTask, StateInterface> = {
  appendTask: (context, Task: Task) => {
    context.commit('toggleLoading');
    context.commit('addTask', Task);
    setTimeout(() => {
      context.commit('toggleLoading');
    }, 1000);
  },
  changeTaskToCompleted: (context, { id, val }: PropsCompletedAction) => {
    const index = context.state.task.findIndex((x) => x.id === id);
    context.commit('toggleCompleted', { index, val });
  },
};

export default actions;
