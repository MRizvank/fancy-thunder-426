let products = JSON.parse(localStorage.getItem("products")) || [];
let cart=JSON.parse(localStorage.getItem("cart"))||[];
let directPayment=JSON.parse(localStorage.getItem("buynow"))||[];  
let userLogin = JSON.parse(localStorage.getItem("login"));         
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
            <div id="buyNowBtn">
              <button><i class="fa-solid fa-angles-right"></i>Buy Now</button>
            </div>
          </div>
        </div>
        <div class="productDetailsArea">
          <div class="aboutDetails">
            <h3>${data.title}</h3>
            <h1 class="price">₹${data.discounted_price}</h1>
            <div class="prating">${data.rating}<i class="fa-solid fa-star"></i></div>
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
          
            localStorage.setItem("cart",JSON.stringify(cart));
            alert("product added to cart")
            return
           }
        }
       
      }
      localStorage.setItem("page","true");
  })


  // direct payment
  document.getElementById("buyNowBtn").addEventListener("click",()=>{
      directPayment.push(item);
      localStorage.setItem("buynow",JSON.stringify(directPayment))
      localStorage.setItem("page","false");
      location.href="address.html";
  })
}, 2000)


//checking for login
let phone = JSON.parse(localStorage.getItem("Phn"));
let myValue = JSON.parse(localStorage.getItem("enteredvalue"));
let password = JSON.parse(localStorage.getItem("myotp"));
let profileLoginContainer = document.querySelector(".profileHoverContainer")
if (userLogin == true && password[password.length - 1] == myValue) {
    profileLoginContainer.innerHTML = `
           <h4 id="rkhello" >Hello User</h4>
              <ph3 id="rkaccess">${phone}</h3>
              <div class="profileSignUpBtn">
                  <button id="rksignup">Log Out</button>
              </div>
              <h3 id="cart">
                <i class="fa-solid fa-bag-shopping" id="bag"></i> My Cart
              </h3>
    `
}
if (userLogin) {
    let logOutBtn = document.querySelector("#rksignup")
    logOutBtn.addEventListener("click", () => {
        userLogin = false;
        location.href = "index.html"
        localStorage.setItem("login", JSON.stringify(userLogin))
    })

}

// access to cart
let cartBtn = document.getElementById("cart")
cartBtn.addEventListener("click", () => {
    if (userLogin) {
        location.href = "cart.html"
    } else {
        location.href = "signup.html"
    }
})


// rating bg color part 


  let rating = document.querySelectorAll(".prating");
  for (let item of rating) {
      if (+item.textContent >= 4.0) {
          item.style.backgroundColor = "#038d63"

      } else if (+item.textContent >= 3.4 && +item.textContent < 4.0) {
          item.style.backgroundColor = "#23bb75"
      } else if (+item.textContent >= 2.4 && +item.textContent < 3.4) {
          item.style.backgroundColor = "#f4b619"
      } else {
          item.style.backgroundColor = "#ee7212"
      }
  }
