const request=require('request');
const cheerio=require('cheerio');
const fs=require('fs');
const path=require('path');
const express=require('express');
const app=express();
const url="https://cnodejs.org/?tab=all&page=";
const pagesNum=5;
let allContents=new Array();
for(let i=1;i<=pagesNum;i++){
	request(url+i,(error,response,body)=>{
		if(error && response.statusCode==200){
			console.log(error);
		}
		accepteData(body);
	});
}

function translate($,strings){
		let Obj=$(strings).toArray();
		return Obj;	
}

function accepteData(data){
	let $=cheerio.load(data);
	let user=translate($,'.user_avatar img');
	for(let i=0;i<user.length;i++){
		let content={
			"user":{
				"name":user[i].attribs.title,
				"avatar":user[i].attribs.src
			},
			"title":translate($,'.topic_title_wrapper a')[i].attribs.title,
			"article":'https://cnodejs.org'+translate($,'.topic_title_wrapper a')[i].attribs.href,
			"types":$('.topic_title_wrapper span')[i]?translate($,'.topic_title_wrapper span')[i].children[0].data : "null",
			"count":{
				"reply":translate($,'.count_of_replies')[i].children[0].data.trim(),
				"click":translate($,'.count_of_visits')[i].children[0].data.trim()
			},
			"last_active_time":$('.last_time span')[i]?translate($,'.last_time span')[i].children[0].data :"null",

		};
		allContents.push(content);
		
	}
	
	
}
app.get('/api/all',(req,res)=>{
	res.json(allContents);
});
app.listen(3000,()=>{
	console.log('listening at 3000');
});