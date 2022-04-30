import { createStore } from 'vuex'
import { io } from "socket.io-client";

export default createStore({
  state: {
    socket: io("http://localhost:8847"),
  },
  getters: {
    socket (state) {
      return state.socket
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
