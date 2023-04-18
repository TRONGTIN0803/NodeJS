const product = require('../model/Product')
const ncc = require('../model/NhaCungCap')
const mongoose = require('mongoose');
var fs = require('fs');
const cloudinary = require('cloudinary').v2;

function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}
// Config cloud
cloudinary.config({
    cloud_name: "",
    api_key: "",        //Your cloud
    api_secret: ""
});

let getDSSanPham = (req, res) => {
    product.find({})
        .then(sanphams => res.render('main/SanPham/DSSanPham', { layout: 'main/layoutmain.hbs', sanphams }))
        .catch(e => console.log(e))
}

let DetailSanPham = (req, res, next) => {

    product.findById(req.params.id)
        .then(sanphams => ncc.findById(sanphams.IdNCC)
            .then(nhacc => res.render('main/SanPham/DetailSanPham', { layout: 'main/layoutmain.hbs', sanphams, nhacc }))
            .catch(e => console.log(e)))
        .catch(e => console.log(e))
}

let suaSanPham = (req, res) => {
    product.findById(req.params.id)
        .then(sanphams => ncc.find({})
            .then(nhacc => res.render('main/SanPham/SuaSanPham', { layout: 'main/layoutmain.hbs', sanphams, nhacc }))
            .catch(e => console.log(e)))
        .catch(e => console.log(e))
}

let suaSanPhamPUT = async (req, res) => {
    if (req.file != undefined) {
        const linkimg = cloudinary.uploader.upload(req.file.path)
        linkimg.then((data) => {
            product.findByIdAndUpdate(req.params.id, { HinhAnh: data.secure_url })
                .then(() => console.log("Thanh cong!!"))
                .catch(e => console.log(e))
        }).catch((err) => {
            console.log(err);
        });


    }

    product.updateOne({ _id: req.params.id }, req.body)
        .then(() => res.redirect('/sanpham'))
        .catch(e => console.log(e))
}

let themSanPham = (req, res) => {
    ncc.find({})
        .then(nhacungcaps => res.render('main/SanPham/themSanPham', { layout: 'main/layoutmain.hbs', nhacungcaps }))
        .catch(e => console.log(e))
}

let themSanPhamPOST = (req, res) => {
    const linkimg = cloudinary.uploader.upload(req.file.path)
    linkimg.then((data) => {
        const sanpham = new product({ TenSP: req.body.nameproduct, HinhAnh: data.secure_url, Gia: req.body.price, IdNCC: req.body.IdNCC, Soluong: req.body.soluong, Mota: req.body.Mota })
        sanpham.save()
            .then(() => res.redirect('/sanpham'))
            .catch(e => console.log(e))
    }).catch((err) => {
        console.log(err);
    });
}

let XoaSanPham = (req, res) => {
    product.findById(req.params.id)
        .then(sanphams => ncc.findById(sanphams.IdNCC)
            .then(nhacc => res.render('main/SanPham/XoaSanPham', { layout: 'main/layoutmain.hbs', sanphams, nhacc }))
            .catch(e => console.log(e)))
        .catch(e => console.log(e))
}

let XoaSanPhamDel = (req, res) => {
    product.deleteOne({ _id: req.params.id })
        .then(() => res.redirect('/sanpham'))
        .catch(e => console.log(e))
}

let SearchSanPham = (req, res) => {
    console.log(req.body)
    // product.find({ TenSP: /${req.body}i/ }, (err, sanphams) => {
    //     if (!err) {
    //         res.json(sanphams)
    //     } else {
    //         res.json({ status: '404' })
    //     }
    // })
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
    SearchSanPham

}