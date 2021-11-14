<template lang="pug">
div
  .line(ref="main" @click="limit=false")
    .flip(v-for="keyword in keyword()" ref="box" v-show="id == keyword._id || id == ''")
      .front(:style="{background: 'none'}" ) 
        h1(class="text-shadow" @click="select(keyword._id)") {{keyword.name}}
  .form
    input(type="text" v-model="title" placeholder="title" class="new--title" )
    input(type="text" v-model="desc" placeholder="main description" class="new--desc"  )
    .group  
      .button--grey(v-if="!selectedKeyword()" style="cursor: pointer;" @click="add()") New
      .button--grey(v-if="!selectedKeyword()" style="cursor: pointer;" @click="list()") List
      .button--grey(v-if="!selectedKeyword()" style="cursor: pointer;" @click="mix()") Mix
      .button--grey(v-if="!selectedKeyword()" style="cursor: pointer;" @click="tour()") Tour
      .button--grey(v-if="!selectedKeyword()" style="cursor: pointer;" @click="quiz()") Quiz
      .button--grey(v-if="selectedKeyword()" style="cursor: pointer;" @click="changeL()") Edit
      .button--grey(v-if="selectedKeyword()" style="cursor: pointer;" @click="cancel()") Cancel
  .limit(v-show="limit") Limit is up to 30 keywords
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      title: '',
      desc: '',
      id: '',
      change: false,
      limit: false,
    }
  },
  methods: {
    ...mapActions('keywords', [
      'getKeywords',
      'changeKeyword',
      'selectKeyword',
      'addKeyword',
      'deleteKeyword',
    ]),
    ...mapActions('descriptions', ['setSpeedRead', 'setTest', 'setWordPerLine']),
    ...mapGetters(['userId']),
    ...mapGetters('descriptions', ['wordPerLine']),
    ...mapGetters('keywords', [
      'keyword',
      'isKeywordSelected',
      'selectedKeyword',
    ]),
    ...mapGetters('rivers', ['selectedRiver']),
    select: async function (keyword) {
      await this.selectKeyword('')
      this.selectKeyword(keyword)
      this.edit(keyword)
    },
    cancel: function () {
      this.selectKeyword('')
      this.title = ''
      this.desc = ''
      this.change = false
    },
    quiz: function () {
      this.setTest(true)
    },

    tour: function () {
      let wpl = prompt('Set Word Per Line:', this.wordPerLine())
      if (isNaN(wpl)) {
        alert('Not a Number!')
        return this.tour()
      }
      this.setWordPerLine(wpl)
      this.setSpeedRead(true)
    },
    add: function () {
      if (this.$refs.box != undefined && this.$refs.box.length >= 30) {
        this.limit = true
        return
      }
      if (this.title == '') return alert('Empty Title')
      if (this.desc == '') return alert('Empty Description')
      const keyword = {
        name: this.title,
        desc: this.desc,
        creator: this.userId(),
        river: this.selectedRiver()._id,
      }
      this.addKeyword(keyword)
      this.mix()
      this.desc = ''
      this.title = ''
    },
    changeL: function () {
      if (this.title == '') {
        this.deleteKeyword(this.selectedKeyword()._id, this.userId())
        this.selectKeyword('')
        this.change = false
        this.id = ''
        this.desc = ''
        this.title = ''
        return
      }
      const changes = {
        value: this.title,
        where: 'name',
        id: this.selectedKeyword()._id,
      }
      this.changeKeyword(changes)
      const changes2 = {
        value: this.desc,
        where: 'desc',
        id: this.selectedKeyword()._id,
      }
      this.changeKeyword(changes2)
      this.selectKeyword('')
      this.change = false
      this.id = ''
      this.desc = ''
      this.title = ''
    },
    edit: function (id) {
      const keyword = this.keyword()[id]
      this.title = keyword.name
      this.desc = keyword.desc
      this.change = true
    },
    list: function () {
      if (
        ((this.$refs.main.clientWidth - 70) / 150) *
          ((this.$refs.main.clientHeight - 70) / 100) <
        31
      ) {
        let coordinates = []
        var vertical = 30
        for (let x = 1; x < (this.$refs.main.clientWidth - 10) / 50; x++) {
          vertical += 30
          for (let y = 1; y < (this.$refs.main.clientHeight - 20) / 50; y++) {
            coordinates.push([x * 60, (y * 60 + vertical)])
          }
        }
        for (let index = 0; index < this.$refs.box.length; index++) {
          const box = this.$refs.box[index]
          const rand = this.$refs.box.indexOf(box)
          const coor = coordinates[rand]
          box.style.left = coor[0] + 'px'
          box.style.top = coor[1] + 'px'
          box.style.fontSize = '12pt'
        }
        return
      }
      let coordinates = []
      for (let x = 0; x < (this.$refs.main.clientWidth - 70) / 150; x++) {
        for (let y = 0; y < (this.$refs.main.clientHeight - 70) / 100; y++) {
          coordinates.push([(x + 1) * 150, (y + 1) * 100])
        }
      }
      for (let index = 0; index < this.$refs.box.length; index++) {
        const box = this.$refs.box[index]
        const rand = this.$refs.box.indexOf(box)
        const coor = coordinates[rand]
        box.style.left = coor[0] + 'px'
        box.style.top = coor[1] + 'px'
        box.style.fontSize = '14pt'
      }
    },
    mix: async function () {
      await this.$nextTick()
      if (this.$refs.box == undefined) {
        return 0
      }
      if (this.$refs.main.clientWidth < 980) {
        let coordinates = []
        for (let x = 1; x < this.$refs.main.clientWidth / 50; x++) {
          for (let y = 1; y < this.$refs.main.clientHeight / 50; y++) {
            coordinates.push([x * 60 - 30, y * 60])
          }
        }
        var set = []
        var lc = []
        for (let index = 0; index < this.$refs.box.length; index++) {
          const box = this.$refs.box[index]
          const rand = 0
          do {
            rand = Math.floor(Math.random() * coordinates.length)
          } while (set.includes(coordinates[rand]))
          const coor = coordinates[rand]
          lc = coor
          set.push(coor)
          box.style.left = coor[0] + 'px'
          box.style.top = coor[1] + 'px'
          box.style.fontSize = Math.floor(Math.random() * (22 - 12) + 12) + 'pt'
        }
        return
      }

      let coordinates = []
      for (let x = 1; x < (this.$refs.main.clientWidth - 70) / 100; x++) {
        for (let y = 1; y < (this.$refs.main.clientHeight - 70) / 100; y++) {
          coordinates.push([x * 100, y * 100])
        }
      }
      var set = []
      var lc = []
      for (let index = 0; index < this.$refs.box.length; index++) {
        const box = this.$refs.box[index]
        const rand = 0
        do {
          rand = Math.floor(Math.random() * coordinates.length)
        } while (set.includes(coordinates[rand]))
        const coor = coordinates[rand]
        lc = coor
        set.push(coor)
        box.style.left = coor[0] + 'px'
        box.style.top = coor[1] + 'px'
        box.style.fontSize = Math.floor(Math.random() * (46 - 16) + 16) + 'pt'
      }
    },
  },
  async mounted() {
    await this.getKeywords(this.selectedRiver()._id)
    this.selectKeyword('')
    // wait for $refs to be available
    await this.mix()
  },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono');

* {
  box-sizing: border-box;
  font-weight: normal;
}

.referance {
  border: 1px solid black;
  height: 60vh;
  width: 60vw;
  position: absolute;
  z-index: 1;
}
.line {
  color: #555;
  font-family: 'Roboto Mono';
  padding: 1em;
  height: 60vh;
  width: 80vw;
  margin: auto;
}
.shade {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.7) 10%,
    rgba(0, 0, 0, 0) 90%
  );
}
// base
.flip {
  position: absolute;
  h1 {
    font-size: 1em;
  }
  > .front,
  > .back {
    display: block;
    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transition-duration: 0.5s;
    transition-property: transform, opacity;
  }
  > .front {
    transform: rotateY(0deg);
  }
  > .back {
    position: absolute;
    opacity: 0;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    transform: rotateY(-180deg);
  }
  &:hover {
    > .front {
      color: red;
    }
    > .back {
      opacity: 1;
      transform: rotateY(0deg);
    }
  }
  &.flip-vertical {
    > .back {
      transform: rotateX(-180deg);
    }
    &:hover {
      > .front {
        transform: rotateX(180deg);
      }
      > .back {
        transform: rotateX(0deg);
      }
    }
  }
}

// custom
.flip {
  cursor: pointer;
  position: absolute;
  display: inline-block;
  > .front,
  > .back {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    color: white;
    width: inherit;
    background-size: cover !important;
    background-position: center !important;
    border-radius: 10px;
    p {
      font-size: 0.8em;
      line-height: 160%;
      color: #999;
    }
  }
}
.back-button {
  &:hover {
    border: 1px solid white;
  }
}

.text-shadow {
  text-shadow: 1px 1px rgba(0, 0, 0, 0.04), 2px 2px rgba(0, 0, 0, 0.04),
    3px 3px rgba(0, 0, 0, 0.04), 4px 4px rgba(0, 0, 0, 0.04),
    0.125rem 0.125rem rgba(0, 0, 0, 0.04), 6px 6px rgba(0, 0, 0, 0.04),
    7px 7px rgba(0, 0, 0, 0.04), 8px 8px rgba(0, 0, 0, 0.04),
    9px 9px rgba(0, 0, 0, 0.04), 0.3125rem 0.3125rem rgba(0, 0, 0, 0.04),
    11px 11px rgba(0, 0, 0, 0.04), 12px 12px rgba(0, 0, 0, 0.04),
    13px 13px rgba(0, 0, 0, 0.04), 14px 14px rgba(0, 0, 0, 0.04),
    0.625rem 0.625rem rgba(0, 0, 0, 0.04), 16px 16px rgba(0, 0, 0, 0.04),
    17px 17px rgba(0, 0, 0, 0.04), 18px 18px rgba(0, 0, 0, 0.04),
    19px 19px rgba(0, 0, 0, 0.04), 1.25rem 1.25rem rgba(0, 0, 0, 0.04);
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100vw;
}

.limit {
  cursor: no-drop;
  position: absolute;
  top: 40%;
  left: 40%;
  background: blanchedalmond;
  color: rgb(221, 0, 0);
  padding: 8px 24px;
  border-radius: 1em;
}
</style>
