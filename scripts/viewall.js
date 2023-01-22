
let userLogin = JSON.parse(localStorage.getItem("login"));

let backtoHOme = document.getElementById("logo-container")
backtoHOme.addEventListener("click", () => {
    location.href = "index.html"
})
let sorting = document.getElementById("sorting");

let products = JSON.parse(localStorage.getItem("products")) || []
var productData = []
sorting.addEventListener("change", sorted)

fetch("https://sleepy-puce-greyhound.cyclic.app/products?_page=1&_limit=20")//?_page=3&_limit=10
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        showData(data)
        productData = data;

    })

function showData(data) {
    let cards = "";
    data.forEach((element, index) => {
        let card = `
                        <div class="Rcard" data-id="${element.id}">
                        <img src="${element.images[0]}" alt="${element.images[0]}">
                        <p class="title">${element.title ? element.title.substr(0, 20) : "No tittle"}</p>
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
            if (userLogin) {
                if (e.target.dataset.id != undefined) {
                    products.unshift(e.target.dataset.id)
                    console.log(products)
                    localStorage.setItem("products", JSON.stringify(products))
                    window.location.replace("./product.html");
                }
            } else {
                location.href = "signup.html"
            }
        })
    }

}
document.getElementById("playStore").addEventListener("click", () => {
    location.href = "https://play.google.com/store/apps/details?id=com.meesho.supply&pid=pow_website&c=pow"
})
document.getElementById("appStore").addEventListener("click", () => {
    location.href = "https://apps.apple.com/us/app/meesho/id1457958492"
})

document.querySelector(".sellerContainer").addEventListener("click", () => {
    location.href = "BecomeSupplier.html"
})


// cart
document.querySelector(".cartContainer").addEventListener("click", () => {
    if (userLogin) {
        location.href = "cart.html"
    } else {
        location.href = "signup.html"
    }

})



//pagination code 

let primaryButtons = [
    { text: "1", 'data-id': 1 },
    { text: "2", 'data-id': 2 },
    { text: "3", 'data-id': 3 },
    { text: "4", 'data-id': 4 },
    { text: "5", 'data-id': 5 },
    { text: "6", 'data-id': 6 }
];

function getAsButton(text, dataid) {
    return `<button class="pages" data-id=${dataid}>${text}</button>`
}

function renderButtons() {
    document.querySelector(".page-container").innerHTML = `
    ${primaryButtons.map(button => {
        return getAsButton(button.text, button["data-id"])
    }).join("")}

    `
}

renderButtons()
//giving functionality to buttons 

let buttons = document.querySelectorAll(".pages");
for (let item of buttons) {
    item.addEventListener("click", (e) => {
        e.preventDefault()
        fetch(`https://sleepy-puce-greyhound.cyclic.app/products?_page=${e.target.dataset.id}&_limit=20`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                showData(data)

                productData = data;

            })



    })
}



//sorting functionality 

function sorted() {
    let value = sorting.value;
    let data = productData;
    if (value == "l2h") {
        ascending = data.sort((a, b) => a.original_price - b.original_price)
        showData(ascending)
    } else if (value == "h2l") {
        descending = data.sort((a, b) => b.original_price - a.original_price)
        showData(descending)
    } else if (value == "rating") {
        rating = data.sort((a, b) => b.rating - a.rating)
        showData(rating)
    } else {
        showData(data);

    }


}




//checking for login

document.querySelector(".cartContainer").addEventListener("click", () => {
    if (userLogin) {
        location.href = "cart.html"
    } else {
        location.href = "signup.html"
    }

})

let phone = JSON.parse(localStorage.getItem("Phn"));
let myValue = JSON.parse(localStorage.getItem("enteredvalue"));
let password = JSON.parse(localStorage.getItem("myotp"));
let profileLoginContainer = document.querySelector(".profileHoverContainer");
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

//access to cart
let cartBtn = document.getElementById("cart")
cartBtn.addEventListener("click", () => {
    if (userLogin) {
        location.href = "cart.html"
    } else {
        location.href = "signup.html"
    }
})



function categoryfilter(){

    let saree=document.getElementById("saree");
    let menswear=document.getElementById("menswear");
    let beautyHealth=document.getElementById("beauty&Health");
    let bagsFootwear=document.getElementById("bags&Footwear");
    let dresses=document.getElementById("dresses");
    let jewellery=document.getElementById("jewellery");

    saree.addEventListener("change", () => {
        if (saree.checked) {
            let abcd = productData.filter((element) => {
                if (element.category == "Sarees") {
                    return element;
                }
            })
            showData(abcd)
        }
        else { showData(productData) }
    })

    menswear.addEventListener("change", () => {
        if (menswear.checked) {
            let abcd = productData.filter((element) => {
                if (element.category == "Menswear") {
                    return element;
                }
            })
            showData(abcd)
        }
        else { showData(productData) }
    })

    beautyHealth.addEventListener("change", () => {
        if (beautyHealth.checked) {
            let abcd = productData.filter((element) => {
                if (element.category == "Beauty&Health") {
                    return element;
                }
            })
            showData(abcd)
        }
        else { showData(productData) }
    })

    bagsFootwear.addEventListener("change", () => {
        if (bagsFootwear.checked) {
            let abcd = productData.filter((element) => {
                if (element.category == "Bags&Footwear") {
                    return element;
                }
            })
            showData(abcd)
        }
        else { showData(productData) }
    })

    dresses.addEventListener("change", () => {
        if (dresses.checked) {
            let abcd = productData.filter((element) => {
                if (element.category == "Dresses") {
                    return element;
                }
            })
            showData(abcd)
        }
        else { showData(productData) }
    })

    jewellery.addEventListener("change", () => {
        if (jewellery.checked) {
            let abcd = productData.filter((element) => {
                if (element.category == "Jewellery") {
                    return element;
                }
            })
            showData(abcd)
        }
        else { showData(productData) }
    })


}

function pricefilter(){

    let under149 = document.getElementById("u149");
    let under199 = document.getElementById("u199");
    let under249 = document.getElementById("u249");
    let under399 = document.getElementById("u399");
    let under499 = document.getElementById("u499");
    let above500 = document.getElementById("a500");

    under149.addEventListener("change", () => {
        if (under149.checked) {
            let abcd = productData.filter((element) => {
                if (element.original_price < 149) {
                    return element;
                }
            })
            showData(abcd)
        }
        else { showData(productData) }
    })

    under199.addEventListener("change", () => {
        if (under199.checked) {
            let abcd = productData.filter((element) => {
                if (element.original_price < 199) {
                    return element;
                }
            })
            showData(abcd)
        }
        else { showData(productData) }
    })

    under249.addEventListener("change", () => {
        if (under249.checked) {
            let abcd = productData.filter((element) => {
                if (element.original_price < 249) {
                    return element;
                }
            })
            showData(abcd)
        }
        else { showData(productData) }
    })

    under399.addEventListener("change", () => {
        if (under399.checked) {
            let abcd = productData.filter((element) => {
                if (element.original_price < 399) {
                    return element;
                }
            })
            showData(abcd)
        }
        else { showData(productData) }
    })

    under499.addEventListener("change", () => {
        if (under499.checked) {
            let abcd = productData.filter((element) => {
                if (element.original_price < 499) {
                    return element;
                }
            })
            showData(abcd)
        }
        else { showData(productData) }
    })

    above500.addEventListener("change", () => {
        if (above500.checked) {
            let abcd = productData.filter((element) => {
                if (element.original_price > 499) {
                    return element;
                }
            })
            showData(abcd)
        }
        else { showData(productData) }
    })

}

function ratingfilter() {

    let rating20 = document.getElementById("rating2.0");
    let rating30 = document.getElementById("rating3.0");
    let rating35 = document.getElementById("rating3.5");
    let rating40 = document.getElementById("rating4.0");


    rating20.addEventListener("change", () => {
        if (rating20.checked) {
            let abcd = productData.filter((element) => {
                if (element.rating >= 2) {
                    return element;
                }
            })
            showData(abcd)
        }
        else { showData(productData) }
    })
    rating30.addEventListener("change", () => {
        if (rating30.checked) {
            let abcd = productData.filter((element) => {
                if (element.rating >= 3) {
                    return element;
                }
            })
            showData(abcd)
        }
        else { showData(productData) }
    })
    rating35.addEventListener("change", () => {
        if (rating35.checked) {
            let abcd = productData.filter((element) => {
                if (element.rating >= 3.5) {
                    return element;
                }
            })
            showData(abcd)
        }
        else { showData(productData) }
    })
    rating40.addEventListener("change", () => {
        if (rating40.checked) {
            let abcd = productData.filter((element) => {
                if (element.rating >= 4) {
                    return element;
                }
            })
            showData(abcd)
        }
        else { showData(productData) }
    })
}

ratingfilter();
pricefilter();
categoryfilter();