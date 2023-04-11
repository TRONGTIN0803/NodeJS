var express = require('express');
var router = express.Router();

const APIController = require("../controller/APIController")

router.get('/GetDSProduct', APIController.GetDSProduct)

router.get('/GetProduct/:id', APIController.GetProduct)

router.post('/Login', APIController.Login)

router.post('/Register', APIController.Register)

module.exports = router 