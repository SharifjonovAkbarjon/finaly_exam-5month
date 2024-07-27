const skeleton = document.querySelector(".skeleton");
const wrapper = document.querySelector(".api__wrapper");
const seeMore = document.querySelector(".see__more");
const collection = document.querySelector(".api__collection");

const API_URL = "https://dummyjson.com";

for (let i = 0; i < 8; i++) {
    let skeletonItem = document.createElement("div");
    skeletonItem.classList.add("skeleton__item");
    skeletonItem.innerHTML = `
        <div class="skeleton__img skeleton__animation"></div>
        <div class="skeleton__line skeleton__animation"></div>
        <div class="skeleton__line skeleton__animation"></div>
        <div class="skeleton__line skeleton__animation"></div>
    `;
    skeleton.append(skeletonItem);
}

let offset = 1;
let perPageCount = 8;
let categoryValue = "";

async function fetchData(api, limit, category) {
    try {
        let response = await fetch(`${api}/products${category}?limit=${limit}`);
        let res = await response.json();
        createCard(res);
    } catch (err) {
        console.error(err);
    } finally {
        skeleton.style.display = 'none';
    }
}

fetchData(API_URL, perPageCount, "");

function createCard(data) {
    while (wrapper.firstChild) {
        wrapper.firstChild.remove();
    }

    data.products.forEach((product) => {
        let cardItem = document.createElement("div");
        cardItem.classList.add("api__card");
        cardItem.dataset.id = product.id;

        cardItem.innerHTML = `
               <div class="img__part">
               <i class="fa-regular fa-heart"></i>
               <img src="${product.images[0]}" class="card__images" alt="">
                <button class="api__btns">Add To Cart</button>

               </div>
            <h3>${product.brand}</h3>
            <p class="desc" title="${product.description}">${product.description}</p>

        `;
        wrapper.appendChild(cardItem);
    });
}

wrapper.addEventListener("click", (e) => {
    if (e.target.classList.contains("api__btns")) {
        window.location.href = `/pages/page.html?id=${e.target.closest(".api__card").dataset.id}`;
    }
});



seeMore.addEventListener('click', () => {
    offset++;
    fetchData(API_URL, perPageCount * offset, categoryValue);
});

async function fetchCategory(api) {
    try {
        let response = await fetch(`${api}/products/categories`);
        let res = await response.json();
        createCategory(res);
    } catch (err) {
        console.error(err);
    }
}

fetchCategory(API_URL);

function createCategory(data) {
    data.forEach((category) => {
        let list = document.createElement("li");
        list.className = "item";
        list.innerHTML = `
          
        `;
        collection.appendChild(list);
    });
}

collection.addEventListener("click", (e) => {
    if (e.target.tagName === "DATA") {
        categoryValue = e.target.value;
        fetchData(API_URL, perPageCount, categoryValue);
    }
});

function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
}
function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
}