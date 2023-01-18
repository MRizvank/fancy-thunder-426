let products=JSON.parse(localStorage.getItem("products"))||[];

let product=products[0];
fetch(`https://sleepy-puce-greyhound.cyclic.app/products/${product}`)
.then((res)=>{
    return res.json()
})
.then((data)=>{
    showProduct(data)
    console.log(data)
    products.pop()
    localStorage.setItem("products",JSON.stringify(products))



})

function showProduct(data){
    let card=`
    <div class="item">
    <img src="${data.images[0]}" alt="">
    <div class="price">${data.original_price}
    </div>
    <div class="size">${data.id}
    </div>
    <div class="details">
    <div>
    <button id="addto-cart">Add to cart</button>
    <button id="buynow">Buy Now</button>
    </div>
    `
    document.querySelector(".product").innerHTML=card;
}