const {Article} = require("../../model/article");
module.exports = async (req,res) => {
    // 标识 标识当前访问的页面是文章管理页面
    req.app.locals.currentLink = "article";
    // 根据是否有id判断是新增文章还是修改文章    
    let {id} = req.query;
    if(id){
        // 修改文章
        // 根据id查询文章
        let article = await Article.findOne({_id:id});
        res.render("admin/article-edit",{
            article
        });
    }else{
        //新增文章
        res.render("admin/article-edit");
    }
}