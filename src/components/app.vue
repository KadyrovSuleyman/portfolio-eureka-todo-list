<script setup lang="ts">

import AddingTask from './addingTask/addingTask.vue';
import TaskList from './taskList/taskList.vue';
import TaskFilter from './taskFilter/taskFilter.vue';

</script>

- разбил глобальный компонент на составные части - для удобства разработки
- каждый отдельный компонент обернул в дивак - для удобства доступа к элементам
  через селекторы
- добавил всем элементам название классов

<template>
  <AddingTask />
  <TaskList />
  <TaskFilter />
</template>

<style lang="scss">
  @use 'styles' as *;
</style>
