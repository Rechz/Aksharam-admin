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
    setAllTickets(state, payload) {
      state.allTickets = payload;
      // sessionStorage.setItem('allTickets', JSON.stringify(payload));
    },
    setCurrentTickets(state, payload) {
      state.currentTickets = payload;
      // sessionStorage.setItem('currentTickets', JSON.stringify(payload));
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
    setBarChartTicket(state, { data, total }) {
      state.data2Bar = data;
      sessionStorage.setItem('data2Bar', JSON.stringify(data));
      state.total2Bar = total;
      sessionStorage.setItem('total2Bar', total);
  },
    setTotalTickets(state, payload) {
      state.totalTickets = payload;
      sessionStorage.setItem('totalTickets', payload);
  },
    setTotalIncome(state, payload) {
      state.totalIncome = payload;
      sessionStorage.setItem('totalIncome', payload);
  },
  setDailyIncome(state, payload) {
    state.dailyIncome = payload
    sessionStorage.setItem('dailyIncome', payload);
  },
  setDailyTickets(state, payload) {
    state.dailyTickets = payload
    sessionStorage.setItem('dailyTickets', payload);
  },
  setEmployeeId(state, payload) {
    state.employeeId = payload;
    sessionStorage.setItem('employeeId', JSON.stringify(payload));
  },
  setPriceList(state, payload) {
  state.priceList = payload;
  sessionStorage.setItem('priceList', JSON.stringify(payload));
},
  setHoliday(state, payload) {
    state.holidays = payload;
    sessionStorage.setItem('holidays', JSON.stringify(payload));
  },
  setSlots(state, payload) {
    state.slots = payload;
    sessionStorage.setItem('slots', JSON.stringify(payload));
  },
};