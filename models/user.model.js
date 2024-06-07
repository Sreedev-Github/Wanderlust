const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose")

const userShcema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
});


userShcema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userShcema);

module.exports = User;