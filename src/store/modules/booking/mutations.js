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
        sessionStorage.setItem('totalRevenue', payload);
    },
    setUserCount(state, payload) {
        state.userCount = payload;
        sessionStorage.setItem('userCount', JSON.stringify(payload))
    },
    setUserCountByRange(state, payload) {
        state.userCountByRange = payload;
        sessionStorage.setItem('userCountByRange', JSON.stringify(payload))
    },
}