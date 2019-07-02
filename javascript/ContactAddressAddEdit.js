var qs = location.search;
var stuff = qs.split("=");

var ID = stuff[1].slice(0,3);
if (ID[0] == 0) {
	ID = 0;
}
var contactID = stuff[2];

$( document ).ready(function() {
	if(ID == 0){
		displayBoxes(ID);
	}
	else{
		$.ajax({
			type: 'POST',
			url: "http://contactbookapi.sihs.dev2.edsiohio.com/api/contact/addressbyid",
			data: ID,
			contentType: 'application/json',
			dataType: "JSON",
			success: function(resultData) {
				console.log(resultData);
				displayAddressData(resultData);
			},
			error: function(resultData) {
				alert("An error has occured.");
			}
		});
	}
});
function displayBoxes(id){
	$("#text-boxes")
		.append(
		'<div class = "row" style = "text-align: center;">'+
			'<div class="col-md-4">Address Line 1: <input type = "text" id = "AddressLine1"></div>'+
			'<div class="col-md-4">Address Line 2: <input type = "text" id = "AddressLine2"></div>'+
			'<div class="col-md-4">Address Line 3: <input type = "text" id = "AddressLine3"></div>'+
		'</div>'+
		'<div class = "row" style = "text-align: center;">'+
			'<div class="col-md-3">City: <input type = "text" id = "city"></div>'+
			'<div class="col-md-3">State: <input type = "text" id = "statecd"></div>'+
			'<div class="col-md-3">Zip: <input type = "text" id = "zipcode"></div>'+
			'<div class="col-md-3">Address Type:<select id = "dropdown"> <option value="1">Home</option> <option value="2">Work</option><option value="3">Vacation</option></select></div>'+
		'</div>'
	)
}
function displayAddressData (data) {
	$("#text-boxes")
		.append(
		'<div class = "row" style = "text-align: center;">'+
			'<div class="col-md-4">Address Line 1: <input type = "text" id = "AddressLine1" value ="' + data.AddressLine1 + '"></div>'+
			'<div class="col-md-4">Address Line 2: <input type = "text" id = "AddressLine2" value ="' + data.AddressLine2 + '"></div>'+
			'<div class="col-md-4">Address Line 3: <input type = "text" id = "AddressLine3" value ="' + data.AddressLine3 + '"></div>'+
		'</div>'+
		'<div class = "row" style = "text-align: center;">'+
			'<div class="col-md-3">City: <input type = "text" id = "city" value ="' + data.City + '"></div>'+
			'<div class="col-md-3">State Abbrev.: <input type = "text" id = "statecd" value ="' + data.StateCD + '"></div>'+
			'<div class="col-md-3">Zip: <input type = "text" id = "zipcode" value ="' + data.ZipCode + '"></div>'+
			'<div class="col-md-3">Address Type:<select id = "dropdown"> <option value="1">Home</option> <option value="2">Work</option><option value="3">Vacation</option></select></div>'+
		'</div>'
	)
}

$("#Cancel-btn").on("click", function () {
	$.ajax({
			type: 'POST',
			url: "http://contactbookapi.sihs.dev2.edsiohio.com/api/contact/AddressById",
			data: ID,
			contentType: 'application/json',
			dataType: "JSON",
			success: function(resultData) {
				console.log(resultData);
				returnToAddEdit(resultData);
			},
			error: function(resultData) {

			}
		});
});
$("#save-btn").on("click", function () {
	var saveContactInfo = {
	  "Id": ID,
	  "AddressLine1":  document.getElementById("AddressLine1").value,
	  "AddressLine2": document.getElementById("AddressLine2").value,
	  "AddressLine3": document.getElementById("AddressLine3").value,
	  "City": document.getElementById("city").value,
	  "StateCD": document.getElementById("statecd").value,
	  "ZipCode": document.getElementById("zipcode").value,
	  "CountryCode": 1,
	  "UserId": contactID,
	  "AddressTypeId": document.getElementById("dropdown").value ,
	  "AddressTypeName": document.getElementById("dropdown").text
	}
	var myJSON = JSON.stringify(saveContactInfo);

	$.ajax({
		type: 'POST',
		url: 'http://contactbookapi.sihs.dev2.edsiohio.com/api/contact/AddressAddEdit',
		data: myJSON,
		contentType: 'application/json',
		dataType: 'JSON',
		success: function(resultData) {
			alert("Contact has been saved.");

			$.ajax({
					type: 'POST',
					url: "http://contactbookapi.sihs.dev2.edsiohio.com/api/contact/AddressById",
					data: ID,
					contentType: 'application/json',
					dataType: "JSON",
					success: function(resultData) {
						console.log(resultData);
						returnToAddEdit(resultData);
					},
					error: function(resultData) {

					}
				});
		},
		error: function(resultData) {
			alert("An error has occured.");
		}
	});
});
function returnToAddEdit(data){
	window.location.href="ContactAddEdit.html?id=" + contactID;
}
