let getDSSanPham = (req, res) => {
    //return res.render('DSSanPham')
    return res.render('main/SanPham/DSSanPham', { layout: 'main/layoutmain.hbs' })
}

let suaSanPham = (req, res) => {
    //return res.render('suaSanPham')
    return res.render('main/SanPham/suaSanPham', { layout: 'main/layoutmain.hbs' })
}

let themSanPham = (req, res) => {
    //return res.render('themSanPham')
    console.log(req.body)
    return res.render('main/SanPham/themSanPham', { layout: 'main/layoutmain.hbs' })

}

let themSanPhamPOST = (req, res) => {
    //+ " Hinh Anh:" + req.boddy.image
    console.log(req.body)

    return res.send("<p>TenSP: " + req.body.nameproduct + " GiaSP: " + req.body.price + "</p>")

}



let DetailSanPham = (req, res) => {
    //return res.render('DetailSanPham')
    return res.render('main/SanPham/DetailSanPham', { layout: 'main/layoutmain.hbs' })

}

module.exports = {
    getDSSanPham,
    suaSanPham,
    themSanPham,
    DetailSanPham,
    themSanPhamPOST,


}