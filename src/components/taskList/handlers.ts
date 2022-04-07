import { toDeleteTask } from './adapter';

// -  вынес отдельно хэндлеры событий, триггер которых изменяет
//    состояние приложения

const deleteHandler = (id: number) => () => {
  toDeleteTask(id);
};

export default deleteHandler;
