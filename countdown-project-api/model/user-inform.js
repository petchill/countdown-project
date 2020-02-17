const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const user_schema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    hash_password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date
    }
});

module.exports = mongoose.model('userModel', user_schema);