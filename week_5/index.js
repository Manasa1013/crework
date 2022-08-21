const showButton = document.querySelector("#show--button");

showButton.addEventListener(
  "click",
  () => {
    let random_number = randomBackgroundGenerator();
    document.body.style.backgroundColor = `#${random_number}`;
  },
  false
);

function randomBackgroundGenerator() {
  let random_number = Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, "0");

  return random_number;
}
