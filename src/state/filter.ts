import { TaskI } from './types';

export enum FILTER {
  ALL,
  ACTIVE,
  COMPLETED
}
export const defaultFilter = FILTER.ALL;

export const filterName = new Map<FILTER, string>([
  [FILTER.ALL, 'Все'],
  [FILTER.ACTIVE, 'Активные'],
  [FILTER.COMPLETED, 'Завершенные'],
]);

type FindFuncT = (list: TaskI[]) => TaskI[];

const findAll = (list: TaskI[]) => [...list];
const findActive = (list: TaskI[]) => list.filter((task) => task.active === true);
const findCompleted = (list: TaskI[]) => list.filter((task) => task.active === false);

const filterFunc = new Map<FILTER, FindFuncT>([
  [FILTER.ALL, findAll],
  [FILTER.ACTIVE, findActive],
  [FILTER.COMPLETED, findCompleted],
]);

export const toFilter = (list: TaskI[], filterType: FILTER) => {
  const func = filterFunc.get(filterType);
  if (!func) {
    const defaultFunc = filterFunc.get(defaultFilter);
    if (!defaultFunc) {
      return list;
    }
    return defaultFunc(list);
  }
  return func(list);
};
