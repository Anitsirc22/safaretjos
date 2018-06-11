var content_button=document.getElementsByClassName("content_button")[0];
var content_button_exit=document.getElementsByClassName("content_button_exit")[0];
var content=document.getElementsByClassName("content_box")[0];

content_button.addEventListener('click',function(e){
  content.style.display="block";
  setTimeout(function(){content.style.opacity=1}, 0);
	
});

content_button_exit.addEventListener('click',function(e){
  content.style.opacity = 0;
  setTimeout(() => {
    content.style.display="none";
  },200);
});

