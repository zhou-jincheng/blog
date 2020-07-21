// 引入数据操作原型
const { User } = require("../../model/user");
// 引入密码加密模块
const bcrypt = require("bcrypt");
module.exports = async (req, res) => {
    // 登录功能模块
    const { email, password } = req.body;
    if (email.trim().length == 0 || password.trim().length == 0) {
        return res.status.render("admin/error", {
            msg: "邮箱或密码为空！"
        });
    }

    // 登录验证
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).render("admin/error", {
            msg: "用户不存在！"
        })
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
        return res.status(400).render("admin/error", {
            msg: "用户名与密码不匹配！"
        })
    }

    //app可以从req中获取
    req.app.locals.userInfo = user;
    req.session.role = user.role;
    req.session.username = user.username;
    //验证登陆者的身份
    if(user.role == "admin"){
        // 管理员
        res.redirect("/admin/user");
    }else{
        // 普通用户
        res.redirect("/home/")
    }
}