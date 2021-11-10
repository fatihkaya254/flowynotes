import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    phone: {
        type: Number,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    name: {
        type: String,
    },
    surname: {
        type: String,
    },
    birthDay: {
        type: Date,
    },
    profilePic: {
        type: String,
    },
    googleId: {
        type: String,
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
})
userSchema.index({ phone: 1 }, { unique: true,  partialFilterExpression: { phone: { $exists: true } } })

const User = mongoose.model('user', userSchema)


export default User