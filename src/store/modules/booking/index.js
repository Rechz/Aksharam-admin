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
           allSlot: JSON.parse(sessionStorage.getItem('allSlot')) || [],
           Gst: JSON.parse(sessionStorage.getItem('Gst')) || [],
           Fees: JSON.parse(sessionStorage.getItem('Fees')) || [],
           Price: JSON.parse(sessionStorage.getItem('Price')) || [],
           paymentMode: JSON.parse(sessionStorage.getItem('paymentMode')) || [],
           paymentStatus: JSON.parse(sessionStorage.getItem('paymentStatus')) || [],
           SpotBooking: JSON.parse(sessionStorage.getItem('SpotPublic')) || [],
           User: JSON.parse(sessionStorage.getItem('User')) || [],
           ticketByDate: JSON.parse(sessionStorage.getItem('ticketByDate')) || [],
           totalRevenue: sessionStorage.getItem('totalRevenue') || '',
           userCount: JSON.parse(sessionStorage.getItem('userCount')) || [],
           userCountByRange: JSON.parse(sessionStorage.getItem('userCountByRange')) || [],
           incomeByDate: JSON.parse(sessionStorage.getItem('incomeByDate')) || [],
           dataBar: JSON.parse(sessionStorage.getItem('dataBar')) || [],
           data2Bar: JSON.parse(sessionStorage.getItem('data2Bar')) || [],
           labelsBar: JSON.parse(sessionStorage.getItem('labelsBar')) || ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
           totalBar: sessionStorage.getItem('totalBar') || 0,
           total2Bar: sessionStorage.getItem('total2Bar') || 0,
           allDiscount: JSON.parse(sessionStorage.getItem('allDiscount')) || [],
           incomeByRange: JSON.parse(sessionStorage.getItem('incomeByRange')) || [],
           discountCount: sessionStorage.getItem('discountCount') || 0,


        }
    },
    actions,
    mutations,
    getters
}