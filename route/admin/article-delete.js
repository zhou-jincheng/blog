// 引入文章原型
const {Article} = require("../../model/article");
module.exports = async (req,res) => {
    let {id} = req.query;
    // res.send(id);
    // 删除指定文章
    await Article.findOneAndDelete({_id:id});
    // 重定向文章列表
    res.redirect("/admin/articlePage");
}