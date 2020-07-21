const mongoose = require("mongoose");
const commentSchema = mongoose.Schema({
    // 文章id
    aid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Article'
    },
    // 用户id
    uid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    // 评论时间
    time:{
        type:Date,
        default:Date.now
    },
    // 评论内容
    content:{
        type:String
    }
})
// 使用集合规则创建集合
const Comment = mongoose.model("Comment",commentSchema);
// 将评论集合构造函数作为模块成员进行导出
module.exports = {
    Comment
}