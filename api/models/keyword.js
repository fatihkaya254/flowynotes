import mongoose from 'mongoose'

const keywordSchema = mongoose.Schema({
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: true
    },
    river:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'river',
        required: true

    },
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true,
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
})

const Keyword = mongoose.model('keyword', keywordSchema)


export default Keyword