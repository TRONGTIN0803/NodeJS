import homeController from '../controller/homeController';



var express = require('express');
var multer = require('multer');
var fs = require('fs');
var router = express.Router();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
var upload = multer({ storage: storage });

const SanPhamRouter = require("./SanPham")
const NCCRouter = require("./NhaCungCap")
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}
const initwebroute = (app) => {


    router.get('/trangchu', homeController.getHomePage)
    router.get('/formtinhdientich', homeController.getformDienTichTamGiac)

    router.get('/login', homeController.getLogin)
    router.post('/login', homeController.LoginPOST)

    router.post('/dientich', homeController.getDienTich)

    router.get('/upload', homeController.getUpload);
    router.post('/upload', (req, res) => {

        console.log(req)
        return res.send('<h1>Thanh Cong!</h1>')
    })
    router.all('/secret', homeController.ridirect)

    router.use('/sanpham', SanPhamRouter)
    router.use('/nhacungcap', NCCRouter)
    router.use('/', homeController.getHomePage)
    return app.use('/', router)
}


export default initwebroute;
//module.exports = initwebroute;