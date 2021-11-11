export default {
    setKeywords(state, keywords) {
      state.keywords = keywords
    },
    newKeyword(state, newKeyword) {
      this._vm.$set(state.keywords, newKeyword._id, newKeyword)
    },
    selectKeyword(state, keyword){
      state.selectedKeyword = state.keywords[keyword]
    }
};