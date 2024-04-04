export default {
  getUrl : (state) => state.base_url,
  getToken: (state) => state.token,
  getAllTickets: (state) => state.allTickets,
  getCurrentTickets: (state) => state.currentTickets,
  getAllEmployees: (state) => state.allEmployees,
  getScannerList: (state) => state.scannerList,
  getPieData: (state) => state.dataPie,
  getBarData: (state) => state.dataBar,
  getPieLabel: (state) => state.labelsPie,
  getBarLabel: (state) => state.labelsBar,
  getTotalTicket: (state) => state.totalTickets,
  getTotalIncome: (state) => state.totalIncome,
}