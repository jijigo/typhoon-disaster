import axios from "axios";
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        originData: [],
        cases: [],
        filterDistrict: ''
    },
    getters: {
        loadingState: state => state.loading,
        cases: state => {
            return state.originData
                // .filter(item => !item.CaseComplete)
                .filter(item => {
                    return state.filterDistrict
                        ? state.filterDistrict === item.CaseLocationDistrict
                        : item;
                })
                .map(item => {
                    return {
                        isComplete: item.CaseComplete,
                        time: item.CaseTime,
                        type: item.PName,
                        district: item.CaseLocationDistrict,
                        address: item.CaseLocationDescription,
                        description: item.CaseDescription,
                        position: {
                            lat: item.Wgs84Y,
                            lng: item.Wgs84X
                        }
                    };
                });
        }
    },
    actions: {
        getCaseList(context) {
            context.dispatch('setLoading', true);
            axios.get("https://next.json-generator.com/api/json/get/Ek86hdRMr")
                .then(res => {
                    context.commit('setOriginData', res.data);
                })
                .catch();
        },
        setFilterDistrict(context, value) {
            context.commit('setFilterDistrict', value);
        }
    },
    mutations: {
        SET_LOADING: (state, value) => {
            state.loading = value;
        },
        setOriginData: (state, value) => {
            state.originData = value;
        },
        setFilterDistrict: (state, value) => {
            state.filterDistrict = value;
        }
    }
});