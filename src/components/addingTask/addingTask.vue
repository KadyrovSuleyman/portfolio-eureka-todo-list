<script setup lang="ts">

import list from '@/state/list';
import { computed } from 'vue';
import value from './adapter';
import toWriteInput from './handlers';

// -  вынес хэндлер отдельной функцией. Результат выполнения функции зависит от списка,
//    который изменяется независимо - при каждом вызове коллбека он должен пересчитывать
//    параметры вызова - оборачиваем в computed
const handleClick = computed(() => () => {
  toWriteInput(list.value, value.value);
  value.value = '';
});

</script>

  - разбил глобальный компонент на составные части - для удобства разработки
  - каждый отдельный компонент обернул в дивак - для удобства доступа к элементам
    через селекторы
  - удалил айди инпута - не самая лучшая практика использовать айди хтмл-элементов, лучше
    обращаться через классы
  - добавил всем элементам название классов
  - добавил двухсторонний бинд данных инпута, используя контрукцию v-model вместо v-bind

<template>

  <div :class="'app-addingTask'">
    <input v-model="value" :class="'addingTask-input'" />
    <button @click="handleClick" :class="'addingTask-button'">
      Добавить задачу
    </button>
  </div>

</template>
