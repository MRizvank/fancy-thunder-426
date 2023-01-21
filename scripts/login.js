document.getElementById("logo-container").addEventListener("click", () => {
    location.href = "index.html"
})
let num = localStorage.getItem("Phn");
console.log(num);
let msg = document.createElement("p");
msg.innerText = "Enter OTP sent to :" + " " + num;
msg.setAttribute("id", "msg");
let line2 = document.createElement("p");
line2.innerText = "Change Number";
line2.style.color = "crimson";
let input = document.createElement("input");
input.setAttribute("id", "input");
input.setAttribute("placeholder", "Enter the OTP")
let password = JSON.parse(localStorage.getItem("myotp"));
let x=document.createElement("h6");
//x.innerText="hii";
let y=document.createElement("h3");
let timeup=30;
let timer=setInterval(function(){
timeup--;
x.innerText= "00:"+ timeup;
if(timeup<=0){
    clearInterval(timer);
   // location.href="signup.html";
}
},1000);
let resendtime=setTimeout(function(){
    y.innerText="resend otp";
    y.style.color="red";
    y.addEventListener("click",()=>{
        alert(Math.floor(Math.random() * 9000 + 1000));
        if (password[password.length - 1] == finalvalue) {
            alert("login Successful");
            window.location.href = "index.html";
        } else {
            alert("Please fill correct otp");
           // window.location.href = "login.html"
        }
    })
},31000);

let btn = document.createElement("button");
btn.innerText = "Verify OTP";
btn.setAttribute("id", "otp");
btn.addEventListener("click", () => {
    let Value = document.querySelector("#input").value;
    console.log(Value);
    localStorage.setItem("enteredvalue", Value);
    let finalvalue = localStorage.getItem("enteredvalue");

    if (password[password.length - 1] == finalvalue) {
        alert("login Successful");
        window.location.href = "index.html";
    } else {
        alert("Please fill correct otp");
       // window.location.href = "login.html"
    }

})
let count=30;

let last = document.createElement("p");
last.innerText = "By continuing,you agree to Meesho's Terms & conditions and Privacy Policy";
last.setAttribute("id", "last");



details.append(msg, line2,x,y, input,btn, last);