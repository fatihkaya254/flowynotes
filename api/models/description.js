import mongoose from 'mongoose'

const descriptionSchema = mongoose.Schema({
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    keyword:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'keyword'
    },
    pic: {
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

const Description = mongoose.model('description', descriptionSchema)


export default Description