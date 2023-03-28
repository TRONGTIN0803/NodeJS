
var express = require('express');
var router = express.Router();

const SanPhamController = require("../controller/SanPhamController")



router.get('/suaSanPham', SanPhamController.suaSanPham)
router.get('/themSanPham', SanPhamController.themSanPham)
router.post('/themSanPham', SanPhamController.themSanPhamPOST)
router.get('/DetailSanPham', SanPhamController.DetailSanPham)
router.get('/', SanPhamController.getDSSanPham)


module.exports = router 