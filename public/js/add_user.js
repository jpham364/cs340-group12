let addUser = document.getElementById('add-user-form-ajax');

// Modify the objects we need 
addUser.addEventListener("submit", function(e){

	// prevent form submission
	e.preventDefault();

	// get form fields
	let inputFName = document.getElementById("input-fName");
    let inputLName = document.getElementById("input-lName");
    let inputAddress = document.getElementById("input-address");
    let inputPNumber = document.getElementById("input-pNumber");
    let inputEmail = document.getElementById("input-email");



	// get values inside of them
	let fNameValue = inputFName.value;
    let lNameValue = inputLName.value;
    let addressValue = inputAddress.value;
    let pNumberValue = inputPNumber.value;
    let emailValue = inputEmail.value;

    // place data we want to snd in a javascript object
    let data = {
        fName: fNameValue,
        lName: lNameValue,
        address: addressValue,
        pNumber: pNumberValue,
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
            inputPNumber.value = '';
            inputEmail.value = '';
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("Error with input!");
        }
    }

    xhttp.send(JSON.stringify(data));
   

});

addRowToTable = (data) => {

	// get reference to current table on page and clear
	let currTable = document.getElementById("users-table");

	// get location where we would insert new row
	let newRowIndex = currTable.rows.length;

	// Get reference to new row from DB query (last object)
	let parsedData = JSON.parse(data);
	let newRow = parsedData[parsedData.length - 1]

	// create row and 5 cells
	let row = document.createElement("tr");
	let idCell = document.createElement("td")
	let fNameCell = document.createElement("td")
	let lNameCell = document.createElement("td")
	let addressCell = document.createElement("td")
	let pNumberCell = document.createElement("td")
	let emailCell = document.createElement("td")

	let deleteCell = document.createElement("td");


	// fill with cells with correct data
	idCell.innerText = newRow.userID;
	fNameCell.innerText = newRow.firstName;
	lNameCell.innerText = newRow.lastName;
	addressCell.innerText = newRow.address;
	pNumberCell.innerText = newRow.phoneNumber;
	emailCell.innerText = newRow.email;

	deleteCell = document.createElement("button");
	deleteCell.innerHTML = "Delete"
	deleteCell.onclick = function(){
		deleteUser(newRow.userID)
	};



	row.appendChild(idCell);
	row.appendChild(fNameCell);
	row.appendChild(lNameCell);
	row.appendChild(addressCell);
	row.appendChild(pNumberCell);
	row.appendChild(emailCell);
	row.appendChild(deleteCell);

	row.setAttribute('data-value', newRow.userID);

	// Add new row to table
	currTable.appendChild(row);

}








