export default {
  getLands(vuexContext, user) {
    return this.$axios.post('getLand', {user}).then((res) => {
      let lands = res.data
      vuexContext.dispatch('putLands', lands)
    })
  },
  putLands(vuexContext, lands) {
    vuexContext.commit('setLands', lands)
  },
  addLand: function (vuexContext, land) {
    return this.$axios.post('/newLand', { land }).then((res) => {
      var newLand = res.data.newLand
      vuexContext.commit('newLand', newLand)
    })
  },
  changeLand(vuexContext, changes) {
    let id = changes.id
    let where = changes.where
    let value = changes.value
    this.$axios.put('/updateLand', { id, where, value }).then((res) => {
      var newland = res.data.land
      vuexContext.commit('newLand', newland)
    })
  },
  selectLand: function(vuexContext, land){
    vuexContext.commit('selectLand', land)
  }
}
