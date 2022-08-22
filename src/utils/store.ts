/*
 * @Author: Coan
 * @Date: 2022-08-22 15:06:51
 * @LastEditors: Coan
 * @LastEditTime: 2022-08-22 21:27:52
 * @FilePath: \NME\src\utils\store.ts
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
      subjectList: [] as object,
      typeDescribe: {},
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
      state.subjectList = [
        {
          id: 1,
          type: 'A1',
          describe: '目前谈到的医学模式转变是指',
          options: [
            'A.深入访谈法',
            'B.深入访谈法',
            'C.深入访谈法',
            'D.深入访谈法',
            'E.深入访谈法',
          ],
          answer: 'B',
          resolver: '目前谈到的医学模式转变是指B.深入访谈法',
        },
        {
          id: 2,
          type: 'A2',
          describe: '目前谈到的医学模式转变是指',
          options: [
            'A.深入访谈法',
            'B.深入访谈法',
            'C.深入访谈法',
            'D.深入访谈法',
            'E.深入访谈法',
          ],
          answer: 'A',
          resolver: '目前谈到的医学模式转变是指A.深入访谈法',
        },
        {
          id: 3,
          type: 'A3',
          describe: '目前谈到的医学模式转变是指',
          options: [
            'A.深入访谈法',
            'B.深入法',
            'C.深入访谈法',
            'D.深入访谈法',
            'E.深入访谈法',
          ],
          answer: 'B',
          resolver: '目前谈到的医学模式转变是指B.深入访谈法',
        },
        {
          id: 4,
          type: 'A2',
          describe: '目前谈到的医学指',
          options: [
            'A.深入访谈法',
            'B.深入访谈法',
            'C.深入访谈法',
            'D.深入访谈法',
            'E.深入访谈法',
          ],
          answer: 'A',
          resolver: '目前谈到的医学模式转变是指A.深入访谈法',
        },
      ];
    },
  },
});

export { store };
