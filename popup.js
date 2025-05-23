document.getElementById('generate').addEventListener('click', () => {
  const from = document.getElementById('fromDate').value;
  const to = document.getElementById('toDate').value;

  if (!from || !to) return alert("Please select both dates.");

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: autoGenerateTimeLogs,
      args: [from, to]
    });
  });
});

function autoGenerateTimeLogs(fromDateStr, toDateStr) {
  function isWeekend(date) {
    const day = date.getDay();
    return day === 0 || day === 6;
  }

  function formatDateForInput(date) {
    return date.toISOString().split('T')[0];
  }

  function simulateInput(element, value) {
    if (!element) return;
    element.focus();
    element.value = '';
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.value = value;
    for (let i = 0; i < value.length; i++) {
      const char = value[i];
      element.dispatchEvent(new KeyboardEvent('keydown', { key: char }));
      element.dispatchEvent(new KeyboardEvent('keypress', { key: char }));
      element.dispatchEvent(new KeyboardEvent('keyup', { key: char }));
    }
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
    element.blur();
  }

  const addRowButton = document.querySelector('[data-bind*="addRow"]');
  if (!addRowButton) return alert("Add Row button not found.");

  const fromDate = new Date(fromDateStr);
  const toDate = new Date(toDateStr);
  const validDates = [];

  for (let d = new Date(fromDate); d <= toDate; d.setDate(d.getDate() + 1)) {
    if (!isWeekend(d)) validDates.push(new Date(d));
  }

  validDates.forEach(() => {
    addRowButton.click(); // In
    addRowButton.click(); // Out
  });

  setTimeout(() => {
    const allRows = document.querySelectorAll('tbody[data-bind*="foreach"] tr');

    validDates.forEach((date, index) => {
      const formattedDate = formatDateForInput(date);
      const rowIn = allRows[index * 2];
      const rowOut = allRows[index * 2 + 1];

      const fillRow = (row, type, time, formattedDate) => {
        const select = row?.querySelector('select');
        const dateInput = row?.querySelector('input[type="date"]');
        const timeInput = row?.querySelector('input[type="time"]');

        if (select) simulateInput(select, type);
        if (dateInput) simulateInput(dateInput, formattedDate);
        if (timeInput) simulateInput(timeInput, time);
      };

      fillRow(rowIn, 'In', '08:00', formattedDate);
      fillRow(rowOut, 'Out', '17:00', formattedDate);
    });
  }, 700); // Adjust delay if needed
}
