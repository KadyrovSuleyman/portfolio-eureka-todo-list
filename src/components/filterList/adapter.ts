import itemList from '@/state/list';
import { ref } from 'vue';
import { defaultFilter, FILTER } from '@/state/filter';

export { filterName, FILTER, defaultFilter } from '@/state/filter';
export const filterList = Object.values(FILTER)
  .filter((key) => typeof key !== 'string') as FILTER[];
export const selectedFilter = ref(defaultFilter);
export const toSetTaskFilter = itemList.setFilter;
