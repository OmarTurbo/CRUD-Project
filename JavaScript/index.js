var productName = document.querySelector('#productName');
var productPrice = document.querySelector('#productPrice');
var productType = document.querySelector('#productType');
var productDesc = document.querySelector('#productDesc');
var addBtn = document.querySelector("#add");
var tableBody = document.querySelector("tbody");
var alert  = document.querySelector(".alert");
var productContainer;

if(localStorage.getItem("Products") != null){// check that user have past storage
    productContainer = JSON.parse(localStorage.getItem("Products"))  
    displayData()
}else{
    productContainer = []; // if User don't have storage so it will create an empty array
}


// By clicking on the button an product object is created 
//and after that it calls clearData function and display the data in the table
addBtn.addEventListener('click', () => { 
    product = {
        name: productName.value,
        price: productPrice.value,
        type: productType.value,
        desc: productDesc.value
    }
    // Validator
    if(validate() == true){
        productContainer.push(product)
        localStorage.setItem("Products",JSON.stringify(productContainer));
        clearInputs();
        displayData();
    }else{
        alert.style.display = "block";
        setTimeout(()=>{alert.style.display='none'},2000);
    }
})

// A function to Clear the data from the inputs
function clearInputs() {
    productName.value = "";
    productPrice.value = "";
    productType.value = "";
    productDesc.value = "";
}

// A function to Display the data in the table row 
function displayData() {
    container = ``;
    for (var i = 0; i < productContainer.length; i++) {
        container += `
        <tr>
            <td>${i}</td>
            <td>${productContainer[i].name}</td>
            <td>${productContainer[i].price}</td>
            <td>${productContainer[i].type}</td>
            <td>${productContainer[i].desc}</td>
            <td><button onclick="Update(${i})" class="btn btn-outline-warning">Update</button></td>
            <td><button onclick="Delete(${i})" class="btn btn-outline-danger">Delete</button></td>
        </tr>
        `
    }
    tableBody.innerHTML = container;
}

function Delete(e) { // A Function To delete a data according to the index of the chosen one
    productContainer.splice(e,1);
    displayData();
    localStorage.setItem("Products",JSON.stringify(productContainer));
}

function Update(e){

    productName.value = productContainer[e].name;
    productPrice.value = productContainer[e].price;
    productType.value = productContainer[e].type;
    productDesc.value = productContainer[e].desc;

    addBtn.style.display = "none"
    var update =  document.getElementById("update");
    update.style.display="block";

    update.addEventListener('click',() => {
        productContainer[e].name = productName.value;
        productContainer[e].price = productPrice.value;
        productContainer[e].type = productType.value;
        productContainer[e].desc = productDesc.value;
        clearInputs()
        displayData()
        localStorage.setItem("Products",JSON.stringify(productContainer))
        window.location.reload();
    })
}

function search(term){
    container = ``;
    for(var i =0;i < productContainer.length; i++){
        if(productContainer[i].name.toLowerCase().includes(term.toLowerCase())){
            container += `
            <tr>
                <td>${i}</td>
                <td>${productContainer[i].name}</td>
                <td>${productContainer[i].price}</td>
                <td>${productContainer[i].type}</td>
                <td>${productContainer[i].desc}</td>
                <td><button onclick="Update(${i})" class="btn btn-outline-warning">Update</button></td>
                <td><button onclick="Delete(${i})" class="btn btn-outline-danger">Delete</button></td>
            </tr>
            `    
        }
    }
    tableBody.innerHTML=container;
}

function validate(){
    var regex = /^[A-Z][a-z]{2,8}$/
    if(regex.test(productName.value) == true){
        return true
    }else{
        return false
    }
}
