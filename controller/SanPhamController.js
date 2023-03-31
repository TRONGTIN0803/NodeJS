const product = require('../model/Product')
var fs = require('fs');

function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

let getDSSanPham = (req, res) => {
    product.find({}, function (err, sanphams) {
        if (!err) {
            res.render('main/SanPham/DSSanPham', { layout: 'main/layoutmain.hbs', sanphams })
        }
        else {
            res.status(400).json({ error: 'Not Found' })
        }
    })
}

let suaSanPham = (req, res) => {

    // return res.render('main/SanPham/suaSanPham', { layout: 'main/layoutmain.hbs' })
    product.findById(req.params.id, (err, sanphams) => {
        if (!err) {
            res.render('main/SanPham/SuasanPham', { layout: 'main/layoutmain.hbs', sanphams })
        }
        else {
            res.status(400).json({ error: 'Not Found' })
        }
    })
}

let POSTsuaSanPham = (req, res) => {
    res.json(req.body)
}

let themSanPham = (req, res) => {
    return res.render('main/SanPham/themSanPham', { layout: 'main/layoutmain.hbs' })

}

let themSanPhamPOST = (req, res) => {
    const strbase64 = base64_encode(req.file.path)
    const sanpham = new product({ TenSP: req.body.nameproduct, HinhAnh: strbase64, Gia: req.body.price })
    sanpham.save()
    res.render('main/SanPham/DSSanPham', { layout: 'main/layoutmain.hbs', sanphams })

}

let DetailSanPham = (req, res, next) => {

    product.findById(req.params.id, (err, sanphams) => {
        if (!err) {
            res.render('main/SanPham/DetailSanPham', { layout: 'main/layoutmain.hbs', sanphams })
        }
        else {
            res.status(400).json({ error: 'Not Found' })
        }
    })
}

module.exports = {
    getDSSanPham,
    suaSanPham,
    themSanPham,
    DetailSanPham,
    themSanPhamPOST,
    POSTsuaSanPham,
}