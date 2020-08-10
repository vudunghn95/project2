const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');
async function checkAdminandManager(req, res, next) {

    let user = res.user;
    if (user.role === 'admin' || user.role === 'manager') {
        next();
    } else {
        return res.json("user khong co quyen");
    }
}

async function checkLogin(req, res, next) {
    try {
        let token = req.cookies.token;
        let decodeUser = jwt.verify(token, "secretKey");
        let user = await userService.getUser(decodeUser.id);
        if (user.length) {
            res.user = user[0];
            next();
        } else {
            return res.json("Xin moi dang nhap");
        }
    } catch (error) {
        console.log(error);
        // khong lay duoc token bi undefined
        if (error.message === 'jwt must be provided') {
            return res.json("ma token khong duoc cung cap")
        }
        // sai khoa bi mat
        if (error.message === "invalid signature") {
            return res.json("token sai hoac da het han");
        }
        // token di dang bi thieu
        if (error.message === "jwt malformed") {
            return res.json("token sai hoac da het han");
        }
        //token het han
        if (error.message === "jwt expired") {
            return res.json("token sai hoac da het han");
        }
        // sua token nhung van day du do dai
        if (error.message === "invalid token") {
            return res.json("token sai hoac da het han");
        }
        return res.json("loi he thong");
    }
}

module.exports = {
    checkLogin,
    checkAdminandManager
}