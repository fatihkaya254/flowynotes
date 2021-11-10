<template lang="pug">
.background
    .shade
        TopBar
</template>

<script>
import TopBar from '@/components/TopBar.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
    }
  },
  middleware: ['session-control', 'auth'],
  methods: {
    ...mapGetters(['userName']),
  },
  components: {
    TopBar,
  },
}
</script>

<style lang="sass" scoped>
.background
    height: 100vh
    width: 100vw
    background: #dfdfdf
    background-size: cover
    background-position: center
</style>
