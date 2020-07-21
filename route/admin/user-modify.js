const { User } = require("../../model/user");
// 引入密码加密模块
const bcrypt = require("bcrypt");
module.exports = async (req, res, next) => {
    const id = req.query.id;
    const user = await User.findOne({ _id: id });
    const isEqual = await bcrypt.compare(req.body.password, user.password);
    // 判断是否修改了邮箱
    if (req.body.email != user.email) {
        // 判断被修改的邮箱是否被注册过！
        let otheruser = await User.findOne({ email: req.body.email });
        if (otheruser) {
        return next(JSON.stringify({
                path: "/admin/user-edit",
                message: "该邮箱地址已被注册过！",
                id
            }))
        }
    }
    if (isEqual) {
        // 密码输入正确
        let { username, email, role, state } = req.body;
        await User.updateOne({ _id: id }, {
            username,
            email,
            role,
            state
        });
        res.redirect("/admin/user");
    } else {
        next(JSON.stringify({
            path: "/admin/user-edit",
            message: "输入的密码不正确！",
            id
        }))
    }
}