const product = require('../model/Product')
const ncc = require('../model/NhaCungCap')
const taikhoan = require('../model/TaiKhoan')
const account = require('../model/AcountUser')

let GetDSProduct = (req, res) => {
    product.find({}, (err, sanphams) => {
        if (!err) {

            res.json({ trangthai: 1, data: sanphams })
        } else {
            res.json({ trangthai: 0, notification: 'goi api that bai' })
        }
    })
}
let GetDSNCC = (req, res) => {
    ncc.find({}, (err, nccs) => {
        if (!err) {

            res.json({ trangthai: 1, data: nccs })
        } else {
            res.json({ trangthai: 0, notification: 'goi api that bai' })
        }
    })
}

let GetProduct = async (req, res) => {

    product.findOne({ _id: req.params.id }, function (err, sanphams) {


        if (!err) {

            ncc.findOne({ _id: sanphams.IdNCC }, function (errr, nccs) {
                if (!errr) {

                    res.json({ status: 1, data: sanphams, NhaCC: nccs })
                }

            })
        }
        else {
            res.json({ status: 0, notification: "Not Found" })
        }
    })
}

let GetDSProductNCC = async (req, res) => {

    product.find({ IdNCC: req.params.id }, function (err, sanphams) {


        if (!err) {

            ncc.findOne({ _id: sanphams.IdNCC }, function (errr, nccs) {
                if (!errr) {

                    res.json({ status: 1, data: sanphams, NhaCC: nccs })
                }

            })
        }
        else {
            res.json({ status: 0, notification: "Not Found" })
        }
    })
}


let Login = async (req, res) => {
    const user = await account.findOne({ email: req.body.email, password: req.body.password }).exec();
    if (user) {

        res.json({ status: 1, notification: "Dang nhap thanh cong" })
    } else {
        res.json({ status: 0, notification: "Dang nhap khong thanh cong" })

    }
}

let Register = async (req, res) => {
    const user = await new account({ email: req.body.email, password: req.body.password })
    user.save()
    if (user) {

        res.json({ status: 1, notification: "Dang nhap thanh cong" })
    } else {
        res.json({ status: 0, notification: "Dang nhap khong thanh cong" })

    }
}


module.exports = { GetDSProduct, Login, GetProduct, Register, GetDSNCC, GetDSProductNCC }