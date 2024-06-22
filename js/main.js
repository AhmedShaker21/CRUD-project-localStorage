let bookMarkerName = document.getElementById("siteName")
let websiteURL = document.getElementById("websiteURL")
let bookMarkerArray;
if (localStorage.getItem("bookMarkerArray") == null) {
    bookMarkerArray = [];
} else {
    bookMarkerArray = JSON.parse(localStorage.getItem("bookMarkerArray"));
    displayBookMarker()
}
function addBookMarker() {
    if (validateInput(bookMarkerName) && validateInput(websiteURL)) {
        let bookMarkerObject = {
            name: bookMarkerName.value,
            url: websiteURL.value
        }
        bookMarkerArray.push(bookMarkerObject)
        localStorage.setItem("bookMarkerArray", JSON.stringify(bookMarkerArray))
        displayBookMarker()
        clearInputs()
    } else {
        alertMe();
    }
}
function displayBookMarker() {
    let cartona = "";
    for (let i = 0; i < bookMarkerArray.length; i++) {
        cartona += `
        <tr>
        <td class="">${i+1}</td>
        <td class="">${bookMarkerArray[i].name}</td>
        <td>
        <button onclick="visitFunction(${i})" class="btn visit" data-index="0">
          <i class="fa-solid fa-eye pe-2"></i>Visit
        </button>
      </td>
      <td>
        <button onclick="deleteFunction(${i})" class="btn delete pe-2" data-index="0">
          <i class="fa-solid fa-trash-can"></i>
          Delete
        </button>
      </td>
      </tr>
        `
    }
    document.getElementById("tableContent").innerHTML = cartona;
}
function clearInputs() {
    bookMarkerName.value = null;
    websiteURL.value = null;
    bookMarkerName.classList.remove("is-valid");
    websiteURL.classList.remove("is-valid");
    bookMarkerName.classList.remove("is-invalid");
    websiteURL.classList.remove("is-invalid");
}
//Delete Item
function deleteFunction(index) {
    bookMarkerArray.splice(index, 1)
    localStorage.setItem("bookMarkerArray", JSON.stringify(bookMarkerArray))
    displayBookMarker()
}
//Visit Item
function visitFunction(index) {
    window.open(bookMarkerArray[index].url, "_blank")
}
//validate input
function validateInput(element) {
    var regex = {
        siteName: /^[A-Za-z0-9]{3,}$/,
        websiteURL: /^(https:|http:)\/\/(www.)?.{1,}\.(com|gov|edu)(\/)?(.{1,})?$/,
    }
    if (regex[element.id].test(element.value) == true) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');   
        return true;
    } else {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        return false;
    }
}
function alertMe() {
    document.getElementById("alert").classList.remove("d-none")
}
function hideAlert(){
    document.getElementById("alert").classList.add("d-none")
}