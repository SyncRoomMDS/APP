<template>
  <div class="media-player" :key="refresh">
    <vue-plyr ref="plyr">
      <div data-plyr-provider="youtube" :data-plyr-embed-id="idVideo"></div>
    </vue-plyr>
    <div id="send-ctl" class="columns is-centered">
      <div class="column is-10">
        <input class="input is-link" type="text" placeholder="Saisir une URL" v-model="urlVideo" />
      </div>
      <div class="column">
        <button class="button is-link" @click="setIdVideo">Choisir</button>
      </div>
    </div>
  </div>
</template>

<style>
#send-ctl {
  padding-top: 1vh;
}
</style>

<script>
export default {
  name: "Chat",
  data() {
    return {
      temp: false,
      urlVideo: "",
      refresh: true,
      idVideo: "bTqVqk7FSmY",
    };
  },

  created() {
    if (this.$cookies.get("idVideo")) {
      this.idVideo = this.$cookies.get("idVideo");
    }
  },

  mounted() {
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

    this.sockets.subscribe("PLAY-ALL", () => {
      this.$refs.plyr.player.play();
    });

    this.sockets.subscribe("PAUSE-ALL", (data) => {
      console.log("data", data);
      this.$refs.plyr.player.pause();
    });

    this.sockets.subscribe("UPDATE-ALL", (data) => {
      this.$refs.plyr.player.currentTime = data.time;
      this.temp = true;
    });

    this.sockets.subscribe("CHANGE-ALL", (data) => {
      this.refresh = !this.refresh;
      this.idVideo = this.youtube_parser(data.url);
      this.$cookies.set("idVideo", this.idVideo);
      location.reload();
    });

    this.$refs.plyr.player.on("playing", () => {
      this.startVideo();
    });

    this.$refs.plyr.player.on("pause", () => {
      this.pauseVideo();
    });
  },

  sockets: {
    connect() {
      // Fired when the socket connects.
      this.isConnected = true;
      console.log("Connected");
    },
  },

  methods: {
    startVideo() {
      this.$socket.emit("START_VIDEO", {
        action: "Play!",
      });
    },
    pauseVideo() {
      this.$socket.emit("PAUSE_VIDEO", {
        action: "Pause!",
      });
    },

    changeTimerVideo(timer) {
      this.$socket.emit("UPDATE_VIDEO", {
        action: "Update!",
        time: timer,
      });
    },

    setIdVideo() {
      this.$socket.emit("CHANGE_VIDEO", {
        action: "change!",
        url: this.urlVideo,
      });
      this.urlVideo = "";
    },

    youtube_parser(url) {
      var regExp =
        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      var match = url.match(regExp);
      return match && match[7].length == 11 ? match[7] : false;
    },
  },
};
</script>



