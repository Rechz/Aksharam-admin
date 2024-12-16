
import axios from 'axios';

export default {
  //admin login
  async login({ commit, rootGetters }, { id, password }) {
      const response = await axios.post(`${rootGetters.getUrl}api/auth/signin`,
        {
          "employeeId": id,
          "password": password
        });
      if (response.status === 200) {
        commit('setToken', response.data.token);
        commit('setStatus', response.data.admin);
        commit('setRole', response.data.sessionId);
        return true;
      }
  },
  //admin logout
  logout({ commit }) {
    commit('clearToken');
    commit('clearStatus');
    return true;
  },
  //fetch all employees
  async fetchAllEmployees({ commit, rootGetters }) {
    try {
      const response = await axios.get(`${rootGetters.getUrl}api/admin/employees-and-scanners`, {
        headers: {
          Authorization: `Bearer ${rootGetters.getToken}`
        }
      });
      if (response.status === 200) {
        commit('setAllEmployees', response.data);
        return true;
      }
    }
    catch (error) {
      throw new Error('Error fetching employees: ' + error.message);
    }
  },
  //fetch employees
  async fetchEmployees({ commit, rootGetters }) {
    try {
      const response = await axios.get(`${rootGetters.getUrl}api/admin/employees`, {
        headers: {
          Authorization: `Bearer ${rootGetters.getToken}`
        }
      });
      if (response.status === 200) {
        const employeeid = response.data.map(employee => employee.employeeId);
        commit('setEmployeeId', employeeid)
      }
    }
    catch (error) {
      throw new Error('Error fetching employees: ' + error.message);
    }
  },
  //fetch scanner list
  async fetchScannerList({ commit, rootGetters }) {
    try {
      const response = await axios.get(`${rootGetters.getUrl}api/admin/scanners`, {
        headers: {
          Authorization: `Bearer ${rootGetters.getToken}`
        }
      });
      if (response.status === 200) {
        commit('setScannerList', response.data);
        return true;
      }
    }
    catch (error) {
      throw new Error('Error fetching employees: ' + error.message);
    }
  },
}