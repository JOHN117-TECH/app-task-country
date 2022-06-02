import { Task } from 'src/modules/TodoApp/models/Task';
import { computed } from 'vue';
import { useStore } from '../store/index';
const useTask = () => {
  const store = useStore();
  return {
    isLoading: computed<boolean>(() => store.getters['Task/getLoading']),
    alltask: computed<Task>(() => store.getters['Task/getAllTask']),
    searchFilter: computed<Task>(() => store.getters['Task/getSearchFilter']),
    filterTask: computed<Task>(() => store.getters['Task/getFilterTask']),
    addTask: (Task: Task) => store.dispatch('Task/appendTask', Task),
    completetask: () => store.commit('Task/filterToCompleteTask'),
    incompleteTask: () => store.commit('Task/filterToIncompleteTask'),
    resetFilter: () => store.commit('Task/resetFilter'),
    search: (value: string, changeFilter: boolean) =>
      store.commit('Task/searchToTask', { value, changeFilter }),
    deleteTask: (id: string) => store.commit('Task/deleteTask', id),
    changeCompleted: (id: string, val: boolean) =>
      store.dispatch('Task/changeTaskToCompleted', { id, val }),
  };
};

export default useTask;
