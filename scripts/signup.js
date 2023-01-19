document.getElementById("logo-container").addEventListener("click", () => {
  location.href = "index.html"
})
document.getElementById("phoneNumberSubmitBtn").addEventListener("click", myFun);
let LsData = JSON.parse(localStorage.getItem("myotp")) || [];
function myFun() {

  let ranOtp = Math.floor(Math.random() * 9000 + 1000);
  let phone = document.getElementById("mynumber").value;

  LsData.push(ranOtp);
  localStorage.setItem("myotp", JSON.stringify(LsData));
  if (phone.length != 10) {
    alert("Please enter correct mobile number");


  } else {
    localStorage.setItem("Phn", phone);
    setTimeout(() => {
      alert(ranOtp);
      window.location.href = "login.html";
    }, 0);
  }
}


