<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <!--<router-link to="/about">About</router-link> |-->
    <router-link to="/login">Login</router-link> |
    <router-link to="/register">Register</router-link>
  </div>
  <router-view/>
</template>

<style>

html, body {
  background-color: #2D4199;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #dae1f7;
  height: 100%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #dae3ec;
}

#nav a.router-link-exact-active {
  color: #dbbd58;
}
</style>
