const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaiKhoan = new Schema({
    email: { type: String, default: 'Emtry' },
    password: { type: String, default: 'Emtry' }
});

module.exports = mongoose.model('TaiKhoan', TaiKhoan);
