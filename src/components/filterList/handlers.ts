import { FILTER, toSetTaskFilter, selectedFilter } from './adapter';

// -  вынес отдельно хэндлеры событий, триггер которых изменяет
//    состояние приложения

const setFilterHandler = (filter: FILTER) => () => {
  toSetTaskFilter(filter);
  selectedFilter.value = filter;
};

export default setFilterHandler;
