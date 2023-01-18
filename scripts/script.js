
let inputSearch = document.getElementById("inputSerch")
let serachClose = document.getElementById("searchClose")
let formInput = document.getElementById("form")
let recentSearchList = document.querySelector(".recentSerchList")
let recentSrearch = [];


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

//backTohome
let logo = document.getElementById("logo")
logo.addEventListener("click", () => {
    location.href = "meesho.html"
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



// product container starts from here
fetch("https://sleepy-puce-greyhound.cyclic.app/products")
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log(data)
        showData(data)
    })


function showData(data) {
    let card = "";
    for (let item of data) {
        card += `
                        <div class="Rcard">
                        <img src="${item.images[0]}" alt="${item.images[0]}">
                        <p class="title">${item.name.substring(0, 20)}</p>
                        <p class="price">
                        <span>₹</span>
                        <span >${item.original_price}</span>
                        </p>
                        <div class="delivery">Free Delivery</div>
                        <div class="rating">${item.rating}<i class="fa-solid fa-star"></i></div>
                        </div>
                        `;
    }

    document.querySelector(".rightProductsCardContainer").innerHTML = card;
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


    return card;
}