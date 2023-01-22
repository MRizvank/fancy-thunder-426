let address = JSON.parse(localStorage.getItem("address")) || [];
let submitBtn = document.getElementById("submitBtn");
let form = document.getElementById("addressForm")
let div=document.querySelector(".formDetailsContainer");
let addrdiv=document.querySelector(".show")
let directPayment=JSON.parse(localStorage.getItem("buynow"))||[];   
let cart = JSON.parse(localStorage.getItem("cart")) || [];

let productTotal=document.getElementById("product-total");
let oderTotal=document.getElementById("oder-total");
let abc=JSON.parse(localStorage.getItem("page"))


document.getElementById("add-add").addEventListener("click",()=>{
div.style.display="block"
})

if(address.length!==0){
  div.style.display="none";
  showAddress(address)
}else{
  addrdiv.style.display="none"
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
    <div class="individual-address">
      <p>${element.name}</p>
      <p>${element.house},${element.road},${element.nearby? element.nearbylocation:""},${element.city}</p>
      <p>${element.state}-${element.pinCode}</p>
      <p>${element.phn}</p>
      <button id="continue">Deliver to this Address</button>
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

//product total
function showCarttotal(){

  let total=0

  if(abc==true){
    cart.forEach(element => {
    total += element.original_price * element.user_qty;
  });

  }else{
    directPayment.forEach((element) => {
    total += element.original_price;
   
    
  });
  }


  productTotal.textContent="₹"+total;
  oderTotal.textContent="₹"+total;
  


}
showCarttotal();
