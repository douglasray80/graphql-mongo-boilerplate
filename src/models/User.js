import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	email: { type: String, unique: true },
	username: { type: String, unique: true },
	name: { type: String },
	password: { type: String }
})

export default mongoose.model('User', userSchema)
