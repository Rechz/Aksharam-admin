import { createStore } from 'vuex';
import rootMutations from './mutations.js';
import rootActions from './actions.js';
import rootGetters from './getters.js';
const store = createStore({
  state() {
    return {
      base_url: 'http://localhost:8080',
      token: sessionStorage.getItem('token') || '',
      allTickets: [],
      currentTickets: [], 
      allEmployees: [],
      scannerList: [],
    };
  },
  mutations: rootMutations,
  actions: rootActions,
  getters: rootGetters,
});
export default store;