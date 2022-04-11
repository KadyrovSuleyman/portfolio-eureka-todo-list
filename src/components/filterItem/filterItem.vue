<script setup lang="ts">

// -  добавил проп, который отслеживает, выбран ли данный фильтр
//    эта информация отражается в названии класса, что позволяет легко
//    использовать селекторы для стилей

import { computed, defineProps } from 'vue';

type HandlerT = (payload: MouseEvent) => void;
const props = defineProps({
  selected: Boolean,
  name: String,

  onClick: {
    type: Function,
    default: (): HandlerT => () => ({}),
  },
});

const filterItemClass = computed(() => 'filterList-filterItem'
  + `${props.selected ? ' filterList-filterItem__selected' : ''}`);

</script>

- небольшой рефактор шаблона для облегчения верстки - оформил каждый элемент списка
  как отдельный компонент

<template>

  <div :class="filterItemClass">
    <button :class="'filterItem-button'" @click="props.onClick">
      {{ props.name }}
    </button>
  </div>

</template>

<style lang="scss">
  @use 'styles' as *;
</style>
