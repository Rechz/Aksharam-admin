import axios from 'axios';
export default {
  //view topic of guide data
  async getGuideData({ rootGetters, commit }, payload) {
    try {
      const response = await axios.get(`${rootGetters.getUrl}/api/guideAppQR/getAllDetailsByDataType?dtId=${payload.lang}`);
      if (response.status >= 200 && response.status < 300) {
        // console.log(response.data)
        commit('setMainTopicsGuide', response.data);
        return true;
      }
    }
    catch (err) {
      console.error(err);
      throw Error(err.response ? err.response.data : err.message);
    }
  },
  //view topic using common id
  async getGuideTopic({ rootGetters, commit }, payload) { 
    try {
      const response = await axios.get(`${rootGetters.getUrl}/api/guideAppQR/getScanDetails?dtId=${payload.lang}&commonId=${payload.id}`);
      if (response.status >= 200 && response.status < 300) {
        // console.log(response.data)
        commit('setGuideTopic', response.data[0]);
        return true;
      }
    }
    catch (error) {
      console.error(error);
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
      throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
    }
  },
  //submit image for main/paragraph
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
          commit('setParaidmal', response.data.fsUid);
          return true;
        }
        else {
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
      throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
    }
  },
  //delete topics
  async deleteGuideTopic({ rootGetters}, payload) { 
    try {
      const response = await axios.delete(`${rootGetters.getUrl}/api/guideApp/deleteByCommonId/${payload.id}`,
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
  async deleteGuideTopicUid({ rootGetters}, payload) { 
    try {
      const response = await axios.delete(`${rootGetters.getUrl}/api/guideApp/deleteMainTitleByUid/${payload.id}?dId=${payload.lang}`,
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
 
  //delete paragraphs
  async deleteGuidePara({ rootGetters}, payload) { 
    try {
      const response = await axios.delete(`${rootGetters.getUrl}/api/guideApp/deleteSubByCommonId/${payload.id}`,
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
  //delete media
  async deleteMedia({ rootGetters}, payload) { 
    try {
      const response = await axios.delete(`${rootGetters.getUrl}/api/mediaTypeData/deleteSingleItem/${payload.id}?mtId=${payload.type}&dataType=${payload.lang}&itemId=${payload.index}`,
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
  //delete image
  async deleteImage({ rootGetters}, payload) { 
    try {
      const response = await axios.delete(`${rootGetters.getUrl}/api/jpgData/deleteJPG/${payload.id}?imgIds=${payload.index}`,
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
      const response = await axios.put(`${rootGetters.getUrl}/api/guideApp/updateData/${payload.id}?dType=${payload.lang}`, payload.data,
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
      throw Error(err.response ? err.response.data : err.message);
    }
  },
  //update image
  async updateImage({ rootGetters }, payload) { 
    try {
      const response = await axios.put(`${rootGetters.getUrl}/api/jpgData/updateJPG/${payload.commonId}?imgIds=${payload.id}`, payload.data,
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
      throw Error(err.response ? err.response.data : err.message);
    }
  },
  //update image names
  async updateImageName({ rootGetters }, payload) { 
    try {
      const response = await axios.put(`${rootGetters.getUrl}/api/jpgData/editNameAndUrl/${payload.commonId}/${payload.id}?imgName=${payload.name}&imgUrl=${payload.ref}`, payload.data,
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
      throw Error(err.response ? err.response.data : err.message);
    }
  },
  //update audio/video/pdf
  async updateMedia({ rootGetters }, payload) { 
    try {
      const response = await axios.put(`${rootGetters.getUrl}/api/mediaTypeData/updateMediaPlayer/${payload.id}?mtId=${payload.type}&dType=${payload.lang}&ids=${payload.index}`, payload.data,
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
      throw Error(err.response ? err.response.data : err.message);
    }
  },
}