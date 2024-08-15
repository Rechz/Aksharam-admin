import axios from 'axios';
export default {
  //view topic of guide data
  async getGuideData({ rootGetters, commit }, payload) {
    try {
      const response = await axios.post(`${rootGetters.getUrl}/api/guideAppQR/getAllDetailsByDataType?dtId=${payload.lang}`,
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        }
      );
      if (response.status >= 200 && response.status < 300) {
        console.log(response.data)
        commit('mainTopicsGuide', response.data)
      }
    }
    catch (err) {
      console.error(err);
      throw Error(err.response ? err.response.data : err.message);
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
        if (payload.lang == 1) {
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
      console.error(err);
      throw Error(err.response ? err.response.data : err.message);
    }
  },
  //generate commonId
  async generateCommonId({ rootGetters, commit }, payload) {
    try {
      const response = await axios.get(`${rootGetters.getUrl}/api/guideAppQR/generate?mMalUid=${payload.idmal}&mEngUid=${payload.ideng}`,
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        }
      );
      if (response.status >= 200 && response.status < 300) {
        commit('setCommonIdMain', response.data.commonId)
        return true;
      }
    }
    catch (err) {
      console.error(err);
      throw Error(err.response ? err.response.data : err.message);
    }
  },
  //submit image for main
  async submitImage({ rootGetters }, payload) {
    try {
      const response = await axios.post(`${rootGetters.getUrl}/api/jpgData/jpgUpload?commonId=${payload.commonId}`, payload.formData,
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
      throw Error(err.response ? err.response.data : err.message);
    }
  },
  //submit video/audio for main
  async submitMedia({ rootGetters }, payload) {
    try {
      const response = await axios.post(`${rootGetters.getUrl}/api/mediaTypeData/uploadMediaTypeData?uId=${payload.id}&mtId=${payload.type}`, payload.formData,
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
      throw Error(err.response ? err.response.data : err.message);
    }
  },
  //submit paragraphs
  async submitParagraph({ rootGetters,commit }, payload) {
    try {
      const response = await axios.post(`${rootGetters.getUrl}/api/guideApp/subPara?dId=${payload.lang}&uId=${payload.uid}`, payload.data,
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        }
      );
      if (response.status >= 200 || response.status < 300) {
        if (payload.lang == 1) {
          // commit('setMalHeading', response.data.topic);
          commit('setParaidmal', response.data.fsUid);
          return true;
        }
        else {
          // commit('setEngHeading', response.data.topic);
          commit('setParaideng', response.data.fsUid);
          return true;
        }
      }
    } catch (err) {
      console.error(err);
      throw Error(err.response ? err.response.data : err.message);
    }
  },
  //generate commonId for translation
  async generateCommonIdPara({ rootGetters, commit }, payload) {
    try {
      const response = await axios.get(`${rootGetters.getUrl}/api/guideApp/genSubParaCommonId?engId=${payload.ideng}&malId=${payload.idmal}`, payload.formData,
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        }
      );
      if (response.status >= 200 || response.status < 300) {
        commit('setCommonIdPara', response.data.fsCommonId)
        return true;
      }
    }
    catch (err) {
      console.error(err);
      throw Error(err.response ? err.response.data : err.message);
    }
  }
}