<template>
  <div :key="refresh" class="chat">
    <h1>Chat Room</h1>

    <h2>URL Vidéo :</h2>
    <input type="text" v-model="urlVideo" />
    <button @click="setIdVideo">Change</button>

    <vue-plyr ref="plyr">
      <div data-plyr-provider="youtube" :data-plyr-embed-id="idVideo"></div> 
    </vue-plyr>

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
      temp: false,
      oldTime: 0,
      urlVideo:"",
      idVideo:"bTqVqk7FSmY",
      refresh : true,
    };
  },

  mounted() {
    this.receiveMessage();

    this.$refs.plyr.player.on("ready", () => {
      this.changeTimerVideo(this.$refs.plyr.player.currentTime);
    });

    this.$refs.plyr.player.on("seeked", () => {
      if (this.temp == false) {
        this.changeTimerVideo(this.$refs.plyr.player.currentTime);
      } else {
        this.temp = false;
      }
    });

    this.socket.on("PLAY-ALL", () => {
      this.$refs.plyr.player.play();
    });

    this.socket.on("PAUSE-ALL", (data) => {
      console.log("data", data);
      this.$refs.plyr.player.pause();
    });

    this.socket.on("UPDATE-ALL", (data) => {
      this.$refs.plyr.player.currentTime = data.time;
      this.temp = true;
    });

     this.socket.on("CHANGE-ALL", (data) => {
      this.refresh = !this.refresh;
      this.idVideo = this.youtube_parser(data.url);
      console.log(this.$refs);
    });


    this.$refs.plyr.player.on("playing", () => {
      this.startVideo();
    });

    this.$refs.plyr.player.on("pause", () => {
      this.pauseVideo();
    });

   
  },

  methods: {
    /* EMIT */
    sendMessage() {
      this.socket.emit("SEND_MESSAGE", {
        user: "User1",
        message: this.currentMessage,
      });
      this.currentMessage = "";
    },
    startVideo() {
      this.socket.emit("START_VIDEO", {
        action: "Play!",
      });
    },
    pauseVideo() {
      this.socket.emit("PAUSE_VIDEO", {
        action: "Pause!",
      });
    },

    changeTimerVideo(timer) {
      this.socket.emit("UPDATE_VIDEO", {
        action: "Update!",
        time: timer,
      });
    },

    /* RECEIVE */
    receiveMessage() {
      this.socket.on("MESSAGE-ALL", (data) => {
        this.messages.push(data);
      });
    },

    setIdVideo(){
      this.socket.emit("CHANGE_VIDEO", {
        action: "change!",
        url: this.urlVideo,
      });
      this.urlVideo = "";
    },

    youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
    },

    
  },
};
</script>



