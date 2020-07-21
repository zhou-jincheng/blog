module.exports = (req,res,next) => {
    // 判断用户访问的页面不是登录页面,并且还没有登录
    if(req.url != "/login" && !req.session.username){
        res.redirect("/admin/login")
    }else{
        // 如果用户为普通用户
        if(req.session.role == "normal"){
            // 跳转到播客首页,并阻止代码向下运行
            return res.redirect("/home/");
        }
        // 如果用户为管理
        next();
    }
}