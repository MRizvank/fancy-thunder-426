let address = JSON.parse(localStorage.getItem("address")) || [];
let submitBtn = document.getElementById("submitBtn");
let form = document.getElementById("addressForm")
let div=document.querySelector(".formDetailsContainer");
let addrdiv=document.querySelector(".show")

let len=address.length;
document.getElementById("add-add").addEventListener("click",()=>{
len++;
div.style.display="block"
console.log(len);
})
console.log(len);
if(address.length==len){
  div.style.display="none";

  showAddress(address)
}else{
  document.getElementById("addressForm").addEventListener("submit", (e) => {
  e.preventDefault()
  obj = {
    name: form.name.value,
    phn: form.phoneNumber.value,
    house: form.houseNo.value,
    road: form.area.value,
    pinCode: form.pinCode.value,
    city: form.city.value,
    state:form.state.value,
    nearbylocation: form.nearby.value

  }
  address.push(obj)
  localStorage.setItem("address", JSON.stringify(address));
  location.href = "payment.html"

})
}

document.getElementById("logo").addEventListener("click",()=>{
  location.href="index.html"
})

function showAddress(data){
  let addrr="";
  data.forEach(element => {
    let add=`
    <div>
      <h3>${element.name}</h3>
      <p>${element.house},${element.road},${element.nearby? element.nearbylocation:""},${element.city}</p>
      <p>${element.state}-${element.pinCode}</p>
      <p>${element.phn}</p>
      <button id="continue">Continue</button>
      </div>`
      addrr+=add
  });
  addrdiv.innerHTML=addrr;
}
setTimeout(()=>{
document.getElementById("continue").addEventListener("click",()=>{
  location.href="payment.html"
})

},2000)
