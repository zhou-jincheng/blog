
const { User,validateUser } = require("../../model/user");
const bcrypt = require("bcrypt");

module.exports = async (req, res,next) => {
    

    // 实施验证
    try {
        await validateUser(req.body);
    } catch (ex) {
        // 验证没通过
        // return res.redirect(`/admin/user-edit?message=${ex.message}`);
        return next(JSON.stringify({
            path:"/admin/user-edit",
            message:ex.message
        }))
    }

    // 判断当前邮箱是否被注册过！
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        // return res.redirect(`/admin/user-edit?message=邮箱地址已经被占用`);
        return next(JSON.stringify({
            path:"/admin/user-edit",
            message:"邮箱地址已经被占用"
        }))
    }

    //对密码进行加密
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password,salt);
    // 替换密码
    req.body.password = password;
    // 向数据库中插入数据
    await User.create(req.body);
    res.redirect("/admin/user");
}