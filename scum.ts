// const vue = require('vue');

// window.app = new vue({
//   el: '#app',

//   data() {
//     return {
//       innerData: {
//         zadachi: [],
//         activeFilter: '',
//       },
//       value: 'Задача 1',
//     };
//   },
//   created() {
//     const search = document.getElementById('search') || {};
//     search.focus();
//     fetch('https://my-json-server.typicode.com/falk20/demo/todos').then(
//       (response) => (zadachi = response),
//     );
//   },
//   template: `
//     <div>
//         <input v-bind:value="value" id="search" />
//         <button v-on:click="todo()">Добавить задачу</button>

//         <div v-if="innerData.activeFilter == 'active'">
//           <div v-for="todo in innerData.zadachi" v-if="todo.completed != true">
//             {{ todo.name }}
//             <div v-on:click="remove(todo)"></div>
//           </div>
//         </div>

//         <div v-if="innerData.activeFilter == 'Все'">
//         1212
//           <div v-for="todo in innerData.zadachi">
//             {{ todo.name }}
//             <div v-on:click="remove(todo)"></div>
//           </div>
//         </div>

//         <div v-if="innerData.activeFilter == 'completed'">
//           <div v-for="todo in innerData.zadachi" v-if="todo.completed == true">
//             {{ todo.name }}
//             <div v-on:click="remove(todo)"></div>
//           </div>
//         </div>

//         <div>
//         <span v-on:click="setFilter('active')">Активные</span>
//         <span v-on:click="setFilter('all')">Все</span>
//         <span v-on:click="setFilter('completed')">Завершенные</span>
//         </div>
//     </div>
//   `,

//   methods: {
//     todo(t) {
//       zadachi[zadachi.length + 1] = t;
//     },
//     remove(t) {
//       const todos = [];

//       for (let i = 0; i < todos.length; i++) {
//         if (todos[i].name != t.name) {
//           todos.push(todos[i]);
//         }
//       }
//       this.$set(this.innerData, 'zadachi', todos);
//     },

//     setFilter(filter) {
//       this.$set(this.innerData, 'activeFilter', filter);
//     },
//   },
// });
