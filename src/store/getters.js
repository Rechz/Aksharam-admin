export default {
  getUrl : (state) => state.base_url,
  getToken: (state) => state.token,
  getAllTickets: (state) => state.allTickets,
  getCurrentTickets: (state) => state.currentTickets,
  getAllEmployees: (state) => state.allEmployees,
  getScannerList: (state) => state.scannerList
}