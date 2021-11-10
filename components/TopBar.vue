<template lang="pug">
.line
    .nameBox {{userName()}} {{userSurname()}} 
    img(:src="userPic()")
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  middleware: ['session-control', 'auth'],
  methods: {
    ...mapGetters(['userName', 'userSurname', 'userPic']),
  },
}
</script>

<style lang="sass" scoped>
.line
    height: 60px
    width: 100vw
    display: flex
    justify-content: center
    align-items: center
    img
        margin-left: -32px
        height: 30px
        width: 30px
        border-radius: 50%
.nameBox
    font-weight: 300
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
    display: flex
    justify-content: center
    align-items: center
    height: 30px
    padding: 15px
    border-radius: 3em
    background: #35495e
    color: white
    border: 2px solid #35495e
    padding-right: 40px
</style>
