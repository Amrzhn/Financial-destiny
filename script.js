// script.js

// Function for calculating loan payment
function calculateLoanPayment(principal, interestRate, years) {
    let monthlyRate = interestRate / 12 / 100;
    let numberOfPayments = years * 12;
    return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
}

// Function to calculate investment returns
function calculateInvestmentReturn(principal, annualRate, years) {
    return principal * Math.pow((1 + annualRate / 100), years);
}

// Input validation function
function validateInput(value, type) {
    if (type === 'number') {
        return !isNaN(value) && value >= 0;
    } else if (type === 'string') {
        return value.trim() !== '';
    }
    return false;
}

// Function for saving data to local storage
function saveData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Function for retrieving data from local storage
function getData(key) {
    return JSON.parse(localStorage.getItem(key));
}

// Event listener for form submission
document.getElementById('financial-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let principal = parseFloat(document.getElementById('principal').value);
    let interestRate = parseFloat(document.getElementById('interest-rate').value);
    let years = parseFloat(document.getElementById('years').value);

    // Validate inputs
    if (!validateInput(principal, 'number') || !validateInput(interestRate, 'number') || !validateInput(years, 'number')) {
        alert('Please enter valid input values.');
        return;
    }

    // Calculate loan payment
    let payment = calculateLoanPayment(principal, interestRate, years);
    document.getElementById('payment-output').innerText = `Monthly Payment: $${payment.toFixed(2)}`;

    // Save data
    saveData('lastLoanDetails', { principal, interestRate, years });
});

// On page load, retrieve last entered data
window.onload = function() {
    let lastDetails = getData('lastLoanDetails');
    if (lastDetails) {
        document.getElementById('principal').value = lastDetails.principal;
        document.getElementById('interest-rate').value = lastDetails.interestRate;
        document.getElementById('years').value = lastDetails.years;
    }
};