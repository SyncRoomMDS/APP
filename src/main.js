import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VuePlyr from 'vue-plyr';
import 'vue-plyr/dist/vue-plyr.css';
import VueCookies from 'vue-cookies';
import VueSocketIO from 'vue-3-socket.io';
import axios from 'axios';
import VueAxios from 'vue-axios';


createApp(App).use(VuePlyr, {
  plyr: {
    autoplay: true,
  }
}).use(store).use(router).use(VueCookies).use(new VueSocketIO({
  debug: true,
  connection: 'localhost:3000/'
  //connection: 'https://syncroom-socket1.herokuapp.com/'
})).use(VueAxios, axios).mount('#app');