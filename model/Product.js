const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nhacung = require('./NhaCungCap')

const SanPham = new Schema({
    TenSP: { type: String, default: 'Emtry' },
    Gia: { type: String, default: '0' },
    HinhAnh: { type: String, default: '' },
    Soluong: { type: String },
    IdNCC: { type: String },
    Mota: { type: String }

});

module.exports = mongoose.model('SanPham', SanPham);
