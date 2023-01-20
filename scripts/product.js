let products = JSON.parse(localStorage.getItem("products")) || [];
let cart=JSON.parse(localStorage.getItem("cart"))||[];
let item={}
let product = products[0];
fetch(`https://sleepy-puce-greyhound.cyclic.app/products/${product}`)
  .then((res) => {
    return res.json()
  })
  .then((data) => {
    showProduct(data)
   item=data
    if (products.length > 10) {
      products.pop()
      localStorage.setItem("products", JSON.stringify(products))
    }
  })


function showProduct(data) {
  let card = `
     <div class="productImageArea">
          <img src="${data.images[0]}" alt="">
          <div class="btuttons">
            <div class="atcBtn">
              <button id="addto-cart"><i class="fa-solid fa-cart-shopping"></i>Add to Cart</button>
            </div>
            <div class="buyNowBtn">
              <button><i class="fa-solid fa-angles-right"></i>Buy Now</button>
            </div>
          </div>
        </div>
        <div class="productDetailsArea">
          <div class="aboutDetails">
            <h3>${data.title}</h3>
            <h1 class="price">₹${data.original_price}</h1>
            <h3 class="prating">${data.rating}</h3>
            <p class="productDelivery">Free delivery</p>
          </div>
          <div class="sizeDetails">
            <h3>Select Size</h3>
            <span>${data.sizes[0]}</span>
          </div>
          <div class="productDetails">
            <p>Name : ${data.title}</p>
            <p>Fabric : ${data.details.Fabric}</p>
            <p>Pattern : ${data.details.Pattern}</p>
            <p>Combo of : ${data.details.Multipack}</p>
            <p> Sizes :${data.sizes[0]}</p>
             <p>Description:-${data.details.Description}</p>
          </div>
        </div>
    `

  document.querySelector(".prodcutOrderContainer").innerHTML = card;
}

//cart

document.querySelector(".cartContainer").addEventListener("click",()=>{
  location.href="cart.html"
})


// cart functionality 
setTimeout(() => {
  document.getElementById("addto-cart").addEventListener("click",()=>{
    console.log("hiii");
      let Incart=false;
      for(let item of cart){
        if(item.id==product){
          Incart=true;
          break;
        }
      }
      if(Incart==false){
        cart.push({...item,user_qty:1});
        localStorage.setItem("cart",JSON.stringify(cart))
        console.log(cart);
        alert("product added to cart")
      }else{
        for(let item of cart){
          if( item.id==product){
            item.user_qty++;
            console.log(item);
            localStorage.setItem("cart",JSON.stringify(cart));
            alert("product added to cart")
            return
           }
        }
       
        
          
      
      }

  })
}, 2000)
