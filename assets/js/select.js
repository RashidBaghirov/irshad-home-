let titles = document.querySelectorAll(".title");

document.addEventListener("DOMContentLoaded", function () {
  let basketstr = localStorage.getItem("basket");
  let basket = JSON.parse(basketstr);

  if (!basket || !basket.length) {
    localStorage.setItem("basket", JSON.stringify([]));
  } else {
    ShowTotalPrice(basket);
    ShowProductCount(basket);
  }
});

titles.forEach((title) => {
  title.setAttribute("full-title", title.innerText);
  if (title.innerText.length > 12) {
    title.innerText = title.innerText.substring(0, 12) + "...";
  }
});

let buttons = document.querySelectorAll(".select");

buttons.forEach((btn) => {
  btn.addEventListener("click", function () {
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (!basket) {
      localStorage.setItem("basket", JSON.stringify([]));
      basket = JSON.parse(localStorage.getItem("basket"));
    }
    let product = GetProductsData(this);
    let sameid = basket.find((pro) => {
      return pro.id == product.id;
    });
    if (!sameid) {
      basket.push(product);
    } else {
      sameid.count++;
    }
    ulparent.classList.remove("active");
    ShowTotalPrice(basket);
    ShowProductCount(basket);
    let basketstr = JSON.stringify(basket);
    localStorage.setItem("basket", basketstr);
  });
});

function GetProductsData(product) {
  let parent = product.parentElement.parentElement.parentElement;
  let title = parent.querySelector(".title").getAttribute("full-title");
  let desc = parent.querySelector("p").innerText;
  let src = parent.querySelector("img").src;
  let id = parent.getAttribute("data-id");
  let price = parent.querySelector(".price").innerText;
  result = { title, desc, src, id, price, count: 1 };
  return result;
}

function ShowTotalPrice(basket) {
  let total = document.querySelectorAll(".total-price");
  total.forEach((tt) => {
    tt.innerText = basket.reduce((total, product) => {
      return (total += parseInt(product.price * product.count));
    }, 0);
  });
}

function ShowProductCount(basket) {
  let basketCount = document.querySelector(".basket-count");
  basketCount.innerText = basket.reduce((total, product) => {
    return (total += product.count);
  }, 0);
}

let cart = document.querySelector(".cart");
let ul = document.querySelector(".box-device");
let ulparent = document.querySelector(".box");

cart.addEventListener("click", function (product) {
  ulparent.classList.toggle("active");
  let basket = JSON.parse(localStorage.getItem("basket"));
  registr.classList.remove("activ");
  ul.innerHTML=" ";
  
  basket.forEach((devices) => {
    let task = `
  <li>
  <div class="cart-image">
      <img src="${devices.src}" alt="">
  </div>
  <div class="info">
     <h6>${devices.title}</h6>
     <span>${devices.count}</span>
     x
      <span>${devices.price}AZN</span>
  </div>
  <div class="xbtn">
      <b>X</b>
  </div>
  </li>
  `;
    ul.innerHTML += task;
  });
  let delbtn = document.querySelectorAll(".xbtn");
  
  delbtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      let li = this.parentElement;
      let src = li.querySelector(".cart-image img").src;
      basket = basket.filter((device) => device.src != src);
      li.remove();
      ShowTotalPrice(basket);
      ShowProductCount(basket);
      localStorage.setItem("basket", JSON.stringify(basket));
    });
  });
});


let user = document.querySelector(".user");
let registr = document.querySelector(".registration");

user.addEventListener("click", function () {
  registr.classList.toggle("activ");
  ulparent.classList.remove("active");
});

let sub = document.querySelector(".sub");

sub.addEventListener("click", function () {
  registr.classList.remove("activ");
});
