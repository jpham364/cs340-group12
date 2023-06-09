// JS Code is taken from NodeJS Starter App //


let addProductType = document.getElementById('add-productType-form-ajax');

// Modify the objects we need 
addProductType.addEventListener("submit", function(e){

	// prevent form submission
	e.preventDefault();

	// get form fields
    let inputDescription = document.getElementById("input-description");

	// get values inside of them
    let descriptionValue = inputDescription.value;

    // place data we want to snd in a javascript object
    let data = {
        description: descriptionValue
    }

    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-productType-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add new data to the table
            addRowToTable(xhttp.response);

            // Clear input fields
            inputDescription.value = '';

        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("Error with input!");
        }
    }

    xhttp.send(JSON.stringify(data));
   

});

addRowToTable = (data) => {

	// get reference to current table on page and clear
	let currTable = document.getElementById("productType-table");

	// get location where we would insert new row
	let newRowIndex = currTable.rows.length;

	// Get reference to new row from DB query (last object)
	let parsedData = JSON.parse(data);
	let newRow = parsedData[parsedData.length - 1]

	// create row and 5 cells
	let row = document.createElement("tr");
	let idCell = document.createElement("td")
	let descriptionCell = document.createElement("td")

	let deleteCell = document.createElement("td");


	// fill with cells with correct data
	idCell.innerText = newRow.productTypeID;
	descriptionCell.innerText = newRow.typeDescription;

	// Used chat GPT to help append button
	let deleteButton = document.createElement("button");
	deleteButton.innerHTML = "Delete";
	deleteButton.onclick = function(){
		deleteProductType(newRow.productTypeID)
	};

	deleteCell.appendChild(deleteButton);


	row.appendChild(idCell);
	row.appendChild(descriptionCell);
	row.appendChild(deleteCell);

	row.setAttribute('data-value', newRow.productTypeID);

	// Add new row to table
	currTable.appendChild(row);

	// updating menu
	// let selectMenu = document.getElementById("IDSelect");
	// let option = document.createElement("option");
	// option.value = newRow.orderID;
	// selectMenu.add(option);

}








