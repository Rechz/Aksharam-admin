export default {
  setMalHeading(state,payload){
    state.malHeading = payload;
    sessionStorage.setItem('malHeadingGuide', payload);
  },
  setEngHeading(state, payload){
    state.engHeading = payload;
    sessionStorage.setItem('engHeadingGuide', payload);
  },
  setIdmal(state, payload){
    state.idmal = payload;
    sessionStorage.setItem('idmalGuide', payload);
  },
  setIdeng(state, payload){
    state.ideng = payload;
    sessionStorage.setItem('idengGuide', payload);
  },
  setMalParaHeading(state, payload) {
    state.malParaHeading = payload;
    sessionStorage.setItem('malParaHeading', payload);
  },
  setEngParaHeading(state, payload) {
    state.engParaHeading = payload;
    sessionStorage.setItem('engParaHeading', payload);
  },
  setParaidmal(state, payload) {
    state.paraidmal = payload;
    sessionStorage.setItem('paraidmal', payload);
  },
  setParaideng(state, payload) {
    state.paraideng = payload;
    sessionStorage.setItem('paraideng', payload);
  },
  setCommonIdMain(state, payload) {
    state.commonIdMain = payload;
    sessionStorage.setItem('commonIdMainGuide', payload);
  },
  setCommonIdPara(state, payload) {
    state.commonIdPara = payload;
    sessionStorage.setItem('commonIdPara', payload);
  },
}