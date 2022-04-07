const url = 'https://my-json-server.typicode.com/falk20/demo/todos';

const toLoadTaskList = () => fetch(url)
  .then((response) => response.json())
  .catch(() => []);

export default toLoadTaskList;
