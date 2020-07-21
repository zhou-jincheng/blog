// 引入mongoose模块
const mongoose = require("mongoose");

const articleSchema = mongoose.Schema({
    title:{
        type:String,
        required:[true,'文章标题为必填选项！'],
        minlength:2,
        maxlength:30
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,'请传递文章作者']
    }, 
    publishDate:{
        type:Date,
        default:Date.now
    },
    cover:{
        type:String,
        default:null
    },
    content:{
        type:String
    }   
});
const Article = mongoose.model("Article",articleSchema);

// 初始化数据
/* async function initArticle(){
    const article = await Article.create({
        title:"我在测试啊!",
        author:'5ee0782f948fb01d209a257e',
        content:'测试内容为周金成最帅！'
    }).then(() => console.log("初始化数据成功!"))
    .catch(err => console.log("初始化数据失败!",err));
}
initArticle(); */

module.exports = {
    Article
}
