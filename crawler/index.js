var express=require('express');
var routes=require('./routes');
var user=require('./routes/movie');
var http=require('http');
var path=require('path');
var ejs=require('ejs');
var SessionStore=require('session-mongoose')(express);
app.get('/movie/add',movie.movieAdd);//增加
app.post('/movie/add',movie.doMovieAdd);//提交
app.get('/movie/:name',movie.movieAdd);//编辑查询
app.get('/movie/json/:name',movie.movieJson);//JSON数据
