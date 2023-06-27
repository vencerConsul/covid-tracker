import { createApp } from 'vue';
import App from './App.vue';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";

window.Event = createApp(App);

const app = createApp(App);
app.config.globalProperties.moment = moment;
app.mount('#app');
