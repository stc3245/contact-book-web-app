// takes the search address and slices of the contact id of contact
var qs = location.search;
var userID = qs.slice(4);

// If a contact id is passed in, load data. If not, load empty boxes.
$(document).ready(function() {

	if(userID == 0){
		displayBoxes(userID);
	}
	else{
		$.ajax({
			type: 'POST',
			url: "http://contactbookapi.sihs.dev2.edsiohio.com/api/contact/byid",
			data: userID,
			contentType: 'application/json',
			dataType: "JSON",
			success: function(resultData) {
				console.log(resultData);
				displayData(resultData);
			},
			error: function(resultData) {
				alert("An error has occured.");
			}
		});

		$.ajax({
			type: 'POST',
			url: "http://contactbookapi.sihs.dev2.edsiohio.com/api/contact/ContactInfoByUserId",
			data: userID,
			contentType: 'application/json',
			dataType: "JSON",
			success: function(resultData) {
				console.log(resultData);
				displayContactInfoData(resultData);
			},
			error: function(resultData) {
				alert("An error has occured.");
			}
		});
		$.ajax({
			type: 'POST',
			url: "http://contactbookapi.sihs.dev2.edsiohio.com/api/contact/AddressesByUserId",
			data: userID,
			contentType: 'application/json',
			dataType: "JSON",
			success: function(resultData) {
				console.log(resultData);
				displayAddressInfo(resultData);

			},
			error: function(resultData) {
				alert("An error has occured.");
			}
		});
	}
});

// Defines cancel button behavior which returns to contact search page
$("#Cancel-btn").on("click", function () {
	window.location.href="ContactSearch.html";
});

// Defines add contact info behavior which redirects if there is a contact id
$("#addcontactinfo-btn").on("click", function () {
	if(userID == 0){
		alert("You must first save a contact before adding more contact information");
	}
	else{
		editContactInfo(0);
	}
});

// Defines add address behavior which redirects if there is a contact id
$("#addcontactaddress-btn").on("click", function () {
	if(userID == 0){
		alert("You must first save a contact before adding an address");
	}
	else{
		editContactAddress(0);
	}
});

// Defines edit contact info behavior which redirects to edit page
function editContactInfo(id){
	window.location.href="ContactInfoAddEdit.html?id=" + id + "?userID="+ userID;
}

// Defines edit addres behavior which redirects to edit page
function editContactAddress(id){
	window.location.href="ContactAddressAddEdit.html?id=" + id + "?userID="+userID;
}

//Makes POST call to server that deletes the contact info of the selected id
function deleteContactInfo(contactInfoid){

	$.ajax({
        type: 'POST',
        url: "http://contactbookapi.sihs.dev2.edsiohio.com/api/contact/DeleteContactInfoById",
        data: JSON.stringify(contactInfoid),
		contentType: 'application/json',
        dataType: "JSON",
        success: function(resultData) {
            alert("Contact Info deleted!");
						window.location.href="ContactAddEdit.html?id=" + userID;
        },
        error: function(resultData) {
            alert("An error has occured.");
        }
    });
}

//Makes POST call to server that deletes the address info of the selected id
function deleteContactAddress(Addressid){
	$.ajax({
        type: 'POST',
        url: "http://contactbookapi.sihs.dev2.edsiohio.com/api/contact/DeleteAddressById",
        data: JSON.stringify(Addressid),
		contentType: 'application/json',
        dataType: "JSON",
        success: function(resultData) {
            alert("Address deleted!");
						window.location.href="ContactAddEdit.html?id=" + userID;
        },
        error: function(resultData) {
            alert("An error has occured.");
        }
    });
}

//Defines behavior for save button that saves current contact
$("#save-btn").on("click", function () {
	var firstName = document.getElementById("FirstName").value;
	var lastName = document.getElementById("LastName").value;
	var DOB = document.getElementById("DOB").value

	// Checks to see if date is valid
	var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
	var isValidDate = date_regex.test(DOB);

	// Makes sure all fields filled in
	if (!firstName || !lastName || !DOB) {
		alert("Please fill in all text fields before proceeding")
	}
	// Alerts if date invalid
	else if(!isValidDate){
		alert("Please fill in a valid date (format: MM/DD/YYYY)")
	}
	else{
		var saveContact = {
			"Id": userID,
			"FirstName": firstName,
			"LastName": lastName,
			"DOB": DOB
		}
		var myJSON = JSON.stringify(saveContact);

		$.ajax({
			type: 'POST',
			url: 'http://contactbookapi.sihs.dev2.edsiohio.com/api/contact/ContactAddEdit',
			data: myJSON,
			contentType: 'application/json',
			dataType: 'JSON',
			success: function(resultData) {
				alert("Contact has been saved.");
				window.location.href="ContactSearch.html";
			},
			error: function(resultData) {
				alert("An error has occured.");
			}
		});
	}
});

// Gets the current date for default of new contacts
function getDate(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();

	if (dd < 10) {
	  dd = '0' + dd;
	}

	if (mm < 10) {
	  mm = '0' + mm;
	}

	today = mm + '/' + dd + '/' + yyyy;
	return today;
}

// Displays current info for selected contact id
function displayData(data) {
	//Make sure date displays correctly
	var date = data.DOB.split("/");
	if(date[0].length == 1){
		date[0] = '0' + date[0];
	}
	if(date[1].length == 1){
		date[1] = '0' + date[1];
	}
	var date = date[0] + "/" + date[1] +"/"+ date[2];
	$("#text-boxes")
		.append(
		'<div class = "row" style = "text-align: center;">'+
			'<div class="col-md-4">First Name: <input type = "text" id = "FirstName" value = "'+ data.FirstName +'"></div>'+
			'<div class="col-md-4">Last Name: <input type = "text" id = "LastName" value ="'+ data.LastName +'"></div>'+
			'<div class="col-md-4"> Date of Birth: <input type = "text" id = "DOB" value ="'+ date +'"></div>'+
		'</div>'
	)
}

// Displays empty boxes for new contact
function displayBoxes(id){
	$("#text-boxes")
		.append(
		'<div class = "row" style = "text-align: center;">'+
			'<div class="col-md-4">First Name: <input type = "text" id = "FirstName"></div>'+
			'<div class="col-md-4">Last Name: <input type = "text" id = "LastName"></div>'+
			'<div class="col-md-4"> Date of Birth: <input type = "text" value = '+ getDate() +' id = "DOB"></div>'+
		'</div>'
	)
}

// Displays contact info data of contact if there is any
function displayContactInfoData(data){
	for(i = 0; i < data.length; i++){
		$("#contact-info")
			.append(
			'<div class = "row contact-list-row">' +
				'<div class = "col-md-4">' + data[i].Text + '</div>' +
				'<div class = "col-md-4">' + data[i].TypeName + '</div>' +
				'<div class = "col-md-4"> <button id="editcontactinfo-btn" onclick = "editContactInfo(' + data[i].Id + ')" class="btn btn-primary">Edit</button>'+
				'<button id="Delete-btn" onclick = "deleteContactInfo(' + data[i].Id + ')" class="btn btn-primary">Delete</button></div>'+
			'</div>'
		)
	}
}

// Displays address data of contact if there is any
function displayAddressInfo(data){
	for(i = 0; i < data.length; i++){
		$("#address-info")
			.append(
			'<div class = "row contact-list-row">' +
				'<div class = "col-md-4">' + data[i].AddressLine1 + '</div>' +
				'<div class = "col-md-4">' + data[i].AddressTypeName + '</div>' +
				'<div class = "col-md-4"> <button id="editaddressinfo-btn" onclick = "editContactAddress(' + data[i].Id + ')" class="btn btn-primary">Edit</button>'+
				'<button id="Delete-btn" onclick = "deleteContactAddress(' + data[i].Id+ ')" class="btn btn-primary">Delete</button></div>'+
			'</div>'
		)
	}

}
