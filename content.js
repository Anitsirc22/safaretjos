var content_button=document.getElementsByClassName("content_button")[0];
var content_button_exit=document.getElementsByClassName("content_button_exit")[0];
var content=document.getElementsByClassName("content_box")[0];

content_button.addEventListener('click',function(e){
	content.style.display="block";
	
});

content_button_exit.addEventListener('click',function(e){
	content.style.display="none";
	
});

