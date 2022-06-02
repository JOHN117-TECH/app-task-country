<template>
  <div class="q-pa-sm">
    <q-form @submit.prevent="onSubmit" class="q-gutter-md">
      <div class="row">
        <div class="col-12">
          <q-card class="my-card q-ma-sm text-black q-gutter-md bg-grey-2">
            <div class="row">
              <h5
                class="
                  col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-12
                  custom-height
                  q-pt-md
                  text-center
                "
              >
                Create your task
              </h5>
              <q-btn
                class="
                  col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-11
                  custom-height
                  bg-secondary
                "
                type="submit"
                color="primary"
                icon="add"
              />
            </div>
            <q-card-section>
              <div class="row q-mb-md">
                <q-input
                  class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 q-px-md"
                  v-model="TaskValues.title"
                  label="Title"
                  :rules="[
                    (val) =>
                      (val && val.length > 1) || 'This field is required',
                  ]"
                />
                <q-input
                  class="
                    col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12
                    q-pb-sm q-px-md
                  "
                  v-model="TaskValues.description"
                  label="Description"
                  filled
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 1) || 'This field is required',
                  ]"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-form>
    <div v-if="alltask.length === 0" class="q-mt-md text-center">
      <strong>No pending Task to show</strong>
    </div>
    <div v-else class="column q-my-md text-center">
      <strong>Task List </strong>
      <div class="container q-my-md">
        <q-input
          class="q-pr-md"
          v-if="filterTask.length === 0"
          v-model="searchValue"
          label="Search"
        />
        <q-checkbox
          v-model="changeFilter"
          v-if="filterTask.length === 0"
          :label="changeFilter ? 'Filter for description' : 'Filter for title'"
          checked-icon="check"
          unchecked-icon="clear"
          size="md"
        />
      </div>
      <div>
        <q-btn
          round
          color="secondary"
          icon="clear_all"
          type="reset"
          class="q-mx-sm"
          @click="resetFilter"
        >
          <q-tooltip anchor="center left" self="center right" :offset="[10, 10]"
            >get all Taks</q-tooltip
          >
        </q-btn>

        <q-btn
          round
          icon="check"
          type="reset"
          color="info"
          class="q-mx-sm"
          @click="completetask"
        >
          <q-tooltip anchor="bottom middle" self="top middle" :offset="[10, 10]"
            >get all Task Completed</q-tooltip
          >
        </q-btn>
        <q-btn
          round
          icon="clear"
          type="reset"
          color="negative"
          class="q-mx-sm"
          @click="incompleteTask"
        >
          <q-tooltip anchor="center right" self="center left" :offset="[10, 10]"
            >get all Task to do</q-tooltip
          >
        </q-btn>
      </div>
    </div>
    <div v-if="isLoading" class="q-my-lg Loading text-center">
      <q-spinner-ios color="primary" size="5em" />
      <q-tooltip :offset="[0, 8]">Loading</q-tooltip>
    </div>
    <div
      v-show="filterTask.length > 0 || alltask.length > 0"
      class="row q-mx-md"
    >
      <p
        class="
          col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-3
          bg-primary
          text-center text-white
          Container-completado
          q-pa-sm
        "
      >
        <strong> Actions </strong>
      </p>
      <p
        class="
          col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3
          bg-primary
          text-white text-center
          Container-titulo
          q-pa-sm
        "
      >
        <strong> Title </strong>
      </p>
      <p
        class="
          col-xl-6 col-lg-6 col-md-6 col-sm-5 col-xs-5
          bg-primary
          text-white text-center
          Container-descripcion
          q-pa-sm
        "
      >
        <strong>Description </strong>
      </p>
      <p
        class="
          col-xl-1 col-lg-1 col-md-1 col-sm-1s col-xs-1
          bg-primary
          text-white text-center
          eliminacion-btn
          q-pa-sm
        "
      >
        <q-icon name="call_to_action" />
      </p>
    </div>
    <div
      v-show="filterTask.length === 0 && searchFilter.length === 0"
      v-for="Task in alltask"
      :key="Task.id"
    >
      <CardView :Task="Task" />
    </div>
    <div
      v-show="filterTask.length > 0 && searchFilter.length === 0"
      v-for="Task in filterTask"
      :key="Task.id"
    >
      <CardView :Task="Task" />
    </div>
    <div
      v-show="searchFilter.length > 0"
      v-for="Task in searchFilter"
      :key="Task.id"
    >
      <CardView :Task="Task" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { watch } from 'vue';

import useTask from '../../../composable/useTask';
import CardView from '../components/Card.vue';
export default {
  name: 'TaskLayout',
  components: {
    CardView,
  },
  setup() {
    const {
      addTask,
      isloading,
      alltask,
      completetask,
      filterTask,
      incompleteTask,
      resetFilter,
      search,
      searchFilter,
    } = useTask();

    const TaskValues = ref({
      id: '',
      title: '',
      description: '',
      complete: false,
    });

    const searchValue = ref('');

    const changeFilter = ref(false);

    watch(searchValue, (searchValue) => {
      search(searchValue, changeFilter.value);
    });
    watch(isloading, (isloadingValue) => {
      isloadingValue &&
        ((TaskValues.value.title = ''), (TaskValues.value.description = ''));
    });
    return {
      changeFilter,
      searchValue,
      search,
      filterTask,
      isloading,
      TaskValues,
      alltask,
      onSubmit() {
        addTask(TaskValues.value);
      },
      completetask,
      incompleteTask,
      resetFilter,
      searchFilter,
    };
  },
};
</script>

<style scoped>
.col,
.col-1,
.col-2,
.col-3,
.col-6,
.col-8,
.col-4,
.my-card,
.row {
  height: auto;
}
.custom-height {
  height: 30px;
}
.container {
  display: flex;
  align-content: center;
  justify-content: center;
  justify-content: center;
}
</style>
