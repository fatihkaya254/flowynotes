<template>
  <div>
    <div id="speedread">
      <div id="word"></div>
      <div id="controls">
        <!-- <input type="button" value="Start" /> <input type="button" value="Stop" /><br /><br />-->
        slowest
        <input type="range" min="1" max="10" step="1" id="speed" val="5" />
        fastest
      </div>
    </div>
    <div id="text"></div>
  </div>
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
      text: 'adana da bb as d  sdgfasdgfadfg sdfgsdfhs gfhdfgh sdfsdfs',
    }
  },
  methods: {
    ...mapActions('descriptions', [
      'getDescriptions',
      'changeDescription',
      'selectDescription',
      'addDescription',
      'deleteDescription',
    ]),
    ...mapActions('keywords', ['selectKeyword']),
    ...mapGetters(['userId']),
    ...mapGetters('descriptions', [
      'description',
      'isDescriptionSelected',
      'selectedDescription',
    ]),
    ...mapGetters('keywords', ['selectedKeyword']),
  },
  async mounted() {
    await this.$nextTick()

    var $word, $speed_input, speed
    const _this = this
    function go(_this) {
      $word = document.getElementById('word')
      $speed_input = document.getElementById('speed')
      speed = $speed_input.value

      $speed_input.onchange = function (ev) {
        speed = ev.target.value
      }
      var words = _this.text.split(/\s/)
      if (words.length > 0 && words[0]) {
        showWord(words, 0)
      } else {
        $word.innerHTML = '<i>No text</i>'
      }
    }

    function showWord(words, index) {
      if (words[index] !== undefined) {
        $word.innerHTML = words[index]
        setTimeout(function () {
          showWord(words, index + 1)
        }, 3000 / (speed * 2))
      }
    }

    document.addEventListener('DOMContentLoaded', function () {
      go(_this)
    })
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
  margin-top: -1em;
  text-align: center;
  font-size: 96px;
  color: #ddd;
}

#controls {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 50px;
  color: #999;
  font-family: sans-serif;
  line-height: 1em;
}

#controls input {
  vertical-align: middle;
  margin: 0 10px;
}

#text {
  margin: 20px 100px;
}
</style>
