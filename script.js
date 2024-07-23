const searchInput = document.querySelector(".search__box");
const flag = document.querySelector(".flag__img-container");

generateOptions();
const options = document.querySelector(".options__block");
const countryOptionsBlock = document.querySelector(".search__country");

async function generateOptions(filterParams = "") {
  const res = await fetch("./countries.json");
  const data = await res.json();

  let filteredData = Object.keys(data);
  if (filterParams.length !== 0) {
    filteredData = Object.keys(data).filter((key) => {
      return data[key].country_name
        .toLowerCase()
        .includes(filterParams.toLowerCase());
    });
  }
  options.innerHTML = "";

  if (filteredData.length === 0) {
    options.innerHTML = `<p>No Country Found</p>`;
  } else {
    filteredData.forEach((key) => {
      optionHTML = `<div class="options"><div class="img-options"
          ><img src="https://flagcdn.com/${key.toLowerCase()}.svg" class="img-option" alt="" srcset=""
          /></div>
          <span>${data[key].dialling_code}</span>
          <span>${data[key].country_name}</span></div>`;

      options.insertAdjacentHTML("beforeend", optionHTML);
    });
  }
}

searchInput.addEventListener("keyup", (e) => {
  console.log(e.target.value);
  setTimeout(() => {
    generateOptions(e.target.value);
  }, 800);
});

flag.addEventListener("click", () => {
  countryOptionsBlock.classList.add("height");
});

options.addEventListener("click", (e) => {
  const diallingCode = e.target.closest(".options").children[1].innerText;
  const flagSrc = e.target.closest(".options").children[0].children[0].src;

  document.getElementById("dialling-code").innerText = diallingCode;
  document.querySelector(".flag__img").src = flagSrc;
  countryOptionsBlock.classList.remove("height");
});
