<!--
 * @Author: Coan
 * @Date: 2022-08-22 10:24:52
 * @LastEditors: Coan
 * @LastEditTime: 2022-08-22 15:22:18
 * @FilePath: /nme/src/views/login.vue
 * @Description:
-->
<template>
  <div class="loginWarp">
    <div class="loginform">
      <div class="formItem">
        <p class="label">准考证号</p>
        <input type="text" v-model="examNo" />
      </div>
      <div class="formItem">
        <p class="label">确认准考证号</p>
        <input type="text" v-model="examNo" />
      </div>
      <div class="formItem">
        <p class="label">有效证件号</p>
        <input type="text" v-model="examNo" />
      </div>
      <div class="btns">
        <button class="btn" @click="login">进入</button>
        <button class="btn">退出</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import bus from '../utils/bus';
import { ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore();

let examNo = ref('test123');

function login() {
  store.commit('_login', examNo);
  next();
}
function next() {
  bus.emit('next');
}
</script>

<style scoped>
.loginWarp {
  background-image: url('../../public/login_NMEC.png');
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 10%;
  background-color: #ccc;
  max-width: 1028px;
  max-height: 803px;
  margin: 0 auto;
  position: relative;
  text-align: left;
}
.loginform {
  width: 220px;
  height: 240px;
  position: absolute;
  right: 130px;
  top: 260px;
}
.formItem {
  height: 60px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1px 0;
}
.label {
  font-family: 'Times New Roman';
  font-size: 15px;
  color: #07204a;
  height: 16px;
  line-height: 16px;
  margin: 0;
  font-weight: 500;
}
input {
  height: 16px;
  line-height: 16px;
  background-color: #f4f4f4;
  border: 1px solid #bebebe;
  padding: 1px 2px;
}
</style>
