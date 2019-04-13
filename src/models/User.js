import mongoose from 'mongoose'

export const User = mongoose.model('User', {
	email: { type: String, unique: true },
	name: { type: String },
	password: { type: String }
})
