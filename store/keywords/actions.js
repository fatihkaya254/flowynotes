export default {
  getKeywords(vuexContext, river) {
    return this.$axios.post('getKeyword', {river}).then((res) => {
      let keywords = res.data
      vuexContext.dispatch('putKeywords', keywords)
    })
  },
  putKeywords(vuexContext, keywords) {
    vuexContext.commit('setKeywords', keywords,)
  },
  addKeyword: function (vuexContext, keyword) {
    return this.$axios.post('/newKeyword', { keyword }).then((res) => {
      var newKeyword = res.data.newKeyword
      vuexContext.commit('newKeyword', newKeyword)
    })
  },
  deleteKeyword: function (vuexContext, id, who) {
    return this.$axios.post('/deleteKeyword', { id, who }).then((res) => {
      var deletedKeyword = res.data.keyword
      vuexContext.commit('delKeyword', deletedKeyword)
    })
  },
  changeKeyword(vuexContext, changes) {
    let id = changes.id
    let where = changes.where
    let value = changes.value
    this.$axios.put('/updateKeyword', { id, where, value }).then((res) => {
      var newKeyword = res.data.keyword
      console.log(newKeyword);
      vuexContext.commit('newKeyword', newKeyword)
    })
  },
  selectKeyword: function(vuexContext, keyword){
    vuexContext.commit('selectKeyword', keyword)
  }
}
