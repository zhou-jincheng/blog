// 引入express框架
const express = require("express");
// 引进路径处理模块path
const path = require("path");
//引入body-parser模块
const bodyParser = require("body-parser");
// 引进express-session模块
const session = require("express-session");
// 引入时间格式化模块
const dateFormat = require("dateformat");
// 引入第三方模块morgan,将客户端的请求信息打印到控制台
const morgan = require("morgan");
// 引入第三方模块config 用于配置文件
const config = require("config");

//连接数据库
require(path.join(__dirname, "model", "connect"));

// 使用框架创建web服务器
const app = express();

// 配置模板全局变量
app.locals.dateFormat = dateFormat;

// 配置body-parser模块
app.use(bodyParser.urlencoded({ extended: false }));

// 配置session
app.use(session({
    resave: false, //添加 resave 选项,重新保存：强制会话保存即使是未修改的。
    saveUninitialized: false, //添加 saveUninitialized 选项,强制“未初始化”的会话保存到存储。
    secret: "secret key",
    cookie: {//过期时间，以毫秒为单位
		maxAge: 24 * 60 * 60 * 1000
	}
}));

// 当渲染后缀为art的模板时 使用express-art-template
app.engine(".art", require("express-art-template"));
// 设置模板存放目录
app.set("views", path.join(__dirname, "views"));
// 渲染模板不写后缀时，默认拼接.art后缀
app.set("view engine", "art");

// 开放静态文件
app.use(express.static(path.join(__dirname, "public")));


console.log(config.get("title"));
// 获取系统环境变量，返回值是对象
if(process.env.NODE_ENV == "development"){
    // 当前是开发环境
    console.log("当前是开发环境");
    // 在开发环境中 将客户端发送到服务端的请求信息打印到控制台中
    app.use(morgan("dev"));
}else{
    //当前是生产环境
    console.log("当前是生产环境");
}

// 引入路由模块
const admin = require("./route/admin");
const home = require("./route/home");

// 拦截请求，验证用户登录状态
app.use("/admin",require("./middleware/loginGuard"))

// 为路由匹配路径
app.use("/admin", admin);
app.use("/home", home);

//对异常进行处理
app.use((err, req, res, next) => {
    console.log("错误信息在这："+err.message)
    const result = JSON.parse(err);
    const params = [];
    for(let attr in result){
        if(attr != "path"){
            params.push(attr + "=" + result[attr]);
        }
    }
    res.status(400).redirect(`${result.path}?${params.join("&")}`);
})

// 监听80窗口
app.listen(80);
console.log("服务器启动成功！");