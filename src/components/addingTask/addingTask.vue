<script setup lang="ts">

import { computed } from 'vue';
import addHandler from './handlers';
import { value } from './adapter';

// -  вынес хэндлер отдельной функцией. Результат выполнения функции зависит от списка,
//    который изменяется независимо - при каждом вызове коллбека он должен пересчитывать
//    параметры вызова - оборачиваем в computed

const clickHandler = computed(() => addHandler(value.value));

</script>

- удалил айди инпута - не самая лучшая практика использовать айди хтмл-элементов, лучше
  обращаться через классы
- добавил двухсторонний бинд данных инпута, используя контрукцию v-model вместо v-bind

<template>

  <div :class="'app-addingTask'">
    <input v-model="value" :class="'addingTask-input'" />
    <button @click="clickHandler" :class="'addingTask-button'">
      Добавить задачу
    </button>
  </div>

</template>
