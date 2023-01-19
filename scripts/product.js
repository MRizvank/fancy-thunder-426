let products=JSON.parse(localStorage.getItem("products"))||[];

let product=products[0];
fetch(`https://sleepy-puce-greyhound.cyclic.app/products/${product}`)
.then((res)=>{
    return res.json()
})
.then((data)=>{
    showProduct(data)
    console.log(data);
  if(products.length>10){
    products.pop()
    localStorage.setItem("products",JSON.stringify(products))
  }
  


})


function showProduct(data){
    let card=`
    <div class="item">
    <img class="product-image"src="${data.images[0]}" alt="">
    <p>${data.name}</p>
    <span class="price">₹</span>
    <span class="price">${data.original_price}
    </span>
    <div class="size">${data.sizes[0]}
    </div>
    <div class="details">
    <p>Description:-${data.details.Description}</p>
    <p>Multipack:-${data.details.Multipack}</p>
    <p>Fabric:-${data.details.Fabric}
    <p>Pattern:-${data.details.Pattern}
    <div>
    <button id="addto-cart">Add to cart</button>
    <button id="buynow">Buy Now</button>
    </div>
    `
    document.querySelector(".product").innerHTML=card;
}