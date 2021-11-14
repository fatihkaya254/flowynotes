<template lang="pug">
div
  .line
    .flip(v-for="land in land()" v-show="id == land._id || id == ''")
      .front(:style="[land.cover ? {backgroundImage: 'url(' + land.cover + ')'} : {backgroundImage: 'url(https://source.unsplash.com/XQ3qOs6g9EY)'}]") 
        h1(class="text-shadow") {{land.name}}
        .back-button(@click="edit(land._id)") Edit
        .back-button(@click="select(land._id)") Go
      .back
        div(style="overflow: auto;")
          p {{land.desc}}
        .back-button(@click="edit(land._id)") Edit
        .back-button(@click="select(land._id)") Go
  .form
    input(type="text" v-model="title" placeholder="title" class="new--title" )
    input(type="text" v-model="desc" placeholder="description"  v-on:keyup.13="add()" class="new--desc"  )
    .buttons
      .button--grey(v-if="!change" style="cursor: pointer;" @click="add()") New
      .button--grey(v-if="!change" style="cursor: pointer;" @click="backUp()") Back Up
      .button--grey(v-if="change" style="cursor: pointer;" @click="changeL()") Edit
      .button--grey(v-if="change" style="cursor: pointer;" @click="addUser()") Add User
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
    }
  },
  methods: {
    ...mapActions('lands', ['getLands', 'changeLand', 'selectLand', 'addLand']),
    ...mapGetters(['userId', 'userName']),
    ...mapGetters('lands', ['land', 'isLandSelected', 'selectedLand']),
    select: function (land) {
      this.selectLand(land)
    },
    download(content, fileName, contentType) {
      const a = document.createElement('a')
      const file = new Blob([content], { type: contentType })
      a.href = URL.createObjectURL(file)
      a.download = fileName
      a.click()
    },

    addUser: async function () {
      var phone = prompt('please enter users phone number')
      await this.$axios
        .post('/addEditorToLand', { phone, id: this.id })
        .then((res) => {
          console.log(res.status)
        })
    },
    backUp: async function () {
      await this.$axios
        .post('/backupAll', { user: this.userId() })
        .then((res) => {
          this.download(JSON.stringify(res.data), this.userName() + '\'sFlowiesBackUp.json', 'text/plain')
        })
    },
    add: function () {
      const land = {
        name: this.title,
        desc: this.desc,
        creator: this.userId(),
      }
      this.addLand(land)
    },
    changeL: function () {
      const changes = {
        value: this.title,
        where: 'name',
        id: this.id,
      }
      this.changeLand(changes)
      const changes2 = {
        value: this.desc,
        where: 'desc',
        id: this.id,
      }
      this.changeLand(changes2)
      this.change = false
      this.id = ''
      this.desc = ''
      this.title = ''
    },
    edit: function (id) {
      const land = this.land()[id]
      this.title = land.name
      this.desc = land.desc
      this.id = id
      this.change = true
    },
  },
  mounted() {
    this.getLands(this.userId())
  },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono');

* {
  box-sizing: border-box;
  font-weight: normal;
}

.line {
  color: #555;
  text-align: center;
  font-family: 'Roboto Mono';
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  overflow: auto;
  height: 60vh;
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
      transform: rotateY(180deg);
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
  margin-right: 2px;
  margin-bottom: 1em;
  @media screen and (max-width: 1200px) {
    width: 120px;
  }

  width: 240px;
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
    @media screen and (max-width: 1200px) {
      height: 200px;
    }
    height: 130px;
    padding: 1em 2em;
    background: #313131;
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
</style>
