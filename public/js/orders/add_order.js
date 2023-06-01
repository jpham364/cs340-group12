let addOrder = document.getElementById('add-order-form-ajax');

// Modify the objects we need 
addOrder.addEventListener("submit", function(e){

	// prevent form submission
	e.preventDefault();

	// get form fields
    let inputDate = document.getElementById("input-date");
    let inputNumItems = document.getElementById("input-numItems");
    let inputCost = document.getElementById("input-cost");

	// get values inside of them
    let dateValue = inputDate.value;
    let numItemsValue = inputNumItems.value;
    let costValue = inputCost.value;

    // place data we want to snd in a javascript object
    let data = {
        // fName: fNameValue,
        date: dateValue,
        numItems: numItemsValue,
        cost: costValue
        // email: emailValue
    }

    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-order-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add new data to the table
            addRowToTable(xhttp.response);

            // Clear input fields
            inputDate.value = '';
            inputNumItems.value = '';
            inputCost.value = '';
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("Error with input!");
        }
    }

    xhttp.send(JSON.stringify(data));
   

});

addRowToTable = (data) => {

	// get reference to current table on page and clear
	let currTable = document.getElementById("order-table");

	// get location where we would insert new row
	let newRowIndex = currTable.rows.length;

	// Get reference to new row from DB query (last object)
	let parsedData = JSON.parse(data);
	let newRow = parsedData[parsedData.length - 1]

	// create row and 5 cells
	let row = document.createElement("tr");
	let idCell = document.createElement("td")
	let dateCell = document.createElement("td")
	let numItemsCell = document.createElement("td")
	let costCell = document.createElement("td")

	let deleteCell = document.createElement("td");


	// fill with cells with correct data
	idCell.innerText = newRow.userID;
	dateCell.innerText = newRow.orederDate;
	numItemsCell.innerText = newRow.numItems;
	costCell.innerText = newRow.totalCost;

	// Used chat GPT to help append button
	let deleteButton = document.createElement("button");
	deleteButton.innerHTML = "Delete";
	deleteButton.onclick = function(){
		deleteUser(newRow.userID)
	};

	deleteCell.appendChild(deleteButton);


	row.appendChild(idCell);
	row.appendChild(dateCell);
	row.appendChild(numItemsCell);
	row.appendChild(costCell);
	row.appendChild(deleteCell);

	row.setAttribute('data-value', newRow.orderID);

	// Add new row to table
	currTable.appendChild(row);

	// updating menu
	// let selectMenu = document.getElementById("IDSelect");
	// let option = document.createElement("option");
	// option.value = newRow.orderID;
	// selectMenu.add(option);

}








