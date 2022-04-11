import itemList from '@/state/list';
import { computed } from 'vue';

// -  независимо от того, как будет представлен список, во вью-компоненте
//    он будет работать (если список будет реактивным)

export const list = computed(() => itemList.get.value());
export const toDeleteTask = itemList.delete;
export const isListEmpty = computed(() => itemList.get.value().length === 0);
export const toActiveTask = itemList.toActive;
export const toCompleteTask = itemList.toComplete;
