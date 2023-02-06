  
  let ul = document.querySelector(".box-device");
  let ulparent = document.querySelector(".box");
let basket = JSON.parse(localStorage.getItem("basket"));

basket.forEach((devices) => {
  let task = `
<li>
<div class="cart-image">
    <img src="${devices.src}" alt="">
</div>
<div class="info">
   <h2>${devices.title}</h2>
   <span>${devices.count}</span>
   <span>x</span>
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
