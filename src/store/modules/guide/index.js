import actions from "./actions.js";
import mutations from './mutations.js';
import getters from './getters.js';
export default {
    namespaced: true,
    state() {
      return {
        language: sessionStorage.getItem('language') || 2,
        languageList: JSON.parse(sessionStorage.getItem('languageList')) || [],
        fileTypes: sessionStorage.getItem('fileTypes') || [],
        mediaType: JSON.parse(sessionStorage.getItem('mediaType')) || {},
      }
    },
    actions,
    mutations,
    getters
}