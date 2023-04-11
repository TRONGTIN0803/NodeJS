
var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
var upload = multer({ storage: storage });

const SanPhamController = require("../controller/SanPhamController")



router.get('/suaSanPham/:id', SanPhamController.suaSanPham)
router.put('/:id', upload.single('image'), SanPhamController.suaSanPhamPUT)
router.get('/themSanPham', SanPhamController.themSanPham)
router.post('/themSanPham', upload.single('image'), SanPhamController.themSanPhamPOST)
router.get('/delete/:id/', SanPhamController.XoaSanPham)
router.delete('/:id/', SanPhamController.XoaSanPhamDel)
router.post('/searchsanpham', SanPhamController.SearchSanPham)




//[GET] /sanpham/detail
router.get('/:id', SanPhamController.DetailSanPham)
router.get('/', SanPhamController.getDSSanPham)


module.exports = router 