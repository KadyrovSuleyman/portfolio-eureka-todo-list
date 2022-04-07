import {
  FILTER, toSetTaskFilter, selectedFilter, defaultFilter,
} from './adapter';

// -  вынес отдельно хэндлеры событий, триггер которых изменяет
//    состояние приложения

const setFilterHandler = (filter: FILTER) => () => {
  toSetTaskFilter(filter);
  if (!Object.values(FILTER).includes(filter)) {
    selectedFilter.value = defaultFilter;
    return;
  }
  selectedFilter.value = filter;
};

export default setFilterHandler;
