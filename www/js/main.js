const price = document.querySelector("#price");
const priceOutput = document.querySelector("#price-output");

price.addEventListener("input", () => {
   priceOutput.textContent = price.value;
});
