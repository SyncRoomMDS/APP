<template>
    <img class="logo" src="<%= BASE_URL %>../../Mirror Logo.svg" />
    <div class="topnav"></div>
</template>

<style>
.logo {
    position: absolute;
    aspect-ratio: auto;
    z-index: 10;
    height: 35px;
    margin: 16px;
    left: 0;
    top: 0;
}
.topnav {
    position: absolute;
    overflow: hidden;
    background-color: #333;
    height: 70px;
    width: 100%;
    left: 0;
    top: 0;
}
</style>

<script>
export default {
    name: "NavBar",
    data() {
        return {
            // ...
        };
    }
};
</script>