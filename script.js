const form = document.getElementById('payrollForm');
const tableBody = document.getElementById('payrollTableBody');
const exportBtn = document.getElementById('exportBtn');

let payrollData = JSON.parse(localStorage.getItem('payrollData')) || [];

function renderTable() {
  tableBody.innerHTML = '';
  payrollData.forEach(entry => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${entry.name}</td>
      <td>${entry.hours}</td>
      <td>${entry.rate}</td>
      <td>${entry.grossPay.toFixed(2)}</td>
      <td>${entry.tax.toFixed(2)}</td>
      <td>${entry.deductions.toFixed(2)}</td>
      <td>${entry.netPay.toFixed(2)}</td>
    `;
    tableBody.appendChild(row);
  });
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('employeeName').value;
  const hours = parseFloat(document.getElementById('hoursWorked').value);
  const rate = parseFloat(document.getElementById('hourlyRate').value);
  const deductions = parseFloat(document.getElementById('deductions').value);

  const grossPay = hours * rate;
  const tax = grossPay * 0.10;
  const netPay = grossPay - tax - deductions;

  const entry = { name, hours, rate, grossPay, tax, deductions, netPay };
  payrollData.push(entry);
  localStorage.setItem('payrollData', JSON.stringify(payrollData));

  renderTable();
  form.reset();
});

document.addEventListener('DOMContentLoaded', renderTable);
