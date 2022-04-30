<template>
  <div class="home">
    <Video />
    <Chat />
  </div>
</template>

<script>
// @ is an alias to /src
import Chat from '@/components/Chat.vue'
import Video from '@/components/Video.vue'

export default {
  name: 'Home',
  components: {
    Chat,
    Video
  }
}
</script>
