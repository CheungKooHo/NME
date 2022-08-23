<!--
 * @Author: Coan
 * @Date: 2022-08-22 10:56:41
 * @LastEditors: Coan
 * @LastEditTime: 2022-08-23 15:34:43
 * @FilePath: /NME/src/views/exam.vue
 * @Description:
-->
<template>
  <div class="mainWarp">
    <Info />
    <div class="examWarp">
      <button
        v-if="!isStart"
        @click="start"
        style="display: block; margin: 0 auto"
      >
        进入考试
      </button>
      <div v-else>
        答题试卷{{ store.state.wonderIndexList }}
        <template
          v-for="(item, index) in store.state.subjectList"
          :key="item.id"
        >
          <div class="subjectItem" v-show="index === currentIndex">
            <div class="type" style="border-bottom: 1px solid #cecccc">
              <h4 style="margin: 0">
                题型：<span style="font-size: 32px; color: red">{{
                  item.type
                }}</span>
              </h4>
              <p style="margin: 0 0 30px 0">
                &nbsp;&nbsp;&nbsp;&nbsp;{{
                  store.state.typeDescribe[item.type]
                }}
              </p>
            </div>

            <div class="main" style="height: 69vh">
              <h4 style="margin: 0">第{{ index + 1 }}题</h4>
              <h4 class="describe" style="margin: 0">
                {{ item.describe }}
              </h4>
              <div class="options" style="margin: 0">
                <div
                  class="optionItem"
                  v-for="(option, optionIndex) in item.options"
                  style="margin: 10px"
                >
                  <input
                    type="radio"
                    :name="item.id"
                    value="option"
                    @change="
                      (e) => {
                        answer(e, optionIndex, index);
                      }
                    "
                  />
                  {{ option }}
                </div>
              </div>
            </div>
          </div>
        </template>
        <div
          class="btnList"
          style="
            border-top: 1px solid #cecccc;
            border-bottom: 1px solid #cecccc;
          "
        >
          <button @click="wonder(currentIndex)">标疑</button>
          <button>转到未答题</button>
          <button
            @click="
              currentIndex = store.state.wonderIndexList[0] ?? currentIndex
            "
          >
            转到标疑题
          </button>
          <button @click="currentIndex--">上一题</button>
          <button @click="currentIndex++">下一题</button>
          <button @click="finish">结束考试</button>
        </div>
        <div class="subjectList">
          <p class="label" style="margin: 0">
            颜色说明：<span style="background-color: yellow">黄色</span
            >表示标疑试题，<span style="background-color: red">红色</span
            >表示未做答试题，<span style="background-color: gray">灰色</span
            >表示已做答试题。点击题号数字即可跳转至该题。
          </p>
          <div class="selector">
            <div class="leftScroll">&lang;</div>
            <div class="selectMain">
              <div>
                <div class="topUl" style="display: flex">
                  <div
                    class="li"
                    v-for="(item, index) in store.state.subjectList"
                    :style="[
                      { margin: '0 1px' },
                      {
                        backgroundColor: store.state.subjectList[index].iswonder
                          ? 'yellow'
                          : store.state.subjectList[index].writeAnswer
                          ? 'gray'
                          : 'red',
                      },
                      { flex: 1 },
                      { textAlign: 'center' },
                      { height: '30px' },
                      { lineHeight: '30px' },
                      {
                        color: currentIndex === index ? '#FFFFFF' : '#000000',
                      },
                    ]"
                    @click="currentIndex = index"
                  >
                    {{ index + 1 }}
                  </div>
                </div>
                <div class="bottomUl" style="display: flex">
                  <div
                    class="li"
                    v-for="item in 25"
                    style="
                      margin: 1px;
                      background-color: gray;
                      flex: 1;
                      text-align: center;
                      height: 30px;
                      line-height: 30px;
                    "
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
              <div></div>
              <div></div>
            </div>
            <div class="rightScroll">&rang;</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Info from '../components/info.vue';
import { ref } from 'vue';
import bus from '../utils/bus';
import { useStore } from 'vuex';
const store = useStore();

let isStart = ref(false);
function start() {
  store.commit('_getSubjectList');
  // alert('注意：考试已经开始！');
  let timestamp = new Date().getTime(); //当前的时间戳
  let beginExamTime = timeComputed(timestamp);
  timestamp = timestamp + 1.5 * 60 * 60 * 1000;
  let finishExamTime = timeComputed(timestamp);
  store.commit('_begin', {
    beginExamTime: beginExamTime,
    finishExamTime: finishExamTime,
  });
  isStart.value = true;
}
function finish() {
  bus.emit('finish');
}

let currentIndex = ref(0);

function wonder(index: number) {
  store.commit('_wonder', index);
}

function answer(e: any, optionIndex: number, index: number) {
  let arg = {
    index: index,
    answer: store.state.subjectList[index].options[optionIndex].slice(0, 1),
  };
  store.commit('_answer', arg);
}

function timeComputed(time: number) {
  let date = new Date(time);
  let Y = date.getFullYear() + '-';
  let M =
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) + '-';
  let D = date.getDate() + ' ';
  let h =
    (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  let m =
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
    ':';
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  return Y + M + D + h + m + s;
}
</script>

<style scoped>
.examWarp {
  flex: 1;
  text-align: center;
  text-align: left;
  padding: 10px;
}

.btnList {
  display: flex;
  justify-content: space-around;
  padding: 5px;
}

.selector {
  width: 100%;
  height: 62px;
  display: flex;
}
.leftScroll,
.rightScroll {
  width: 20px;
  height: 100%;
  line-height: 350%;
  background-color: gray;
  text-align: center;
}
.selectMain {
  margin: 0 1px;
  flex: 1;
}
</style>
