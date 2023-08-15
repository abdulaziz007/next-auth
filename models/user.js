import mongoose, {Schema, models } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true }
}, {
    timestamps: true
})



const UserModel = models.User || mongoose.model('User', userSchema)

export default UserModel;