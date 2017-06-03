 
var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');
var requrl = 'https://www.lagou.com/zhaopin/';
var pageNum=20;
const items=['Java','PHP','C++','Node.js','Python','C#','C','Ruby','Perl']
for(let i=1;i<=pageNum;i++){
    request(requrl+item[i]+'/'+i+'/?filterOption='+i, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // console.log(body);    //返回请求页面的HTML
            acquireData(body);
        }
    });
}

    

 
function acquireData(data) {
    var $ = cheerio.load(data);
    var meizi = $('.content img').toArray();
    console.log(meizi);
    var len = meizi.length;
    for (var i=0; i<len; i++) {
    	console.log(meizi[i]);
        var imgsrc = meizi[i].attribs.src;
        // console.log(imgsrc);
        var filename = parseUrlForFileName(imgsrc);  //生成文件名
        downloadImg(imgsrc,filename,function() {
            console.log(filename + ' done');
        });
    }
}
 
function parseUrlForFileName(address) {
    var filename = path.basename(address);
    return filename;
}
 
var downloadImg = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
    // console.log('content-type:', res.headers['content-type']);  //这里返回图片的类型
    // console.log('content-length:', res.headers['content-length']);  //图片大小
    if (err) {
        console.log('err: '+ err);
        return false;
    }
    console.log('res: '+ res);
    request(uri).pipe(fs.createWriteStream('images/'+filename)).on('close', callback);  //调用request的管道来下载到 images文件夹下
    });
};