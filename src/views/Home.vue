<template>
  <div class="home">
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

export default {
  name: "Home",
  components: {
    Chat,
    Video,
  },
  mounted() {
    if (this.$cookies.get("user-cookie")) {
      // ...
    }
  },
};
</script>