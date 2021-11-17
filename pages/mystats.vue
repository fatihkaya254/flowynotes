<template lang="pug">
.background
    select(style="color: black;" class= "button--grey" v-model="lid") 
        option(value="") select land
        option(v-for="l in land()"  :value="l._id") {{l.name}}
    select(style="color: black;" class="button--grey" v-model="rid")
        option( value="") select river
        option(v-for="r in river()" :value="r._id") {{r.name}}
    .stats(v-if="rid != ' '")
        div(v-for="k in keyword()" )
                p {{k.name}} 
                progress(:value="results[k._id]" max="100") {{results[k._id]}}%
                span {{results[k._id]}}%
    .button--grey(style="cursor: pointer;" @click="btb()") Back To Black    
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  data() {
    return {
        results: {},
        lid: "",
        rid: "",
    }
  },
  middleware: ['session-control', 'auth'],
  methods: {
    ...mapGetters('lands', ['land', 'selectedLand']),
    ...mapGetters('rivers', ['river', 'selectedRiver']),
    ...mapMutations('rivers', ['setRivers',]),
    ...mapMutations('keywords', ['setKeywords',]),
    ...mapGetters(['userId']),
    ...mapGetters('keywords', ['keyword', 'selectedKeyword']),
    ...mapActions('lands', ['getLands']),
    ...mapActions('rivers', ['getRivers']),
    ...mapActions('keywords', ['getKeywords']),
    riverClick: async function (r) {
        await this.setKeywords({})
        await this.getKeywords(r)
        this.getStats()
    },
    landClick: async function (l) {
        await this.setRivers({})
        await this.setKeywords({})
        this.getRivers(l)
    },
    btb: function () {
      this.$router.push("/")  
    },
    getStats: function () {
        var keywordList = []
        for (const key in this.keyword()) {
            keywordList.push(key)
        }
        this.$axios.post('/getTest', {user: this.userId(), keyword: keywordList}).then(res => {
            for (const [k,v] of Object.entries(res.data)) {
                var total = 0
                v.answers.forEach(element => {
                    total += element
                });
                if (v.answers.length > 0) {
                    var average = parseInt(total/v.answers.length*100, 10)
                    this.$set(this.results, k, average)
                }
            }
        })
    }
  },
  mounted(){
      this.getLands(this.userId())
  },
  watch:{
      lid(val){
          this.landClick(val)
      },
      rid(val){
          this.riverClick(val)
      }
  }
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
    top: 20%
    left: 10%
    display: flex
    flex-direction: column
    color: white
    justify-content: center
    gap: 20px
    align-items: center
</style>