var qs = location.search;
var userID = qs.slice(4);

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

$("#Cancel-btn").on("click", function () {
	window.location.href="ContactSearch.html";
});

$("#addcontactinfo-btn").on("click", function () {
	editContactInfo(0);
});

$("#addcontactaddress-btn").on("click", function () {
	editContactAddress(0);
});

function editContactInfo(id){
	window.location.href="ContactInfoAddEdit.html?id=" + id + "?userID="+ userID;
}

function editContactAddress(id){
	window.location.href="ContactAddressAddEdit.html?id=" + id + "?userID="+userID;
}

function deleteContactInfo(contactInfoid){

	$.ajax({
        type: 'POST',
        url: "http://contactbookapi.sihs.dev2.edsiohio.com/api/contact/DeleteContactInfoById",
        data: JSON.stringify(contactInfoid),
		contentType: 'application/json',
        dataType: "JSON",
        success: function(resultData) {
            alert("Contact Info deleted!");
						console.log(contactInfoid);
							window.location.href="ContactAddEdit.html?id=" + userID;
        },
        error: function(resultData) {
            alert("An error has occured.");
        }
    });
}
function deleteContactAddress(Addressid){
	$.ajax({
        type: 'POST',
        url: "http://contactbookapi.sihs.dev2.edsiohio.com/api/contact/DeleteAddressById",
        data: JSON.stringify(Addressid),
		contentType: 'application/json',
        dataType: "JSON",
        success: function(resultData) {
            alert("Address deleted!");

			console.log(Addressid);
        },
        error: function(resultData) {
            alert("An error has occured.");
        }
    });
}

$("#save-btn").on("click", function () {
	var saveContact = {
		"Id": userID,
		"FirstName": document.getElementById("FirstName").value,
		"LastName": document.getElementById("LastName").value,
		"DOB": document.getElementById("DOB").value
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
});


function displayData(data) {
	$("#text-boxes")
		.append(
		'<div class = "row" style = "text-align: center;">'+
			'<div class="col-md-4">First Name: <input type = "text" id = "FirstName" value = " ' + data.FirstName + '"></div>'+
			'<div class="col-md-4">Last Name: <input type = "text" id = "LastName" value =" ' + data.LastName + '"></div>'+
			'<div class="col-md-4"> Date of Birth: <input type = "text" id = "DOB" value =" ' + data.DOB + '"></div>'+
		'</div>'
	)
}
function displayBoxes(id){
	$("#text-boxes")
		.append(
		'<div class = "row" style = "text-align: center;">'+
			'<div class="col-md-4">First Name: <input type = "text" id = "FirstName"></div>'+
			'<div class="col-md-4">Last Name: <input type = "text" id = "LastName"></div>'+
			'<div class="col-md-4"> Date of Birth: <input type = "text" id = "DOB"></div>'+
		'</div>'
	)
}
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
