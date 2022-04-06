import { ref } from 'vue';

// -  вынес значение, которое биндится с инпутом в отдельный файл -
//    легко отвязать состояние объекта от его представления, легко
//    легко изменить его при необходимости на стор, легко мокать при
//    тестировании

const value = ref<string>('');

export default value;
