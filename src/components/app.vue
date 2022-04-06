<script setup lang="ts">

import AddingTask from './addingTask/addingTask.vue';
import TaskList from './taskList/taskList.vue';
import TaskFilter from './taskFilter/taskFilter.vue';

</script>

<template>
  <AddingTask />
  <TaskList />
  <TaskFilter />
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
