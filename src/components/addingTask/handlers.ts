// -  вынес отдельно хэндлеры событий, триггер которых изменяет
//    состояние приложения

import { toAddTask, value } from './adapter';

const addHandler = (input: string) => () => {
  if (input === '') {
    return;
  }
  toAddTask(input);
  value.value = '';
};

export default addHandler;
