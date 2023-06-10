let addOrderEquipment = document.getElementById('add-Order-Equipment-form-ajax');

// Modify the objects we need 
addOrderEquipment.addEventListener("submit", function(e){

	// prevent form submission
	e.preventDefault();

	// get form fields
	let inputoID = document.getElementById("orderIDSelect");
    let inputeID = document.getElementById("equipmentIDSelect");
    let inputAmount = document.getElementById("input-amount");
   

	// get values inside of them
	let oIDValue = inputoID.value;
    let eIDValue = inputeID.value;
    let amountValue = inputAmount.value;


    // place data we want to snd in a javascript object
    let data = {
        oID: oIDValue,
        eID: eIDValue,
        OEAmount: amountValue
    }

    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-OrderEquipment-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add new data to the table
            addRowToTable(xhttp.response);

            // Clear input fields
            inputoID.value = '';
            inputeID.value = '';
            inputAmount.value = '';

        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("Error with input!");
        }
    }

    xhttp.send(JSON.stringify(data));
   

});

addRowToTable = (data) => {

	// get reference to current table on page and clear
	let currTable = document.getElementById("Order-Equipment-table");

	// get location where we would insert new row
	let newRowIndex = currTable.rows.length;

	// Get reference to new row from DB query (last object)
	let parsedData = JSON.parse(data);
	let newRow = parsedData[parsedData.length - 1]

	// create row and 5 cells
	let row = document.createElement("tr");
	let OIDCell = document.createElement("td")
	let EIDCell = document.createElement("td")
	let amountCell = document.createElement("td")
	let costCell = document.createElement("td")


	let deleteCell = document.createElement("td");

	// fill with cells with correct data
	OIDCell.innerText = newRow.orderID;
	EIDCell.innerText = newRow.equipmentID;
	amountCell.innerText = newRow.amount;
	costCell.innerText = newRow.cost;


	// Used chat GPT to help append button
	let deleteButton = document.createElement("button");
	deleteButton.innerHTML = "Delete";
	deleteButton.onclick = function(){
		deleteOrderEquipment(newRow.orderID, newRow.equipmentID)
	};

	deleteCell.appendChild(deleteButton);


	row.appendChild(OIDCell);
	row.appendChild(EIDCell);
	row.appendChild(amountCell);
	row.appendChild(costCell);

	row.appendChild(deleteCell);

	row.setAttribute('data-value', (newRow.orderID + newRow.equipmentID));

	// Add new row to table
	currTable.appendChild(row);

	location.reload()

	// // updating menu
	// let selectMenu = document.getElementById("IDSelect");
	// let option = document.createElement("option");
	// option.value = newRow.userID;
	// selectMenu.add(option);

}








