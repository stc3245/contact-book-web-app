
var qs = location.search;
var stuff = qs.split("=");
var contactinfoID = stuff[1].slice(0,4);
if (contactinfoID[0] == 0) {
	contactinfoID = 0;
}
var contactID = stuff[2];

console.log(contactinfoID);

console.log(contactID);

$( document ).ready(function() {
	if(contactinfoID == 0){
		displayBoxes(contactinfoID);
	}
	else{
		$.ajax({
			type: 'POST',
			url: "http://contactbookapi.sihs.dev2.edsiohio.com/api/contact/ContactInfoById",
			data: contactinfoID,
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
	}
});
function displayContactInfoData (data) {
	$("#text-boxes")
		.append(
		'<div class = "row" style = "text-align: center;">'+
			'<div class="col-md-6">Text: <input type = "text" id = "Text" value ="' + data.Text + '"></div>'+
			'<div class="col-md-6">Type: <select id = "dropdown"> <option value="1">Cell Phone</option> <option value="2">Home Phone</option><option value="3"> Work Phone</option><option value="4">Work Email</option><option value="5">Personal Email</option></select>'+
		'</div>'
	)
}
function displayBoxes(id){
	$("#text-boxes")
		.append(
		'<div class = "row" style = "text-align: center;">'+
			'<div class="col-md-6">Text: <input type = "text" id = "Text"></div>'+
			'<div class="col-md-6">Type: <select id = "dropdown"> <option value="1">Cell Phone</option> <option value="2">Home Phone</option><option value="3"> Work Phone</option><option value="4">Work Email</option><option value="5">Personal Email</option></select>'+
		'</div></div>'
	)
}
$("#Cancel-btn").on("click", function () {
	$.ajax({
			type: 'POST',
			url: "http://contactbookapi.sihs.dev2.edsiohio.com/api/contact/ContactInfoById",
			data: contactinfoID,
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
		"Id": contactinfoID,
		"Text": document.getElementById("Text").value,
		"TypeName": document.getElementById("dropdown").text,
		"TypeId": document.getElementById("dropdown").value,
		"UserId": contactID
	}
	var myJSON = JSON.stringify(saveContactInfo);

	$.ajax({
		type: 'POST',
		url: 'http://contactbookapi.sihs.dev2.edsiohio.com/api/contact/ContactInfoAddEdit',
		data: myJSON,
		contentType: 'application/json',
		dataType: 'JSON',
		success: function(resultData) {
			alert("Contact has been saved.");

			$.ajax({
					type: 'POST',
					url: "http://contactbookapi.sihs.dev2.edsiohio.com/api/contact/ContactInfoById",
					data: contactinfoID,
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
	console.log(contactID);
	window.location.href="ContactAddEdit.html?id=" + contactID;
}
