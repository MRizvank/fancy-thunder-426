// accesing local storage
let userLogin = JSON.parse(localStorage.getItem("login"));

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

fetch("https://sleepy-puce-greyhound.cyclic.app/products?_page=3&_limit=10")//?_page=3&_limit=10
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        showData(data)
        // showDataOnCategory(data)
        // renderCards(data)
    })

function showData(data) {
    let cards = "";
    data.forEach((element, index) => {
        let card = `
                        <div class="Rcard" data-id="${element.id}">
                        <img src="${element.images[0]}" alt="${element.images[0]}">
                        <p class="product-title">${element.title ? element.title.substr(0, 20) : "No tittle"}</p>
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
            if (userLogin) {
                if (e.target.dataset.id != undefined) {
                    singleProduct.unshift(e.target.dataset.id)
                    console.log(singleProduct)
                    localStorage.setItem("products", JSON.stringify(singleProduct))
                    window.location.replace("./product.html");
                }
            } else {
                location.href = "signup.html"
            }

        })
    }

}



//backTohome
let logo = document.getElementById("logo")
logo.addEventListener("click", () => {
    location.href = "index.html"
})
//cart
document.querySelector(".cartContainer").addEventListener("click", () => {
    if (userLogin) {
        location.href = "cart.html"
    } else {
        location.href = "signup.html"
    }

})

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





let category = document.querySelectorAll(".category")
for (let item of category) {
    // function showDataOnCategory(data) {
    item.addEventListener("change", () => {
        if (item.checked) {
            console.log(item.value)
            let cards = document.querySelector(".productscard-container").innerHTML;
            cards = null;
            data.forEach((element, index) => {
                if (element.category == item.value) {
                    data.forEach((element, index) => {
                        let card = `
                    <div class="Rcard" data-id="${element.id}">
                    <img src="${element.images[0]}" alt="${element.images[0]}">
                    <p class="product-title">${element.title ? element.title.substr(0, 20) : "No tittle"}</p>
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
                            if (userLogin) {
                                if (e.target.dataset.id != undefined) {
                                    singleProduct.unshift(e.target.dataset.id)
                                    console.log(singleProduct)
                                    localStorage.setItem("products", JSON.stringify(singleProduct))
                                    window.location.replace("./product.html");
                                }
                            } else {
                                location.href = "signup.html"
                            }
                        })
                    }
                }
            })
        } else {
            console.error("not")
        }

    })
    // }
}

