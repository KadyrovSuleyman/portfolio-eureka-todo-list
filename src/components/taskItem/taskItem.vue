<script setup lang="ts">

// -  добавил проп, который отслеживает, является ли данная задача активной
//    эта информация отражается в названии класса, что позволяет легко
//    использовать селекторы для стилей

import { computed, defineProps } from 'vue';

const props = defineProps({
  selected: Boolean,
  name: String,
});

const taskItemClass = computed(() => 'taskList-taskItem'
  + `${props.selected ? ' taskList-taskItem__selected' : ''}`);

</script>

- небольшой рефактор шаблона для облегчения верстки - оформил каждый элемент списка
  как отдельный компонент

<template>

  <div :class="taskItemClass">
    <span :class="'taskItem-name'">
      {{ props.name }}
    </span>
    <div :class="'taskItem-delete'">delete</div>
  </div>

</template>
