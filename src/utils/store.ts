/*
 * @Author: Coan
 * @Date: 2022-08-22 15:06:51
 * @LastEditors: Coan
 * @LastEditTime: 2022-08-23 11:36:25
 * @FilePath: /NME/src/utils/store.ts
 * @Description:
 */
import bus from '../utils/bus';
import { createStore } from 'vuex';
import _subjectList from '../json/subjectList.json';

interface SubjectList {
  id: number;
  type: string;
  describe: string;
  options: string[];
  writeAnswer: string;
  correctAnswer: string;
  resolver: string;
  iswonder: boolean;
}
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
      subjectList: [] as SubjectList[],
      typeDescribe: {},
    };
  },
  mutations: {
    _login(state, examNo) {
      state.examNo = examNo;
    },
    _wonder(state, index) {
      if (state.subjectList[index].iswonder) {
        state.wonderIndexList.splice(state.wonderIndexList.indexOf(index), 1);
        state.wonderCount--;
      } else {
        state.wonderIndexList.push(index);
        state.wonderCount++;
      }
      state.subjectList[index].iswonder = !state.subjectList[index].iswonder;
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
      clearInterval(state.timer);
      state.timer = null;
      state.restTime = 5400;
    },
    _getSubjectList(state) {
      state.typeDescribe = {
        A1: '每一道试题下面有A、B、C、D、E五个备选答案，请从中选择一个最佳答案，并用鼠标选中相应答案前的方框，以示正确答案，备选答案前的选择框中出现“√”即为选中。1',
        A2: '每一道试题下面有A、B、C、D、E五个备选答案，请从中选择一个最佳答案，并用鼠标选中相应答案前的方框，以示正确答案，备选答案前的选择框中出现“√”即为选中。2',
        A3: '每一道试题下面有A、B、C、D、E五个备选答案，请从中选择一个最佳答案，并用鼠标选中相应答案前的方框，以示正确答案，备选答案前的选择框中出现“√”即为选中。3',
      };
      state.subjectList = _subjectList;
      state.noAnswerCount = state.subjectList.length;
    },
    _answer(state, arg: { index: number; answer: string }) {
      state.subjectList[arg.index].writeAnswer = arg.answer;
    },
  },
});

export { store };
