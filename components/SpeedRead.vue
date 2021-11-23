<template>
  <div id="cover">
    <div id="speedread">
      <div id="title" @click="goBack()"></div>
      <div id="word" @click="goBack()"></div>
      <div id="dot">&#127827;</div>
      <div id="controls">
        for child of 19
        <input
          type="range"
          min="1"
          max="10"
          step="0.5"
          id="speed"
          v-model="speed"
        />
        for adult of 27
      </div>
      <div id="controls2">
        {{ wpt }}
        <input type="range" min="1" max="6" step="1" id="hm" v-model="hm" />
        {{ hm }}
      </div>
      <div id="controls3">
        font size
        <input type="range" min="9" max="36" step="1" id="hm" v-model="fs" />
        {{ fs }}
      </div>
    </div>
    <div id="text"></div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { log } from '~/api/middlewares/log'
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
      fs: 16,
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
    ]),
    ...mapActions('keywords', ['selectKeyword']),
    ...mapGetters(['userId']),
    ...mapGetters('descriptions', [
      'description',
      'isDescriptionSelected',
      'selectedDescription',
      'wordPerLine',
      'speedRead',
    ]),
    ...mapGetters('keywords', ['selectedKeyword', 'keyword']),
    goBack: async function () {
      await this.selectKeyword(this.kw)
      this.setSpeedRead(false)
    },
    readHero: function () {
      var $word, $dot, $title, $speed_input, speed, fontSize
      const _this = this
      function go(_this) {
        $word = document.getElementById('word')
        $dot = document.getElementById('dot')
        $title = document.getElementById('title')
        $speed_input = document.getElementById('speed')
        speed = $speed_input.value
        $speed_input.onchange = function (ev) {
          speed = ev.target.value
        }
        var words = []
        _this.wpt = 'word per line'
        //var words = _this.text.split(/\s/)
        for (const [k, v] of Object.entries(_this.myDesc)) {
          var sentences = v.desc.split(/\s/)
          let i = 0
          var step = parseInt(_this.hm)
          while (i < sentences.length) {
            var group = sentences.slice(i, i + step)
            i += step
            var w = ''
            for (let j = 0; j < group.length; j++) {
              w += group[j] + ' '
            }
            words.push({ keyword: v.keyword, desc: w })
          }
        }
        if (words.length > 0 && words[0]) {
          showWord(words, 0)
        } else {
          $word.innerHTML = '<i>No text</i>'
        }
      }

      function showWord(words, index) {
        if (words[index] !== undefined) {
          var v = words[index]
          var desc = v.desc
          _this.kw = v.keyword
          var title = _this.keyword()[v.keyword].name
          fontSize = _this.fs
          var margin = parseInt(fontSize, 10) + 5
          $word.style.fontSize = fontSize + 'px'
          $dot.style.marginTop = margin + 'px'
          $title.innerHTML = HTMLUtils.escape(title)
          $word.innerHTML = HTMLUtils.escape(desc)
          setTimeout(function () {
            if (!_this.speedRead()) return
            showWord(words, index + 1)
          }, 3000 / speed)
        } else {
          go(_this)
        }
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
}

#word {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  margin-top: 0;
  text-align: center;
  font-size: 24px;
  color: #ddd;
  cursor: pointer;
}

#dot {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  margin-top: 20px;
  text-align: center;
  font-size: 10px;
  color: #ddd;
  cursor: pointer;
}

#title {
  position: absolute;
  left: 0;
  right: 0;
  top: 40%;
  margin-top: -1em;
  text-align: center;
  font-size: 18pt;
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
