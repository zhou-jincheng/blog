const {Article} = require("../../model/article");
// 引进分页模块
const pagination = require("mongoose-sex-page");
module.exports = async (req,res) => {
    let {page} = req.query;
    let articles = await pagination(Article).page(page).size(4).display(5).populate("author").find().exec();
    // res.send(articles);
    res.render("home/default",{
        articles
    });
}