<template>
  <div class="register">
    <NavBar />
    <RegisterForm />
  </div>
</template>

<script>
// @ is an alias to /src
import RegisterForm from '@/components/RegisterForm.vue';
import NavBar from "@/components/NavBar.vue";
import router from '../router';

export default {
  name: 'Register',
  components: {
    NavBar,
    RegisterForm,
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