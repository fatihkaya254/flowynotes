import mongoose from 'mongoose'

const riverSchema = mongoose.Schema({
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: true
    },
    land:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'land',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
    },
    icon: {
        type: String,
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
})

const River = mongoose.model('river', riverSchema)


export default River