const Joi = require("joi");

// 设置验证规则
const schema = {
    username:Joi.string().min(2).max(5).error(new Error("用户名必须在2~5个字符之间！"))
};

async function run() {
    try{
        await Joi.validate({username : "f"},schema);
    }catch(ex){
        console.log(ex.message);
        return;
    }
    console.log("数据验算成功！");
}

run();
