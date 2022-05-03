<template>
    <button id="exit" class="button is-block is-danger" v-on:click="disconnect">
        <span class="icon is-small is-left">
            <i class="fas fa-power-off"></i>
        </span>
    </button>
</template>

<style>
#exit {
    position: absolute;
    margin: 16px;
    right: 0;
    top: 0;
}
</style>

<script>
import router from '../router';

export default {
    name: "Exit",
    data() {
        return {
            // ...
        };
    },

    methods: {
        disconnect: function() {
            if ( this.$cookies.isKey("user-cookie") ) {
                this.$cookies.remove("user-cookie");
                router.push( "/login" );
            }
        }
    }
};
</script>