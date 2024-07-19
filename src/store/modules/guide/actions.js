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
}