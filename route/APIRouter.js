var express = require('express');
var router = express.Router();

const APIController = require("../controller/APIController")

router.get('/GetDSProduct', APIController.GetDSProduct)

module.exports = router 