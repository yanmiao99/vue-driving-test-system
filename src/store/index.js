import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import storage from "../utils/storage";

export default new Vuex.Store({
    state: {
        answerData: '' || storage.getItem('answerData'), // 用户信息
        answerList: [] || storage.getItem('answerList') // 所选择的答案
    },
    mutations: {
        saveAnswerData(state, data) {
            state.answerData = data
            storage.setItem('answerData', data)
        },
        saveAnswerList(state, res) {
            let {index, data} = res
            state.answerList[index - 1] = data.split('').sort().join('') // 排序 ( 把字符串转成数组, 排序后再转回字符串)
            console.log(state.answerList);
            storage.setItem('answerList', state.answerList)
        },
    }
})

