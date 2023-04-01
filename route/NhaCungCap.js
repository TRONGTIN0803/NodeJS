var express = require('express');
var router = express.Router();

const NhaCungCapController = require("../controller/NCCController")


router.get('/themNCC', NhaCungCapController.themNCC)
router.post('/themNCC', NhaCungCapController.themNCCPOST)

router.get('/update/:id', NhaCungCapController.suaNCC)
router.put('/:id', NhaCungCapController.suaNCCPUT)

router.get('/delete/:id', NhaCungCapController.xoaNCC)
router.delete('/:id', NhaCungCapController.xoaNCCDel)

router.get('/', NhaCungCapController.getDSNCC)


module.exports = router 