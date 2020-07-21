const {Comment} = require("../../model/comment");
module.exports = async (req,res) => {
    let {aid,uid,content} = req.body;
    // 将评论插入数据库当中
    await Comment.create({
        aid,
        uid,
        content,
        time:new Date()
    });
    // 重定向文章详情页面
    res.redirect(`/home/article?id=${aid}`);
}