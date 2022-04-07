import { computed, ref } from 'vue';
import itemList from '@/state/list';

// -  вынес значение, которое биндится с инпутом в отдельный файл -
//    легко отвязать состояние объекта от его представления, легко
//    легко изменить его при необходимости на стор, легко мокать при
//    тестировании

export const value = ref<string>('');

export const list = computed(() => itemList.get.value());
export const toAddTask = itemList.add;
