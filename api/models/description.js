import mongoose from 'mongoose'

const descriptionSchema = mongoose.Schema({
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'user',
    },
    keyword:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'keyword',
        required: true

    },
    pic: {
        type: String,
    },
    desc: {
        type: String,
        required: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
})

const Description = mongoose.model('description', descriptionSchema)


export default Description