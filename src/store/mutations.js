export default {
    setToken(state, payload) {
      state.token = payload;
      sessionStorage.setItem('token', payload);
  },
    clearToken(state) {
      state.token = null;
      sessionStorage.removeItem('token');
    },
  setStatus(state, payload) {
    state.status = payload;
    sessionStorage.setItem('status', JSON.stringify(payload));
  },
  setRole(state, payload) {
    state.role = payload;
    sessionStorage.setItem('role', JSON.stringify(payload));
  },
   clearStatus(state) {
      state.status = false;
      sessionStorage.removeItem('status');
    },
    setAllEmployees(state, payload) {
      state.allEmployees = payload;
      sessionStorage.setItem('allEmployees', JSON.stringify(payload));
    },
    setScannerList(state, payload) {
      state.scannerList = payload;
      sessionStorage.setItem('scannerList', JSON.stringify(payload));
    },
  setEmployeeId(state, payload) {
    state.employeeId = payload;
    sessionStorage.setItem('employeeId', JSON.stringify(payload));
  },
};