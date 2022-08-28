const percent = document.querySelector("#percent");
const percentOutput = document.querySelector("#percent-output");
const syncPercentOutput = () => { percentOutput.textContent = percent.value; };
percent.addEventListener("input", syncPercentOutput);
syncPercentOutput();

