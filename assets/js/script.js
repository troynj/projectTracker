$("#create-project-btn").click(() => {
	var modalContentEl = $('#modal-content')
	$('#myModal').css("display", "block")
	modalContentEl.append($('<p>').text('Project Name').css('font-weight', 'bold'))
	modalContentEl.append($('<input>').attr("id", "ui-name"))
	modalContentEl.append($('<p>').text('Project Type').css('font-weight', 'bold'))
	modalContentEl.append($('<input>').attr("id", "ui-type"))
	modalContentEl.append($('<p>').text('Due Date').css('font-weight', 'bold'))
	modalContentEl.append($('<input>').attr("id", "ui-date"))

	var cancelBtnEl = $('<button>').attr("id", "cancel-btn")
	cancelBtnEl.click(() => {
		$('#myModal input').val("")
    closeModal()
	})
	modalContentEl.append(cancelBtnEl.text("Cancel"))

	var addBtnEl = $('<button>').attr("id", "add-btn")
	addBtnEl.click(() => {
		var tempName = $("#ui-name").val()
		var tempType = $("#ui-type").val()
		var tempDate = $("#ui-date").val()
    var tempData = readList()
    tempData.push({ name: tempName, type: tempType, dueDate: tempDate })

    console.log("hello")
writeList(tempData)
updateList()
closeModal()

	})

	modalContentEl.append(addBtnEl.text("Add Project"))


})

function closeModal() {
  $('#myModal').css("display", "none")
  $('#modal-content').empty()

}

function displayClock() {
  setInterval(function () {
    var unix = dayjs().unix();
    var today = dayjs.unix(unix).format("MMMM D, YYYY h:mm:ss");
    $("#clock").text(today);
  }, 1000);
}

function writeList(data) {
  localStorage.setItem("projects", JSON.stringify(data));
}

function readList() {
  let data = localStorage.getItem("projects");
  return data === null
    ? [{ name: "test", type: "World", dueDate: "1-2-3" }]
    : JSON.parse(data);
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
$("#table").on("click", "*[data-field]", (e) => {
  const index = Number($(e.target).attr("data-field") || -1);
  if (index === -1) return;
  const projects = readList();
  projects.splice(index, 1);
  writeList(projects);
  updateList();
});

function init() {
  displayClock();
  updateList();
}

init();
