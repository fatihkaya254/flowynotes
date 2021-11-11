import mongoose from 'mongoose'

const landSchema = mongoose.Schema({
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: true
    },
    editors:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:'user'
    },
    watchers:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:'user'
    },
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
    },
    cover: {
        type: String,
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
})

const Land = mongoose.model('land', landSchema)


export default Land