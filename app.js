let API = "https://68b6bfc073b3ec66cec28ce1.mockapi.io/assaxi";
let censel = document.getElementById("censel");
let menu = document.getElementById("menu");
let sidebar = document.getElementById("sidebar");
let mobile_nav = document.getElementById("mobile_nav");
let card = document.getElementById("card");

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

function showLoadingSkeleton(count = 6) {
  card.innerHTML = "";
  for (let i = 0; i < count; i++) {
    let div = document.createElement("div");
    div.classList.add("bg-white", "p-[10px]", "rounded-lg", "animate-pulse");

    div.innerHTML = `
      <div class="w-full h-[214px] bg-gray-200 rounded-lg mb-2"></div>
      <div class="h-4 bg-gray-200 rounded w-[80%] mb-2"></div>
      <div class="h-4 bg-gray-200 rounded w-[60%] mb-4"></div>
      <div class="h-5 bg-gray-200 rounded w-[40%] mb-3"></div>
      <div class="flex gap-2">
        <div class="h-8 bg-gray-200 rounded w-full"></div>
        <div class="h-8 bg-gray-200 rounded w-[40px]"></div>
      </div>
    `;
    card.append(div);
  }
}

const getData = async () => {
  showLoadingSkeleton(10);

  try {
    const res = await fetch(API);
    const data = await res.json();

    card.innerHTML = "";
    addUI(data);
  } catch (error) {
    card.innerHTML = `<p class="text-red-500 text-center">Xatolik yuz berdi!</p>`;
    console.error(error);
  }
};

getData();

function addUI(data) {
  data.forEach((element) => {
    let div = document.createElement("div");
    div.classList.add("bg-white", "p-[10px]", "rounded-lg", "relative");
    div.innerHTML = `
                    <div class="flex flex-col items-center gap-2  absolute top-[25px] right-3">
                       <button> <img src="./assets/heart_gray.svg" alt=""></button>
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
                        <button class="bg-[#00BFAF] px-[13px] py-[8px] rounded-[8px]"><img
                                src="https://asaxiy.uz/custom-assets/images/icons/cart-single.svg" alt=""></button>
                    </div>
               
    `;
    card.append(div);
  });
}
