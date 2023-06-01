let addReview = document.getElementById('add-review-form-ajax');

// Modify the objects we need 
addReview.addEventListener("submit", function(e){

	// prevent form submission
	e.preventDefault();

	// get form fields
	let inputUID = document.getElementById("userSelect");
    let inputEID = document.getElementById("equipmentSelect");
    let inputReview = document.getElementById("input-review");
    let inputStars = document.getElementById("stars-select");
    // let inputEmail = document.getElementById("input-email");

	// get values inside of them
	let userIDValue = inputUID.value;
    let equipmentIDValue = inputEID.value;
    let reviewValue = inputReview.value;
    let starsValue = inputStars.value;

    // place data we want to snd in a javascript object
    let data = {
        rUserID: userIDValue,
        rEquipmentID: equipmentIDValue,
        rReviewValue: reviewValue,
        rStarsValue: starsValue
    }

    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-review-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add new data to the table
            addRowToTable(xhttp.response);

            // Clear input fields
            inputUID.value = '';
            inputEID.value = '';
            inputReview.value = '';
            inputPNumber.value = '';
            inputStars.value = '';
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("Error with input!");
        }
    }

    xhttp.send(JSON.stringify(data));
   

});

addRowToTable = (data) => {

	// get reference to current table on page and clear
	let currTable = document.getElementById("review-table");

	// get location where we would insert new row
	let newRowIndex = currTable.rows.length;

	// Get reference to new row from DB query (last object)
	let parsedData = JSON.parse(data);
	let newRow = parsedData[parsedData.length - 1]

	// create row and 5 cells
	let row = document.createElement("tr");
	let idCell = document.createElement("td")
	let uidCell = document.createElement("td")
	let eidCell = document.createElement("td")
	let reviewCell = document.createElement("td")
	let starsCell = document.createElement("td")

	let deleteCell = document.createElement("td");


	// fill with cells with correct data
	idCell.innerText = newRow.reviewID;
	uidCell.innerText = newRow.userID;
	eidCell.innerText = newRow.equipmentID;
	reviewCell.innerText = newRow.reviewDescription;
	starsCell.innerText = newRow.stars;

	// Used chat GPT to help append button
	let deleteButton = document.createElement("button");
	deleteButton.innerHTML = "Delete";
	deleteButton.onclick = function(){
		deleteEquipment(newRow.equipmentID)
	};

	deleteCell.appendChild(deleteButton);


	row.appendChild(idCell);
	row.appendChild(uidCell);
	row.appendChild(eidCell);
	row.appendChild(reviewCell);
	row.appendChild(starsCell);

	row.setAttribute('data-value', newRow.reviewID);

	// Add new row to table
	currTable.appendChild(row);

	// updating menu
	// let selectMenu = document.getElementById("IDSelect");
	// let option = document.createElement("option");
	// option.value = newRow.userID;
	// selectMenu.add(option);

}








