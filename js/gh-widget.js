/* Get data */
function http(method, url, onSuccess){
	var request = new XMLHttpRequest();
	request.open(method, url);
	request.onload = function(){
		if(request.status === 200){
			onSuccess(JSON.parse(request.responseText));	
		}
	}
}
