<template>
  <section class="hero is-success is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <h3 class="title has-text-black">Inscrivez-vous</h3>
                    <hr class="login-hr">
                    <p class="subtitle has-text-black">Veuillez saisir vos informations.</p>
                    <div class="box">
                        <form @submit="checkForm" action="javascript:void(0);" autocomplete="off">
                          <div class="field">
                              <div class="control has-icons-left has-icons-right">
                                  <input class="input is-large" type="text" name="FirstName" placeholder="Prénom" autocomplete="off" autofocus="on" v-model="firstname" required />
                                  <span class="icon is-small is-left">
                                    <i class="fas fa-address-card"></i>
                                  </span>
                              </div>
                          </div>
                          <div class="field">
                              <div class="control has-icons-left has-icons-right">
                                  <input class="input is-large" type="text" name="LastName" placeholder="Nom de famille" autocomplete="off" autofocus="on" v-model="lastname" required />
                                  <span class="icon is-small is-left">
                                    <i class="fas fa-address-book"></i>
                                  </span>
                              </div>
                          </div>
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
                      <a href="/login">Se connecter</a> <!--&nbsp;·&nbsp;-->
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
      firstname: "",
      lastname: "",
      username: "",
      password: ""
    };
  },

  methods: {
    checkForm: function() {
      let self = this;
      this.$http.post("http://localhost:4000/users/register", {
        firstName: self.firstname,
        lastName: self.lastname,
        username: self.username,
        password: self.password
      })
      .then(() => {
        self.clearForm();
        router.push( "/login" );
      }, (error) => {
        self.clearForm();
        throw error;
      });
    },
    clearForm: function() {
      this.firstname = this.lastname = this.username = this.password = "";
    },
    checkHello: function() {
      //router.push( "Login" );
      //let self = this;
      if ( this.temp === 2 ) {
        /*this.$http.post("http://localhost:4000/users/authenticate", {
          username: "arelle",
          password: "patate"
        })
        .then((response) => {
          self.temp += 1;
          console.log(response);
        }, (error) => {
          console.log(error);
        });*/
      } else {
        /* this.$http.get("http://localhost:4000/users/user", {
          headers: {
            'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJpYXQiOjE2NTE1Mzc5NzQsImV4cCI6MTY1MjE0Mjc3NH0.8Pylp6asQPbFdDqRFWSeUybMq8fuaSrifyhxMm862gE'
          }
        })
        .then((response) => {
          console.log(response);
        }, (error) => {
          console.log(error);
        });*/
      }
    }
  },
};
</script>