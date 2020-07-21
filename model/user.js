const mongoose = require("mongoose");
//引入加密模块
const bcrypt = require("bcrypt");
// 引入格式验证模块
const Joi = require("joi");

// 数据原型规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        // 保证邮箱地址在插入数据库时不重复
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        // normal为普通用户，admin为超级管理员
        enum: ["admin", "normal"],
        required: true,
        default: "normal"
    },
    state: {
        type: Number,
        // 0为启用状态，1为禁用状态
        enum: [0, 1],
        required: true,
        default: 0
    }
})

// 创建数据操作原型
const User = mongoose.model("User", userSchema);

//插入数据
// async function createUser(user) {
//     // 对密码进行加密
//     const salt = await bcrypt.genSalt(10);
//     const psw = await bcrypt.hash(user.password,salt);
//     //创建初始数据
//     const user = await User.create({
//         username: user.username,
//         email: user.email,
//         password: psw,
//         role: user.role,
//         state: user.state
//     });
// }

// 验证用户信息
const validateUser = user => {
    // 制定验证规则
    const schema = {
        username: Joi.string().min(2).max(20).required().error(new Error("用户名格式不正确！")),
        email: Joi.string().email().required().error(new Error("邮箱格式不正确！")),
        password: Joi.string().regex(/^[a-zA-Z0-9]{2,20}$/).required().error(new Error("密码格式不正确！")),
        role: Joi.string().valid("normal", "admin").required().error(new Error("角色值选择错误！")),
        state: Joi.number().valid(0, 1).required().error(new Error("状态值非法！"))
    }
    return Joi.validate(user, schema);
}

// 开放数据原型
module.exports = {
    User,
    validateUser
}
