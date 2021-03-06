export default {
    description(vuexContext) {
        return vuexContext.descriptions
    },
    selectedDescription(vuexContext){
        return vuexContext.selectedDescription
    },
    isDescriptionSelected(vuexContext){
        if (vuexContext.selectedDescription == undefined || vuexContext.selectedDescription._id == undefined) {
            return false
        } else {
            return true
        }
    },
    speedRead(vuexContext){
        return vuexContext.speedRead
    },
    test(vuexContext){
        return vuexContext.test
    },
    wordPerLine(vuexContext){
        return vuexContext.wordPerLine
    }
};