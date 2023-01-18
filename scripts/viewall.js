

fetch("https://sleepy-puce-greyhound.cyclic.app/products")
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        showData(data)


    })

function showData(data) {
    let card = "";
    for (let item of data) {
        card += `
                        <div class="Rcard">
                        <img src="${item.images[0]}" alt="${item.images[0]}">
                        <p class="title">${item.title.substr(0, 20)}</p>
                        <p class="price">
                        <span>₹</span>
                        <span >${item.original_price}</span>
                        </p>
                        <div class="delivery">Free Delivery</div>
                        <div class="rating">${item.rating}<i class="fa-solid fa-star"></i></div>
                        </div>
            
                        `;

    }

    document.querySelector(".Rproducts").innerHTML = card;
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