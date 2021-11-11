export default {
    setLands(state, lands) {
      state.lands = lands
    },
    newLand(state, newLand) {
      this._vm.$set(state.lands, newLand._id, newLand)
      console.log(newLand);
    },
    selectLand(state, land){
      state.selectedLand = state.lands[land]
    }
};