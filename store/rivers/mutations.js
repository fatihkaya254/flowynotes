export default {
    setRivers(state, rivers) {
      state.rivers = rivers
    },
    newRiver(state, newRiver) {
      this._vm.$set(state.rivers, newRiver._id, newRiver)
    },
    selectRiver(state, river){
      state.selectedRiver = state.rivers[river]
    }
};