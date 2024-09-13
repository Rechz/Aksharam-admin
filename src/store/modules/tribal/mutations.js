export default {
    setMainTopicsTribal(state, payload) {
        state.mainTopicsTribal = payload;
        // sessionStorage.setItem('mainTopicsTribal', JSON.stringify(payload))
    },
    setTribalTopic(state, payload) {
        state.tribalTopic = payload;
        sessionStorage.setItem('tribalTopic', JSON.stringify(payload))
    },
    setMalHeading(state,payload){
        state.malHeading = payload;
        sessionStorage.setItem('malHeadingTribal', payload);
    },
    setEngHeading(state, payload){
        state.engHeading = payload;
        sessionStorage.setItem('engHeadingTribal', payload);
    },
    setIdmal(state, payload){
        state.idmal = payload;
        sessionStorage.setItem('idmalTribal', payload);
    },
    setIdeng(state, payload){
        state.ideng = payload;
        sessionStorage.setItem('idengTribal', payload);
    },
    setCommonId(state, payload) {
        state.commonId = payload;
        sessionStorage.setItem('commonIdTribal', payload);
    },
}