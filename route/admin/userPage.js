const {User} = require("../../model/user");
// 显示用户列表
module.exports = async (req,res) => {

    // 标识 标识当前访问的页面是用户管理页面
    req.app.locals.currentLink = "user";

    // 从请求中提取出当前页
    let page = req.query.page || 1;
    // 每一页显示的条目
    let pagesize = 8;
    // 查询用户的总条目
    let count = await User.countDocuments({});
    //总页数
    let total = Math.ceil(count/pagesize);
    // 页码对应的数据查询开始位置
    let start = (page-1) * pagesize;

    // 将用户从数据库中查询出来
    let users = await User.find().limit(pagesize).skip(start);
    // 向用户页面渲染数据
    res.render("admin/user",{
        users,
        page,
        total,
        count
    });
}