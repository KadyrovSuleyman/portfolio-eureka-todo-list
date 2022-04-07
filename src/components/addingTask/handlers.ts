// -  вынес отдельно хэндлеры событий, триггер которых изменяет
//    состояние приложения

import { toAddTask, value } from './adapter';

const addHandler = (input: string) => (event: Event) => {
  event.preventDefault();

  if (input === '') {
    return;
  }
  toAddTask(input);
  value.value = '';
};

export default addHandler;
