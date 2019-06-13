// JavaScript Document
$(function(){
	$("#searchfuzzy").click(function(){
		var address="";
		var ins=$("#fuzzy").val();
		var tag="";
		search(address,ins,tag,'');
	});
	$("#fuzzy").keydown(function(event){
		if(event.keyCode==13){
		var address="";
		var ins=$("#fuzzy").val();
		var team="";
		var tag="";
		search(address,ins,tag,team); 
		} 
	});
	//select 
	$("#foot select").select2();
	function search(address,ins,tag,team){
		location.href =  "/instrument/toinstrumentlist.lf?searchaddressval="+address+"&searchinstval="+ins+"&tagnameval="+tag+"&inst="+team;
	}
});