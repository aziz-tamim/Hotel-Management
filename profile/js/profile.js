/// all global variable decleration
let userInfo;
let user;
let allBData = [];
let navBrand = document.querySelector(".navbar-brand");
let logoutBtn = document.querySelector(".logout-btn");
let bookingForm = document.querySelector(".booking-form");
let allBInput = bookingForm.querySelectorAll("input");
let bTextarea = bookingForm.querySelector("textarea");
let bCloseBtn = document.querySelector(".b-modal-close-btn");
let bListTBody = document.querySelector(".booking-list");
let bRegBtn = document.querySelector(".b-register-btn");
/// Check user is login or not
if (sessionStorage.getItem("__au__") == null) {
  window.location = "../index.html";
}
userInfo = JSON.parse(sessionStorage.getItem("__au__"));
navBrand.innerHTML = userInfo.hotelName;
user = userInfo.email.split("@")[0];

/// getting data from storage
const fetchData = (key) => {
  if (localStorage.getItem(key) != null) {
    const data = JSON.parse(localStorage.getItem(key));
    return data;
  } else {
    return [];
  }
};
// format date function
const formatDate = (data, isTime) => {
  const date = new Date(data);
  let yy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  let time = date.toLocaleTimeString();
  dd = dd < 10 ? "0" + dd : dd;
  mm = mm < 10 ? "0" + mm : mm;
  return `${dd}-${mm}-${yy} ${isTime ? time : ""}`;
};

allBData = fetchData(user + "_allBData");

/// logout coding
logoutBtn.onclick = () => {
  logoutBtn.innerHTML = "Please Wait...";
  setTimeout(() => {
    logoutBtn.innerHTML = "Logout";
    sessionStorage.removeItem("__au__");
    window.location = "../index.html";
  }, 3000);
};

/// start booking coding
bookingForm.onsubmit = (e) => {
  e.preventDefault();
  let data = {
    notice: bTextarea.value,
    createdAt: new Date(),
  };
  for (let el of allBInput) {
    let key = el.name;
    let value = el.value;
    data[key] = value;
  }
  allBData.push(data);
  localStorage.setItem(user + "_allBData", JSON.stringify(allBData));
  swal("Good Job !", "Booking Success", "success");
  bookingForm.reset("");
  bCloseBtn.click();
  ShowBookingData();
};

// booking deleet coding
const deleteBDataFunc = () => {
  let allBdelBtn = bListTBody.querySelectorAll(".del-btn");
  allBdelBtn.forEach((btn, index) => {
    btn.onclick = () => {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
            allBData.splice(index, 1);
            localStorage.setItem(user + "_allBData", JSON.stringify(allBData));
            ShowBookingData();
          swal("Poof! Your imaginary file has been deleted", {
            icon: "success",
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
    };
  });
};

const updateBDataFunc = () => {
    let allBEditBtn = bListTBody.querySelectorAll(".edit-btn");
    allBEditBtn.forEach((btn,index)=> {
        btn.onclick = () => {
            bRegBtn.click();
            let allBBtn = bookingForm.querySelectorAll("button");
            allBBtn[0].classList.add("d-none");
            allBBtn[1].classList.remove("d-none");
            let obj = allBData[index];
            allBInput[0].value = obj.fullname;
            allBInput[1].value = obj.location;
            allBInput[2].value = obj.roomNo;
            allBInput[3].value = obj.totalPeople;
            allBInput[4].value = obj.checkInDate;
            allBInput[5].value = obj.checkOutDate;
            allBInput[6].value = obj.price;
            allBInput[7].value = obj.mobile;
            bTextarea.value = obj.notice;
            allBBtn[1].onclick = ()=>{
                let formData = {
                    notice : bTextarea.value,
                    createdAt : new Date()
                }
                for(let el of allBInput) {
                    let key = el.name;
                    let value = el.value;
                    formData[key] = value
                }
                allBData[index] = formData;
                allBBtn[0].classList.remove("d-none");
                allBBtn[1].classList.add("d-none");
                bookingForm.reset('');
                bCloseBtn.click();
                localStorage.setItem(user+"_allBData",JSON.stringify(allBData));
                ShowBookingData();
            }
        }
    })
}

// show booking data
const ShowBookingData = () => {
  bListTBody.innerHTML = "";
  allBData.forEach((item, index) => {
    bListTBody.innerHTML += `
        <tr>
            <td class="text-nowrap">${index + 1}</td>
            <td class="text-nowrap">${item.location}</td>
            <td class="text-nowrap">${item.roomNo}</td>
            <td class="text-nowrap">${item.fullname}</td>
            <td class="text-nowrap">${formatDate(
            item.checkInDate
            )}</td>
            <td class="text-nowrap">${formatDate(
            item.checkOutDate,
            true
            )}</td>
            <td class="text-nowrap">${item.totalPeople}</td>
            <td class="text-nowrap">${item.mobile}</td>
            <td class="text-nowrap">${item.price}</td>
            <td class="text-nowrap">${item.notice}</td>
            <td class="text-nowrap">${formatDate(
            item.createdAt,
            true
            )}</td>
            <td class="text-nowrap">
            <button class="btn edit-btn p-1 px-2 btn-primary">
                <i class="fa fa-edit"></i>
            </button>
            <button class="btn checkin-btn p-1 px-2 text-white btn-info">
                <i class="fa fa-check"></i>
            </button>
            <button class="btn del-btn p-1 px-2 btn-danger">
                <i class="fa fa-trash"></i>
            </button>
            </td>
        </tr>`;
  });
  deleteBDataFunc();
  updateBDataFunc();
};
ShowBookingData();
