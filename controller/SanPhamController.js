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
    cloud_name: "tinlaptrinh",
    api_key: "834638854337368",
    api_secret: "Yf_os7WWb2y0-ng5EiCDfClzOHw"
});

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

    product.findById(req.params.id, async function (err, sanphams) {
        const nhacc = await ncc.findById(sanphams.IdNCC).exec()
        if (!err) {

            res.render('main/SanPham/DetailSanPham', { layout: 'main/layoutmain.hbs', sanphams, nhacc })
        }
        else {
            res.status(400).json({ error: 'Not Found' })
        }
    })
}

let suaSanPham = (req, res) => {


    product.findById(req.params.id, async (err, sanphams) => {
        const nhacc = await ncc.find({}).exec()
        if (!err) {
            res.render('main/SanPham/SuaSanPham', { layout: 'main/layoutmain.hbs', sanphams, nhacc })
        }
        else {
            res.status(400).json({ error: 'Not Found' })
        }
    })
}

let suaSanPhamPUT = async (req, res) => {
    if (req.file != undefined) {
        const linkimg = cloudinary.uploader.upload(req.file.path)
        linkimg.then((data) => {
            product.findByIdAndUpdate(req.params.id, { HinhAnh: data.secure_url }, (err, next) => {
                if (!err) {
                    console.log("Thanh cong!!")
                }
                else {
                    res.status(400).json({ error: 'Not Found' })
                }
            })
        }).catch((err) => {
            console.log(err);
        });


    }

    await product.updateOne({ _id: req.params.id }, req.body, (err, next) => {
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
    const linkimg = cloudinary.uploader.upload(req.file.path)
    linkimg.then((data) => {
        const sanpham = new product({ TenSP: req.body.nameproduct, HinhAnh: data.secure_url, Gia: req.body.price, IdNCC: req.body.IdNCC, Soluong: req.body.soluong, Mota: req.body.Mota })
        sanpham.save()
        product.find({}, function (err, sanphams) {
            if (!err) {
                res.redirect('/sanpham')
            }
            else {
                res.status(400).json({ error: 'Not Found' })
            }
        })

    }).catch((err) => {
        console.log(err);
    });




}

let XoaSanPham = (req, res) => {
    product.findById(req.params.id, async (err, sanphams) => {
        const nhacc = await ncc.findById(sanphams.IdNCC).exec()
        if (!err) {
            res.render('main/SanPham/XoaSanPham', { layout: 'main/layoutmain.hbs', sanphams, nhacc })
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