const ncc = require('../model/NhaCungCap')
const mongoose = require('mongoose');

let getDSNCC = (req, res) => {
    ncc.find({}, (err, nhacungcaps) => {
        if (!err) {
            res.render('main/NhaCungCap/DSNCC', { layout: 'main/layoutmain.hbs', nhacungcaps })
        }
        else {
            res.status(400).json({ error: 'Not Found' })
        }
    })
}

let themNCC = (req, res) => {
    ncc.find({}, (err, nhacungcaps) => {
        if (!err) {
            res.render('main/NhaCungCap/themNCC', { layout: 'main/layoutmain.hbs', nhacungcaps })
        }
        else {
            res.status(400).json({ error: 'Not Found' })
        }
    })

}

let themNCCPOST = (req, res) => {
    ncc.create(req.body, (err, nhacungcaps) => {
        if (!err) {
            res.redirect('/nhacungcap')
        } else {
            res.status(400).json({ error: 'Not Found' })
        }
    })

}

let suaNCC = (req, res) => {
    ncc.find({ _id: req.params.id }, (err, nhacungcaps) => {
        if (!err) {
            res.render('main/NhaCungCap/suaNCC', { layout: 'main/layoutmain.hbs', nhacungcaps })
            // console.log(nhacungcaps)
        } else {
            res.status(400).json({ error: 'Not Found' })
        }
    })


}

let suaNCCPUT = (req, res) => {
    //return res.render('suaSanPham')
    // res.render('main/NhaCungCap/suaNCC', { layout: 'main/layoutmain.hbs' })
    ncc.updateOne({ _id: req.params.id }, req.body, (err, sanphams) => {
        if (!err) {
            res.redirect('/nhacungcap')
        } else {
            res.status(400).json({ error: 'Not Found' })
        }
    })
}

let DetailNCC = (req, res) => {
    //return res.render('DetailSanPham')
    return res.render('main/NhaCungCap/DetailNCC', { layout: 'main/layoutmain.hbs' })

}

let xoaNCC = (req, res) => {
    ncc.findById({ _id: req.params.id }, (err, nhacungcaps) => {
        if (!err) {
            return res.render('main/NhaCungCap/XoaNCC', { layout: 'main/layoutmain.hbs', nhacungcaps })
        } else {
            res.status(400).json({ error: 'Not Found' })
        }
    })
}

let xoaNCCDel = (req, res) => {
    ncc.deleteOne({ _id: req.params.id }, (err, nhacungcaps) => {
        if (!err) {
            res.redirect('/nhacungcap')
        } else {
            res.status(400).json({ error: 'Not Found' })
        }
    })
}


module.exports = {
    getDSNCC,
    suaNCC,
    suaNCCPUT,
    themNCC,
    themNCCPOST,
    DetailNCC,
    xoaNCC,
    xoaNCCDel



}