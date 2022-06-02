<template>
  <div class="row q-mx-md">
    <p
      class="
        col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-3
        Container-completado
        q-pa-sm
      "
    >
      <q-checkbox
        v-if="filterTask.length === 0"
        v-model="val"
        :label="props.Task.complete ? 'Check' : 'To Do'"
        checked-icon="check"
        unchecked-icon="clear"
        indeterminate-icon="arrow_forward_ios"
        size="md"
      />
      <template v-if="filterTask.length > 0">{{
        props.Task.complete ? 'Check' : 'To Do'
      }}</template>
    </p>
    <p
      class="
        col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3
        Container-titulo
        q-pa-sm
      "
      :class="props.Task.complete && 'Check'"
    >
      {{ props.Task.title }}
    </p>
    <p
      class="
        col-xl-6 col-lg-6 col-md-6 col-sm-5 col-xs-5
        Container-descripcion
        q-pa-sm
      "
      :class="props.Task.complete && 'Check'"
    >
      {{ props.Task.description }}
    </p>
    <p class="col-xl-1 col-lg-1 col-md-1 col-sm-1s col-xs-1 delete-btn q-pa-sm">
      <q-btn
        @click="deleteTask(props.Task.id)"
        padding="10px 10px"
        color="warning"
        icon="delete"
      />
    </p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { watch } from 'vue';
import useTask from '../../../composable/useTask';
export default {
  name: 'CardView',
  props: {
    Task: {
      default: Object,
      required: true,
    },
  },
  setup(props) {
    const { changeCompleted, deleteTask, filterTask } = useTask();
    const val = ref();

    watch(val, (val) => {
      changeCompleted(props.Task.id, val);
    });

    return {
      filterTask,
      deleteTask,
      props,
      val,
    };
  },
};
</script>

<style lang="scss" scoped>
.col,
.col-1,
.col-2,
.col-3,
.col-6,
.col-8,
.col-4 {
  height: auto;
}
.Container-completado {
  border-top: 2px solid $dark;
  border-left: 2px solid $dark;
  border-bottom-left-radius: 20px;
  border-top-left-radius: 20px;
  border-bottom: 2px solid $dark;
  display: flex;
  align-items: center;
  justify-content: center;
}
.Container-titulo {
  border-top: 2px solid $dark;
  border-bottom: 2px solid $dark;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.Container-descripcion {
  border-top: 2px solid $dark;
  border-bottom: 2px solid $dark;
}
.Completado {
  text-decoration: line-through;
  color: #26a69a;
}
.delete-btn {
  border-top: 2px solid $dark;
  border-right: 2px solid $dark;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom: 2px solid $dark;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
