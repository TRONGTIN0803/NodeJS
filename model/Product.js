const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SanPham = new Schema({
    TenSP: { type: String, default: 'Emtry' },
    Gia: { type: String, default: '0' },
    HinhAnh: { type: String, default: '' },
    TenNCC: { type: String }

});

module.exports = mongoose.model('SanPham', SanPham);
