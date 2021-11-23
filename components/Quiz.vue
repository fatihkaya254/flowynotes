<template lang="pug">
#cover
  #speedread
    #title(@click="goBack()") This is title
    #word
        .option(v-for="n,k in 8" :id="k" :ref="k + 'opt'"  @click="choice(k)")
    #desc
        .option(ref="desc")
    #controls
        | hurry up
        input(
          type="range"
          min="300"
          max="3000"
          step="100"
          id="await"
          v-model="wait"
        )
        | slowdown
  #text
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  head: {
    script: [
      {
        src: 'https://code.jquery.com/jquery-3.5.1.min.js',
      },
    ],
  },
  data() {
    return {
      wpt: 'word per line',
      myDesc: {},
      speed: 5,
      kw: '',
      wait: 300,
      fs: 24,
      waiting: false,
      options: { 0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '' },
      correctAnswer: '',
    }
  },
  methods: {
    ...mapActions('descriptions', [
      'getDescriptions',
      'changeDescription',
      'selectDescription',
      'addDescription',
      'deleteDescription',
      'setWordPerLine',
      'setSpeedRead',
      'setTest',
    ]),
    ...mapActions('keywords', ['selectKeyword', 'keyword']),
    ...mapGetters(['userId']),
    ...mapGetters('descriptions', [
      'description',
      'isDescriptionSelected',
      'selectedDescription',
      'wordPerLine',
    ]),
    ...mapGetters('keywords', ['selectedKeyword', 'keyword']),
    goBack: async function () {
      await this.selectKeyword(this.correctAnswer)
      this.setTest(false)
    },
    sendAnswer: async function (keyword, boolean) {
      this.$axios
        .post('/newTest', { keyword, boolean, user: this.userId() })
        .then((res) => {
          console.log(res.status)
        })
    },
    choice: function (k) {
      if (this.waiting) return
      var keyword = this.options[k]
      this.$refs['desc'].innerHTML =
        this.keyword()[keyword].name + ': ' + this.keyword()[keyword].desc
      this.waiting = true
      if (this.correctAnswer == keyword) {
        this.$refs[k + 'opt'][0].style.backgroundColor = 'green'
        this.sendAnswer(keyword, 1)
        setTimeout(() => {
          this.readHero()
          this.$refs[k + 'opt'][0].style.backgroundColor = ''
          this.$refs['desc'].innerHTML = ''
          this.waiting = false
        }, this.wait)
      } else {
        this.sendAnswer(keyword, 0)
        this.$refs[k + 'opt'][0].style.backgroundColor = 'red'
        setTimeout(() => {
          this.readHero()
          this.$refs[k + 'opt'][0].style.backgroundColor = ''
          this.$refs['desc'].innerHTML = ''
          this.waiting = false
        }, this.wait)
      }
    },
    readHero: function () {
      var $word, $title, fontSize
      const _this = this
      function go(_this) {
        $word = document.getElementById('word')
        $title = document.getElementById('title')
        var keysAll = []
        var keys = []
        var totalKeys = 0
        var keywords = _this.keyword()
        for (const [k, v] of Object.entries(keywords)) {
          keysAll.push(v)
          totalKeys++
        }
        const tk = totalKeys
        while (keys.length != tk && keys.length != 8 && totalKeys > 0) {
          let rand = Math.floor(Math.random() * totalKeys)
          keys.push(keysAll[rand])
          keysAll.splice(rand, 1)
          totalKeys--
        }
        let rand = Math.floor(Math.random() * keys.length)
        _this.correctAnswer = keys[rand]._id
        var x = 0
        let array = [...$word.children]
        array.forEach((e) => {
          e.innerHTML = HTMLUtils.escape(keys[x].name)
          _this.options[x] = keys[x]._id
          x++
        })
        var descs = []
        for (const [k, v] of Object.entries(_this.myDesc)) {
          if (v.keyword == _this.correctAnswer) descs.push(v)
        }
        rand = Math.floor(Math.random() * descs.length)
        $title.innerHTML = HTMLUtils.escape(descs[rand].desc)
      }
      var HTMLUtils = new (function () {
        var rules = [
          { expression: /&/g, replacement: '&amp;' }, // keep this rule at first position
          { expression: /</g, replacement: '&lt;' },
          { expression: />/g, replacement: '&gt;' },
          { expression: /"/g, replacement: '&quot;' },
          { expression: /'/g, replacement: '&#039;' }, // or  &#39;  or  &#0039;
          // &apos;  is not supported by IE8
          // &apos;  is not defined in HTML 4
        ]
        this.escape = function (html) {
          var result = html
          for (var i = 0; i < rules.length; ++i) {
            var rule = rules[i]
            result = result.replace(rule.expression, rule.replacement)
          }
          return result
        }
      })()
      go(_this)
    },
  },
  async mounted() {
    for (const [k, v] of Object.entries(this.keyword())) {
      await this.getDescriptions(k)
      for (const [k, v] of Object.entries(this.description())) {
        this.$set(this.myDesc, k, v)
      }
    }
    await this.$nextTick()
    this.readHero()
  },
  computed: {
    hm: {
      get() {
        return this.wordPerLine()
      },
      set(value) {
        this.setWordPerLine(value)
        this.wpt = 'next tour awaited'
      },
    },
  },
}
</script>

<style scoped>
#speedread {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 9999;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently*/
}

#word {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  margin-top: 0;
  text-align: center;
  font-size: 16px;
  margin: auto;
  max-width: 600px;
  color: #ddd;
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  flex: auto;
}

#desc {
  position: absolute;
  left: 0;
  right: 0;
  top: 10%;
  margin-top: 0;
  text-align: center;
  font-size: 16px;
  color: #ddd;
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  flex: auto;
  margin: auto;
  max-width: 600px;
}
.option {
  background: rgba(255, 248, 220, 0.145);
  padding: 5px 10px;
  border-radius: 1em;
  cursor: pointer;
}
.option:hover {
  background: rgba(255, 248, 220, 0.33);
}
#title {
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 25%;
  max-width: 600px;
  margin-top: -1em;
  text-align: center;
  font-size: 12pt;
  color: #ddd;
  cursor: pointer;
}
#controls {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 30px;
  color: #999;
  font-family: sans-serif;
  font-size: 12pt;
  line-height: 1em;
  display: flex;
  justify-content: space-evenly;
}
#controls3 {
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 60px;
  color: #999;
  font-family: sans-serif;
  font-size: 12pt;
  line-height: 1em;
}
#controls2 {
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 90px;
  color: #999;
  font-family: sans-serif;
  font-size: 12pt;
  line-height: 1em;
}
#controls input {
  vertical-align: middle;
  margin: 0 10px;
}
#controls2 input {
  vertical-align: middle;
  margin: 0 10px;
}
#controls3 input {
  vertical-align: middle;
  margin: 0 10px;
}
</style>
