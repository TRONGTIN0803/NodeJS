const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NhaCungCap = new Schema({
    TenNCC: { type: String, default: 'Emtry' }
});

module.exports = mongoose.model('NhaCungCap', NhaCungCap);
