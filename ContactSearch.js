var searchTerms = {

Name: $("#Name").val(),
Number: $("#Phone").val()

};

$("#search-btn").on("click", function () {

    // TODO: Add search fields to html, and use jQuery to get values from them and put them in the searchTerms object.
    var searchTerms = {

		Name: $("#Name").val(),
		Number: $("#Phone").val()
	};
	contactSearch(searchTerms);
});

function contactSearch (searchTerms) {

    $.ajax({
        type: 'POST',
        url: "http://contactbookapi.sihs.dev2.edsiohio.com/api/contact/search",
        data: searchTerms,
        dataType: "JSON",
        success: function(resultData) {
            console.log(resultData);
            displayData(resultData);
        },
        error: function(resultData) {
            alert("An error has occured.");
        }
    });
}

function editContact(id){
	window.location.href="ContactAddEdit.html?id=" + id;
}
function deleteContact(id){
	var contactId = id;
	$.ajax({
        type: 'POST',
        url: "http://contactbookapi.sihs.dev2.edsiohio.com/api/contact/DeletePersonById",
        data: JSON.stringify(contactId),
		contentType: 'application/json',
        dataType: "JSON",
        success: function(resultData) {
            alert("Contact deleted!");
						console.log(contactId);
						contactSearch(searchTerms);
        },
        error: function(resultData) {
            alert("An error has occured.");
        }
    });
}
$("#add-btn").on("click", function () {
	window.location.href="ContactAddEdit.html?id=0";
});

function displayData (data) {

	//Clears data from rows
	$("#contact-list").html('');

	for(i = 0; i < data.length; i++){
		$("#contact-list")
			.append(
			'<div class = "row contact-list-row">' +
			'<div class = "col-md-2">' + data[i].Id + '</div>' +
			'<div class = "col-md-2">' + data[i].FirstName + '</div>' +
			'<div class = "col-md-2">' + data[i].LastName + '</div>' +
			'<div class = "col-md-2">' + data[i].PhoneNumber + '</div>' +
			'<div class = "col-md-2">' + data[i].Email + '</div>' +
			'<div class = "col-md-2">' + '<button class = "btn btn-primary" onclick = "editContact(' + data[i].Id + ')"> Edit </buttton><button class = "btn btn-primary" onclick = "deleteContact(' + data[i].Id + ')"> Delete </buttton></div></div>');
	}

}
