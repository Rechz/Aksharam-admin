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
    setPieChart(state, { label, data, total }) {
      state.dataPie = data;
      sessionStorage.setItem('dataPie', JSON.stringify(data));
      state.labelsPie = label;
      sessionStorage.setItem('labelsPie', JSON.stringify(label));
      state.totalPie = total;
      sessionStorage.setItem('totalPie', total);
    },
    setBarChart(state, { label, data, total }) {
      state.dataBar = data;
      sessionStorage.setItem('dataBar', JSON.stringify(data));
      state.labelsBar = label;
      sessionStorage.setItem('labelsBar', JSON.stringify(label));
      state.totalBar = total;
      sessionStorage.setItem('totalBar', total);
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