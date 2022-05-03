<template>
  <section class="hero is-success is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <h3 class="title has-text-black">Identifiez-vous</h3>
                    <hr class="login-hr">
                    <p class="subtitle has-text-black">Veuillez saisir vos informations.</p>
                    <div class="box">
                        <form @submit="checkForm" action="javascript:void(0);" autocomplete="off">
                            <div class="field">
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input is-large" type="text" name="UserName" placeholder="Nom d'utilisateur" autocomplete="off" autofocus="on" v-model="username" required />
                                    <span class="icon is-small is-left">
                                      <i class="fas fa-user"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input is-large" type="password" placeholder="Mot de passe" v-model="password" required />
                                    <span class="icon is-small is-left">
                                      <i class="fas fa-lock"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                              <div class="control">
                                <button class="button is-block is-info is-large is-fullwidth">Connexion</button>
                              </div>
                            </div>
                        </form>
                    </div>
                    <p class="has-text-grey">
                        <a href="/register">Créer un compte</a> <!--&nbsp;·&nbsp;-->
                        <!--<a href="../">Mot de passe oublié ?</a> &nbsp;·&nbsp;-->
                        <!--<a href="../">Besoin d'aide ?</a>-->
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<style>
html, body {
  font-size: 14px;
  font-weight: 300;
}
.hero.is-success {
  background: #F2F6FA;
}
.hero .nav, .hero.is-success .nav {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.box {
  margin-top: 5rem;
}
input {
  text-align: center;
  font-weight: 400;
}
p {
  font-weight: 700;
}
p.subtitle {
  padding-top: 1rem;
}
.login-hr {
  border-bottom: 1px solid black;
}
.has-text-black {
  color: black;
}
.field {
  padding-bottom: 10px;
}
.fa {
  margin-left: 5px; 
}
</style>

<script>
import router from '../router';

export default {
  name: "LoginForm",
  data() {
    return {
      username: "",
      password: ""
    };
  },

  methods: {
    checkForm: function() {
      let self = this;
      this.$http.post("http://localhost:4000/users/authenticate", {
        username: self.username,
        password: self.password
      })
      .then((response) => {
        self.clearForm();
        self.saveCookie( response.data );
        router.push( "/" );
      }, (error) => {
        self.clearForm();
        throw error;
      });
    },
    clearForm: function() {
      this.username = this.password = "";
    },
    saveCookie: function( data ) {
      this.$cookies.set("user-cookie", data.token );
    }
  },
};
</script>