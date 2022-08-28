const percent = document.querySelector("#percent");
const percentOutput = document.querySelector("#percent-output");

percent.addEventListener("input", () => {
   percentOutput.textContent = percent.value;
});
