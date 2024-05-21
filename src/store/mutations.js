export default {
    setToken(state, payload) {
      state.token = payload;
      sessionStorage.setItem('token', payload);
  },
  setStatus(state, payload) {
    state.status = payload;
    sessionStorage.setItem('status', JSON.stringify(payload));
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
  setAllTopics(state, payload) {
    state.maintopics = payload;
  },
setDetails(state,payload){
  state.detailTopic = payload;
  },
 setIdmal(state, payload) {
      state.idmal = payload;
      // sessionStorage.setItem('idmal', payload);
    },
    setIdeng(state, payload) {
      state.ideng = payload;
      // sessionStorage.setItem('ideng', payload);
    },
    setVideomal(state, payload) {
      state.videomal = payload;
      // sessionStorage.setItem('videomal', payload);
    },
    setAudiomal(state, payload) {
      state.audiomal = payload;
      // sessionStorage.setItem('audiomal', payload);
    },
    setVideoeng(state, payload) {
      state.videoeng = payload;
      // sessionStorage.setItem('videoeng', payload);
    },
    setAudioeng(state, payload) {
      state.audioeng = payload;
      // sessionStorage.setItem('audioeng', payload);
    },
    setVideoSubMal(state, payload) {
      state.videoSubMal = payload;
      // sessionStorage.setItem('videoSubMal', payload);
    },
    setAudioSubMal(state, payload) {
      state.audioSubMal = payload;
      // sessionStorage.setItem('audioSubMal', payload);
    },
    setVideoSubEng(state, payload) {
      state.videoSubEng = payload;
      // sessionStorage.setItem('videoSubEng', payload);
    },
    setAudioSubEng(state, payload) {
      state.audioSubEng = payload;
      // sessionStorage.setItem('audioSubEng', payload);
    },
    setMalHeading(state, payload) {
      state.malHeading = payload;
      // sessionStorage.setItem('malHeading', payload);
    },
    setEngHeading(state, payload) {
      state.engHeading = payload;
      // sessionStorage.setItem('engHeading', payload);
    },
    setMalSubHeading(state, payload) {
      state.malSubHeading = payload;
      // sessionStorage.setItem('malSubHeading', payload);
    },
    setEngSubHeading(state, payload) {
      state.engSubHeading = payload;
      // sessionStorage.setItem('engSubHeading', payload);
    },
    setSubidmal(state, payload) {
      state.subidmal = payload;
      // sessionStorage.setItem('subidmal', payload);
    },
    setSubideng(state, payload) {
      state.subideng = payload;
      // sessionStorage.setItem('subideng', payload);
    },
};