// 获取表单中用户输入的值
function serializeToJson(form){
    let result={};
    //获取表单中用户输入的内容，表单项(input等)应有name属性
    var f = form.serializeArray();
    f.forEach(element => {
        result[element.name]=element.value;
    });
    return result;
}