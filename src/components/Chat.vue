<template>
  <div class="chat">
    <ul id="chat">
      <li v-bind:class="{ me: ( message.user == this.user ), you: ( message.user != this.user ) }" v-for="message in messages" :key="message">
        <div class="entete">
          <h2>{{ message.user }}</h2>
        </div>
        <div class="message">{{ message.message }}</div>
      </li>
      <!--<li class="me" v-for="message in messages" :key="message">
        <div class="entete">
          <h2>{{ this.user }}</h2>
        </div>
        <div class="message">{{ message }}</div>
      </li>-->
    </ul>
    <div id="send-ctl" class="columns is-centered">
      <div class="column is-10">
        <input class="input is-link" type="text" placeholder="Écrire un message" v-model="currentMessage" />
      </div>
      <div class="column">
        <button id="send-btn" class="button is-link" v-on:click="sendMessage">Envoyer</button>
      </div>
    </div>
  </div>
</template>

<style>
#chat {
	padding-left:0;
	margin:0;
	list-style-type:none;
	overflow-y:scroll;
	height:535px;
	border-top:2px solid #fff;
	border-bottom:2px solid #fff;
  background-color: #333;
}
#chat li {
	padding:10px 30px;
}
#chat h2 {
	display:inline-block;
	font-size:13px;
	font-weight:normal;
}
#chat .entete {
	margin-bottom:5px;
}
#chat .message {
	padding:20px;
	color:#fff;
	line-height:25px;
	max-width:90%;
	display:inline-block;
	text-align:left;
	border-radius:5px;
}
#chat .me {
	text-align: right;
}
#chat .you {
  text-align: left;
}
#chat .you .message {
	background-color:#58b666;
}
#chat .me .message {
	background-color:#6fbced;
}
#send-ctl {
  padding-top: 1vh;
}
</style>

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
    this.getUser();
    this.receiveMessage();
  },

  methods: {
    /* PROP */
    getUser: function() {
      let self = this;
      if ( this.$cookies.isKey("user-cookie") ) {
        this.$http.get("http://localhost:4000/users/user", {
          headers: {
            'Authorization': 'Bearer ' + this.$cookies.get("user-cookie")
          }
        })
        .then((response) => {
          console.log( response );
          self.user = response.data.username;
        }, (error) => {
          throw error;
        });
      }
    },

    /* EMIT */
    sendMessage() {
      this.$socket.emit("SEND_MESSAGE", {
        user: this.user,
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



