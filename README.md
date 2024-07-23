# Promise Task Numverify API

### generateOptions function

    This function is used to read countries.json file and render countries options.

```js
// function to display counties options
async function generateOptions(filterParams = "") {
  // Reading countries.json file
  const res = await fetch("./countries.json");

  // Converting response to JavaScript object

  const data = await res.json();

  // Converting data object keys to an array using Object.keys() static method
  let filteredData = Object.keys(data);

  // This function accepts search params as string
  // If the function is passed with a search params then the data is filtered using filter method

  if (filterParams.length !== 0) {
    filteredData = Object.keys(data).filter((key) => {
      return data[key].country_name
        .toLowerCase()
        .includes(filterParams.toLowerCase());
    });
  }

  // At this stage the filtered data will have all the data or filtered data.
  // Below line resets the results for rendering

  options.innerHTML = "";

  // The below conditional statement checks if the filtered array is empty if so display a message.

  if (filteredData.length === 0) {
    options.innerHTML = `<p>No Country Found</p>`;
  } else {
    // If the filtered array has data then render the options

    // The below code loops the filtered data and prepare an individual country option and add to the block.
    filteredData.forEach((key) => {
      const optionHTML = `<div class="options"><div class="img-options"
          ><img src="https://flagcdn.com/${key.toLowerCase()}.svg" class="img-option" alt="" srcset=""
          /></div>
          <span>${data[key].dialling_code}</span>
          <span>${data[key].country_name}</span></div>`;

      options.insertAdjacentHTML("beforeend", optionHTML);
    });
  }
}
```

### Event Listerners

## Search input event listening.

    The below event listerner is used to listen for a keyup event inside the search input field.

```js
// Attach an event listener for keyup event on the search input field
searchInput.addEventListener("keyup", (e) => {
  // The below code is to clear unwanted key press for optimisation.

  // This clears the timer
  window.clearTimeout(timer);
  console.log(e.target.value);
  // This initiate the timer which excutes the callback and creates the country options for the last key press
  timer = window.setTimeout(() => {
    generateOptions(e.target.value);
  }, 800);
});
```

## Flag image click event listening for showing/hiding countries options.

    The below event listerner is used to listen for a mouse click event on the flag image in the phone number input field.

```js
// This listens for the click events on the flag on the input field for showing/hiding countries options.
flag.addEventListener("click", () => {
  countryOptionsBlock.classList.toggle("height");
});
```

## Selecting a option to change the input flag and dialling code.

    The below code is to select tje required options for the API call.

```js
// This event is to select a required dialling code and flag image.
options.addEventListener("click", (e) => {
  // The below variables are for getting the selected options values.
  const diallingCode = e.target.closest(".options").children[1].innerText;
  const flagSrc = e.target.closest(".options").children[0].children[0].src;

  // This is to change the default value of the dialling code and flag image in the phone number input field.

  document.getElementById("dialling-code").innerText = diallingCode;
  document.querySelector(".flag__img").src = flagSrc;

  // The below code is to reset the option block to initial state.
  countryOptionsBlock.classList.remove("height");
  searchInput.value = "";
  generateOptions();
});
``;
```