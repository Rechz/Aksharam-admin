import actions from "./actions.js";
import mutations from './mutations.js';
import getters from './getters.js';
export default {
    namespaced: true,
    state() {
      return {
        mainTopicsGuide: [],
        guideTopic: JSON.parse(sessionStorage.getItem('guideTopic')) || [],
        detailTopic: JSON.parse(sessionStorage.getItem('detailTopicGuide')) || [],
        idmal: sessionStorage.getItem('idmalGuide') ||'',
        ideng: sessionStorage.getItem('idengGuide') || '',
        commonIdMain: sessionStorage.getItem('commonIdMainGuide') || '',
        malHeading: sessionStorage.getItem('malHeadingGuide') || '',
        engHeading: sessionStorage.getItem('engHeadingGuide') ||'',
        malParaHeading: sessionStorage.getItem('malParaHeading') ||'',
        engParaHeading: sessionStorage.getItem('engParaHeading') ||'',
        paraidmal: sessionStorage.getItem('paraidmal') ||'',
        paraideng: sessionStorage.getItem('paraideng') || '',
        commonIdPara: sessionStorage.getItem('commonIdPara') || '',
        UserDetails: sessionStorage.getItem('UserDetails') || ''
      }
    },
    actions,
    mutations,
    getters
}