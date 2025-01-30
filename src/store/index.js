import { createStore } from 'vuex';
import rootMutations from './mutations.js';
import rootActions from './actions.js';
import rootGetters from './getters.js';
import bookingModule from './modules/booking/index.js';
const store = createStore({
  modules: {
    booking:  bookingModule

  },
  state() {
    return {
      // base_url: 'http://localhost:8448/beta',
      // base_url: 'http://192.168.1.33:8083',
      // base_url: 'http://192.168.1.23:5000',
      //  base_url: 'http://192.168.33.172:8083',
      // base_url: process.env.VUE_APP_BASE_URL,
      base_url: 'https://aksharammuseum.com',
      token: sessionStorage.getItem('token') || '',
      role: JSON.parse(sessionStorage.getItem('role')) || '',
      status: JSON.parse(sessionStorage.getItem('status')) || false,
      user: JSON.parse(sessionStorage.getItem('user')) || {},
      employeeId: JSON.parse(sessionStorage.getItem('employeeId')) || [],
      allEmployees: JSON.parse(sessionStorage.getItem('allEmployees')) || [],
      scannerList: JSON.parse(sessionStorage.getItem('scannerList')) || [],
    };
  },
  mutations: rootMutations,
  actions: rootActions,
  getters: rootGetters,
});
export default store;