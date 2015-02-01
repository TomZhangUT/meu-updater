function deleteEvent(id){
	var baseurl = "/event/destroy/";
	$.ajax({url: baseurl + id,success:function(result){
		$("#row-"+id).remove();
		console.log("Removed: " + id);
	}});
}
