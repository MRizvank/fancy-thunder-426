let cart=JSON.parse(localStorage.getItem("cart"))||[];
let baseserverurl="https://sleepy-puce-greyhound.cyclic.app/products";
let productTotal=document.getElementById("product-total");
let oderTotal=document.getElementById("oder-total");
let cartTotal=document.getElementById("item-count");


showCartData(cart)

//showing into the dom 

function showCartData(data){
    let cards="";
    data.forEach((element) => {
        let card=`
        <div class="card-item"> 
        <div class="card-image"> <img src="${element.images[0]}" alt=""></div>
        <div class="details">
        <p>${element.title}</p>
        <p>Size:${element.sizes[0]} Qty:${element.user_qty}</p>
        <p>₹${element.original_price}</p>
        <button id="remove">REMOVE</button>
        </div>
        </div>
        `
        // let btn=document.createElement("button")

        cards+=card;
        
    });
   
    document.querySelector(".product-list-items").innerHTML=cards
}


function showCarttotal(){
    let pTotal=0;
    let cTotal=0;

    cart.forEach((element)=>{
        pTotal+=(element.original_price * element.user_qty);
        cTotal+=(element.original_price * element.user_qty);
    })

    productTotal.textContent="₹"+pTotal;
    oderTotal.textContent="₹"+cTotal;
    cartTotal.textContent=cart.length;


}
showCarttotal();