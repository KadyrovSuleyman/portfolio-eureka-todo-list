<script setup lang="ts">

import list from '@/state/list';
import TaskItem from '../taskItem/taskItem.vue';

</script>

- изначально каждый из вариантов отрисовывал один и тот же список, но с разными
  параметрами. Состояние списка задач полностью определяется полным списком и
  примененными фильтрами - достаточно будет описать шаблон один раз

<template>
  <div :class="'app-taskList'">
    <TaskItem v-for="task in list.get.value()" :key="task.id"
      :name="task.text" :selected="task.active"
    />
  </div>
</template>
