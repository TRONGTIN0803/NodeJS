import homeController from '../controller/homeController';
//import getHomePage from '../controller/homeController';

var express = require('express');
var multer = require('multer');
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
const initwebroute = (app) => {

    router.get('/trangchu', homeController.getHomePage)
    router.get('/formtinhdientich', homeController.getformDienTichTamGiac)
    router.get('/DSSanPham', homeController.getDSSanPham)
    router.get('/suaSanPham', homeController.suaSanPham)
    router.get('/themSanPham', homeController.themSanPham)
    router.get('/login', homeController.getLogin)
    router.get('/DetailSanPham', homeController.DetailSanPham)
    router.post('/dientich', homeController.getDienTich)

    router.get('/upload', homeController.getUpload);
    router.post('/upload', upload.single('avatar'), (req, res) => {
        res.send('<h1>Thanh Cong!</h1>')
    })
    router.all('/secret', homeController.ridirect)

    return app.use('/', router)
}


export default initwebroute;
//module.exports = initwebroute;