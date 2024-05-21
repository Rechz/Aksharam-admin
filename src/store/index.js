import { createStore } from 'vuex';
import rootMutations from './mutations.js';
import rootActions from './actions.js';
import rootGetters from './getters.js';
const store = createStore({
  state() {
    return {
      // base_url: 'http://localhost:8448',
      // base_url: 'http://192.168.1.30:5000',
      base_url: 'https://aksharammuseum.com',
      token: sessionStorage.getItem('token') || '',
      status: JSON.parse(sessionStorage.getItem('status')) || false,
      user: JSON.parse(sessionStorage.getItem('user')) || {},
      employeeId: JSON.parse(sessionStorage.getItem('employeeId')) || [],
      allTickets: JSON.parse(sessionStorage.getItem('allTickets')) || [],
      currentTickets: JSON.parse(sessionStorage.getItem('currentTickets')) || [], 
      allEmployees: JSON.parse(sessionStorage.getItem('allEmployees')) || [],
      scannerList: JSON.parse(sessionStorage.getItem('scannerList')) || [],
      dataPie: JSON.parse(sessionStorage.getItem('dataPie')) || [],
      dataBar: JSON.parse(sessionStorage.getItem('dataBar')) || [],
      data2Bar: JSON.parse(sessionStorage.getItem('data2Bar')) || [],
      labelsPie: JSON.parse(sessionStorage.getItem('labelsPie')) || ['Foreigner', 'Institution', 'Public'],
      labelsBar: JSON.parse(sessionStorage.getItem('labelsBar')) || ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      totalPie: sessionStorage.getItem('totalPie') || 0,
      totalBar: sessionStorage.getItem('totalBar') || 0,
      total2Bar: sessionStorage.getItem('total2Bar') || 0,
      totalTickets: sessionStorage.getItem('totalTickets') || 0,
      totalIncome: sessionStorage.getItem('totalIncome') || 0,
      dailyIncome: sessionStorage.getItem('dailyIncome') || 0,
      dailyTickets: sessionStorage.getItem('dailyTickets') || 0,
      priceList: {},
      holidays: JSON.parse(sessionStorage.getItem('holidays')) || [],
      maintopics: [],
      detailTopic: [],
      idmal: sessionStorage.getItem('idmal') || '',
      ideng: sessionStorage.getItem('idmal') || '',
      malHeading: sessionStorage.getItem('malHeading') || '',
      engHeading: sessionStorage.getItem('engHeading') ||'',
      malSubHeading: sessionStorage.getItem('malSubHeading') ||'',
      engSubHeading: sessionStorage.getItem('engSubHeading') ||'',
      malSub2Heading: sessionStorage.getItem('malSub2Heading') ||'',
      engSub2Heading: sessionStorage.getItem('engSub2Heading') ||'',
      subidmal: sessionStorage.getItem('subidmal') || '',
      subideng: sessionStorage.getItem('subideng') || '',
      sub2idmal: sessionStorage.getItem('sub2idmal') || '',
      sub2ideng: sessionStorage.getItem('sub2ideng') || '',
    };
  },
  mutations: rootMutations,
  actions: rootActions,
  getters: rootGetters,
});
export default store;