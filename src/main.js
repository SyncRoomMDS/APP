import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'
import VueCookies from 'vue-cookies'

createApp(App).use(VuePlyr, {
    plyr: {
      autoplay:true,
    }
  }).use(store).use(router).use(VueCookies).mount('#app')
