/* eslint-disable no-plusplus */
import { ref } from 'vue';

type TaskI = {
  id: number,
  text: string,
  isActive: boolean,
};

// -  вынес отдельно список, т.к. он полностью определяет состояние всего приложения
//    изменение списка возможно только с помощью методов списка

const List = () => {
  let list: TaskI[] = [];
  let id = 0;

  return {
    get: () => [...list],

    clean: () => {
      list = [];
      id = 0;
    },

    add: (text: string) => {
      list.push({
        id: ++id,
        text,
        isActive: false,
      });

      console.log(list);
    },
  };
};

export default ref(List());
