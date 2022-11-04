const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");

let searchInputValue = searchInput.value;

const id = "222026c437384544b7fb802e7dbba16c";
const token = "7b1f659c15b74166854b42766fef0d22";

searchInput.addEventListener("change", (e) => {
  console.log(e.target.value);
  searchInputValue = e.target.value;
});

searchButton.addEventListener("click", (e) => {
  console.log(searchInputValue, "from searchButton click");
});
