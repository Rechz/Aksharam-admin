import actions from "./actions.js";
import mutations from './mutations.js';
import getters from './getters.js';
export default {
    namespaced: true,
    state() {
        return {
           language: sessionStorage.getItem('language') || 1,
           languageList: JSON.parse(sessionStorage.getItem('languageList')) || [],
           fileTypes: sessionStorage.getItem('fileTypes') || [],
           mediaType: JSON.parse(sessionStorage.getItem('mediaType')) || {},
           maintopics: [],
           detailTopic: JSON.parse(sessionStorage.getItem('detailTopic')) || [],
           idmal: sessionStorage.getItem('idmal') ||'',
           ideng: sessionStorage.getItem('ideng') || '',
           commonIdMain: sessionStorage.getItem('commonIdMain') || '',
           malHeading: sessionStorage.getItem('malHeading') || '',
           engHeading: sessionStorage.getItem('engHeading') ||'',
           malSubHeading: sessionStorage.getItem('malSubHeading') ||'',
           engSubHeading: sessionStorage.getItem('engSubHeading') ||'',
           malSub2Heading: sessionStorage.getItem('malSub2Heading') ||'',
           engSub2Heading: sessionStorage.getItem('engSub2Heading') ||'',
           subidmal: sessionStorage.getItem('subidmal') ||'',
           subideng: sessionStorage.getItem('subideng') || '',
           commonIdSub: sessionStorage.getItem('commonIdSub') || '',
           sub2idmal: sessionStorage.getItem('sub2idmal') ||'',
           sub2ideng: sessionStorage.getItem('sub2ideng') || '',
           commonIdSub2: sessionStorage.getItem('commonIdSub2') || '',
           firstSubData: JSON.parse(sessionStorage.getItem('firstData')) || [],
           firstSubList: JSON.parse(sessionStorage.getItem('firstSubList')) || []
        };
    },
    actions,
    mutations,
    getters
}