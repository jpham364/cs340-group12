/*  
*   User validation
*/  

// Prevents user from leaving one of the input empty
function validateAdduser() {
    let addInput = document.forms["addUser"];
    if (addInput['firstName'].value == "" || addInput['lastName'].value == "" || addInput['Address'].value == "" || addInput['phoneNumber'].value == "" || addInput['email'].value == "") {
        alert("One of the following boxes is empty");
        return false;
    }
}

function validateUpdateUser() {
    let updateInput = document.forms["updateUser"];
    if (updateInput['firstName'].value == "" || updateInput['lastName'].value == "" || updateInput['Address'].value == "" || updateInput['phoneNumber'].value == "" || updateInput['email'].value == "") {
        alert("One of the following boxes is empty");
        return false;
    }
}