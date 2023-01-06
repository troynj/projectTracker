function writeList(data) {
	localStorage.setItem("projects", JSON.stringify(data));
}

function readList() {
	let data = localStorage.getItem("projects");
	return data === null ? [] : JSON.parse(data);
}

function updateList() {
	function makeRow(name, type, date, index) {
		const row = $("<tr>");
		row.append($("<td>" + name + "</td>"));
		row.append($("<td>" + type + "</td>"));
		row.append($("<td>" + date + "</td>"));
		let button = $("<button>X</button>");
		button.attr("data-field", index);
		row.append($("<td>").append(button));
		return row;
	}
	const data = readList();
	console.log({ data });
	let table = $("#table-content");
	table.empty();
	data.forEach((project, index) => {
		table.append(makeRow(project.name, project.type, project.dueDate, index));
	});
}
$("#table").on("click", "*[data-field]", (e) => {});
updateList();
