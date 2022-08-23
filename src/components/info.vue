<!--
 * @Author: Coan
 * @Date: 2022-08-22 14:13:15
 * @LastEditors: Coan
 * @LastEditTime: 2022-08-23 09:39:19
 * @FilePath: /NME/src/components/info.vue
 * @Description:
-->
<template>
  <div class="infoWarp">
    <div class="pic"></div>
    <div style="border-bottom: 1px solid #cecccc; padding: 5px">
      考生：{{ store.state.examNo || '体验考生' }}
    </div>
    <div style="border-bottom: 1px solid #cecccc; padding: 5px">体验试卷</div>
    <div style="padding: 5px">考试时间</div>
    <div style="padding: 5px">
      {{ store.state.beginExamTime }}-{{ store.state.finishExamTime }}
    </div>
    <div style="border-bottom: 1px solid #cecccc; padding: 5px">
      剩余时间{{ restComputed() }}
    </div>
    <div style="padding: 5px">
      未答题数：{{ store.state.noAnswerCount || 0 }}
    </div>
    <div style="border-bottom: 1px solid #cecccc; padding: 5px">
      标疑题数：{{ store.state.wonderCount || 0 }}
    </div>
    <div style="border-bottom: 1px solid #cecccc; padding: 5px">
      <button style="margin: 0 auto; display: block">刷新</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore();

function restComputed() {
  let seconds = store.state.restTime;
  let hour = Math.floor(seconds / 3600);
  seconds -= 3600 * hour;
  let min = Math.floor(seconds / 60);
  seconds -= 60 * min;
  let sec = seconds;
  return (
    (hour >= 10 ? hour : '0' + hour) +
    ':' +
    (min >= 10 ? min : '0' + min) +
    ':' +
    (sec >= 10 ? sec : '0' + sec)
  );
}
</script>

<style scoped>
.infoWarp {
  width: 180px;
  height: 100%;
  text-align: left;
  border-right: 1px solid #cecccc;
  overflow-y: auto;
}
.pic {
  width: 180px;
  height: 160px;
  border-bottom: 1px solid #cecccc;
}
</style>
