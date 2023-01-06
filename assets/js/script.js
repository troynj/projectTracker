function writeList(data) {
	localStorage.setItem("projects", JSON.stringify(data));
}

function readList() {
	let data = localStorage.getItem("projects");
	return data === null ? [] : JSON.parse(data);
}
