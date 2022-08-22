<!--
 * @Author: Coan
 * @Date: 2022-08-22 14:09:14
 * @LastEditors: Coan
 * @LastEditTime: 2022-08-22 14:37:11
 * @FilePath: /nme/src/views/confirm.vue
 * @Description:
-->
<template>
  <div class="mainWarp">
    <Info />
    <div class="confirmWarp">
      <div>信息确认</div>
      <button @click="next">确认</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Info from '../components/info.vue';
import bus from '../utils/bus';

function next() {
  bus.emit('next');
}
</script>

<style scoped>
.confirmWarp {
  flex: 1;
  text-align: center;
}
</style>
