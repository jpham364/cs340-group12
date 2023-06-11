// JS Code is taken from NodeJS Starter App //


let addEquipment = document.getElementById('add-equipment-form-ajax');

// Modify the objects we need 
addEquipment.addEventListener("submit", function(e){

	// prevent form submission
	e.preventDefault();

	// get form fields
	let inputEName = document.getElementById("input-eName");
    let inputEDesc = document.getElementById("input-eDesc");
    let inputCost = document.getElementById("input-cost");
    let inputStock = document.getElementById("input-stock");
    let inputPT = document.getElementById("PTSelect");

	// get values inside of them
	let eNameValue = inputEName.value;
    let eDescValue = inputEDesc.value;
    let eCostValue = inputCost.value;
    let eStockValue = inputStock.value;
    let ePTValue = inputPT.value;

    // place data we want to snd in a javascript object
    let data = {
        eName: eNameValue,
        eDesc: eDescValue,
        eCost: eCostValue,
        eStock: eStockValue,
        ePT: ePTValue
    }

    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-equipment-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add new data to the table
            addRowToTable(xhttp.response);

            // Clear input fields
            inputEName.value = '';
            inputEDesc.value = '';
            inputCost.value = '';
            inputStock.value = '';
            inputPT.value = '';
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("Error with input!");
        }
    }

    xhttp.send(JSON.stringify(data));
   

});

addRowToTable = (data) => {

	// get reference to current table on page and clear
	let currTable = document.getElementById("equipment-table");

	// get location where we would insert new row
	let newRowIndex = currTable.rows.length;

	// Get reference to new row from DB query (last object)
	let parsedData = JSON.parse(data);
	let newRow = parsedData[parsedData.length - 1]

	// create row and 5 cells
	let row = document.createElement("tr");
	let eIDCell = document.createElement("td")
	let eNameCell = document.createElement("td")
	let eDescCell = document.createElement("td")
	let eCostCell = document.createElement("td")
	let eStockCell = document.createElement("td")
	let ePTCell = document.createElement("td")

	let deleteCell = document.createElement("td");


	// fill with cells with correct data
	eIDCell.innerText = newRow.equipmentID;
	eNameCell.innerText = newRow.equipmentName;
	eDescCell.innerText = newRow.equipmentDescription;
	eCostCell.innerText = newRow.equipmentCost;
	eStockCell.innerText = newRow.equipmentStock;
	ePTCell.innerText = newRow.productTypeID;

	// Used chat GPT to help append button
	let deleteButton = document.createElement("button");
	deleteButton.innerHTML = "Delete";
	deleteButton.onclick = function(){
		deleteEquipment(newRow.equipmentID)
	};

	deleteCell.appendChild(deleteButton);


	row.appendChild(eIDCell);
	row.appendChild(eNameCell);
	row.appendChild(eDescCell);
	row.appendChild(eCostCell);
	row.appendChild(eStockCell);
	row.appendChild(ePTCell);
	row.appendChild(deleteCell);

	row.setAttribute('data-value', newRow.equipmentID);

	// Add new row to table
	currTable.appendChild(row);

    // For update
	// updating menu
	// let selectMenu = document.getElementById("IDSelect");
	// let option = document.createElement("option");
	// option.value = newRow.userID;
	// selectMenu.add(option);

}








