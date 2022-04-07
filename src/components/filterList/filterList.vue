<script setup lang="ts">

import { computed } from 'vue';
import FilterItem from '../filterItem/filterItem.vue';
import {
  FILTER, filterList, filterName, selectedFilter,
} from './adapter';
import setFilterHandler from './handlers';

const setFilter = computed(() => (filter: FILTER) => setFilterHandler(filter));

</script>

<template>
  <div :class="'app-filterList'">
    <FilterItem v-for="filter in filterList" :key="filter"
    :name="filterName.get(filter)" :selected="filter === selectedFilter"
    :onClick="setFilter(filter)"
    />
  </div>
</template>
