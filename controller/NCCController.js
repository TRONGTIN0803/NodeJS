let getDSNCC = (req, res) => {
    //return res.render('DSSanPham')
    return res.render('main/NhaCungCap/DSNCC', { layout: 'main/layoutmain.hbs' })
}

let suaNCC = (req, res) => {
    //return res.render('suaSanPham')
    return res.render('main/NhaCungCap/suaNCC', { layout: 'main/layoutmain.hbs' })
}

let themNCC = (req, res) => {
    //return res.render('themSanPham')
    return res.render('main/NhaCungCap/themNCC', { layout: 'main/layoutmain.hbs' })
}

let DetailNCC = (req, res) => {
    //return res.render('DetailSanPham')
    return res.render('main/NhaCungCap/DetailNCC', { layout: 'main/layoutmain.hbs' })

}

module.exports = {
    getDSNCC,
    suaNCC,
    themNCC,
    DetailNCC,

}