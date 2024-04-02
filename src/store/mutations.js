export default {
    setToken(state, payload) {
      state.token = payload;
      sessionStorage.setItem('token', payload);
    },
    setAllTickets(state, payload) {
      state.allTickets = payload;
      sessionStorage.setItem('allTickets', JSON.stringify(payload));
    },
    setCurrentTickets(state, payload) {
      state.currentTickets = payload;
      sessionStorage.setItem('currentTickets', JSON.stringify(payload));
    },
    setAllEmployees(state, payload) {
      state.allEmployees = payload;
      sessionStorage.setItem('allEmployees', JSON.stringify(payload));
    },
    setScannerList(state, payload) {
      state.scannerList = payload;
      sessionStorage.setItem('scannerList', JSON.stringify(payload));
    }
};