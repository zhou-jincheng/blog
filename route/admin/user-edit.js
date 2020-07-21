const {User} = require("../../model/user");
module.exports = async (req,res) => {

    // 标识 标识当前访问的页面是用户管理页面
    req.app.locals.currentLink = "user";

    const {message,id} = req.query;
    if(id){
        // 修改用户
        const user = await User.findOne({_id:id});
        res.render("admin/user-edit",{
            message,
            user,
            link:"/admin/user-modify?id="+id,
            button:"修改"
        });
    }else{
        // 添加用户
        console.log("添加用户！");
        res.render("admin/user-edit",{
            message,
            link:"/admin/user-add",
            button:"添加"
        });
    }  
}