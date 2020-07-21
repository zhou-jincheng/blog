const {Article} = require("../../model/article");
const {Comment} = require("../../model/comment");
module.exports = async (req,res) => {
    // 接受请求的文章id
    let {id} = req.query;
    let article = await Article.findOne({_id:id}).populate("author");
    // 根据文章id查找改文章所属的评论
    let comments = await Comment.find({aid:id}).populate("uid");
    // res.send(comments);
    // res.send(article);
    res.render("home/article",{
        article,
        comments
    })
}
