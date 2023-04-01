const product = require('../model/Product')
const ncc = require('../model/NhaCungCap')
const mongoose = require('mongoose');
var fs = require('fs');


function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

let getDSSanPham = (req, res) => {
    product.find({}, (err, sanphams) => {
        if (!err) {

            res.render('main/SanPham/DSSanPham', { layout: 'main/layoutmain.hbs', sanphams })
        }
        else {
            res.status(400).json({ error: 'Not Found' })
        }
    })
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

let suaSanPham = (req, res) => {

    // return res.render('main/SanPham/suaSanPham', { layout: 'main/layoutmain.hbs' })
    product.findById(req.params.id, (err, sanphams) => {
        if (!err) {
            ncc.find({}, (err, nhacungcaps) => {
                if (!err) {
                    res.render('main/SanPham/SuaSanPham', { layout: 'main/layoutmain.hbs', sanphams, nhacungcaps })
                }
                else {
                    res.status(400).json({ error: 'Not Found' })
                }
            })

        }
        else {
            res.status(400).json({ error: 'Not Found' })
        }
    })
}

let suaSanPhamPUT = (req, res) => {
    //console.log(req.file)
    if (req.file != undefined) {
        const strpath = req.file.path
        const strbase64 = base64_encode(strpath)
        product.findByIdAndUpdate(req.params.id, { HinhAnh: strbase64 }, (err, next) => {
            if (!err) {
                console.log("Thanh cong!!")
            }
            else {
                res.status(400).json({ error: 'Not Found' })
            }
        })
    }
    product.updateOne({ _id: req.params.id }, req.body, (err, next) => {
        if (!err) {
            res.redirect('/sanpham')
        }
        else {
            res.status(400).json({ error: 'Not Found' })
        }
    })


}

let themSanPham = (req, res) => {
    ncc.find({}, (err, nhacungcaps) => {
        if (!err) {
            res.render('main/SanPham/themSanPham', { layout: 'main/layoutmain.hbs', nhacungcaps })
        }
        else {
            res.status(400).json({ error: 'Not Found' })
        }
    })


}

let themSanPhamPOST = (req, res) => {
    const strbase64 = base64_encode(req.file.path)
    const sanpham = new product({ TenSP: req.body.nameproduct, HinhAnh: strbase64, Gia: req.body.price, TenNCC: req.body.TenNCC })
    sanpham.save()
    product.find({}, function (err, sanphams) {
        if (!err) {
            res.redirect('/sanpham')
        }
        else {
            res.status(400).json({ error: 'Not Found' })
        }
    })

}

let XoaSanPham = (req, res) => {
    product.findById(req.params.id, (err, sanphams) => {
        if (!err) {
            res.render('main/SanPham/XoaSanPham', { layout: 'main/layoutmain.hbs', sanphams })
        }
        else {
            res.status(400).json({ error: 'Not Found' })
        }
    })
}

let XoaSanPhamDel = (req, res) => {
    product.deleteOne({ _id: req.params.id }, (err, next) => {
        if (!err) {
            res.redirect('/sanpham')
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
    suaSanPhamPUT,
    XoaSanPham,
    XoaSanPhamDel,
}