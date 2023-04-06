const Product = require('../model/Product')
const taikhoan = require('../model/TaiKhoan')
const alert = require('alert')

let getHomePage = (req, res) => {
    //logic
    return res.render('main/Index', { layout: 'main/layoutmain.hbs' })
}

let getformDienTichTamGiac = (req, res) => {
    return res.render('tinhDienTich', { layout: 'main/layoutmain.hbs' })
}

let getLogin = (req, res) => {
    return res.render('login')
}

let LoginPOST = async (req, res) => {
    const user = await taikhoan.findOne({ email: req.body.email, password: req.body.password }).exec();
    if (user) {

        res.redirect('/')
    } else {
        alert('Đăng nhập thất bại')
        res.redirect('/login')

    }
}

let getDienTich = (req, res) => {
    const canhday = parseFloat(req.body.canhday)
    const chieucao = parseFloat(req.body.chieucao)
    const dientich = 0.5 * canhday * chieucao;
    //console.log(dientich)
    return res.render('dientich', { layout: 'main/layoutmain.hbs', value: dientich })
}
let getUpload = (req, res) => {
    // const username = '';
    // if (username == '') {
    //     res.redirect('/login')
    // }
    return res.render('upload');
}

let ridirect = (req, res) => {
    res.redirect('/login')
    next();
}




module.exports = {
    getHomePage,
    getformDienTichTamGiac,
    getDienTich,
    getLogin,
    getUpload,
    ridirect,
    LoginPOST,

}