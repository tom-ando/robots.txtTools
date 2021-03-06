function robots() {
	// Save old document before anything happens
	var oldDocument = document.body.innerHTML;
	
	// Banner to show that something is happening
	var banner = '<div style="background: green; color: white; position: fixed; top: 0; left: 0; right: 0; text-align: center; font-family: sans-serif; z-index: 9999999999999;">Loading...</div>';
	document.body.innerHTML += banner;
	
	// Get base of url and site name
	var url = location.origin;
	var sitename = url.split(":")[1].substring(2);
	
	// XMLHttp request for url/robots.txt
	var requestUrl = url + "/robots.txt";
	var request = new XMLHttpRequest();
	var file;
	
	request.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			file = this.responseText;
			
			// Make sure that the file isn't empty
			if (file != '') {			
				// Parse file and generate HTML
				file = file.split("\n");
				var html = '<style>#file {font-family: monospace; background: white; position: fixed; top: 0; left: 0; bottom: 0; right: 0; overflow: scroll; padding: 20px;} p {color: black;} a {color: blue;}</style><div id="file"><a style="position: fixed; right: 10%;" href="#" id="close">Close</a>';
				
				// Loop through lines
				for (i=0; i<file.length; i++) {
					var line = file[i].split(" ");
					
					// Clean up line to remove any extra spaces from the array
					while (line.indexOf("") != -1) {
						line.splice(line.indexOf(""), 1);
					}
					
					// Checking for characters that aren't in a proper URL, and not linking them
					if ((line[0] == "Disallow:" || line[0] == "Allow:" || line[0] == "Sitemap:") && line[1].indexOf("*") == -1) {
						if (line[1].indexOf("$") != -1) {
							line[1] = line[1].substring(0, line[1].length - 2);
						}
						html += "<p>" + line[0] + ' <a href="' + line[1] + '" target="_blank">' + line[1] + "</a></p>";
					} else {
						html += "<p>" + line.join(" ") + "</p>";
					}
				}
				html += "</div>";
				
				// Load HTML into page
				document.body.innerHTML = html;
				document.title = sitename + "'s robots.txt";
				
				// Add event listener for the close button
				document.querySelector("#close").addEventListener("click", function() {
					document.body.innerHTML = oldDocument;
				});
				
			} else {
				// Banner for when robots.txt file is empty
				var html = '<div onclick="this.innerHTML=\'\';" style="background: red; color: white; position: fixed; top: 0; left: 0; right: 0; text-align: center; font-family: sans-serif; z-index: 9999999999999;">robots.txt file is empty!</div>';
				document.body.innerHTML += html;
			}
		} else if (this.readyState == 4 && this.status != 200) {
			// Banner for when robots.txt file not found
			var html = '<div onclick="this.innerHTML=\'\';" style="background: red; color: white; position: fixed; top: 0; left: 0; right: 0; text-align: center; font-family: sans-serif; z-index: 9999999999999;">robots.txt file not found!</div>';
			document.body.innerHTML += html;
		}
	}
	request.open("GET", requestUrl, true);
	request.send();
}