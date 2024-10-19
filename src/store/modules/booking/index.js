import actions from "./actions.js";
import mutations from './mutations.js';
import getters from './getters.js';
export default {
    namespaced: true,
    state() {
        return {
           // state
           Category: JSON.parse(sessionStorage.getItem('Category')) || [],
           Slot: [],
           Type: [],
           Gst: JSON.parse(sessionStorage.getItem('Gst')) || [],
           Fees: JSON.parse(sessionStorage.getItem('Fees')) || [],
           Price: JSON.parse(sessionStorage.getItem('Price')) || [],
           paymentMode: JSON.parse(sessionStorage.getItem('paymentMode')) || [],
           paymentStatus: JSON.parse(sessionStorage.getItem('paymentStatus')) || [],
           SpotBooking: JSON.parse(sessionStorage.getItem('SpotPublic')) || [],
        }
    },
    actions,
    mutations,
    getters
}