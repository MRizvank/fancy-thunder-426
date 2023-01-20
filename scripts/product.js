let products = JSON.parse(localStorage.getItem("products")) || [];

let product = products[0];
fetch(`https://sleepy-puce-greyhound.cyclic.app/products/${product}`)
  .then((res) => {
    return res.json()
  })
  .then((data) => {
    showProduct(data)
    console.log(data);
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
              <button><i class="fa-solid fa-cart-shopping"></i>Add to Cart</button>
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

