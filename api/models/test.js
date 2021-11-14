import mongoose from 'mongoose'

const testSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: true
    },
    keyword:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'keyword',
        required: true
    },
    answers: {
        type: [Number],
        default: [],
    },
    point: {
        type: Number,
        default: 0
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
})
testSchema.index({ user: 1, keyword: 1,}, { unique: true })
const Test = mongoose.model('test', testSchema)


export default Test