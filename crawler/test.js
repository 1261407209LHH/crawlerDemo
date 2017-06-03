 
var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');
// var requrl = 'http://www.hhh50.com/AAtupian/AAAwz/3b8545d095b92c2cfc3285dc4249fcfe.html';
// var requrl = 'http://www.7160.com/xingganmeinv/list_3_';
var requrl="http://www.kugou.com/yy/index.php?r=play/getdata&hash=D8AB5D79D8D653625EFDC2BB3BFD4B24&album_id=0&_=1495187887873";
// var pageNum=20;
// for(let i=1;i<=pageNum;i++){
//     request(requrl+i+'.html', function (error, response, body) {
//         if (!error && response.statusCode == 200) {
//             // console.log(body);    //返回请求页面的HTML
//             acquireData(body);
//         }
//     });
// }

 
request(requrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // console.log(body);    //返回请求页面的HTML
            acquireData(body);
        }
    });

    

 
function acquireData(data) {
    // var $ = cheerio.load(data);
    // var meizi = $('.content img').toArray();
    // console.log(meizi);
    // var len = meizi.length;
    // for (var i=0; i<len; i++) {
    // 	console.log(meizi[i]);
    //     var imgsrc = meizi[i].attribs.src;
        // console.log(imgsrc);
        // var filename = parseUrlForFileName(imgsrc);  //生成文件名
        // downloadImg(imgsrc,filename,function() {
        //     console.log(filename + ' done');
        // });
    // }
    var info=JSON.parse(data);
    var imgsrc=info.data.play_url;
    var filename = parseUrlForFileName(imgsrc);
    downloadImg(imgsrc,filename,function(){
        console.log(filename + ' done');
    });
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