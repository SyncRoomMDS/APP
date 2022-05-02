<template>
  <div class="chat">
    <ul>
      <li v-for="message in messages" :key="message">
        {{ message }}
      </li>
    </ul>
    <textarea
      name=""
      v-model="currentMessage"
      cols="30"
      rows="2"
    ></textarea>
    <button v-on:click="sendMessage">send</button>
  </div>
</template>

<script>
export default {
  name: "Chat",
  data() {
    return {
      user: "",
      currentMessage: "",
      messages: [],
    };
  },

  mounted() {
    this.receiveMessage();
  },

  methods: {
    /* EMIT */
    sendMessage() {
      this.$socket.emit("SEND_MESSAGE", {
        user: "User1",
        message: this.currentMessage,
      });
      this.currentMessage = "";
    },

    /* RECEIVE */
    receiveMessage() {
      this.sockets.subscribe("MESSAGE-ALL", (data) => {
        this.messages.push(data);
      });
    },

    
  },
};
</script>



