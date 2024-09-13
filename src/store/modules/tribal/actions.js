import axios from 'axios';
export default {
    //view topic of guide data
  async getTribalData({ rootGetters, commit }, payload) {
    try {
      const response = await axios.get(`${rootGetters.getUrl}/api/tribalData/getDetailsByDataType?dType=${payload.lang}`);
      if (response.status >= 200 && response.status < 300) {
        // console.log(response.data)
        commit('setMainTopicsTribal', response.data);
        return true;
      }
    }
    catch (err) {
      console.error(err);
      throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
    }
  },
  //view topic using common id
  async getTribalTopic({ rootGetters, commit }, payload) { 
    try {
      const response = await axios.get(`${rootGetters.getUrl}/api/tribalData/getDetails?commonId=${payload.id}&dType=${payload.lang}`);
      if (response.status >= 200 && response.status < 300) {
        // console.log(response.data)
        commit('setTribalTopic', response.data[0]);
        return true;
      }
    }
    catch (error) {
      console.error(error);
    }
  },
  //submit main topic text details
  async submitTribalData({ rootGetters, commit }, payload) {
    try {
      const response = await axios.post(`${rootGetters.getUrl}/api/tribalData/addData?dtId=${payload.lang}`, payload.data,
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        }
      );
      if (response.status >= 200 && response.status < 300) {
        if (payload.lang == 1) {
          commit('setMalHeading', response.data.title);
          commit('setIdmal', response.data.tribMalUid);
          return true;
        }
        else {
          commit('setEngHeading', response.data.title);
          commit('setIdeng', response.data.tribEngUid);
          return true;
        }
      }
    }
    catch (err) {
      console.error(err);
      throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
    }
  },
  //generate commonId
  async generateTribalCommonId({ rootGetters, commit }, payload) {
    try {
      const response = await axios.get(`${rootGetters.getUrl}/api/tribalData/commonId?malId=${payload.idmal}&engId=${payload.ideng}`,
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        }
      );
      if (response.status >= 200 && response.status < 300) {
        commit('setCommonId', response.data.commonId)
        return true;
      }
    }
    catch (err) {
      console.error(err);
      throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
    }
  },
  //submit video
  async submitVideo({ rootGetters }, payload) {
    try {
      const response = await axios.post(`${rootGetters.getUrl}/api/tribalData/uploadVideo?commonId=${payload.id}`, payload.formData,
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        }
      );
      if (response.status >= 200 || response.status < 300) {
        return true;
      }
    } catch (err) {
      console.error(err);
      throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
    }
  },
  //delete topics
  async deleteTribalTopic({ rootGetters}, payload) { 
    try {
      const response = await axios.delete(`${rootGetters.getUrl}/api/tribalData/deleteByCommonId?commonId=${payload.id}`,
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        }
      );
      if (response.status >= 200 && response.status < 300) {
        return true;
      }
    }
    catch (err) {
      console.error(err);
      throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
    }
  },
  //delete topic by uid
  async deleteTribalTopicUid({ rootGetters}, payload) { 
    try {
      const response = await axios.delete(`${rootGetters.getUrl}/api/tribalData/deleteByUId?uId=${payload.id}`,
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        }
      );
      if (response.status >= 200 && response.status < 300) {
        return true;
      }
    }
    catch (err) {
      console.error(err);
      throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
    }
  },
  //delete video
  async deleteVideo({ rootGetters}, payload) { 
    try {
      const response = await axios.delete(`${rootGetters.getUrl}/api/tribalData/deleteVideo?commonId=${payload.id}&tId=${payload.index}`,
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        }
      );
      if (response.status >= 200 && response.status < 300) {
        return true;
      }
    }
    catch (err) {
      console.error(err);
      throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
    }
  },
  //update topics
  async updateTopic({ rootGetters }, payload) { 
    try {
      const response = await axios.put(`${rootGetters.getUrl}/api/tribalData/updateData?uniqueId=${payload.id}`, payload.data,
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        }
      );
      if (response.status >= 200 && response.status < 300) {
          return true;
        }
    }
    catch (err) {
      console.error(err);
      throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
    }
  },
  //update video
  async updateVideo({ rootGetters }, payload) { 
    try {
      const response = await axios.put(`${rootGetters.getUrl}/api/tribalData/updateVideo?commonId=${payload.id}&tId=${payload.index}`, payload.data,
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        }
      );
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
