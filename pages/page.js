
const API_URL = "https://dummyjson.com";
const content = document.querySelector(".content")

async function fetchSingleData(api) {
  let query = new URLSearchParams(window.location.search);
  let id = query.get("id");

  let response = await fetch(`${api}/products/${id}`);
  response
    .json()
    .then((mana) => createContent(mana))
    .catch((pishirib) => console.log(pishirib));
}

fetchSingleData(API_URL);

function createContent(data) {
  console.log(data);
  content.innerHTML = `
      <div class="content_image container">
        <div class="images__parts">  <div class="images"><img width="300" src="${data.images[0]}" alt="${data.title}"></div>
          <div class="images__little"> ${data.images.map((item) => (
    `<img width= "80px" src=${item} alt=""></img>`
  ))
    }</div></div>
        <div class=""></div>
      <div class="content_text">
      <h1>${data.title}</h1>
      <p class="product_price">$${data.price}</p>
      <p>${data.description}</p>
      <hr>
         <div class="ap_siz">
        <p class="size">Size:</p>
        <div class="api__sizes">XS</div>
        <div class="api__sizes">S</div>
        <div class="api__sizes">M</div>
        <div class="api__sizes">L</div>
        <div class="api__sizes">XL</div>
    </div>
          <div class="counter__part">
        <div class="counter">
            <div class="hisob">-</div>
            <div class="hisob">2</div>
            <div class="hisob">+</div>
        </div>
        <div class="buttons">
            <button>Buy Now</button>
            <div class="icons_api">
                <i class="fa-regular fa-heart"></i>
            </div>
        </div>
    </div>
            <div class="delivery">
        <div class="body">
            <div class="ikonka">
                <i class="fa-solid fa-truck-fast"></i>
            </div>
            <div class="delivery__title">
                <p class="delivery__text">Free Delivery</p>
                <p class="delivery__paragraph">Enter your postal code for Delivery Availability</p>
            </div>
        </div>
        <div class="body">
            <div class="ikonka">
                <i class="fa-solid fa-truck-fast"></i>
            </div>
            <div class="delivery__title">
                <p class="delivery__text">Free Delivery</p>
                <p class="delivery__paragraph">Enter your postal code for Delivery Availability</p>
            </div>
        </div>
    </div>
      </div>
      `;
}


function showSidebar() {
  const sidebar = document.querySelector('.sidebar')
  sidebar.style.display = 'flex'
}
function hideSidebar() {
  const sidebar = document.querySelector('.sidebar')
  sidebar.style.display = 'none'
}