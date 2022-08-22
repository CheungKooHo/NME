/*
 * @Author: Coan
 * @Date: 2022-08-22 10:14:36
 * @LastEditors: Coan
 * @LastEditTime: 2022-08-22 15:11:59
 * @FilePath: /nme/src/main.ts
 * @Description:
 */
import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { store } from './utils/store';

const app = createApp(App);
app.use(store);
app.mount('#app');
