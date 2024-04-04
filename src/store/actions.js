import axios from 'axios';
import router from '../router.js';
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
        commit('setToken', response.data.token);
        console.log(response.data.token);
        router.push('/dashboard');
      }
    }
    catch (error) {
      console.error(error);
    }
    },
    //fetch all tickets
  async fetchAllTickets({ commit, rootGetters }) {
    try {
        console.log('all tickets')
         const response = await axios.get(`${rootGetters.getUrl}/api/admin/allTickets`, {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        });
        if (response.status === 200) {
            commit('setAllTickets', response.data);
            console.log(response.data)
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
            console.log(response.data)
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
            console.log(response.data)
        }  
      }
      catch (error) {
          throw new Error('Error fetching employees: ' + error.message);
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
        throw new Error('Error fetching employees: ' + error.message);
      }
  },
  //fetch piechart for total visitors given date
  async fetchPieChartDate({ commit, rootGetters }, payload) {
     try {
         const response = await axios.get(`${rootGetters.getUrl}/api/dashboard/totalVisitors/Date?date=${payload}`, {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          },
        })
        if (response.status === 200) {
          console.log(response.data);
          const labels = response.data.map(entry => entry.category);
          const data = response.data.map(entry => entry.totalVisitors);
          console.log(labels);
          console.log(data)
          commit('setPieChart', {
            label: labels,
            data: data
          });
        }
      }
      catch (error) {
        throw new Error('Error fetching data: ' + error.message);
      } 
  },
  //fetch piechart for total scanned visitors tii date
  async fetchPieChartVisited({ commit, rootGetters }) {
     try {
         const response = await axios.get(`${rootGetters.getUrl}/api/dashboard/totalVisitors/upToNow`, {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          },
        })
        if (response.status === 200) {
          const labels = response.data.map(entry => entry.category);
          const data = response.data.map(entry => entry.totalVisitors);
          commit('setPieChart', {
            label: labels,
            data: data
          });
        }
      }
      catch (error) {
        throw new Error('Error fetching data: ' + error.message);
      } 
  },
  //fetching details for bargraph
    async totalIncomeBarGraph({ commit, rootGetters }, payload) {
     try {
         const response = await axios.get(`${rootGetters.getUrl}/api/dashboard/totalIncome/year?year=${payload}`, {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          },
        })
       if (response.status === 200) {
          const data = response.data;
          const labels = [];
          const incomes = [];
          data.forEach(entry => {
          const sum = entry.totalPublicIncome + entry.totalInstitutionIncome + entry.totalForeignerIncome;
          labels.push(entry.month);
          incomes.push(sum);
          });
         commit('setBarChart', {
           label: labels,
           data: incomes
          })
        }
      }
      catch (error) {
        throw new Error('Error fetching data: ' + error.message);
      } 
  },
  //fetch total tickets upto date
    async totalTickets({ commit, rootGetters }) {
     try {
         const response = await axios.get(`${rootGetters.getUrl}/api/dashboard/totalTickets`, {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          },
        })
       if (response.status === 200) {
         const total = Object.values(response.data).reduce((acc, curr) => acc + curr, 0);
         commit('setTotalTickets', total);
        }
      }
      catch (error) {
        throw new Error('Error fetching data: ' + error.message);
      } 
  },
  //fetch total income upto date
    async totalIncome({ commit, rootGetters }) {
     try {
         const response = await axios.get(`${rootGetters.getUrl}/api/dashboard/totalIncome`, {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          },
        })
       if (response.status === 200) {
         const total = Object.values(response.data).reduce((acc, curr) => acc + curr, 0);
         commit('setTotalIncome', total);
        }
      }
      catch (error) {
        throw new Error('Error fetching data: ' + error.message);
      } 
  },
  
}