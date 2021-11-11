export default {
    land(vuexContext) {
        return vuexContext.lands
    },
    selectedLand(vuexContext){
        return vuexContext.selectedLand
    },
    isLandSelected(vuexContext){
        if (vuexContext.selectedLand == undefined || vuexContext.selectedLand._id == undefined) {
            return false
        } else {
            return true
        }
    }
};