const request=require('request');
const cheerio=require('cheerio');
const fs=require('fs');
const path=require('path');
const url="https://cnodejs.org/?tab=good&page=";
for(let i=1;i<=16;i++){
	request(url+i,(error,response,body)=>{
		if(error && response.statusCode==200){
			console.log(error);
		}
		accepteData(body);
	});
}
	
function accepteData(data){
	let $=cheerio.load(data);
	let userNames=$('.user_avatar img').toArray();
	for(let i=0;i<userNames.length;i++){
		let src=userNames[i].attribs.src;
		let filename=basicName(userNames[i].attribs.title);
		downloadFile(src,filename,()=>{
		 	console.log('loading image'+i);
		});
	}
	
}
function basicName(addr){
	let filename=path.basename(addr);
	return filename;
}
function downloadFile(uri,filename,cb){
	
	request.head(uri,(error,response,body)=>{
		if(error){
			uri='https:'+uri;
		}
		request(uri).pipe(fs.createWriteStream('images/'+filename+'.jpg')).on('close', cb);
	})
}