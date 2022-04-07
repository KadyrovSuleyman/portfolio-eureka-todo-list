/* eslint-disable no-plusplus */
import { computed, ref } from 'vue';
import { TaskI } from './types';

// -  вынес отдельно список, т.к. он полностью определяет состояние всего приложения
//    изменение списка возможно только с помощью методов списка

export enum FILTER {
  ALL,
  ACTIVE,
  COMPLETED
}

const List = () => {
  const list = ref<TaskI[]>([]);
  let id = 0;
  const filter = ref<FILTER>(FILTER.ALL);

  const findTask = (targetId: number) => list.value.find(
    (targetTask) => targetTask.id === targetId,
  );

  type FindFuncT = () => TaskI[];
  const findAll = () => [...list.value];
  const findActive = () => list.value.filter((task) => task.active === true);
  const findCompleted = () => list.value.filter((task) => task.active === false);

  const filterMap = new Map<FILTER, FindFuncT>([
    [FILTER.ALL, findAll],
    [FILTER.ACTIVE, findActive],
    [FILTER.COMPLETED, findCompleted],
  ]);

  return {
    get: computed(() => () => {
      const func = filterMap.get(filter.value);
      if (!func) {
        return findAll();
      }
      return func();
    }),

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

      console.log(list.value);
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
