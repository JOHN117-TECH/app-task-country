<template>
  <q-page>
    <TaskLayout />
  </q-page>
</template>

<script>
import TaskLayout from '../modules/TodoApp/layouts/TaskLayout.vue';
export default {
  name: 'TodoPage',
  components: {
    TaskLayout,
  },
};
</script>

<style></style>
