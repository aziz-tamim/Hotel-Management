///// all global variable decleration
let userInfo;
let user;
let allBData = [];
let navBrand = document.querySelector('.navbar-brand');
let logoutBtn = document.querySelector(".logout-btn");
let bookingForm = document.querySelector(".booking-form");
let allBInput = bookingForm.querySelectorAll("input");
let bTextarea = bookingForm.querySelector("textarea");
let bCloseBtn = document.querySelector(".b-modal-close-btn");
///// Check user is login or not
if(sessionStorage.getItem("__au__") == null) {
    window.location = "../index.html";
}
userInfo = JSON.parse(sessionStorage.getItem("__au__"));
navBrand.innerHTML = userInfo.hotelName;
user = userInfo.email.split("@")[0];

///// logout coding
logoutBtn.onclick = () => {
    logoutBtn.innerHTML = "Please Wait...";
    setTimeout(()=>{
        logoutBtn.innerHTML = "Logout";
        sessionStorage.removeItem("__au__");
        window.location = "../index.html";
    },3000)
}

///// start booking coding 
bookingForm.onsubmit = (e) => {
    e.preventDefault()
    let data = {notice : bTextarea.value}
    for (let el of allBInput) {
        let key = el.name;
        let value = el.value;
        data[key] = value
    }
    allBData.push(data);
    localStorage.setItem(user+"_allBData",JSON.stringify(allBData));
    swal("Good Job !", "Booking Success", "success");
    bookingForm.reset("")
    bCloseBtn.click()
}