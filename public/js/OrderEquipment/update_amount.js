let updateAmountForm = document.getElementById('update-amount-form-ajax');

updateAmountForm.addEventListener("submit", function(e){

    e.preventDefault();

    // get form fields
    let amountOID = document.getElementById("amountOIDSelect");
    let amountEID = document.getElementById("amountEIDSelect");
    let updateAmount = document.getElementById("update-amount");


    // get values
    let amountOIDValue = amountOID.value;
    let amountEIDValue = amountEID.value;
    let updateAmountValue = updateAmount.value;

    let data = {

        amOID: amountOIDValue,
        amEID: amountEIDValue,
        upAm: updateAmountValue
    }

     // Setup our AJAX request
     var xhttp = new XMLHttpRequest();
     xhttp.open("PUT", '/put-amount-ajax', true);
     xhttp.setRequestHeader("Content-type", "application/json");
 
     // Tell our AJAX request how to resolve
     xhttp.onreadystatechange = () => {
         if (xhttp.readyState == 4 && xhttp.status == 200) {
 
             // Add the new data to the table
             updateRow(xhttp.response);
 
         }
         else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
         }
     }
     
     // Send the request and wait for the response
     xhttp.send(JSON.stringify(data));


})


function updateRow(data){

    location.reload();
}