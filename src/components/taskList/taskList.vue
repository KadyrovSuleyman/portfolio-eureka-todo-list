<script setup lang="ts">

import { computed } from 'vue';
import { list } from './adapter';
import TaskItem from '../taskItem/taskItem.vue';
import deleteHandler from './handlers';

const deleteTask = computed(() => (id: number) => deleteHandler(id));

</script>

- изначально каждый из вариантов отрисовывал один и тот же список, но с разными
  параметрами. Состояние списка задач полностью определяется полным списком и
  примененными фильтрами - достаточно будет описать шаблон один раз

<template>
  <div :class="'app-taskList'">
    <TaskItem v-for="task in list" :key="task.id"
      :name="task.text" :active="task.active" :handle-delete="deleteTask(task.id)"
    />
  </div>
</template>
