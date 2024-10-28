export default {
  getUrl : (state) => state.base_url,
  getToken: (state) => state.token,
  getStatus: (state) => state.status,
  getRole: (state) => state.role,
  getAllEmployees: (state) => state.allEmployees,
  getScannerList: (state) => state.scannerList,
  getEmployeeId: (state) => state.employeeId,
}