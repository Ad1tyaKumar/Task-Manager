import mongoose from "mongoose";
import validator from 'validator'

//removed deprication warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "must provide a name"],
        trim: true,
        maxlength: [35, "name cannot be more than 20 characters"]
    },
    completed: {
        type: Boolean,
        default: false
    }
})
const guestSchema = new mongoose.Schema({
    createdAt: { type: Date, expires: '10d', default: Date.now },
    task: [TaskSchema]
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(v) {
            if (!validator.isEmail(v)) {
                throw new Error("Enter A valid email")
            }
        }
    },
    password: {
        type: String,
    },
    task: [TaskSchema]
})

export const User = mongoose.model('user', userSchema);
export const Guest = mongoose.model('Task', guestSchema);

