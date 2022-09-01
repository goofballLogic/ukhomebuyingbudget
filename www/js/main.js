const percent = document.querySelector("#percent");
const percentOutput = document.querySelector("#percent-output");
const monthlyPretaxIncome = document.querySelector("#pretax");
const monthlyBudget = document.querySelector("#monbud");
const downpayment = document.querySelector("#downpay");
const yearsOfMortgage = document.querySelector("#yearsMort");
const yearsOfMortgageOutput = document.querySelector("#yearsMort-output");
const mortgageAmount = document.querySelector("#morAmo");
const mortgageInterest = document.querySelector("#mortInt");
const purchaseAmount = document.querySelector("#purAmo");
const minimumDown = document.querySelector("#minDown");
const minimumDownOutput = document.querySelector("#minDown-output");
const amountReservedPerYear = document.querySelector("#amoRes");

// outputs

const syncPercentOutput = () => { percentOutput.textContent = percent.value; };
percent.addEventListener("input", syncPercentOutput);
syncPercentOutput();

const syncYearsOfMortgageOuput = () => { yearsOfMortgageOutput.textContent = yearsOfMortgage.value; };
yearsOfMortgage.addEventListener("input", syncYearsOfMortgageOuput);
syncYearsOfMortgageOuput();

const syncMinDownOutput = () => { minimumDownOutput.textContent = minimumDown.value; };
minimumDown.addEventListener("input", syncMinDownOutput);
syncMinDownOutput();

// calculate home buying amount
const syncPurchaseAmount = () => {

    const borrowed = Number(mortgageAmount.value) || 0;
    const down = Number(downpayment.value) || 0;
    const simpleSum = borrowed + down;
    const minDown = minimumDown.value;
    const downMultiple = down * 100 / minDown;

    purchaseAmount.value = Math.min(downMultiple, simpleSum);

};
downpayment.addEventListener("input", syncPurchaseAmount);

// calculate mortgage amount
const syncMortgageAmount = () => {

    const payment = Number(monthlyBudget.value) || 0;
    const rate = Number(mortgageInterest.value) / 1200;
    const months = (Number(yearsOfMortgage.value) || 0) * 12;
    if (!payment || !rate || !months)
        mortgageAmount.value = 0;
    else {
        const principal = (payment * (Math.pow(rate + 1, months) - 1))
            / (Math.pow(1 + rate, months) * rate);
        mortgageAmount.value = principal.toFixed(0);
    }
    syncPurchaseAmount();

};
yearsOfMortgage.addEventListener("input", syncMortgageAmount);
mortgageInterest.addEventListener("input", syncMortgageAmount);
syncMortgageAmount();

// calculate budget
const syncMonthlyBudget = () => {

    const parsedPercentage = Number(percent.value) || 0;
    const parsedPretaxMonthlyIncome = Number(monthlyPretaxIncome.value) || 0;
    const amountReservedPerYearParsed = Number(amountReservedPerYear.value) || 0
    const amountReservedPerMonth = amountReservedPerYearParsed ? amountReservedPerYearParsed / 12 : 0;
    monthlyBudget.value = Math.max(
        0,
        (parsedPercentage ? (parsedPercentage / 100) * parsedPretaxMonthlyIncome : 0) - amountReservedPerMonth
    );
    syncMortgageAmount();

}
amountReservedPerYear.addEventListener("input", syncMonthlyBudget);
monthlyPretaxIncome.addEventListener("input", syncMonthlyBudget);
percent.addEventListener("input", syncMonthlyBudget);
syncMonthlyBudget();