const product = require('../model/Product')
const ncc = require('../model/NhaCungCap')

let GetDSProduct = (req, res) => {
    product.find({}, (err, sanphams) => {
        if (!err) {

            res.json(sanphams)
        } else {
            console.log('nganh l!')
        }
    })
}


module.exports = { GetDSProduct }