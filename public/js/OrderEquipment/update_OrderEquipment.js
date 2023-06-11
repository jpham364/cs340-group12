// JS Code is taken from NodeJS Starter App //

let updateEquipmentIDForm = document.getElementById('update-equipment-id-form-ajax');

updateEquipmentIDForm.addEventListener("submit", function(e){

    e.preventDefault();

    // get form fields
    let inputOID = document.getElementById("updateOIDSelect");
    let inputEID = document.getElementById("updateEIDSelect");
    let assignEID = document.getElementById("updateEIDAssign");


    // get values
    let inputOIDValue = inputOID.value;
    let inputEIDValue = inputEID.value;
    let assignEIDValue = assignEID.value;

    let data = {

        selectOID: inputOIDValue,
        selectEID: inputEIDValue,
        assignEID: assignEIDValue
    }

     // Setup our AJAX request
     var xhttp = new XMLHttpRequest();
     xhttp.open("PUT", "/put-equipmentID-ajax", true);
     xhttp.setRequestHeader("Content-type", "application/json");
 
     // Tell our AJAX request how to resolve
     xhttp.onreadystatechange = () => {
         if (xhttp.readyState == 4 && xhttp.status == 200) {
 
             // Add the new data to the table
             updateRow(xhttp.response, inputOID, inputEID);
 
         }
         else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
         }
     }
     
     // Send the request and wait for the response
     xhttp.send(JSON.stringify(data));


})


function updateRow(data, orderID, equipmentID){


    location.reload();
}