let getHomePage = (req, res) => {
    //logic
    return res.render('main/Index', { layout: 'main/layoutmain.hbs' })
}

let getformDienTichTamGiac = (req, res) => {
    return res.render('tinhDienTich')
}

let getLogin = (req, res) => {
    return res.render('login')
}

let getDienTich = (req, res) => {
    const canhday = parseFloat(req.body.canhday)
    const chieucao = parseFloat(req.body.chieucao)
    const dientich = 0.5 * canhday * chieucao;
    //console.log(dientich)
    return res.render('dientich', { value: dientich })
}

let getDSSanPham = (req, res) => {
    //return res.render('DSSanPham')
    return res.render('main/DSSanPham', { layout: 'main/layoutmain.hbs' })
}

let suaSanPham = (req, res) => {
    //return res.render('suaSanPham')
    return res.render('main/suaSanPham', { layout: 'main/layoutmain.hbs' })
}

let themSanPham = (req, res) => {
    //return res.render('themSanPham')
    return res.render('main/themSanPham', { layout: 'main/layoutmain.hbs' })
}

let DetailSanPham = (req, res) => {
    //return res.render('DetailSanPham')
    return res.render('main/DetailSanPham', { layout: 'main/layoutmain.hbs' })

}

let getUpload = (req, res) => {
    const username = '';
    if (username == '') {
        res.redirect('/login')
    }
    return res.render('upload');
}

let ridirect = (req, res) => {
    res.redirect('/login')
    next();
}


module.exports = {
    getHomePage,
    getformDienTichTamGiac,
    getDienTich,
    getLogin,
    getDSSanPham,
    suaSanPham,
    themSanPham,
    DetailSanPham,
    getUpload,
    ridirect,
}