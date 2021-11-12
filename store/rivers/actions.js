export default {
  getRivers(vuexContext, land) {
    return this.$axios.post('getRiver', {land}).then((res) => {
      let rivers = res.data
      vuexContext.dispatch('putRivers', rivers)
    })
  },
  putRivers(vuexContext, rivers) {
    vuexContext.commit('setRivers', rivers)
  },
  addRiver: function (vuexContext, river) {
    return this.$axios.post('/newRiver', { river }).then((res) => {
      var newRiver = res.data.newRiver
      vuexContext.commit('newRiver', newRiver)
    })
  },
  deleteRiver: function (vuexContext, id, who) {
    return this.$axios.post('/deleteRiver', { id, who }).then((res) => {
      var deletedRiver = res.data.river
      vuexContext.commit('delRiver', deletedRiver)
    })
  },
  changeRiver(vuexContext, changes) {
    let id = changes.id
    let where = changes.where
    let value = changes.value
    this.$axios.put('/updateRiver', { id, where, value }).then((res) => {
      var newRiver = res.data.river
      vuexContext.commit('newRiver', newRiver)
    })
  },
  selectRiver: function(vuexContext, river){
    vuexContext.commit('selectRiver', river)
  }
}
