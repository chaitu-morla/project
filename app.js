let income = 0;
let expenses = [];

const incomeDisplay = document.getElementById("income");
const expenseDisplay = document.getElementById("expenses");
const balanceDisplay = document.getElementById("balance");
const expenseList = document.getElementById("expense-list");

// Setup Chart
const ctx = document.getElementById("chart").getContext("2d");
const chart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Expenses', 'Remaining'],
    datasets: [{
      data: [0, 0],
      backgroundColor: ['#ff6384', '#36a2eb']
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' }
    }
  }
});

function addIncome() {
  const incomeInput = document.getElementById("income-input");
  income = parseFloat(incomeInput.value) || 0;
  incomeInput.value = "";
  updateDisplay();
}

function addExpense() {
  const nameInput = document.getElementById("expense-name");
  const amountInput = document.getElementById("expense-amount");

  const name = nameInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (name && !isNaN(amount)) {
    expenses.push({ name, amount });
    nameInput.value = "";
    amountInput.value = "";
    updateDisplay();
  }
}

function updateDisplay() {
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const balance = income - totalExpenses;

  incomeDisplay.textContent = income;
  expenseDisplay.textContent = totalExpenses;
  balanceDisplay.textContent = balance;

  // Update chart
  chart.data.datasets[0].data = [totalExpenses, balance];
  chart.update();

  // Show expense list
  expenseList.innerHTML = "";
  expenses.forEach(e => {
    const li = document.createElement("li");
    li.textContent = `${e.name}: ₹${e.amount}`;
    expenseList.appendChild(li);
  });
}
