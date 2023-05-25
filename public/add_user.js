let addUser = document.getElementById('addUser');

// Modify the objects we need 
addUser.addEventListener("submit", function(e){

	// prevent form submission
	e.preventDefault();

	// get form fields
	let inputFName = document.getElementById("input-fName");
	let inputLName = document.getElementById("input-lName");
	let inputAddress = document.getElementById("input-address");
	let inputpNumber = document.getElementById("input-pNumber");
	let inputEmail = document.getElementById("input-email");


	// get values inside of them
	let fNameValue = inputFName.value;
    let lNameValue = inputLName.value;
    let addressValue = inputAddress.value;
    let pNumberValue = inputpNumber.value;
    let emailValue = inputEmail.value;

    // place data we want to snd in a javascript object
    let data = {
    	firstName: fNameValue,
    	lastName: lNameValue,
    	address: addressValue,
    	phoneNumber: pNumberValue,
    	email: emailValue
    }

    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-user-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
    	if (xhttp.readyState == 4 && xhttp.status == 200) {


    		// Add new data to the table
    		addRowToTable(xhttp.response);


    		// Clear input fields
    		inputFName.value = '';
		    inputLName.value = '';
		    inputAddress.value = '';
		    inputpNumber.value = '';
		    inputEmail.value = '';

    	}
    	else if(xhttp.readyState == 4 && xhttp.status != 200){
    		console.log("Error with input!")
    	}
    }

    xhttp.send(JSON.stringify(data));
   

})

addRowToTable = (data) => {

	// get reference to current table on page and clear
	let currTable = document.getElementById("users-table");

	// get location where we would insert new row
	let newRowLocation = currTable.rows.length;

	// Get reference to new row from DB query (last object)
	let parsedData = JSON.parse(data);
	let newRow = parsedData[parsedData.length -1]

	// create row and 5 cells
	let row = document.createElement("TR");
	let idCell = document.createElement("TD")
	let fNameCell = document.createElement("TD")
	let lNameCell = document.createElement("TD")
	let addressCell = document.createElement("TD")
	let pNumberCell = document.createElement("TD")
	let emailCell = document.createElement("TD")


	// fill with cells with correct data
	idCell.innerText = newRow.id;
	fNameCell.innerText = newRow.firstName;
	lNameCell.innerText = newRow.lastName;
	addressCell.innerText = newRow.address;
	pNumberCell.innerText = newRow.phoneNumber;
	emailCell.innerText = newRow.email;

	// Add new row to table
	currTable.appendChild(row);



}








