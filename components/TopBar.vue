<template lang="pug">
.line
    .navigation
      .go(v-if="isLandSelected()" @click="goTo(0)" :style="[selectedLand().cover ? {backgroundImage: 'url(' + selectedLand().cover + ')'} : {backgroundImage: 'url(https://source.unsplash.com/XQ3qOs6g9EY)'}]") {{selectedLand().name}} 
      .go(v-if="isRiverSelected()" @click="goTo(1)" :style="[selectedRiver().cover ? {backgroundImage: 'url(' + selectedRiver().cover + ')'} : {backgroundImage: 'url(https://source.unsplash.com/XQ3qOs6g9EY)'}]") {{selectedRiver().name}}
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
    ...mapActions('lands', ['selectLand']),
    ...mapActions('rivers', ['selectRiver']),
    ...mapGetters('lands', ['isLandSelected', 'selectedLand']),
    ...mapGetters('rivers', ['isRiverSelected', 'selectedRiver']),
    goTo: function (where) {
      if(where == 0) this.selectLand("")
      if(where <= 1) this.selectRiver("")
    }
  },
}
</script>

<style lang="sass" scoped>
.navigation
    transition: all 0.4s ease
    display: flex
    justify-content: flex-end
    margin-right: 10px
    gap: 4px
    max-width: 500px
    .go
        transition: all 0.4s ease
        cursor: pointer
        border-radius: 1em
        padding-left: 10px
        padding-right: 10px
        background-position: center
        background-size: cover
        color: #dfdfdf
        font-size: 9pt
        &:hover
          border-radius: 0
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
    transition: all 0.4s ease
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
