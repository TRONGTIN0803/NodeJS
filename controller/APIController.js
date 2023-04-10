const product = require('../model/Product')
const ncc = require('../model/NhaCungCap')
const taikhoan = require('../model/TaiKhoan')

let GetDSProduct = (req, res) => {
    product.find({}, (err, sanphams) => {
        if (!err) {

            res.json({ trangthai: 1, data: sanphams })
        } else {
            res.json({ trangthai: 0, notification: 'goi api that bai' })
        }
    })
}

let GetProduct = async (req, res) => {
    //console.log(req.params.id)
    product.findOne({ _id: req.params.id }, function (err, sanphams) {

        if (!err) {

            res.json({ status: 1, data: sanphams })
        }
        else {
            res.json({ status: 0, notification: "Not Found" })
        }
    })
}


let Login = async (req, res) => {
    const user = await taikhoan.findOne({ email: req.body.email, password: req.body.password }).exec();
    if (user) {

        res.json({ status: 1, notification: "Dang nhap thanh cong" })
    } else {
        res.json({ status: 0, notification: "Dang nhap khong thanh cong" })

    }
}


module.exports = { GetDSProduct, Login, GetProduct }