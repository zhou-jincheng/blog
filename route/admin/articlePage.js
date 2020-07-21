const {Article} = require("../../model/article")
const pagination = require("mongoose-sex-page");
module.exports = async (req,res) => {
    // 标识 标识当前访问的页面是文章管理页面
    req.app.locals.currentLink = "article";
    // 接受当前请求页，默认为第一页
    let page = req.query.page || 1;
    const articles = await pagination(Article).find()
                    .page(page).size(2).display(3).populate("author").exec();
   /*  返回值是对象
    {
        "page": 1,
        "size": 2,
        "total": 5,
        "records": [
        {
        "cover": null,
        "_id": "5ee2fec018179214f06fa04b",
        "title": "我在测试啊!",
        "author": {
        "role": "admin",
        "state": 0,
        "_id": "5ee0782f948fb01d209a257e",
        "username": "zhangsan",
        "email": "zhangsan@itcast.cn",
        "password": "$2b$10$XWUKkTABmnqxmYTX/JXVNuJIjMjN5vX0nqkDx2FtTtE1bTHdO4l4G",
        "__v": 0
        },
        "content": "测试内容为周金成最帅！",
        "publishDate": "2020-06-12T04:04:16.365Z",
        "__v": 0
        },
        {
        "cover": "C:\\Users\\zjc\\Desktop\\blog\\public\\uploads\\upload_9c47fdec410eb071fe581103af624a6a.jpg",
        "_id": "5ef40b77dfebe719e81a010d",
        "title": "zhoudd的逆袭之路",
        "author": {
        "role": "normal",
        "state": 0,
        "_id": "5ee09c32444cde129cb67d0b",
        "username": "zhoudd",
        "email": "zhoudd@itcast.com",
        "password": "$2b$10$Iz2G0yOXrL9qLUU80k880OyXDpTSTydDFUVjYKRcB/d8D.zHAwd6K",
        "__v": 0
        },
        "publishDate": "2020-06-26T00:00:00.000Z",
        "content": "银小树在成长中",
        "__v": 0
        }
        ],
        "pages": 3,
        "display": [
        1,
        2,
        3
        ]
        } */
    // res.send(articles);
    // 渲染文章显示列表
    res.render("admin/article",{
        articles
    });
}