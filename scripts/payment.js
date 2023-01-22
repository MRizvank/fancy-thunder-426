let btn = document.getElementById("continue-btn");
let qwe = document.querySelectorAll(".asd");
let checkbox = document.getElementById("payment-check1");
let checkbox2 = document.getElementById("payment-check2");
let subtotal = document.getElementById("sub-total");
let mytotal = document.getElementById("total");
let mydiscount= document.getElementById("discount");
let mydiscount2=document.getElementById("discount2")
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let abc=JSON.parse(localStorage.getItem("page"))
let directPayment=JSON.parse(localStorage.getItem("buynow"))||[];   

btn.addEventListener("click", () => {

    alert("Processing")
    setTimeout(() => {
        alert("Order Placed  Successfully")
        window.location.href = "index.html" 
    }, 2000)
   cart.forEach((element,index)=>{
    cart.splice(index,1)
    localStorage.setItem("cart",JSON.stringify(cart));
   })
})


function check1() {
    if (checkbox.checked == true) {
        qwe[0].style.background = "rgb(76, 243, 193)"
    }
    else {
        qwe[0].style.background = "rgb(211, 244, 234)"
    }
}

function check2() {
    if (checkbox2.checked == true) {
        qwe[1].style.background = "rgb(76, 243, 193)"
    }
    else {
        qwe[1].style.background = "rgb(211, 244, 234)"
    }
}

function price() {
    let total = 0;
    
    if(abc==true){
        cart.forEach(element => {
        total += element.original_price * element.user_qty;
    });
    
    }else{
        directPayment.forEach((element,index) => {
        total += element.original_price;
        directPayment.splice(index,1);
        localStorage.setItem("buynow",JSON.stringify(directPayment))
    });

    }
    subtotal.innerText = "₹" + total;   

    let discount= 0.1*total;
    
    mydiscount2.innerText="₹"+discount.toFixed(1);
    mydiscount.innerText="₹"+discount.toFixed(1);
    mytotal.innerText = "₹" + (total-discount);
}
price();
