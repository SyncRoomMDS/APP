<template>
  <div class="home">
    <NavBar />
    <Exit />
    <div class="column">
      <h1 style="color:white" class="title is-1">Bienvenue sur SyncRoom</h1>

      <div class="columns is-desktop">
        <div class="column is-half">
          <Video />
        </div>
        <div class="column is-half">
          <Chat />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Chat from "@/components/Chat.vue";
import Video from "@/components/Video.vue";
import NavBar from "@/components/NavBar.vue";
import Exit from "@/components/Exit.vue";
import router from '../router';

export default {
  name: "Home",
  components: {
    Chat,
    Video,
    NavBar,
    Exit
  },

  mounted() {
    this.checkCookie();
  },

  methods: {
    checkCookie: function() {
      let self = this;
      if ( this.$cookies.isKey("user-cookie") ) {
        this.$http.get("http://localhost:4000/users/user", {
          headers: {
            'Authorization': 'Bearer ' + this.$cookies.get("user-cookie")
          }
        })
        .then(() => {
          // ...
        }, (error) => {
          self.$cookies.remove("user-cookie");
          router.push( "/login" );
          throw error;
        });
      } else {
        router.push( "/login" );
      }
    }
  }
};
</script>