export default {
    river(vuexContext) {
        return vuexContext.rivers
    },
    selectedRiver(vuexContext){
        return vuexContext.selectedRiver
    },
    isRiverSelected(vuexContext){
        if (vuexContext.selectedRiver == undefined || vuexContext.selectedRiver._id == undefined) {
            return false
        } else {
            return true
        }
    }
};