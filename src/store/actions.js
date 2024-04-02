import axios from 'axios';
export default {
    //admin login
  async login({ commit, rootGetters }, { id, password }) {
      try {
        const response = await axios.post(`${rootGetters.getUrl}/api/auth/signin`,
          {
            "employeeId": id,
            "password": password
          });
      if (response.status === 200) {
        commit('setToken', response.data);
        console.log(response.data)
      }
    }
    catch (error) {
      console.error(error);
    }
    },
    //fetch all tickets
  async fetchAllTickets({ commit, rootGetters }) {
      try {
         const response = await axios.get(`${rootGetters.getUrl}/api/admin/allTickets`, {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        });
        if (response.status === 200) {
            commit('setAllTickets', response.data);
        }  
      }
      catch (error) {
        console.error(error);
      }
    }, 
  //fetch current day tickets
    async fetchCurrentTickets({ commit, rootGetters }) {
      try {
         const response = await axios.get(`${rootGetters.getUrl}/api/dashboard/currentDayList`, {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        });
        if (response.status === 200) {
            commit('setCurrentTickets', response.data);
        }  
      }
      catch (error) {
        console.error(error);
      }
    }, 
    //fetch all employees
    async fetchAllEmployees({ commit, rootGetters }) {
        try {
         const response = await axios.get(`${rootGetters.getUrl}/api/admin/employees`, {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        });
        if (response.status === 200) {
            commit('setAllEmployees', response.data);
        }  
      }
      catch (error) {
        console.error(error);
      }
    },
    //fetch scanner list
    async fetchScannerList({ commit, rootGetters }) {
        try {
         const response = await axios.get(`${rootGetters.getUrl}/api/admin/scanners`, {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        });
        if (response.status === 200) {
            commit('setScannerList', response.data);
        }  
      }
      catch (error) {
        console.error(error);
      }
    },
}