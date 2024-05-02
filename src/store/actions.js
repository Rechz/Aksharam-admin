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
        commit('setToken', response.data.token);
        commit('setStatus', true);
        console.log(response.data.token);
        return true;
      }
      else {
         commit('setStatus', false);
      }
    }  
   catch(error){
        
      console.error(error)
      throw error;
    }
  },
  //load price details
  async loadPrice({ rootGetters, commit }) {
        try {
            const url = rootGetters.getUrl;
            const response = await axios.get(`${url}/api/details/loadPrice`);
            if (response.status === 200) {
                const ctg = response.data;
              console.log('price details', ctg)
              const groupedItems = ctg.reduce((acc, item) => {
                if (!acc[item.category]) {
                  acc[item.category] = [];
                 }
              acc[item.category].push(item);
              return acc;
              }, {});
            // Log the grouped items
            console.log(groupedItems);
              commit('setPriceList', groupedItems);
            }
        }
        catch (error) {
            console.error(error)
        }
  },
  //delete price details
  async deletePrice({rootGetters}, payload){
    try {
      const response = await axios.delete(`${rootGetters.getUrl}/api/admin/deletePrice/${payload}`, {
        headers: {
          Authorization: `Bearer ${rootGetters.getToken}`
        }
      });
      if (response.status === 200) {
        return true;
      }
    }
    catch (error) {
      console.error(error);
    }
  },
  //edit price details
  async editPrice({rootGetters}, payload) {
    try {
      console.log('edit clicked')
      const response = await axios.put(`${rootGetters.getUrl}/api/admin/updatePrice/${payload.id}`,payload.body,
      {
        headers: {
          Authorization: `Bearer ${rootGetters.getToken}`
        }
      });
      if (response.status === 200) {
        return true;
      }
    }
    catch (error) {
      console.error(error);
    }
  },
  //add price details
  async addPrice({rootGetters}, payload) {
    try {
      const response = await axios.post(`${rootGetters.getUrl}/api/admin/addPrice`, payload,
      {
        headers: {
          Authorization: `Bearer ${rootGetters.getToken}`
        }
      });
      if (response.status === 200) {
        return true;
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
        const employeeid = response.data.map(employee => employee.employeeId);
        console.log(employeeid)
        commit('setEmployeeId', employeeid)
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
        const labels = response.data.map(entry => entry.category);
        const data = response.data.map(entry => entry.totalVisitors);
        const total = data.reduce((accumulator, currentValue) => { return accumulator + currentValue; }, 0);
        commit('setPieChart', {
          label: labels,
          data: data,
          total: total
        });
      }
    }
    catch (error) {
      throw new Error('Error fetching data: ' + error.message);
    }
  },
  //fetch piechart for total scanned visitors till date
  async fetchPieChartVisited({ commit, rootGetters }) {
    try {
      const response = await axios.get(`${rootGetters.getUrl}/api/dashboard/totalVisitors/upToNow`, {
        headers: {
          Authorization: `Bearer ${rootGetters.getToken}`
        },
      })
      if (response.status === 200) {
        console.log('total visitors upto date',response.data)
        const labels = response.data.map(entry => entry.category);
        const data = response.data.map(entry => entry.totalVisitors);
        const total = data.reduce((accumulator, currentValue) => { return accumulator + currentValue; }, 0);
        commit('setPieChart', {
          label: labels,
          data: data,
          total: total
        });
      }
    }
    catch (error) {
      throw new Error('Error fetching data: ' + error.message);
    }
  },
  //fetching income details for bargraph for year
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
        const total = incomes.reduce((accumulator, currentValue) => { return accumulator + currentValue; }, 0);
        commit('setBarChart', {
          label: labels,
          data: incomes,
          total: total
        })
      }
    }
    catch (error) {
        console.log(error)
      throw new Error('Error fetching data: ' + error.message);
    }
  },
  //fetching ticket details for bargraph for year
  async totalTicketsBarGraph({ commit, rootGetters }, payload) {
    try {
      const response = await axios.get(`${rootGetters.getUrl}/api/dashboard/totalTickets/year?year=${payload}`, {
        headers: {
          Authorization: `Bearer ${rootGetters.getToken}`
        },
      })
      if (response.status === 200) {
       
        const data = response.data;
        const tickets = [];
        data.forEach(entry => {
          let sum = entry.totalPublicTickets + entry.totalInstitutionTickets + entry.totalForeignerTickets;
           sum = sum * 100
          tickets.push(sum);
        });
        const total = tickets.reduce((accumulator, currentValue) => { return accumulator + currentValue; }, 0);
        commit('setBarChartTicket', {
          data: tickets,
          total: total
        })
      }
    }
    catch (error) {
       console.log(error)
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
        console.log('total tickets upto date',response.data)
        const total = response.data.totalTickets;
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
        console.log('total income upto date',response.data)
        const total = response.data.totalIncome;
        commit('setTotalIncome', total);
      }
    }
    catch (error) {
      throw new Error('Error fetching data: ' + error.message);
    }
  },
  //to fetch income for given date
  async fetchIncomeByDate({rootGetters, commit}, payload) {
    try {
      const response = await axios.get(`${rootGetters.getUrl}/api/dashboard/totalIncome/date?date=${payload}`, {
        headers: {
          Authorization: `Bearer ${rootGetters.getToken}`
        },
      });
      if (response.status === 200) {
        const income = response.data.totalIncome;
        commit('setDailyIncome', income);
      }
    }
    catch (error) {
      console.error(error);
    }
  },
  //to fetch income for given month and year
  async fetchIncomeByMonth({ rootGetters, commit }, payload) { 
try {
      const response = await axios.get(`${rootGetters.getUrl}/api/dashboard/totalIncome/month?monthName=${payload.month}&year=${payload.year}`, {
        headers: {
          Authorization: `Bearer ${rootGetters.getToken}`
        },
      });
      if (response.status === 200) {
        const income = response.data.totalIncome;
        console.log(response.data)
        commit('setDailyIncome', income);
      }
    }
    catch (error) {
      console.error(error);
    }
  },
    //to fetch ticket for given date
  async fetchTicketByDate({rootGetters, commit}, payload) {
    try {
      const response = await axios.get(`${rootGetters.getUrl}/api/dashboard/totalTickets/date?date=${payload}`, {
        headers: {
          Authorization: `Bearer ${rootGetters.getToken}`
        },
      });
      if (response.status === 200) {
        const tickets = response.data.totalTickets;
        commit('setDailyTickets', tickets);
      }
    }
    catch (error) {
      console.error(error);
    }
  },
  //to fetch ticket for given month and year
  async fetchTicketByMonth({ rootGetters, commit }, payload) { 
try {
      const response = await axios.get(`${rootGetters.getUrl}/api/dashboard/totalTickets/month?monthName=${payload.month}&year=${payload.year}`, {
        headers: {
          Authorization: `Bearer ${rootGetters.getToken}`
        },
      });
      if (response.status === 200) {
        const tickets = response.data.totalTickets;
        console.log(response.data)
        commit('setDailyTickets', tickets);
      }
    }
    catch (error) {
      console.error(error);
    }
  },

  //to add scanner
  async addScanner({ rootGetters }, payload) {
      const response = await axios.put(`${rootGetters.getUrl}/api/admin/updateRole/${payload.id}`,
        {
          "newRole": "SCANNER",
          "newPassword": payload.password
        },
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          },
        });
      if (response.status == 200) {
        return true;
      }
  },
  //to add employees
  async addEmployees({ rootGetters }, payload) {
      const response = await axios.post(`${rootGetters.getUrl}/api/admin/addEmployee`,
        {
          "email": payload.email,
          "name": payload.name,
          "image": "Photo",
          "phoneNo": payload.mobile,
          "tempAddress": payload.temporary,
          "permAddress": payload.permanent,
        },
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          },
        });
      if (response.status == 200) {
        return true;
      }
  },
  //to edit employees
  async editEmployees({ rootGetters }, payload) {
      const response = await axios.put(`${rootGetters.getUrl}/api/admin/update/${payload.id}`,
        {
          "email": payload.email,
          "name": payload.name,
          "image": "Photo",
          "phoneNo": payload.mobile,
          "tempAddress": payload.temporary,
          "permAddress": payload.permanent,
        },
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          },
        });
      if (response.status == 200) {
        return true;
      }
  },
  //to update scanner password
  async updateScannerPassword({ rootGetters }, payload) {
      const response = await axios.put(`${rootGetters.getUrl}/api/admin/updateScannerPassword`, {
        "employeeId": payload.id,
        "employeeName": payload.name,
        "newPassword": payload.password,
        "confirmPassword": payload.confirmPassword
      },
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          },
        });
      if (response.status == 200) {
        return true;
      }
  },
  //to delete employee
  async deleteEmployee({ rootGetters }, payload) {
      const response = await axios.delete(`${rootGetters.getUrl}/api/admin/delete/${payload}`,
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          },
        })
      if (response.status == 200) {
        return true;
      }
  },
  //to delete scanner
  async deleteScanner({ rootGetters }, payload) {
      const response = await axios.put(`${rootGetters.getUrl}/api/admin/updateRole/${payload}`,
        {
          "newRole": "EMPLOYEE",
          "newPassword": "password"
        },
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          },
        });
      if (response.status == 200) {
        return true;
      }
  },
  //
}