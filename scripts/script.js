
let inputSearch = document.getElementById("inputSerch")
let serachClose = document.getElementById("searchClose")
let formInput = document.getElementById("form")
let recentSearchList = document.querySelector(".recentSerchList")
let recentSrearch = [];
let singleProduct = JSON.parse(localStorage.getItem("products")) || []


inputSearch.addEventListener("keydown", () => {
    if (inputSearch.value) {
        serachClose.style.display = "block"
    } else {
        serachClose.style.display = "none"
    }
})



formInput.addEventListener("submit", (e) => {
    e.preventDefault()
    let recentSerchListEl = ""
    recentSrearch.unshift(inputSearch.value)
    if (recentSrearch.length > 0) {
        for (let i = 0; i < recentSrearch.length; i++) {
            recentSerchListEl += `
                <div class="recentItem">
                     <div class="recentIcon">
                        <img src="./img/recent.png" alt="">
                    </div>
                     <p>${recentSrearch[i]}</p>
                </div>
            `
        }
    }

    recentSearchList.innerHTML = recentSerchListEl
})

fetch("https://sleepy-puce-greyhound.cyclic.app/products")//?_page=3&_limit=10
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
                        <p class="product-title">${element.name.substr(0, 20)}</p>
                        <p class="price">
                        <span class="price">₹</span>
                        <span  class="price">${element.original_price}</span>
                        </p>
                        <div class="delivery">Free Delivery</div>
                        <div class="rating">${element.rating}<i class="fa-solid fa-star"></i></div>
                        </div>
            
                        `;
        cards += card
    });

    document.querySelector(".productscard-container").innerHTML = cards;
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


//backTohome
let logo = document.getElementById("logo")
logo.addEventListener("click", () => {
    location.href = "index.html"
})
//gettheDownloadBTn
document.querySelector(".downloadPlayButton").addEventListener("click", () => {
    location.href = "https://play.google.com/store/apps/details?id=com.meesho.supply&pid=pow_website&c=pow"
})
document.getElementById("playStore").addEventListener("click", () => {
    location.href = "https://play.google.com/store/apps/details?id=com.meesho.supply&pid=pow_website&c=pow"
})
document.getElementById("appStore").addEventListener("click", () => {
    location.href = "https://apps.apple.com/us/app/meesho/id1457958492"
})

document.querySelector(".sellerContainer").addEventListener("click", () => {
    location.href = "BecomeSupplier.html"
})



//checkin for funcanality
let category = document.querySelectorAll(".category")
for (let item of category) {
    item.addEventListener("change", () => {
        if (item.checked) {
            console.log(item.value)
        } else {
            console.error("not")
        }
    })
}
