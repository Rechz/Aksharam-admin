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
            // console.log(response.data)
            commit('setSlot', response.data);
            return true;
          }
        }
        catch (err) {
          console.error(err);
          throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
        }
      },
      // update capacity by date
      async editCapacityByDate({ rootGetters}, payload) {
        try {
          const response = await axios.put(`${rootGetters.getUrl}/api/slot/updateCapacityByDateAndSlotId?bookDate=${payload.date}&slotId=${payload.id}`, payload.data,
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
            // console.log(response.data)
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
      // async fetchTotalRevenue({ rootGetters, commit },payload) {
      //   try {
      //     const response = await axios.get(`${rootGetters.getUrl}/api/spotData/totalRevenueByDate?visitDate=${payload}`,
      //       {
      //         headers: {
      //           Authorization: `Bearer ${rootGetters.getToken}`
      //         }
      //       });
      //     if (response.status >= 200 && response.status < 300) {
      //       console.log("cumulative income",response.data)
      //       commit('setTotalRevenue', response.data);
      //       return true;
      //     }
      //   }
      //   catch (err) {
      //     console.error(err);
      //     throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
      //   }
      // },
      async fetchTotalRevenue({ rootGetters, commit },payload) {
        try {
          const response = await axios.get(`${rootGetters.getUrl}/api/spotData/visitorsCountByRangeOfDate?startDate=${payload.startDate}&endDate=${payload.endDate}`,
            {
              headers: {
                Authorization: `Bearer ${rootGetters.getToken}`
              }
            });
          if (response.status >= 200 && response.status < 300) {
            // console.log(response.data)
            commit('setTotalRevenue', response.data);
            
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
      async fetchUserCountByUptonow({ rootGetters, commit },payload) {
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
      // fetch income by date
      async fetchIncomeByDate({ rootGetters, commit },payload) {
        try {
          const response = await axios.get(`${rootGetters.getUrl}/api/spotData/totalRevenueByDate?visitDate=${payload}`,
            {
              headers: {
                Authorization: `Bearer ${rootGetters.getToken}`
              }
            });
          if (response.status >= 200 && response.status < 300) {
            // console.log(response.data)
            commit('setIncomeByDate', response.data);
            return true;
          }
        }
        catch (err) {
          console.error(err);
          throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
        }
      },
      //fetchIncomeByRange
      async fetchIncomeByRange({ rootGetters, commit },payload) {
        try {
          const response = await axios.get(`${rootGetters.getUrl}/api/spotData/visitorsCountByRangeOfDate?startDate=${payload.startDate}&endDate=${payload.endDate}`,
            {
              headers: {
                Authorization: `Bearer ${rootGetters.getToken}`
              }
            });
          if (response.status >= 200 && response.status < 300) {
            // console.log(response.data)
            commit('setIncomeByDate', response.data);
            
            return true;
          }
        }
        catch (err) {
          console.error(err);
          throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
        }
      },
      // fetch discount
      async fetchDiscountCount({ rootGetters, commit },payload) {
        try {
          const response = await axios.get(`${rootGetters.getUrl}/api/spotData/visitorsCountByRangeOfDate?startDate=${payload.startDate}&endDate=${payload.endDate}`,
            {
              headers: {
                Authorization: `Bearer ${rootGetters.getToken}`
              }
            });
          if (response.status >= 200 && response.status < 300) {
            // console.log("discount number action",response.data.no_Of_Discount)
            commit('setDiscountCount', response.data);
            
            return true;
          }
        }
        catch (err) {
          console.error(err);
          throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
        }
      },
      // edit discount
      async editDiscount({ rootGetters}, payload) {
        try {
          const response = await axios.put(`${rootGetters.getUrl}/api/category/updateDiscountCount?id=${payload.id}`, payload.data,
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
      // fetch bargraph
      async totalIncomeBarGraph({ commit, rootGetters }, payload) {
        try {
            const response = await axios.get(`${rootGetters.getUrl}/api/spotData/monthlyData?year=${payload.year}&categoryId=${payload.id}`, {
                headers: {
                    Authorization: `Bearer ${rootGetters.getToken}`
                },
            });
    
            if (response.status === 200) {
                const data = response.data;
                // console.log('data', data);
    
                const labels = [];
                const incomes = [];
                const tickets = [];
    
                // Convert the object to an array and iterate
                Object.entries(data).forEach(([month, details]) => {
                    const sumIncome = details.InstitutionGrandTotal + details.ForeignerGrandTotal + details.PublicGrandTotal;
                    labels.push(month); // Use the key (month) as the label
                    incomes.push(sumIncome);
    
                    let sumTicket = details.ForeignerCountOfPeople + details.PublicCountOfPeople + details.InstitutionCountOfPeople;
                    sumTicket = sumTicket * 100; // Scale tickets if needed
                    tickets.push(sumTicket);
                });
    
                const totalIncome = incomes.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                const totalTicket = tickets.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    
                // Commit bar chart data
                commit('setBarChart', {
                    label: labels,
                    data: incomes,
                    total: totalIncome
                });
    
                // Commit ticket data
                commit('setBarChartTicket', {
                    data: tickets,
                    total: totalTicket
                });
                return true;
            }
        } catch (error) {
            console.error('Error fetching data:', error.message);
            throw new Error('Error fetching data: ' + error.message);
        }
    },
    async fetchPieChartVisited({ rootGetters, commit }, payload) {
      try {
          const response = await axios.get(
              `${rootGetters.getUrl}/api/spotData/visitorsCountByRangeOfDate?startDate=${payload.startDate}&endDate=${payload.endDate}`,
              {
                  headers: {
                      Authorization: `Bearer ${rootGetters.getToken}`
                  }
              }
          );
  
          if (response.status >= 200 && response.status < 300) {
              const data = response.data;
  
              const labels = ['Public', 'Institution', 'Foreigner'];
              const dataTotals = [
                  data[0].publicTicketCount, 
                  data[0].institutionTicketCount, 
                  data[0].foreignerTicketCount 
              ];
              const total = data[0].totalVisitsCount;
              console.log("piechart", dataTotals);
              console.log("piechart", labels);
              console.log("piechart", total);
              commit('setPieChart', {
                  label: labels,
                  data: dataTotals,
                  total: total
              });
  
              return true;
          }
      } catch (err) {
          console.error(err);
          throw Error(err.response ? (err.response.data.message ?? err.response.data) : err.message);
      }
  },  
  // piechart by date
  async fetchPieChartDate({ rootGetters, commit }, payload) {
    try {
        const response = await axios.get(
            `${rootGetters.getUrl}/api/spotData/visitorsCountByDate?vDate=${payload.date}&categoryId=${payload.id}`,
            {
                headers: {
                    Authorization: `Bearer ${rootGetters.getToken}`
                }
            }
        );

        if (response.status >= 200 && response.status < 300) {
            const data = response.data;

            const labels = ['Public', 'Institution', 'Foreigner'];
            const dataTotals = [
                data[0].publicTicketCount, 
                data[0].institutionTicketCount, 
                data[0].foreignerTicketCount 
            ];
            const total = data[0].totalVisitsCount;
            console.log("piechart", dataTotals);
            console.log("piechart", labels);
            console.log("piechart", total);
            commit('setPieChart', {
                label: labels,
                data: dataTotals,
                total: total
            });

            return true;
        }
    } catch (err) {
        console.error(err);
        throw Error(err.response ? (err.response.data.message ?? err.response.data) : err.message);
    }
},  
    // getAllDiscount
    async fetchAllDiscount({ rootGetters, commit }) {
      try {
        const response = await axios.get(`${rootGetters.getUrl}/api/category/getDiscountCount`);
        if (response.status >= 200 && response.status < 300) {
          // console.log(response.data)
          commit('setAllDiscount', response.data);
          return true;
        }
      }
      catch (err) {
        console.error(err);
        throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
      }
    },
    // add discountCount
    async addDiscountCount({ rootGetters}, payload) {
      try {
        const response = await axios.post(`${rootGetters.getUrl}/api/category/addDiscount`, payload,
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
}