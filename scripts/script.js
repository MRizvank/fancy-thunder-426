
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
