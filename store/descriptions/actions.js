export default {
  getDescriptions(vuexContext, keyword) {
    return this.$axios.post('getDescription', {keyword}).then((res) => {
      let descriptions = res.data
      vuexContext.dispatch('putDescriptions', descriptions)
    })
  },
  putDescriptions(vuexContext, descriptions) {
    vuexContext.commit('setDescriptions', descriptions,)
  },
  addDescription: function (vuexContext, description) {
    return this.$axios.post('/newDescription', { description }).then((res) => {
      var newDescription = res.data.newDescription
      vuexContext.commit('newDescription', newDescription)
    })
  },
  deleteDescription: function (vuexContext, id, who) {
    return this.$axios.post('/deleteDescription', { id, who }).then((res) => {
      var deletedDescription = res.data.description
      vuexContext.commit('delDescription', deletedDescription)
    })
  },
  changeDescription(vuexContext, changes) {
    let id = changes.id
    let where = changes.where
    let value = changes.value
    this.$axios.put('/updateDescription', { id, where, value }).then((res) => {
      var newDescription = res.data.description
      vuexContext.commit('newDescription', newDescription)
    })
  },
  selectDescription: function(vuexContext, description){
    vuexContext.commit('selectDescription', description)
  },
  setSpeedRead: function(vuexContext, boolean){
    vuexContext.commit('setSpeedRead', boolean)
  },
  setWordPerLine: function(vuexContext, boolean){
    vuexContext.commit('setWordPerLine', boolean)
  },
  setTest: function(vuexContext, boolean){
    vuexContext.commit('setTest', boolean)
  },
}
