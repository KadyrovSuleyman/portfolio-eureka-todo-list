<script setup lang="ts">

// -  добавил проп, который отслеживает, является ли данная задача активной
//    эта информация отражается в названии класса, что позволяет легко
//    использовать селекторы для стилей

import { computed, defineProps } from 'vue';

type HandlerT = (payload: MouseEvent) => void;
const props = defineProps({
  active: Boolean,
  name: String,

  handleDelete: {
    type: Function,
    default: (): HandlerT => () => ({}),
  },
});

const taskItemClass = computed(() => 'taskList-taskItem'
  + `${props.active ? ' taskList-taskItem__active' : ''}`);

</script>

- небольшой рефактор шаблона для облегчения верстки - оформил каждый элемент списка
  как отдельный компонент

<template>

  <div :class="taskItemClass">
    <span :class="'taskItem-name'">
      {{ props.name }}
    </span>
    <button :class="'taskItem-delete'" @click="props.handleDelete">удалить</button>
  </div>

</template>

<style lang="scss">
  @use 'styles' as *;
</style>
