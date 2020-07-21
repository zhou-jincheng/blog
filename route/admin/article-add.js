const {Article} = require("../../model/article");
const path =require("path");
// 引入表单二进制解析模块formidable
const formidable = require("formidable");

module.exports = (req,res) => {
    // 1创建表单解析对象
    const form = formidable.IncomingForm();
    // 2配置上传文件的所在位置
    form.uploadDir = path.join(__dirname,"../","../","public","uploads");
    // 3保留上传文件的后缀名
    form.keepExtensions = true;
    // 4解析表单
    form.parse(req,async (err,fields,files) => {
        // err 错误对象
        // fields 对象类型 保存普通表单数据
        // files 对象类型 保存了和上传文件相关的数据
        // 图片地址files.cover.path
        let {title,author,publishDate,content} = fields;
        let cover = files.cover.path.split('public')[1];
        await Article.create({
            title,
            author,
            publishDate,
            content,
            cover
        });
        // 重定向文章列表
        res.redirect("/admin/articlePage");
    })
}