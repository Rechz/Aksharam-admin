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
        key = parts[0].toLowerCase() + parts.slice(1).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('') + 'Type';
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
}