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
           SpotBooking: JSON.parse(sessionStorage.getItem('SpotBooking')) || [],
           confirmBooking: JSON.parse(sessionStorage.getItem('confirmBooking')) || [],
           details: JSON.parse(sessionStorage.getItem('details')) || [],
           district: JSON.parse(sessionStorage.getItem('district')) || [],

        }
    },
    actions,
    mutations,
    getters
}