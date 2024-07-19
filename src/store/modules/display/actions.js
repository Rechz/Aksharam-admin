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
        const response = await axios.post(`${rootGetters.getUrl}/api/DataEntry1/mainT?dId=${payload.language}`, payload.data,
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
    //QR generation
    async generateQR({ rootGetters, commit }, payload) {
      try {
        const response = await axios.get(`${rootGetters.getUrl}/api/qrcode/generate?mMalUid=${payload.idmal}&mEngUid=${payload.ideng}`,
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        }
        );
        if (response.status >= 200 && response.status < 300) {
          // console.log(response.data)
          commit('setCommonIdMain', response.data.commonId)
          return true;
        }
      }
      catch (err) {
        // console.error(err)
        throw Error(err.response? err.response.data : err.message);
      }
    },
    //image upload maintopic
    async uploadImages({ rootGetters }, payload) {
      try{
        const response = await axios.post(`${rootGetters.getUrl}/api/imgData/uploadImg?englishUId=${payload.ideng}&malUid=${payload.idmal}`, payload.formData,
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
        throw Error(err.response? err.response.data : err.message);
      }
    },
    //audio/video upload maintopic
    async submitMedia({ rootGetters }, payload) {
      try {
        const response = await axios.post(`${rootGetters.getUrl}/api/mediaData/mpData?uId=${payload.uid}&mtId=${payload.id}`, payload.formData,
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
        throw Error(err.response? err.response.data : err.message);
      }
    },
    //submit details subheading
    async submitSubHead({ rootGetters, commit }, payload) {    
      try {
        const response = await axios.post(`${rootGetters.getUrl}/api/DataEntry2/firstSub?uId=${payload.uid}`, payload.data,
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
       }
        );
        if (response.status >= 200 && response.status < 300) {
          if (payload.lang === 1) {
            commit('setMalSubHeading', response.data.title);
            commit('setSubidmal', response.data.fsUid);
            return true;
          }
          else {
            commit('setEngSubHeading', response.data.title);
            commit('setSubideng', response.data.fsUid);
            return true;
          }
        }
      }
      catch (err) {
        throw Error(err.response? err.response.data : err.message)
      }
    },
    //generate commonid subheading
    async generateQRSub({ rootGetters,commit,getters}, payload) {
      try {
        const response = await axios.get(`${rootGetters.getUrl}/api/DataEntry2/genCommonId?engId=${payload.subideng}&malId=${payload.subidmal}`,
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        }
        );
        if (response.status >= 200 && response.status < 300) {
          // console.log('commonlap', response.data.fsCommonId)
          commit('setCommonIdSub', response.data.fsCommonId)
          console.log('common sub', getters.getCommonIdSub)
          return true;
        }
      }
      catch (err) {
        throw Error(err.response? err.response.data : err.message);
      }
    },
    //submit image subheading
    async uploadSubImages({ rootGetters}, payload) {
      try {
        const response = await axios.post(`${rootGetters.getUrl}/api/imgData/uploadImg1?englishUId=${payload.subideng}&malUid=${payload.subidmal}`, payload.formData,
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        }
        );
        if (response.status >= 200 && response.status < 300) {
          return true;
        }
      } catch (err) {
        throw Error(err.response? err.response.data : err.message);
      }
    },
    //submit audio/video subheading
    async submitSubMedia({ rootGetters}, payload) {
      try {
        const response = await axios.post(`${rootGetters.getUrl}/api/mediaData/mpData1?uId=${payload.uid}&mtId=${payload.id}`, payload.formData,
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
        throw Error(err.response? err.response.data : err.message);
      }
    },
    //submit details subheading2
    async submitSub2Head({ rootGetters, commit,getters }, payload) {  
      try {
        const response = await axios.post(`${rootGetters.getUrl}/api/DataEntry3/secondSub?uId=${payload.uid}`, payload.data,
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        }
        );
        if (response.status >= 200 && response.status < 300) {
          if (payload.lang === 1) {
            commit('setMalSub2Heading', response.data.title)
            console.log(getters.getmalSub2Heading)
            commit('setSub2idmal', response.data.ssUid)
            console.log(getters.getsub2idmal)
            return true;
          }
          else {
            commit('setEngSub2Heading', response.data.title)
            console.log(getters.getengSub2Heading)
            commit('setSub2ideng', response.data.ssUid)
            console.log(getters.getsub2ideng)
            return true;
          }
        }
      }
      catch (err) {
        throw Error(err.response? err.response.data : err.message);
      }
    },
    //generate commonid sub2 heading
    async generateQRSub2({ rootGetters,commit}, payload) {
      try {
        const response = await axios.get(`${rootGetters.getUrl}/api/DataEntry3/generateSSid?englishId=${payload.subideng}&malId=${payload.subidmal}`,
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        }
        );
        if (response.status >= 200 && response.status < 300) {
          commit('setCommonIdSub2', response.data.ssCommonId)
          return true;
        }
      }
      catch (err) {
        throw Error(err.response? err.response.data : err.message);
      }
    },
    //submit image subheading2
    async uploadSub2Images({ rootGetters}, payload) {
      try {
        const response = await axios.post(`${rootGetters.getUrl}/api/imgData/uploadImg2?englishUId=${payload.subideng}&malUid=${payload.subidmal}`, payload.formData,
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
        throw Error(err.response? err.response.data : err.message);
      }
    },
    //submit audio/video subheading2
    async submitSub2Media({ rootGetters}, payload) {
      try {
        const response = await axios.post(`${rootGetters.getUrl}/api/mediaData/mpData2?uId=${payload.uid}&mtId=${payload.id}`, payload.formData,
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
        throw Error(err.response? err.response.data : err.message);
      }
    },
    //view topics
    async getTopics({ rootGetters, getters, commit}) {
      try {
        const response = await axios.get(`${rootGetters.getUrl}/api/DataEntry1/getMainComplete?dtId=${getters.getLanguage}`);
        if (response.status >= 200 && response.status < 300) {
          commit('setAllTopics', response.data);
          return true;
        }
      } catch (error) {
        console.error(error);
      }
    },
    //show topic with commonid
    async showDetails({ rootGetters, commit}, payload) {
      try {
        const response = await axios.get(`${rootGetters.getUrl}/api/qrcode/getScanDetails?dtId=${payload.language}&commonId=${payload.commonId}`);
        if (response.status >= 200 && response.status < 300) {
          commit('setDetails', response.data)
          console.log(response.data)
          return true;
        }
      }
      catch (err) {
        throw Error(err.response? err.response.data : err.message);
      }
    },
    //show subtopic with commonid
    async showSubDetails({ rootGetters, commit}, payload) {
      try {
        const response = await axios.get(`${rootGetters.getUrl}/api/DataEntry2/getAllByCommonId/${payload.id}?dtId=${payload.language}`);
        if (response.status >= 200 && response.status < 300) {
          commit('setFirstSubData', response.data[0])
          return true;
        }
      }
      catch (err) {
        throw Error(err.response? err.response.data : err.message);
      }
    },
    //update main topic details
    async updateTopic({ rootGetters}, payload) {
      try {
        const response = await axios.put(`${rootGetters.getUrl}/api/updateMain/stringUpdate/${payload.uId}`, payload.data,
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
        throw Error(err.response? err.response.data : err.message);       
      }
    },
    //update sub topic details
    async updateSubTopic({ rootGetters}, payload) {
      try {
        const response = await axios.put(`${rootGetters.getUrl}/api/updateFirst/updateFirstData/${payload.uId}`, payload.data,
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
        throw Error(err.response? err.response.data : err.message);       
      }
    },
    //update sub2 topic details
    async updateSub2Topic({ rootGetters}, payload) {
      try {
        const response = await axios.put(`${rootGetters.getUrl}/api/updateSecondSub/updateSecondData/${payload.uId}`, payload.data,
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
        throw Error(err.response? err.response.data : err.message);       
      }
    },
    //update main images
    async updateMainImage({ rootGetters}, payload) {
      try {
        const response = await axios.put(`${rootGetters.getUrl}/api/updateMain/updateUploadImg`, payload,
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        }
        );
        if ((response.status >= 200) || (response.status < 300)) {
          return true;
        }  
      }
      catch(err) {
        throw Error(err.response? err.response.data : err.message);
      }
    },
    //update sub images
    async updateSubImage({ rootGetters }, payload) {
      try {
        const response = await axios.put(`${rootGetters.getUrl}/api/updateFirst/updateUploadImgSubFirst`, payload,
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        }
        );
        if ((response.status >= 200) || (response.status < 300)) {
          return true;
        }  
      }
      catch(err) {
        throw Error(err.response? err.response.data : err.message);
      }
    },
    //update sub2 images
    async updateSub2Image({ rootGetters }, payload) {
      try {
        const response = await axios.put(`${rootGetters.getUrl}/api/updateSecondSub/updateUploadImg2`, payload,
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        }
        );
        if ((response.status >= 200) || (response.status < 300)) {
          return true;
        }  
      }
      catch(err) {
        throw Error(err.response? err.response.data : err.message);
      }
    },
    //update main audio/video
    async updateMedia({ rootGetters }, payload) {
      try {
        const response = await axios.put(`${rootGetters.getUrl}/api/updateMain/updateMpData`, payload,
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
        throw Error(err.response? err.response.data : err.message);
      }
    },
    //update sub audio/video
    async updateSubMedia({ rootGetters }, payload) {
      try {
        const response = await axios.put(`${rootGetters.getUrl}/api/updateFirst/updateMpData1/${payload.uId}?mtId=${payload.id}`, payload.data,
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
        throw Error(err.response? err.response.data : err.message);
      }
    },
    //update sub2 audio/video
    async updateSub2Media({ rootGetters }, payload) {
      try {
        const response = await axios.put(`${rootGetters.getUrl}/api/updateSecondSub/updateMpData2/${payload.uId}`, payload.data,
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
        throw Error(err.response? err.response.data : err.message);
      }
    },
    //delete topic with main commonid
    async deleteMain({ rootGetters}, id) {
      try {
        const success = await axios.delete(`${rootGetters.getUrl}/api/deleteMain/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        }
        )
        if ((success.status >= 200) || (success.status<300)) {
          return true;
        }
      }
      catch (err) {
        throw Error(err.response? err.response.data : err.message);
      }
    },
    //delete subtopic by commonid
    async deleteSub({ rootGetters}, id) {
      try {
        const success = await axios.delete(`${rootGetters.getUrl}/api/deleteByFirstSub/commonIdAll/${id}`,
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        }
        )
        if ((success.status >= 200) || (success.status<300)) {
          return true;
        }
      }
      catch (err) {
        throw Error(err.response? err.response.data : err.message);
      }
    },
    //delete sub2topic by commonid
  async deleteSub2({ rootGetters }, id) {
   
      try {
        const success = await axios.delete(`${rootGetters.getUrl}/api/deleteSecond/commonIdSecond/${id}`,
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        }
        )
        if ((success.status >= 200) || (success.status<300)) {
          return true;
        }
      }
      catch (err) {
        throw Error(err.response? err.response.data : err.message);
      }
    },
    //delete main image by id
    async deleteImage({ rootGetters}, payload) {
      try {
        const response = await axios.delete(`${rootGetters.getUrl}/api/deleteMain/deleteImages?commonId=${payload.commonId}&imgIds=${payload.id}`,
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        }
        );
         if ((response.status >= 200) || (response.status < 300)) {
            return true;        
          }
      }
      catch (err) {
        throw Error(err.response? err.response.data : err.message);
      }
    },
    //delete sub image by id
    async deleteSubImage({ rootGetters}, payload) {
      try {
        const response = await axios.delete(`${rootGetters.getUrl}/api/deleteMain/deleteImagesFirst?commonId=${payload.commonId}&imgIds=${payload.id}`,
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        }
        );
        if ((response.status >= 200) || (response.status < 300)) {
          return true;         
        }
      }
      catch (err) {
        throw Error(err.response? err.response.data : err.message);       
      }
    },
    // delete sub2 image by id
    async deleteSub2Image({ rootGetters}, payload) {
      try {
        const response = await axios.delete(`${rootGetters.getUrl}/api/deleteMain/deleteImagesSecond?commonId=${payload.commonId}&imgIds=${payload.id}`,
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        }    
        );
        if ((response.status >= 200) || (response.status < 300)) {
          return true;         
        }
      }
      catch (err) {
        throw Error(err.response? err.response.data : err.message);       
      }
    },
    //delete main audio
    async deleteAudio({ rootGetters}, dtId) {
      try {
        const response = await axios.delete(`${rootGetters.getUrl}/api/deleteMain/deleteMp3?dtId=${dtId}`,
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        }
        );    
        if ((response.status >= 200) || (response.status < 300)) {
          return true;
        }
      }
      catch (err) {
        throw Error(err.response? err.response.data : err.message);
      }
    },
    //delete sub audio
    async deleteSubAudio({ rootGetters}, dtId) {  
      try {
        const response = await axios.delete(`${rootGetters.getUrl}/api/deleteMain/deleteMp3First?dtId=${dtId}`,
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        }
        );   
        if ((response.status >= 200) || (response.status < 300)) {
          return true;
        }
      }
      catch (err) {
        throw Error(err.response? err.response.data : err.message);
      }
    },
    //delete sub2 audio
    async deleteSub2Audio({ rootGetters}, dtId) {
      try {
        const response = await axios.delete(`${rootGetters.getUrl}/api/deleteMain/deleteMp3Second?dtId=${dtId}`,
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        }
        );   
        if ((response.status >= 200) || (response.status < 300)) {
          return true;
        }
      }
      catch (err) {
        throw Error(err.response? err.response.data : err.message);
      }   
    },
    //delete main audio
    async deleteVideo({ rootGetters}, dtId) {
      try {
        const response = await axios.delete(`${rootGetters.getUrl}/api/deleteMain/deleteMp4?dtId=${dtId}`,
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        }
        );    
        if ((response.status >= 200) || (response.status < 300)) {
          return true;
        }
      }
      catch (err) {
        throw Error(err.response? err.response.data : err.message);
      }
    },
    //delete sub video
    async deleteSubVideo({ rootGetters}, dtId) {  
      try {
        const response = await axios.delete(`${rootGetters.getUrl}/api/deleteMain/deleteMp4First?dtId=${dtId}`,
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        }
        );   
        if ((response.status >= 200) || (response.status < 300)) {
          return true;
        }
      }
      catch (err) {
        throw Error(err.response? err.response.data : err.message);
      }
    },
    //delete sub2 audio
    async deleteSub2Video({ rootGetters}, dtId) {
      try {
        const response = await axios.delete(`${rootGetters.getUrl}/api/deleteMain/deleteMp4Second?dtId=${dtId}`,
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        }
        );   
        if ((response.status >= 200) || (response.status < 300)) {
          return true;
        }
      }
      catch (err) { 
        throw Error(err.response? err.response.data : err.message);
      }   
  },
  // upload background image
  async uploadBackgroundImage({ rootGetters,}, payload) {
    try {
      const response = await axios.post(`${rootGetters.getUrl}/api/bgData/uploadBackgroundImg?commonId=${payload.commonId}`, payload.formData,
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        });
      if ((response.status >= 200) || (response.status < 300)) { 
        return true;
      }
    }
    catch (err) {
      throw Error(err.response? err.response.data : err.message);
    }
  },
  // update background image
  async updateBackgroundImage({ rootGetters, }, payload) {
    try {
      const response = await axios.put(`${rootGetters.getUrl}/api/bgData/updateBackgroundImg/${payload.commonId}/${payload.id}`, payload.formData,
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        });
      if ((response.status >= 200) || (response.status < 300)) { 
        return true;
      }
    }
    catch (err) {
      throw Error(err.response? err.response.data : err.message);
    }
  },
  //delete background image
  async deleteBackgroundImage({ rootGetters, }, payload) {
    try {
      const response = await axios.delete(`${rootGetters.getUrl}/api/bgData/deleteBackgroundImg/${payload.commonId}/${payload.id}`,
        {
          headers: {
            Authorization: `Bearer ${rootGetters.getToken}`
          }
        });
      if ((response.status >= 200) || (response.status < 300)) { 
        return true;
      }
    }
    catch (err) {
      throw Error(err.response? err.response.data : err.message);
    }
  }
};