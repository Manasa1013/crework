const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");

let searchInputValue = searchInput.value;

searchInput.addEventListener("change", (e) => {
  console.log(e.target.value);
  searchInputValue = e.target.value;
});

searchButton.addEventListener("click", (e) => {
  console.log(searchInputValue, "from searchButton click");
});
