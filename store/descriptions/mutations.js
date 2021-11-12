export default {
    setDescriptions(state, descriptions) {
      state.descriptions = descriptions
    },
    newDescription(state, newDescription) {
      this._vm.$set(state.descriptions, newDescription._id, newDescription)
    },
    delDescription(state, deletedDescription) {
      this._vm.$delete(state.descriptions, deletedDescription._id)
    },
    selectDescription(state, description){
      state.selectedDescription = state.descriptions[description]
    }
};