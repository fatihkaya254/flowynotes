<template lang="pug">
div
  .line(ref="main" @click="limit=false")
    .flip(ref="box")
      .front(:style="{background: 'none'}") 
        h1(class="text-shadow") {{selectedKeyword().name}}
    .form(ref="form")
      input(v-for="d in description()" :style="[changed == d._id ? {color: 'green'} : {}]" type="text" v-model="newDesc[d._id]" :placeholder="d.name" class="new--desc" v-on:keyup.13="edit(d._id)"  )
      input(type="text" v-model="desc" placeholder="description" class="new--desc" v-on:keyup.13="add()" )
    .button--grey(style="cursor: pointer;" @click="selectKeyword('')") Close
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      newDesc: [],
      title: '',
      desc: '',
      changed: '',
      id: '',
      change: false,
      limit: false,
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
    ...mapActions('keywords', [
      'selectKeyword',
    ]),
    ...mapGetters(['userId']),
    ...mapGetters('descriptions', [
      'description',
      'isDescriptionSelected',
      'selectedDescription',
    ]),
    ...mapGetters('keywords', ['selectedKeyword']),
    select: function (description) {
      this.selectDescription(description)
    },
    add: async function () {
      var count = 0
      for(const c in this.description()){
        count++
      }
      if (this.desc == '') return alert('Empty Description')
      if (count >= 5) return alert('Limit is up to 5 description')
      const description = {
        desc: this.desc,
        creator: this.userId(),
        keyword: this.selectedKeyword()._id,
      }
      await this.addDescription(description)
      this.mix()
      this.desc = ''
      for (const [k, v] of Object.entries(this.description())) {
        if (v != undefined) this.$set(this.newDesc, k, v.desc)
      }
    },
    edit: async function (id) {
      if (this.newDesc[id] == '') {
        this.deleteDescription(id, this.userId())
        return
      }
      const changes = {
        value: this.newDesc[id],
        where: 'desc',
        id: id,
      }
      await this.changeDescription(changes)
      this.changed = id
    },
    list: function () {
      let coordinates = []
      for (let x = 1; x < (this.$refs.main.clientWidth - 70) / 150; x++) {
        for (let y = 1; y < (this.$refs.main.clientHeight - 70) / 100; y++) {
          coordinates.push([x * 150, y * 100])
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
      if (this.$refs.box == undefined) {
        return 0
      }
      await this.$nextTick()
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
          rand = Math.floor(
            Math.random() *
              (parseInt((this.$refs.main.clientWidth - 70) / 100, 10) *
                parseInt((this.$refs.main.clientHeight - 70) / 100, 10))
          )
          console.log(set.includes(coordinates[rand]))
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
    await this.getDescriptions(this.selectedKeyword()._id)
    for (const [k, v] of Object.entries(this.description())) {
      if (v != undefined) this.$set(this.newDesc, k, v.desc)
    }
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
  display: flex;
  gap: 20px;
  flex-direction: column;
  justify-content: center;
  width: 80vw;
  max-width: 700px;
  max-height: 500px;
  margin: auto;
  background: #000000f3;
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
  position: relative;
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
  position: relative;
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
  font-size: 16pt;
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
  width: 100%;
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
