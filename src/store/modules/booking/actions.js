import axios from "axios";
export default {
    // add category
    async addCategory({ rootGetters}, payload) {
        try {
          const response = await axios.post(`${rootGetters.getUrl}/api/category/addCategory`, payload,
            {
              headers: {
                Authorization: `Bearer ${rootGetters.getToken}`
              }
            });
            if (response.status >= 200 && response.status < 300) {
                return true;
            }
        }
        catch (err) {
          console.error(err);
          throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
        }
      },
    //   Get category
      async fetchCategory({ rootGetters, commit }) {
        try {
          const response = await axios.get(`${rootGetters.getUrl}/api/category/getCategory`);
          if (response.status >= 200 && response.status < 300) {
            // console.log(response.data)
            commit('setCategory', response.data);
            return true;
          }
        }
        catch (err) {
          console.error(err);
          throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
        }
      },
      // add Slot
      async addSlot({ rootGetters}, payload) {
        try {
          const response = await axios.post(`${rootGetters.getUrl}/api/slot/addSlot`, payload,
            {
              headers: {
                Authorization: `Bearer ${rootGetters.getToken}`
              }
            });
            if (response.status >= 200 && response.status < 300) {
                return true;
            }
        }
        catch (err) {
          console.error(err);
          throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
        }
      },
      // get all slot
      async fetchAllSlot({ rootGetters, commit }) {
        try {
          const response = await axios.get(`${rootGetters.getUrl}/api/slot/getAllSlot`);
          if (response.status >= 200 && response.status < 300) {
            // console.log(response.data)
            commit('setAllSlot', response.data);
            return true;
          }
        }
        catch (err) {
          console.error(err);
          throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
        }
      },
      // Update capacity
      async editSlot({ rootGetters}, payload) {
        try {
          const response = await axios.put(`${rootGetters.getUrl}/api/slot/updateSlot?id=${payload.id}`, payload.data,
            {
              headers: {
                Authorization: `Bearer ${rootGetters.getToken}`
              }
            });
            if (response.status >= 200 && response.status < 300) {
              // commit('setSpotBooking', response.data);
                return true;
            }
        }
        catch (err) {
          console.error(err);
          throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
        }
      },
      // get slot by date
      async getSlotByDate({ rootGetters, commit }, payload){
        try {
          const response = await axios.get(`${rootGetters.getUrl}/api/slot/bookDate?bDate=${payload}`);
          if (response.status >= 200 && response.status < 300) {
            console.log(response.data)
            commit('setSlot', response.data);
            return true;
          }
        }
        catch (err) {
          console.error(err);
          throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
        }
      },
    //   add type
      async addType({ rootGetters}, payload) {
        try {
          const response = await axios.post(`${rootGetters.getUrl}/api/category/addType`, payload,
            {
              headers: {
                Authorization: `Bearer ${rootGetters.getToken}`
              }
            });
            if (response.status >= 200 && response.status < 300) {
                return true;
            }
        }
        catch (err) {
          console.error(err);
          throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
        }
      },
    //   get type by categoryId
      async getTypeById({ rootGetters, commit }, payload){
        try {
          const response = await axios.get(`${rootGetters.getUrl}/api/category/getTypeByCategoryId?id=${payload}`);
          if (response.status >= 200 && response.status < 300) {
            console.log(response.data)
            const result = {};

// Iterate through each item in the response array
response.data.forEach(item => {
    let key;
        // Split the type by spaces, capitalize the first letter of each word after the first, and join them
  const parts = item.type.split(' ');
  const baseKey =item.type.charAt(0).toLowerCase() + item.type.slice(1).replace(' ', '');
        key = parts[0].toLowerCase() + parts.slice(1).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('') + 'Type'+ 'Id';
    // Initialize the value to 0
  result[key] = item.id;
  result[baseKey] = 0
});
// console.log(result)

            commit('setType', response.data);
            return result;
          }
        }
        catch (err) {
          console.error(err);
          throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
        }
      },
      // Add GST
      async addGst({ rootGetters}, payload) {
        try {
          const response = await axios.post(`${rootGetters.getUrl}/api/category/addGst`, payload,
            {
              headers: {
                Authorization: `Bearer ${rootGetters.getToken}`
              }
            });
            if (response.status >= 200 && response.status < 300) {
                return true;
            }
        }
        catch (err) {
          console.error(err);
          throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
        }
      },
      // GetGst
      async fetchGst({ rootGetters, commit }) {
        try {
          const response = await axios.get(`${rootGetters.getUrl}/api/category/getGST`);
          if (response.status >= 200 && response.status < 300) {
            // console.log(response.data)
            commit('setGst', response.data);
            return true;
          }
        }
        catch (err) {
          console.error(err);
          throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
        }
      },
      // Add additional fees
      async addFees({ rootGetters}, payload) {
        try {
          const response = await axios.post(`${rootGetters.getUrl}/api/category/additionalCharge`, payload,
            {
              headers: {
                Authorization: `Bearer ${rootGetters.getToken}`
              }
            });
            if (response.status >= 200 && response.status < 300) {
                return true;
            }
        }
        catch (err) {
          console.error(err);
          throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
        }
      },
      // get additionalCharge
      async fetchfees({ rootGetters, commit }) {
        try {
          const response = await axios.get(`${rootGetters.getUrl}/api/category/getAdditionalCharge`);
          if (response.status >= 200 && response.status < 300) {
            // console.log(response.data)
            commit('setFees', response.data);
            return true;
          }
        }
        catch (err) {
          console.error(err);
          throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
        }
      },
      // Add price
      async addPrice({ rootGetters}, payload) {
        try {
          const response = await axios.post(`${rootGetters.getUrl}/api/category/addPrice`, payload,
            {
              headers: {
                Authorization: `Bearer ${rootGetters.getToken}`
              }
            });
            if (response.status >= 200 && response.status < 300) {
                return true;
            }
        }
        catch (err) {
          console.error(err);
          throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
        }
      },

      // update price
      async updatePrice({ rootGetters}, payload) {
        try {
          const response = await axios.put(`${rootGetters.getUrl}/api/category/updatePriceData/${payload.id}`, payload.data,
            {
              headers: {
                Authorization: `Bearer ${rootGetters.getToken}`
              }
            });
            if (response.status >= 200 && response.status < 300) {
                return true;
            }
        }
        catch (err) {
          console.error(err);
          throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
        }
      },

      // delete price
      async deletePrice({ rootGetters}, payload) {
        try {
          const response = await axios.delete(`${rootGetters.getUrl}/api/category/deletePriceById/${payload}`,            
            {
              headers: {
                Authorization: `Bearer ${rootGetters.getToken}`
              }
            });
            if (response.status >= 200 && response.status < 300) {
                return true;
            }
        }
        catch (err) {
          console.error(err);
          throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
        }
      },
      // get price
      async fetchPrice({ rootGetters, commit }) {
        try {
          const response = await axios.get(`${rootGetters.getUrl}/api/category/getPrice`);
          if (response.status >= 200 && response.status < 300) {
            // console.log(response.data)
            commit('setPrice', response.data);
            return true;
          }
        }
        catch (err) {
          console.error(err);
          throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
        }
      },
      // mode of payment
      async paymentMode({ rootGetters}, payload) {
        try {
          const response = await axios.post(`${rootGetters.getUrl}/api/category/addPaymentMode`, payload,
            {
              headers: {
                Authorization: `Bearer ${rootGetters.getToken}`
              }
            });
            if (response.status >= 200 && response.status < 300) {
                return true;
            }
        }
        catch (err) {
          console.error(err);
          throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
        }
      },
      // Get payment mode
      async fetchPaymentMode({ rootGetters, commit }) {
        try {
          const response = await axios.get(`${rootGetters.getUrl}/api/category/paymentMode`);
          if (response.status >= 200 && response.status < 300) {
            // console.log(response.data)
            commit('setPaymentMode', response.data);
            return true;
          }
        }
        catch (err) {
          console.error(err);
          throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
        }
      },
      // Get Payment status
      async fetchPaymentStatus({ rootGetters, commit }) {
        try {
          const response = await axios.get(`${rootGetters.getUrl}/api/category/getPaymentStatus`);
          if (response.status >= 200 && response.status < 300) {
            // console.log(response.data)
            commit('setPaymentStatus', response.data);
            return true;
          }
        }
        catch (err) {
          console.error(err);
          throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
        }
      },
      // Spot_Registration
      // PUBLIC
      async spotBooking({ rootGetters,commit}, payload) {
        try {
          const response = await axios.post(`${rootGetters.getUrl}/api/spotData/userReg?category=${payload.id}`, payload.data,
            {
              headers: {
                Authorization: `Bearer ${rootGetters.getToken}`
              }
            });
            if (response.status >= 200 && response.status < 300) {
              commit('setSpotBooking', response.data);
                return true;
            }
        }
        catch (err) {
          console.error(err);
          throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
        }
      },


      // Dashboard api
      // get all users 
      async fetchTickets({ rootGetters,commit}, payload) {
        try {
          const response = await axios.get(`${rootGetters.getUrl}/api/spotData/getAllUser?categoryId=${payload}`,
            {
              headers: {
                Authorization: `Bearer ${rootGetters.getToken}`
              }
            });
            if (response.status >= 200 && response.status < 300) {
              commit('setTickets', response.data);
                return true;
            }
        }
        catch (err) {
          console.error(err);
          throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
        }
      },

      // Get User Details By visitDate and categoryId
      async fetchTicketsByDate({ rootGetters,commit}, payload) {
        try {
          const response = await axios.get(`${rootGetters.getUrl}/api/spotData/getUserDetailsByDate?visitDate=${payload.date}&categoryId=${payload.id}`,
            {
              headers: {
                Authorization: `Bearer ${rootGetters.getToken}`
              }
            });
            if (response.status >= 200 && response.status < 300) {
              commit('setTicketsByDate', response.data);
                return true;
            }
        }
        catch (err) {
          console.error(err);
          throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
        }
      },

      // Get Revenue details by Date
      async fetchTotalRevenue({ rootGetters, commit },payload) {
        try {
          const response = await axios.get(`${rootGetters.getUrl}/api/spotData/totalRevenueByDate?visitDate=${payload}`,
            {
              headers: {
                Authorization: `Bearer ${rootGetters.getToken}`
              }
            });
          if (response.status >= 200 && response.status < 300) {
            // console.log(response.data)
            commit('setTotalRevenue', response.data.overAllRevenue || 0);
            return true;
          }
        }
        catch (err) {
          console.error(err);
          throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
        }
      },

      // Get All user count
      async fetchUserCount({ rootGetters, commit },payload) {
        try {
          const response = await axios.get(`${rootGetters.getUrl}/api/spotData/visitorsCountByDate?vDate=${payload.date}&categoryId=${payload.id}`,
            {
              headers: {
                Authorization: `Bearer ${rootGetters.getToken}`
              }
            });
          if (response.status >= 200 && response.status < 300) {
            // console.log(response.data)
            commit('setUserCount', response.data);
            return true;
          }
        }
        catch (err) {
          console.error(err);
          throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
        }
      },

      // Get All user count by start date and end date 
      async fetchUserCountByRange({ rootGetters, commit },payload) {
        try {
          const response = await axios.get(`${rootGetters.getUrl}/api/spotData/visitorsCountByRangeOfDate?startDate=${payload.startDate}&endDate=${payload.endDate}`,
            {
              headers: {
                Authorization: `Bearer ${rootGetters.getToken}`
              }
            });
          if (response.status >= 200 && response.status < 300) {
            // console.log(response.data)
            commit('setUserCountByRange', response.data);
            return true;
          }
        }
        catch (err) {
          console.error(err);
          throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
        }
      },
}