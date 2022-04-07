/* eslint-disable no-plusplus */
import { computed, ref } from 'vue';
import { TaskI } from './types';
import { toFilter, FILTER } from './filter';

// -  вынес отдельно список, т.к. он полностью определяет состояние всего приложения
//    изменение списка возможно только с помощью методов списка

const List = () => {
  const list = ref<TaskI[]>([]);
  let id = 0;
  const filter = ref<FILTER>(FILTER.ALL);

  const findTask = (targetId: number) => list.value.find(
    (targetTask) => targetTask.id === targetId,
  );

  return {
    get: computed(() => () => toFilter(list.value, filter.value)),

    isEmpty: computed(() => list.value.length === 0),

    load: (taskList: TaskI[]) => {
      list.value = taskList;
      id = 1 + Math.max(...taskList.map((task) => task.id));
    },

    clean: () => {
      list.value = [];
      id = 0;
    },

    add: (text: string) => {
      list.value.push({
        id: ++id,
        text,
        active: true,
      });
    },

    delete: (targetId: number) => {
      list.value = list.value.filter((task) => task.id !== targetId);
    },

    toActive: (targetId: number) => {
      const task = findTask(targetId);
      if (!task) {
        return;
      }
      task.active = true;
    },

    toComplete: (targetId: number) => {
      const task = findTask(targetId);
      if (!task) {
        return;
      }
      task.active = false;
    },

    setFilter: (newFilter: FILTER) => {
      filter.value = newFilter;
    },
  };
};

export default List();
