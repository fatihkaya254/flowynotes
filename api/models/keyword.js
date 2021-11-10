import mongoose from 'mongoose'

const keywordSchema = mongoose.Schema({
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    river:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'river'
    },
    name: {
        type: String,
    },
    desc: {
        type: String,
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
})

const Keyword = mongoose.model('keyword', keywordSchema)


export default Keyword