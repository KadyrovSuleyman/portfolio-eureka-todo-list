// -  вынес отдельно хэндлеры событий, триггер которых изменяет
//    состояние приложения

const toWriteInput = (target: any, input: string) => {
  if (!target?.add) {
    return;
  }

  target.add(input);
};

export default toWriteInput;
