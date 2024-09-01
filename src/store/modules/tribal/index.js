import actions from "./actions.js";
import mutations from './mutations.js';
import getters from './getters.js';
export default {
    namespaced: true,
    state() {
        return {
            mainTopicsTribal: [],
            tribalTopic: JSON.parse(sessionStorage.getItem('tribalTopic')) || [],
            idmal: sessionStorage.getItem('idmalTribal') ||'',
            ideng: sessionStorage.getItem('idengTribal') || '',
            malHeading: sessionStorage.getItem('malHeadingTribal') || '',
            engHeading: sessionStorage.getItem('engHeadingTribal') ||'',
            commonId: sessionStorage.getItem('commonIdTribal') || '',
        }
    },
    actions,
    mutations,
    getters
}