export default {
    setAllTopics(state, payload) {
        state.maintopics = payload;
    },
    setDetails(state, payload) {
        state.detailTopic = payload;
        sessionStorage.setItem('detailTopic', JSON.stringify(payload));
    },
    setIdmal(state, payload) {
        state.idmal = payload;
        sessionStorage.setItem('idmal', payload);
    },
    setIdeng(state, payload) {
        state.ideng = payload;
        sessionStorage.setItem('ideng', payload);
    },
    setMalHeading(state, payload) {
        state.malHeading = payload;
        sessionStorage.setItem('malHeading', payload);
    },
    setEngHeading(state, payload) {
        state.engHeading = payload;
        sessionStorage.setItem('engHeading', payload);
    },
    setMalSubHeading(state, payload) {
        state.malSubHeading = payload;
        sessionStorage.setItem('malSubHeading', payload);
    },
    setEngSubHeading(state, payload) {
        state.engSubHeading = payload;
        sessionStorage.setItem('engSubHeading', payload);
    },
    setMalSub2Heading(state, payload) {
        state.malSub2Heading = payload;
        sessionStorage.setItem('malSub2Heading', payload);
    },
    setEngSub2Heading(state, payload) {
        state.engSub2Heading = payload;
        sessionStorage.setItem('engSub2Heading', payload);
    },
    setSubidmal(state, payload) {
        state.subidmal = payload;
        sessionStorage.setItem('subidmal', payload);
    },
    setSubideng(state, payload) {
        state.subideng = payload;
        sessionStorage.setItem('subideng', payload);
    },
    setSub2idmal(state, payload) {
        state.sub2idmal = payload;
        sessionStorage.setItem('sub2idmal', payload);
    },
    setSub2ideng(state, payload) {
        state.sub2ideng = payload;
        sessionStorage.setItem('sub2ideng', payload);
    },
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
    setFirstSubData(state, payload) {
        state.firstSubData = payload;
        sessionStorage.setItem('firstData', JSON.stringify(payload));
    }
};