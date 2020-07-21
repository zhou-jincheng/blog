const express = require("express");

//admin路由
const admin = express.Router();

//博客登录页面
admin.get("/login",require("./admin/loginPage"));

//登录功能
admin.post("/login",require("./admin/login"));

//显示用户列表
admin.get("/user",require("./admin/userPage"));

// 实现用户退出功能
admin.get("/logout",require("./admin/logout"))

//呈现用户添加列表
admin.get("/user-edit",require("./admin/user-edit"));

// 添加用户
admin.post("/user-add",require("./admin/user-add"));
// 修改用户
admin.post("/user-modify",require("./admin/user-modify"));
// 删除用户
admin.get("/user-delete",require("./admin/user-delete"));

// 呈现文章内容
admin.get("/articlePage",require("./admin/articlePage"));

// 呈现文章编辑列表
admin.get("/article-edit",require("./admin/article-edit"));

// 添加文章
admin.post("/article-add",require("./admin/article-add"));

// 删除文章
admin.get("/article-delete",require("./admin/article-delete"));

// 修改文章
admin.post("/article-edit",require("./admin/article-edit"));
// 将admin开放出去！
module.exports = admin;