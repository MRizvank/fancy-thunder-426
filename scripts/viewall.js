let backtoHOme = document.getElementById("logo-container")
backtoHOme.addEventListener("click", () => {
    location.href = "index.html"
})

let products = JSON.parse(localStorage.getItem("products")) || []

fetch("https://sleepy-puce-greyhound.cyclic.app/products?_page=2&_limit=15")//?_page=3&_limit=10
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        showData(data)
        // renderCards(data)


    })

function showData(data) {
    let cards = "";
    data.forEach((element, index) => {
        let card = `
                        <div class="Rcard" data-id="${element.id}">
                        <img src="${element.images[0]}" alt="${element.images[0]}">
                        <p class="title">${element.name.substr(0, 20)}</p>
                        <p class="price">
                        <span class="price">₹</span>
                        <span class="price">${element.original_price}</span>
                        </p>
                        <div class="delivery">Free Delivery</div>
                        <div class="rating">${element.rating}<i class="fa-solid fa-star"></i></div>
                        </div>
            
                        `;
        cards += card
    });

    document.querySelector(".Rproducts").innerHTML = cards;
    let rating = document.querySelectorAll(".rating");
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
    let divs = document.querySelectorAll(".Rcard")
    for (let item of divs) {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            if (e.target.dataset.id != undefined) {
                products.unshift(e.target.dataset.id)
                console.log(products)
                localStorage.setItem("products", JSON.stringify(products))
                window.location.replace("./product.html");
            }

        })
    }

}
function getCard(id, image, name, price, rating) {
    let card = `
     <div class="Rcard" data-id="${id}">
    <img src="${image[0]}" alt="${image[0]}">
    <p class="title">${name.substr(0, 20)}</p>
    <p class="price">
    <span>₹</span>
    <span >${price}</span>
    </p>
    <div class="delivery">Free Delivery</div>
    <div class="rating">${rating}<i class="fa-solid fa-star"></i></div>
    </div>`;
    return card;
}
function renderCards(data) {
    let cardList = `
    <div class="card-list">
    ${data.map(item => getCard(item.id, item.images, item.name, item.original_price, item.rating)).join("")}
    </div>
    `
    document.querySelector(".Rproducts").innerHTML = cardList
}