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
    },
    setPieChart(state, { label, data }) {
      state.dataPie = data;
      sessionStorage.setItem('dataPie', JSON.stringify(data));
      state.labelsPie = label;
      sessionStorage.setItem('labelsPie', JSON.stringify(label));
    },
    setBarChart(state, { label, data }) {
      state.dataBar = data;
      sessionStorage.setItem('dataBar', JSON.stringify(data));
      state.labelsBar = label;
      sessionStorage.setItem('labelsBar', JSON.stringify(label));
  },
    setTotalTickets(state, payload) {
      state.totalTickets = payload;
      sessionStorage.setItem('totalTickets', payload);
  },
    setTotalIncome(state, payload) {
      state.totalIncome = payload;
      sessionStorage.setItem('totalIncome', payload);
    },
     
};