<template>
  <div class="login">
    <NavBar />
    <LoginForm />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/LoginForm.vue';
import NavBar from "@/components/NavBar.vue";
import router from '../router';

export default {
  name: 'Login',
  components: {
    NavBar,
    LoginForm,
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
          router.push( "/" );
        }, (error) => {
          self.$cookies.remove("user-cookie");
          throw error;
        });
      }
    }
  }
}
</script>