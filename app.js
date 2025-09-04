let API = "https://68b6bfc073b3ec66cec28ce1.mockapi.io/assaxi";
let censel = document.getElementById("censel");
let menu = document.getElementById("menu");
let sidebar = document.getElementById("sidebar");
let mobile_nav = document.getElementById("mobile_nav");
let card = document.getElementById("card");
let shop_card = document.getElementById("shop_card");
let lice_card = document.getElementById("lice_card");
let shop = JSON.parse(localStorage.getItem("shop")) || [];
let like = JSON.parse(localStorage.getItem("like")) || [];
let empty_shop = document.getElementById("empty_shop");
let empt_like = document.getElementById("empt_like");
let section_card = document.getElementById("section_card");
let like_section = document.getElementById("like_section");
let total_shop = document.getElementById("total_shop");

menu.addEventListener("click", () => {
  sidebar.classList.remove("-translate-x-full");
  sidebar.classList.add("translate-x-0");

  mobile_nav.classList.add("bg-gray-200");
  mobile_nav.classList.remove("bg-white");
});

censel.addEventListener("click", () => {
  sidebar.classList.add("-translate-x-full");
  sidebar.classList.remove("translate-x-0");

  mobile_nav.classList.add("bg-white");
  mobile_nav.classList.remove("bg-gray-200");
});

// function showLoadingSkeleton(count = 6) {
//   card.innerHTML = "";
//   for (let i = 0; i < count; i++) {
//     let div = document.createElement("div");
//     div.classList.add("bg-white", "p-[10px]", "rounded-lg", "animate-pulse");

//     div.innerHTML = `
//       <div class="w-full h-[214px] bg-gray-200 rounded-lg mb-2"></div>
//       <div class="h-4 bg-gray-200 rounded w-[80%] mb-2"></div>
//       <div class="h-4 bg-gray-200 rounded w-[60%] mb-4"></div>
//       <div class="h-5 bg-gray-200 rounded w-[40%] mb-3"></div>
//       <div class="flex gap-2">
//         <div class="h-8 bg-gray-200 rounded w-full"></div>
//         <div class="h-8 bg-gray-200 rounded w-[40px]"></div>
//       </div>
//     `;
//     card.append(div);
//   }
// }

// const getData = async () => {
//   showLoadingSkeleton(10);

//   try {
//     const res = await fetch(API);
//     const data = await res.json();

//     card.innerHTML = "";
//     addUI(data);
//   } catch (error) {
//     card.innerHTML = `<p class="text-red-500 text-center">Xatolik yuz berdi!</p>`;
//     console.error(error);
//   }
// };

// getData();

const getData = async () => {
  const res = await fetch(API);
  const data = await res.json();
  console.log(data);

  return data;
};

getData().then((res) => addUI(res));
function addUI(data) {
  data.forEach((element) => {
    let div = document.createElement("div");
    div.classList.add("bg-white", "p-[10px]", "rounded-lg", "relative");
    div.innerHTML = `
                    <div class="flex flex-col items-center gap-2  absolute top-[25px] right-3">
                       <button id=${
                         element.id
                       } class="like"> <img src="./assets/heart_gray.svg" alt=""></button>
                      <img src="./assets/compare_gray.svg" alt="">
                    </div>
                    <div class="w-full flex h-[214px] justify-center mb-1">
                        <img src=${element.img}
                            alt="asaxiy" class="w-full h-auto object-contain rounded-lg">
                    </div>
                    <h3 class="text-[12px] text-[#000000] font-semibold w-[90%] mb-4">${
                      element.title.slice(0, 30) + "..."
                    }</h3>
                    <div class="flex justify-between items-center mb-[17px]">
                        <div class="">
                            <span><i class="fas fa-star" style="color:#fe7300"></i></span>
                            <span><i class="fas fa-star" style="color:#fe7300"></i></span>
                            <span><i class="fas fa-star" style="color:#fe7300"></i></span>
                            <span><i class="fas fa-star" style="color:#fe7300"></i></span>
                            <span><i class="fas fa-star" style="color:#fe7300"></i></span>
                        </div>
                        <span class="text-[#C2C6D1] text-[12px]">0 отзывов</span>
                    </div>

                    <p class="text-[18px] font-bold text-[#006bff] mb-[8px]"> ${element.price.toLocaleString()} so'm</p>

                    <div class="border-1 border-solid text-[#FE7300] border-[#FE7300] p-[5px] rounded-[4px] mb-4">883
                        200 сум x 6 мес</div>

                    <div class="flex gap-1">
                        <button class="bg-[#006BFF] text-white w-full px-[10px] py-[5px] rounded-lg">Купить в один
                            клик</button>
                        <button
                        id=${element.id}
                         class="shop bg-[#00BFAF] px-[13px] py-[8px] rounded-[8px]"><img
                                src="https://asaxiy.uz/custom-assets/images/icons/cart-single.svg" alt=""></button>
                    </div>
               
    `;
    card.append(div);
  });
  let btns = document.querySelectorAll(".shop");
  btns.forEach((value) => {
    value.addEventListener("click", (e) => {
      let product = data.find((item) => item.id === e.currentTarget.id);
      if (shop.find((value) => value.id === e.currentTarget.id)) {
        return;
      }
      shop = [...shop, { ...product, counter: 1, userPrice: product.price }];
      localStorage.setItem("shop", JSON.stringify(shop));
    });
  });
  let likeBtns = document.querySelectorAll(".like");
  likeBtns.forEach((value) => {
    value.addEventListener("click", (e) => {
      let product = data.find((item) => item.id === e.currentTarget.id);
      if (like.find((value) => value.id === e.currentTarget.id)) {
        return;
      }
      like = [...like, product];
      localStorage.setItem("like", JSON.stringify(like));
    });
  });
}

function addUIShop(data) {
  if (data.length === 0) {
    empty_shop.classList.remove("hidden");
    section_card.classList.add("hidden");
  } else {
    empty_shop.classList.add("hidden");
    section_card.classList.remove("hidden");
  }

  data.forEach((value) => {
    let div = document.createElement("div");
    div.classList.add(
      "flex",
      "p-[10px]",
      "py-[10px]",
      "gap-5",
      "border-b",
      "border-b-gray-400"
    );
    div.innerHTML = `
                      <div class="w-[124px]">
                        <img src=${value.img}
                            alt="">
                    </div>
                    <div class="flex-1 flex flex-col md:flex-row gap-5 items-center justify-between">
                        <h3>${value.title}</h3>
                        <div class="flex flex-col md:flex-row gap-5 items-center">
                            <div class="flex items-center">
                                <div class="flex items-center">
                                   <button type="button" id=${value.id}
                                      class="decrement w-[26px] h-[26px] rounded-full border border-[#006bff] shrink-0 items-center justify-center ">
                                            -
                                    </button>
                                    <input type="text" id="counter-input-5" data-input-counter
                                        class="w-10 shrink-0 border-0  text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 "
                                        placeholder="" value=${
                                          value.counter
                                        } required />
                                    <button type="button" id=${value.id}
                                    class="increment w-[26px] h-[26px] rounded-full border border-[#006bff] shrink-0 items-center justify-center ">
                                      +
                                      </button>
                                </div>
                            </div>
                            <h4 class="text-[16px] text-[#006BFF] font-semibold">${value.userPrice.toLocaleString()} UZS</h4>
                            <div class="flex gap-1 items-center">
                                <button><img src="../assets/heart_gray.svg" alt="" class="w-[16px]"></button>
                                <button 
                                id=${value.id}
                                class="delete-shop"><img src="" alt=""><i class="fas fa-trash-alt"></i></button>
                            </div>
                        </div>
                    </div>`;
    shop_card.append(div);
  });
  let btns = document.querySelectorAll(".delete-shop");
  btns.forEach((value) => {
    value.addEventListener("click", (e) => {
      shop = shop.filter((item) => item.id != e.currentTarget.id);
      console.log(shop);
      localStorage.setItem("shop", JSON.stringify(shop));
      shopRefresh();
      totalPrice(shop);
    });
  });
}

function shopRefresh() {
  shop_card.innerHTML = "";
  addUIShop(shop);
}

addUIShop(shop);

shop_card.addEventListener("click", (e) => {
  if (e.target.classList.contains("increment")) {
    const id = e.target.id;

    increment(id);
  }
  if (e.target.classList.contains("decrement")) {
    const id = e.target.id;

    decrement(id);
  }
});

function increment(id) {
  shop = shop.map((value) =>
    value.id === id
      ? {
          ...value,
          counter: (value.counter += 1),
          userPrice: value.price * value.counter,
        }
      : value
  );
  localStorage.setItem("shop", JSON.stringify(shop));
  shopRefresh();
  totalPrice(shop);
}

function decrement(id) {
  shop = shop.map((value) =>
    value.id === id && value.counter > 1
      ? {
          ...value,
          counter: (value.counter -= 1),
          userPrice: value.price * value.counter,
        }
      : value
  );
  localStorage.setItem("shop", JSON.stringify(shop));
  shopRefresh();
  totalPrice(shop);
}

function totalPrice(shop) {
  let total_sum = shop.reduce((acc, value) => acc + value.userPrice, 0);
  total_shop.innerHTML = total_sum.toLocaleString() + " so'm";
}
totalPrice(shop);
console.log(like);


function addUILike(data) {
  if (data.length === 0) {
    empt_like.classList.remove("hidden");
    like_section.classList.add("hidden");
  } else {
    empt_like.classList.add("hidden");
    like_section.classList.remove("hidden");
  }

  data.forEach((element) => {
    let div = document.createElement("div");
    div.classList.add("bg-white", "p-[10px]", "rounded-lg", "relative");
    div.innerHTML = `
     <div class="flex flex-col items-center gap-2  absolute top-[25px] right-3">
                       <button id=${
                         element.id
                       } class="like"> <img src="./assets/heart_gray.svg" alt=""></button>
                      <img src="./assets/compare_gray.svg" alt="">
                    </div>
                    <div class="w-full flex h-[214px] justify-center mb-1">
                        <img src=${element.img}
                            alt="asaxiy" class="w-full h-auto object-contain rounded-lg">
                    </div>
                    <h3 class="text-[12px] text-[#000000] font-semibold w-[90%] mb-4">${
                      element.title.slice(0, 30) + "..."
                    }</h3>
                    <div class="flex justify-between items-center mb-[17px]">
                        <div class="">
                            <span><i class="fas fa-star" style="color:#fe7300"></i></span>
                            <span><i class="fas fa-star" style="color:#fe7300"></i></span>
                            <span><i class="fas fa-star" style="color:#fe7300"></i></span>
                            <span><i class="fas fa-star" style="color:#fe7300"></i></span>
                            <span><i class="fas fa-star" style="color:#fe7300"></i></span>
                        </div>
                        <span class="text-[#C2C6D1] text-[12px]">0 отзывов</span>
                    </div>

                    <p class="text-[18px] font-bold text-[#006bff] mb-[8px]"> ${element.price.toLocaleString()} so'm</p>

                    <div class="border-1 border-solid text-[#FE7300] border-[#FE7300] p-[5px] rounded-[4px] mb-4">883
                        200 сум x 6 мес</div>

                    <div class="flex gap-1">
                        <button class="bg-[#006BFF] text-white w-full px-[10px] py-[5px] rounded-lg">Купить в один
                            клик</button>
                        <button
                        id=${element.id}
                         class="shop bg-[#00BFAF] px-[13px] py-[8px] rounded-[8px]"><img
                                src="https://asaxiy.uz/custom-assets/images/icons/cart-single.svg" alt=""></button>
                    </div>
                    `;
    lice_card.append(div);
  });
}

addUILike(like);
