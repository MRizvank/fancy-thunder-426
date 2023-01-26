let cart=JSON.parse(localStorage.getItem("cart"))||[];
let baseserverurl="https://sleepy-puce-greyhound.cyclic.app/products";
let productTotal=document.getElementById("product-total");
let oderTotal=document.getElementById("oder-total");
let cartTotal=document.getElementById("item-count");

if(cart.length==0){
    document.querySelector(".main").innerHTML="YOUR CART IS EMPTY!!!!!"
  
}else{
    showCartData(cart)
}
//showing into the dom 

function showCartData(data){
    let cards="";
    data.forEach((element) => {
        let card=`
        <div class="card-item"> 
        <div class="card-image"> <img src="${element.images[0]}" alt=""></div>
        <div class="details" >
        <p>${element.title}</p>
        <p>Size:${element.sizes[0]} &nbsp&nbsp Qty:${element.user_qty}</p>
        <p>₹${element.original_price}</p>
        <button id="remove" data-id=${element.id}>REMOVE</button>
        </div>
        <hr>
        <div>Supplier: ABC &nbsp Free delivery</div>
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

document.getElementById("continue").addEventListener("click",()=>{
    location.href="address.html"
})


//removing item from cart
setTimeout(()=>{
    document.getElementById("remove").addEventListener("click",(e)=>{
        e.preventDefault()
        cart.forEach((elemen,index)=>{
            if(elemen.id==e.target.dataset.id){
                cart.splice(index,1)
                localStorage.setItem("cart",JSON.stringify(cart))
                if(cart.length==0){
                    document.querySelector(".main").innerHTML="YOUR CART IS EMPTY!!!!!"
                  
                }else{
                    showCartData(cart)
                }
                showCarttotal();
            }
        })
        
    })
})
showCarttotal();