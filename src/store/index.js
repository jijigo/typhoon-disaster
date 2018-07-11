import axios from "axios";
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        originData: [],
        cases: [],
        filterDistrict: "所有區域",
        filterType: "所有災情",
        filterStatus: "所有狀態"
    },
    getters: {
        loadingState: state => state.loading,
        cases: state => {
            return state.originData
                // .filter(item => !item.CaseComplete)
                .filter(item => {
                    return state.filterDistrict !== "所有區域"
                        ? state.filterDistrict === item.CaseLocationDistrict
                        : item;
                })
                .filter(item => {
                    return state.filterType !== "所有災情"
                        ? state.filterType === item.PName
                        : item;
                })
                .filter(item => {
                    return state.filterStatus !== "所有狀態"
                        ? state.filterStatus === item.CaseComplete
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
        },
        setFilterType(context, value) {
            context.commit('setFilterType', value);
        },
        setFilterStatus(context, value) {
            context.commit('setFilterStatus', value);
        },
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
        },
        setFilterType: (state, value) => {
            state.filterType = value;
        },
        setFilterStatus: (state, value) => {
            state.filterStatus = value;
        }
    }
});