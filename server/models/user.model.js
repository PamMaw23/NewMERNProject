
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "First Name required"],
        minlength: [2, "name has to be more than 2 characters"]
    },
    lastname: {
        type: String,
        required: [true, "Last Name required"],
        minlength: [2, "name has to be more than 2 characters"]
    },
    email: {
        type: String,
        required: [true, "Email required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }

    },
    password: {
        type: String,
        required: [true, "Password required"],
        minlength: [6, "Password longer than 5 characters"]
    },
    // confirmPW: {
    //     type: String,
    //     required: [true, "Password needs to match"],
    //     // required:[if (userPassword != userConfirmPW)]
    //     minlength: [6, "Password longer than 5 characters"]
    // },


}, { timestamps: true });

// add this after UserSchema is defined
UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);

UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});



module.exports.User = mongoose.model('User', UserSchema);