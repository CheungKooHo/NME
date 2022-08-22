<!--
 * @Author: Coan
 * @Date: 2022-08-22 10:14:36
 * @LastEditors: Coan
 * @LastEditTime: 2022-08-22 17:02:31
 * @FilePath: /nme/src/App.vue
 * @Description:
-->

<script setup lang="ts">
import Login from './views/login.vue';
import Confirm from './views/confirm.vue';
import Rule from './views/rule.vue';
import Exam from './views/exam.vue';
import { ref, onMounted } from 'vue';
import bus from './utils/bus';

let route = ref(4);
const router: Record<number, any> = {
  1: Login,
  2: Confirm,
  3: Rule,
  4: Exam,
};

// next
function next() {
  route.value++;
}

onMounted(() => {
  bus.on('next', next);
  bus.on('finish', () => {
    alert('计算成绩并保存,确认返回首页');
    route.value = 1;
  });
});
</script>

<template>
  <component :is="router[route]"></component>
</template>

<style scoped>
.nextbtn {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
