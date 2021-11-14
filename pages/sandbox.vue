<template lang="pug">
.background
    .shade
        TopBar
        .bigLand
            Lands(v-if="!isLandSelected()")
            Rivers(v-if="isLandSelected() && !isRiverSelected()")
            Keywords(v-if="isLandSelected() && isRiverSelected()")
            .desc
              Descriptions(v-if="isKeywordSelected()")
            SpeedRead(v-if="speedRead()")
            Quiz(v-if="test()")
</template>

<script>
import TopBar from '@/components/TopBar.vue'
import Lands from '@/components/Lands.vue'
import Rivers from '@/components/Rivers.vue'
import Keywords from '@/components/Keywords.vue'
import Descriptions from '@/components/Descriptions.vue'
import SpeedRead from '~/components/SpeedRead.vue'
import Quiz from '~/components/Quiz.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
    }
  },
  middleware: ['session-control', 'auth'],
  methods: {
    ...mapGetters('lands', ['isLandSelected', 'selectedLand']),
    ...mapGetters('rivers', ['isRiverSelected', 'selectedRiver']),
    ...mapGetters('keywords', ['isKeywordSelected', 'selectedKeyword']),
    ...mapGetters('descriptions', ['isDescriptionSelected','selectedDescription', 'speedRead', 'test']),
  },
  components: {
    TopBar,
    Lands,
    Rivers,
    Keywords,
    Descriptions,
    SpeedRead,
    Quiz,
  },
}
</script>

<style lang="sass" scoped>
.background
    height: 100vh
    width: 100vw
    background: #c7c7c7
    background-size: cover
    background-position: center
    background-image: url('https://source.unsplash.com/MgvByrhYz24')
.bigLand
    height: calc(100vh - 60px)
    transition: all 1s ease
    width:  100vw
    display: flex
    justify-content: center
    align-items: center
.leftLand
    transition: all 1s ease
    visibility: hidden
.desc
    position: absolute
    top: 10%
    z-index: 9
</style>
