const express = require("express");

// 创建home路由
const home = express.Router();

// 博客首页
home.get("/",require("./home/index"));

// 文章详情页面
home.get("/article",require("./home/article"));

// 文章评论功能
home.post("/comment",require("./home/comment"));

// 退出登录
home.get("/logout",require("./home/logout"));

// 将home开放出去
module.exports = home;
