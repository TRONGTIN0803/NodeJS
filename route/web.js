import homeController from '../controller/homeController';



const cloudinary = require('cloudinary').v2;
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

// Config cloud
cloudinary.config({
    cloud_name: "tinlaptrinh",
    api_key: "834638854337368",
    api_secret: "Yf_os7WWb2y0-ng5EiCDfClzOHw"
});

const SanPhamRouter = require("./SanPham")
const NCCRouter = require("./NhaCungCap")
const APIRouter = require("./APIRouter")
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}
const initwebroute = (app) => {



    router.get('/formtinhdientich', homeController.getformDienTichTamGiac)

    router.get('/login', homeController.getLogin)
    router.post('/login', homeController.LoginPOST)

    router.post('/dientich', homeController.getDienTich)

    router.get('/upload', homeController.getUpload);
    router.post('/upload', upload.single('avatar'), (req, res) => {

        // Upload
        console.log(req.file)
        const linkimg = cloudinary.uploader.upload(req.file.path)

        linkimg.then((data) => {
            console.log(data);
            console.log(data.secure_url);
        }).catch((err) => {
            console.log(err);
        });
        // Generate 
        const url = cloudinary.url("olympic_flag", {
            width: 100,
            height: 150,
            Crop: 'fill'
        });



        // The output url
        console.log(url);
        // https://res.cloudinary.com/<cloud_name>/image/upload/h_150,w_100/olympic_flag
    })
    router.all('/secret', homeController.ridirect)

    router.use('/sanpham', SanPhamRouter)
    router.use('/nhacungcap', NCCRouter)
    router.use('/api', APIRouter)
    router.use('/', homeController.getHomePage)
    return app.use('/', router)
}


export default initwebroute;
//module.exports = initwebroute;