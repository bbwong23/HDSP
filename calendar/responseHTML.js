function getBody(content) 
{
   test = content.toLowerCase();    // to eliminate case sensitivity
   var x = test.indexOf("<head");
   if(x == -1) return "";

   x = test.indexOf(">", x);
   if(x == -1) return "";

   var y = test.lastIndexOf("</head>");
   if(y == -1) y = test.lastIndexOf("</html>");
   if(y == -1) y = content.length;    // If no HTML then just grab everything till end

   return content.slice(x + 1, y);   
} 

/**
	Loads a HTML page
	Put the content of the body tag into the current page.
	Arguments:
		url of the other HTML page to load
		id of the tag that has to hold the content
*/		

function loadHTML(url, destination)
{
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange=function() { 
		if(xhr.readyState == 4) {
			destination.innerHTML = getBody(xhr.responseText);
			var arr = destination.getElementsByTagName('script');
			destination.appendChild(arr[3]);
			eval(arr[3].innerHTML);
		}
	}; 

	xhr.open("GET", url , true);
	xhr.send(null); 
} 
	

function loadWholePage(url)
{
	
	loadHTML(url, document.getElementById('displayCalendar'));
}	
