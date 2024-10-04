export default {
    setCategory(state, payload) {
        state.Category = payload;
        sessionStorage.setItem('Category', JSON.stringify(payload))
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
    setSpotBooking(state, payload) {
        state.SpotBooking = payload;
        sessionStorage.setItem('SpotBooking', JSON.stringify(payload))
    },
}