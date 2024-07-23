import axios from 'axios';
export default {
  //get languages
  async getAllLanguages({ rootGetters, commit }) {
    try {
      const response = await axios.get(`${rootGetters.getUrl}/api/dataType1/getTalk`)
      if ((response.status >= 200) || (response.status < 300)) {
        commit('setLanguageList', response.data)
      }
    }
    catch (error) {
      console.error(error)
    }
  },
  //get media type
  async getType({ rootGetters, commit }) {
    try {
      const response = await axios.get(`${rootGetters.getUrl}/api/fileType/getFileType`);
      if (response.status >= 200 && response.status < 300) {
        commit('setFileTypes', response.data)
        const fileType = {};
        response.data.forEach(item => { fileType[item.fileType.toLowerCase()] = item.id; });
        commit('setMedia', fileType);
      }
    }
    catch (err) {
      console.log(err)
    }
  },
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
          commit('setMalHeading', response.data.title);
          commit('setIdmal', response.data.mmalUid);
          return true;
        }
        else {
          commit('setEngHeading', response.data.title);
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