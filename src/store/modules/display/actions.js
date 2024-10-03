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
          // console.log('fileType',response.data)
          const fileType = {};
          response.data.forEach(item => { fileType[item.fileType.toLowerCase()] = item.id; });
          commit('setMedia', fileType);
          // console.log('media', fileType)
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
        console.error(err)
        throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
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
        console.error(err)
        throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
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
          console.error(err)
          throw Error(err.response? (err.response.data.message??err.response.data) : err.message);

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
        console.error(err)
        throw Error(err.response? (err.response.data.message??err.response.data) : err.message);

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
        console.error(err)
        throw Error(err.response? (err.response.data.message??err.response.data) : err.message);

      }
    },
    //generate commonid subheading
    async generateQRSub({ rootGetters,commit}, payload) {
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
          // console.log('common sub', getters.getCommonIdSub)
          return true;
        }
      }
      catch (err) {
        console.error(err)
        throw Error(err.response? (err.response.data.message??err.response.data) : err.message);

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
          console.error(err)
          throw Error(err.response? (err.response.data.message??err.response.data) : err.message);

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
        console.error(err)
        throw Error(err.response? (err.response.data.message??err.response.data) : err.message);

      }
    },
    //submit details subheading2
    async submitSub2Head({ rootGetters, commit}, payload) {  
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
            commit('setSub2idmal', response.data.ssUid)
            return true;
          }
          else {
            commit('setEngSub2Heading', response.data.title)
            commit('setSub2ideng', response.data.ssUid)
            return true;
          }
        }
      }
      catch (err) {
        console.error(err)
        throw Error(err.response? (err.response.data.message??err.response.data) : err.message);

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
        console.error(err)
        throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
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
        console.error(err)
        throw Error(err.response? (err.response.data.message??err.response.data) : err.message);

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
        console.error(err)
        throw Error(err.response? (err.response.data.message??err.response.data) : err.message);

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
          return true;
        }
      }
      catch (err) {
        console.error(err)
        throw Error(err.response? (err.response.data.message??err.response.data) : err.message);

      }
  },
    async showTopicDetails({ rootGetters}, payload) {
      try {
        const response = await axios.get(`${rootGetters.getUrl}/api/qrcode/getScanDetails?dtId=${payload.language}&commonId=${payload.commonId}`);
        if (response.status >= 200 && response.status < 300) {
          let filteredResponse = response.data[0].combinedDataSubList.filter(item => !item.fsCommonId);
            let topics = filteredResponse.map((topic) => {
              if (!topic.fsCommonId) {
                return {
                  title: topic.title,
                  id: topic.uId
                }
              }
            })
          // commit('setFirstSubList', topics)
          
          return topics;
        }
      }
      catch (err) {
        console.error(err)
        throw Error(err.response? (err.response.data.message??err.response.data) : err.message);

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
        console.error(err)
        throw Error(err.response? (err.response.data.message??err.response.data) : err.message);

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
        console.error(err)
        throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
   
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
        console.error(err)
        throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
      
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
        console.error(err)
        throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
       
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
      catch (err) {
        console.error(err)
        throw Error(err.response? (err.response.data.message??err.response.data) : err.message);

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
      catch (err) {
        console.error(err)
        throw Error(err.response? (err.response.data.message??err.response.data) : err.message);

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
      catch (err) {
        console.error(err)
        throw Error(err.response? (err.response.data.message??err.response.data) : err.message);

      }
    },
    //update main audio/video
    async updateMedia({ rootGetters }, payload) {
      try {
        console.log('payload',payload)
        const response = await axios.put(`${rootGetters.getUrl}/api/updateMain/updateMpData?uId=${payload.uId}&mtId=${payload.mtId}&id=${payload.id}`,payload.data,
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
        console.error(err)
        throw Error(err.response? (err.response.data.message??err.response.data) : err.message);

      }
    },
    //update sub audio/video
    async updateSubMedia({ rootGetters }, payload) {
      try {
        const response = await axios.put(`${rootGetters.getUrl}/api/updateFirst/updateMpData1/${payload.uId}?mtId=${payload.mtId}&id=${payload.id}`, payload.data,
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
        console.error(err)
        throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
      }
    },
    //update sub2 audio/video
    async updateSub2Media({ rootGetters }, payload) {
      try {
        const response = await axios.put(`${rootGetters.getUrl}/api/updateSecondSub/updateMpData2/${payload.uId}?id=${payload.id}&mtId=${payload.mtId}`, payload.data,
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
        console.error(err)
        throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
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
        console.error(err)
        throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
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
        console.error(err)
        throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
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
        console.error(err)
        throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
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
        console.error(err)
        throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
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
        console.error(err)
        throw Error(err.response? (err.response.data.message??err.response.data) : err.message);   
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
        console.error(err)
        throw Error(err.response? (err.response.data.message??err.response.data) : err.message);      
      }
    },
    //delete main audio
    async deleteAudio({ rootGetters}, payload) {
      try {
        const response = await axios.delete(`${rootGetters.getUrl}/api/deleteMain/deleteMp3?dtId=${payload.dtId}&id=${payload.id}`,
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
        console.error(err)
        throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
      }
    },
    //delete sub audio
    async deleteSubAudio({ rootGetters}, payload) {  
      try {
        const response = await axios.delete(`${rootGetters.getUrl}/api/deleteMain/deleteMp3First?dtId=${payload.dtId}&id=${payload.id}`,
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
        console.error(err)
        throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
      }
    },
    //delete sub2 audio
    async deleteSub2Audio({ rootGetters}, payload) {
      try {
        const response = await axios.delete(`${rootGetters.getUrl}/api/deleteMain/deleteMp3Second?dtId=${payload.dtId}&id=${payload.id}`,
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
        console.error(err)
        throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
      }   
    },
    //delete main video
    async deleteVideo({ rootGetters}, payload) {
      try {
        const response = await axios.delete(`${rootGetters.getUrl}/api/deleteMain/deleteMp4?dtId=${payload.dtId}&id=${payload.id}`,
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
        console.error(err)
        throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
      }
    },
    //delete sub video
    async deleteSubVideo({ rootGetters}, payload) {  
      try {
        const response = await axios.delete(`${rootGetters.getUrl}/api/deleteMain/deleteMp4First?dtId=${payload.dtId}&id=${payload.id}`,
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
        console.error(err)
        throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
      }
    },
    //delete sub2 audio
    async deleteSub2Video({ rootGetters}, payload) {
      try {
        const response = await axios.delete(`${rootGetters.getUrl}/api/deleteMain/deleteMp4Second?dtId=${payload.dtId}&id=${payload.id}`,
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
        console.error(err)
        throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
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
      console.error(err)
      throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
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
      console.error(err)
      throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
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
      console.log(err)
      throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
    }
  },
  //update main video thumbnail
  async updateMainVidThumbnail({ rootGetters, }, payload) {
    try {
      const response = await axios.put(`${rootGetters.getUrl}/api/updateMain/updateThumbnail?uId=${payload.id}&id=${payload.index}`, payload.file,
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
      console.error(err);
      throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
    }
  },
  //update sub video thumbnail
  async updateSubVidThumbnail({ rootGetters, }, payload) {
    try {
      const response = await axios.put(`${rootGetters.getUrl}/api/updateFirst/updateThumbnail?uId=${payload.id}&id=${payload.index}`, payload.file,
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
      console.error(err);
      throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
    }
  },
  //update second sub video thumbnail
  async updateSub2VidThumbnail({ rootGetters, }, payload) {
    try {
      const response = await axios.put(`${rootGetters.getUrl}/api/updateSecondSub/updateThumbnail?uId=${payload.id}&id=${payload.index}`, payload.file,
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
      console.error(err);
      throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
    }
  },
  //delete main video thumbnail
  async deleteMainVidThumbnail({ rootGetters, }, payload) {
    try {
      const response = await axios.delete(`${rootGetters.getUrl}/api/deleteMain/deleteThumbnail?commonId=${payload.commonId}&tId=${payload.id}`,
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
      console.error(err);
      throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
    }
  },
  //upload video main
  async uploadVideo({ rootGetters, }, payload) {
    try {
        const response = await axios.post(`${rootGetters.getUrl}/api/mediaData/videoUpload?commonId=${payload.id}`, payload.formData,
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
        console.error(err)
        throw Error(err.response? (err.response.data.message??err.response.data) : err.message);
      }
  }
};