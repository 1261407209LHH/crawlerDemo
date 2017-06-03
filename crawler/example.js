$(function(){
	var mdata={};
	var url='/javascript/movie.json';
	$.getJSON(url,function(data){
		mdata=data;
		render_editor_form(data);
		render_event_form($.toJSON(data));
	});
	var render_editor_form=function(data){
		$('#c_editor').val($.toJSON(data));
	};
	var render_event_form=function(){
		$('#c_save').on('click',function(event){
			var data={};
			data['content']=mdata;
			$.ajax({
				type:"POST",
				url:"/movie/add",
				data:data,
				success:function(data,textStatus){
					if(data.success){
						$('#msg').html('成功保存！');
						$('#msg').addClass('alert alert-success');
						$(location).attr('href','/movie/'+mdata.name);
					}else{
						$('#msg').html(data.err);
						$('#msg').addClass('alert alert-error');
					}
				}
			});
		});
	}
})