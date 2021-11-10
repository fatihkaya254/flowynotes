<template lang="pug">
.container
    div
      h1(class="title") flowynotes
      form  
        .login
          input(type="text" placeholder="phone" class="button--grey" v-model="username"  suggested="user-name" autocomplete="on")
          input(type="password" placeholder="password" class="button--grey"  suggested="current-password" autocomplete="on" v-model="password")
          .button--grey(style="cursor: pointer;" @click="enter()") Login
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },
  middleware: ["session-control", "homeAuth"],
  methods: {
    enter: function () {
      const _this = this
      _this.$store.dispatch('enterPass', {
        phone: _this.username,
        code: _this.password,
      })
    },
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.login {
  flex-direction: column;
  margin: 20px;
  gap: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
@keyframes appear {
  0% {
    opacity: 0;
  }
}

.title {
  animation: 1s appear;
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
