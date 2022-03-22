<template>
  <div class="chat">
    <h1>Chat Room</h1>
    <ul>
      <li v-for="message in messages" :key="message">
        {{ message }}
      </li>
    </ul>
    <textarea
      name=""
      v-model="currentMessage"
      id=""
      cols="30"
      rows="2"
    ></textarea>
    <button v-on:click="sendMessage">send</button>
  </div>
</template>

<script>
import { io } from "socket.io-client";

export default {
  name: "Chat",
  data() {
    return {
      user: "",
      currentMessage: "",
      messages: [],
      socket: io("http://localhost:8847"),
    };
  },

  mounted() {
    this.socket.on("MESSAGE-ALL", (data) => {
      console.log("data", data);
      this.messages.push(data);
    });
  },

  methods: {
    sendMessage() {
      this.socket.emit("SEND_MESSAGE", {
        user: "User1",
        message: this.currentMessage,
      });
    },
  },
};
</script>



