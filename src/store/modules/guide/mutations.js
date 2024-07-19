export default {
  setLanguage(state, payload) {
    state.language = payload;
    sessionStorage.setItem('language', payload);
  },
  setLanguageList(state, payload) {
    state.languageList = payload;
    sessionStorage.setItem('languageList', JSON.stringify(payload));
  },
  setFileTypes(state, payload) {
    state.fileTypes = payload;
    sessionStorage.setItem('fileTypes', JSON.stringify(payload));
  },
  setMedia(state, payload) {
    state.mediaType = payload;
    sessionStorage.setItem('mediaType', JSON.stringify(payload));
  },
}