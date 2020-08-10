const express = require('express');
const auth = require('../auth/index');
const bookService = require('../services/book.service');
const userService = require('../services/user.service');

const router = express.Router();
//Lay tat ca sach nguoi dung binh thuong
router.get('/',auth.checkLogin,async (req,res,next)=>{
    let books = await bookService.getAllBook();
    res.render('book',{
        pageTitle : 'Book Page',
        cardTitle : 'Book infomation',
        books : books,
        user : res.user,
        edit : false
    })
});
//Hien thi sach cho manage
router.get('/admin',auth.checkLogin, auth.checkAdminandManager,async (req,res,next)=>{
    let user = await userService.getUserBook(res.user._id);
    res.render('book',{
        pageTitle : 'Book Management',
        cardTitle : 'Book infomation',
        books : user[0].bookID,
        user : user[0],
        edit : true
    })
});
//Sua sach cho manage
router.put('/admin/:id',auth.checkLogin, auth.checkAdminandManager,async (req,res,next)=>{
    let user = res.user;
    let bookID = req.params.id;
    if(user.bookID.includes(bookID)){
        res.bookID = bookID; 
        next();
    }else{
       return res.json("User khong co quyen")
    }
},async (req,res)=>{
    let book = req.body;
    let result = await bookService.updateBook(res.bookID,book);
    res.json(result);
});
//Them sach moi cho manage
router.post('/admin',auth.checkLogin,auth.checkAdminandManager,async (req,res,next)=>{
    let book = req.body;
    let newbook = await bookService.createBook(book);
    let user = res.user;
    user.bookID.push(newbook._id);
    await userService.updateUser(user._id,user.bookID);
    if(user.role==='manager'){
        let admin = await userService.findAdmin();
        admin[0].bookID.push(newbook._id);
        await userService.updateUser(admin[0]._id,admin[0].bookID);
        return res.json('them moi thanh cong');
    }else {
        return res.json('them moi thanh cong');
    }    
});
// Hien thi trang them sach
router.get('/admin/new-book',auth.checkLogin,auth.checkAdminandManager,(req,res,next)=>{
    res.render('create-book',{
        pageTitle : 'Create a book',
        user : res.user
    });
})
// Xoa sach cho manage
router.delete('/admin/:id',auth.checkLogin, auth.checkAdminandManager, async (req,res,next)=>{
    let user = res.user;
    let bookID = req.params.id;
    if(user.bookID.includes(bookID)){
        res.bookID = bookID;
        next();
    }else{
       return res.json("User khong co quyen")
    }
},async (req,res)=>{
    let user = res.user;
    let managerBookId = user.bookID.filter(id=>{
        return id!==res.bookID;
    });
    await userService.updateUser(user._id,managerBookId);
    await bookService.deleteBook(res.bookID);
    if(user.role==='manager'){
        let admin = await userService.findAdmin();
        let adminBookId = admin[0].bookID.filter(id=>{
            return id!==res.bookID;
        });
        await userService.updateUser(admin[0]._id,adminBookId);
        return res.json("Xoa thanh cong");
    }else {
        return res.json("Xoa thanh cong");
    }    
});

module.exports = router;