import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,  // Default is normal user, set to true for admins
    },
});

const User = mongoose.model('User', userSchema);

export default User;
