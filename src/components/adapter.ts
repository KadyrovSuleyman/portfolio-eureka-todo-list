import { ref } from 'vue';
import list from '@/state/list';
import toLoadTaskList from './ajax';

export const isLoaded = ref(false);

export const taskListInit = () => toLoadTaskList()
  .then((taskList) => list.load(taskList))
  .then(() => { isLoaded.value = true; });
