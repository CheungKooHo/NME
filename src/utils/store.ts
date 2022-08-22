/*
 * @Author: Coan
 * @Date: 2022-08-22 15:06:51
 * @LastEditors: Coan
 * @LastEditTime: 2022-08-22 16:58:27
 * @FilePath: /nme/src/utils/store.ts
 * @Description:
 */
import bus from '../utils/bus';
import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      examNo: '',
      noAnswerCount: 0,
      wonderCount: 0,
      wonderIndexList: [] as number[],
      beginExamTime: '',
      finishExamTime: '',
      restTime: 5400,
      timer: null as any,
    };
  },
  mutations: {
    _login(state, examNo) {
      state.examNo = examNo;
    },
    _wonder(state, wonderItem) {
      if (wonderItem.isWonder) {
        state.wonderIndexList.push(wonderItem.wonderIndex);
        state.wonderCount++;
      }
    },
    _begin(state, date) {
      state.beginExamTime = date.beginExamTime;
      state.finishExamTime = date.finishExamTime;
      state.timer = setInterval(() => {
        state.restTime--;
        if (state.restTime <= 0) {
          clearInterval(state.timer);
          bus.emit('finish');
        }
      }, 1000);
    },
    _finish(state) {
      state.timer = null;
      state.restTime = 5400;
    },
  },
});

export { store };
