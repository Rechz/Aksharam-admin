import axios from 'axios';
export default {
  //submit main topic text details
  async submitHeading({ rootGetters, commit }, payload) {
    try {
      const response = await axios.post(`${rootGetters.getUrl}/api/guideApp/mainPara?dId=${payload.lang}`, payload.data,
      {
      headers: {
        Authorization: `Bearer ${rootGetters.getToken}`
      }
     }
      );
      if (response.status >= 200 && response.status < 300) {
        if (payload.language === 1) {
          commit('setMalHeading', response.data.topic);
          commit('setIdmal', response.data.mmalUid);
          return true;
        }
        else {
          commit('setEngHeading', response.data.topic);
          commit('setIdeng', response.data.mengUid);
          return true;
        }
      }
    }
    catch (err) {
      throw Error(err.response? err.response.data : err.message);
    }
  },
}