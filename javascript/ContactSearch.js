var $;

//Defines object that holds values for name and phone number being searched
var searchTerms = {
  Name: $("#Name").val(),
  Number: $("#Phone").val()
};

//Defines behavior for when search button is pressed.
$("#search-btn").on("click", function () {
    var searchTerms = {

		Name: $("#Name").val(),
		Number: $("#Phone").val()
	};
	contactSearch(searchTerms);
});

//Defines behavior for add button that redirects to new contact page
$("#add-btn").on("click", function () {
	window.location.href="views/ContactAddEdit.html?id=0";
});

//Redirects to Contact add + edit page with the id of selected contact
function editContact(id){
	window.location.href="views/ContactAddEdit.html?id=" + id;
}

//Method that takes searchTerms and makes POST call to server for that data
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

//Makes POST call to server to delete the contact of the selected id
function deleteContact(id){

	$.ajax({
        type: 'POST',
        url: "http://contactbookapi.sihs.dev2.edsiohio.com/api/contact/DeletePersonById",
        data: JSON.stringify(id),
		contentType: 'application/json',
        dataType: "JSON",
        success: function(resultData) {
            alert("Contact deleted!");
						console.log(id);
						contactSearch(searchTerms);
        },
        error: function(resultData) {
            alert("An error has occured.");
        }
    });
}

// Displays data that is returned from contact search call
function displayData (data) {

	//Clears data from rows
	$("#contact-list").html('');

  //Loops through all contacts returned
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
