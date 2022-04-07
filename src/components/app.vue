<script setup lang="ts">

import AddingTask from './addingTask/addingTask.vue';
import TaskList from './taskList/taskList.vue';
import FilterList from './filterList/filterList.vue';
import { taskListInit, isLoaded } from './adapter';

taskListInit();

</script>

- разбил глобальный компонент на составные части - для удобства разработки
- каждый отдельный компонент обернул в дивак - для удобства доступа к элементам
  через селекторы
- добавил всем элементам название классов

<template>
  <div :class="'app'" v-if="isLoaded">
    <AddingTask />
    <TaskList />
    <FilterList />
  </div>
  <h1 v-else>Загрузка</h1>
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
