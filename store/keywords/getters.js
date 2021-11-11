export default {
    keyword(vuexContext) {
        return vuexContext.keywords
    },
    selectedKeyword(vuexContext){
        return vuexContext.selectedKeyword
    },
    isKeywordSelected(vuexContext){
        if (vuexContext.selectedKeyword == undefined || vuexContext.selectedKeyword._id == undefined) {
            return false
        } else {
            return true
        }
    }
};