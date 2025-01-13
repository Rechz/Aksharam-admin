export default {
    setCategory(state, payload) {
        state.Category = payload;
        sessionStorage.setItem('Category', JSON.stringify(payload))
    },
    setSlot(state, payload) {
        state.Slot = payload;
        // sessionStorage.setItem('Slot', JSON.stringify(payload))
    },
    setAllSlot(state, payload) {
        state.allSlot = payload;
        sessionStorage.setItem('allSlot', JSON.stringify(payload))
    },
    setType(state, payload) {
        state.Type = payload;
        sessionStorage.setItem('Type', JSON.stringify(payload))
    },
    setGst(state, payload) {
        state.GST = payload;
        sessionStorage.setItem('GST', JSON.stringify(payload))
    },
    setFees(state, payload) {
        state.Fees = payload;
        sessionStorage.setItem('Fees', JSON.stringify(payload))
    },
    setPrice(state, payload) {
        state.Price = payload;
        sessionStorage.setItem('Price', JSON.stringify(payload))
    },
    setPaymentMode(state, payload) {
        state.paymentMode = payload;
        sessionStorage.setItem('paymentMode', JSON.stringify(payload))
    },
    setPaymentStatus(state, payload) {
        state.paymentStatus = payload;
        sessionStorage.setItem('paymentStatus', JSON.stringify(payload))
    },
    setSpotBooking(state, payload) {
        state.SpotBooking = payload;
        sessionStorage.setItem('SpotBooking', JSON.stringify(payload))
    },
    setTickets(state, payload) {
        state.User = payload;
        sessionStorage.setItem('User', JSON.stringify(payload))
    },
    setTicketsByDate(state, payload) {
        state.ticketByDate = payload;
        sessionStorage.setItem('ticketByDate', JSON.stringify(payload))
    },
    setTotalRevenue(state, payload) {
        state.totalRevenue = payload;
        sessionStorage.setItem('totalRevenue', JSON.stringify(payload));
    },
    setUserCount(state, payload) {
        state.userCount = payload;
        sessionStorage.setItem('userCount', JSON.stringify(payload))
    },
    setUserCountByRange(state, payload) {
        state.userCountByRange = payload;
        sessionStorage.setItem('userCountByRange', JSON.stringify(payload))
    },
    setIncomeByDate(state, payload) {
        state.incomeByDate = payload;
        sessionStorage.setItem('incomeByDate', JSON.stringify(payload))
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
    setAllDiscount(state, payload) {
        state.allDiscount = payload;
        sessionStorage.setItem('allDiscount', JSON.stringify(payload))
    },
    setIncomeByRange(state, payload) {
        state.incomeByRange = payload;
        sessionStorage.setItem('incomeByRange', JSON.stringify(payload))
    },
    setDiscountCount(state, payload) {
        state.discountCount = payload;
        sessionStorage.setItem('discountCount', JSON.stringify(payload))
    },
    setPieChart(state, { label, data, total }) {
        state.dataPie = data;
        sessionStorage.setItem('dataPie', JSON.stringify(data));
        state.labelsPie = label;
        sessionStorage.setItem('labelsPie', JSON.stringify(label));
        state.totalPie = total;
        sessionStorage.setItem('totalPie', total);
      },
}