# Attendance Autofill Chrome Extension

A lightweight Chrome extension that automates filling out attendance logs in Sprout HR by:

- Dynamically adding rows for each weekday within a specified date range
- Setting `In` and `Out` types
- Assigning the correct date and time values (08:00 for In, 17:00 for Out)
- Skipping weekends
- Simulating human-like interaction to bypass form validation requiring manual input

---

## 🚀 Features

✅ Add attendance rows dynamically  
✅ Fill date, type, and time values automatically  
✅ Skips Saturdays and Sundays  
✅ Triggers input and change events to pass client-side validations  
✅ Works with Knockout-bound HTML forms (used in Sprout HR)

---

## 🧭 How to Use (with Sprout HR)

1. **Login to [Sprout HR](https://app.sprout.ph)**
2. Navigate to:  
   `My Requests` → `Certificate of Attendance`
3. Click the **Add** button to open the form
4. Click the **Attendance Autofill extension icon** in your browser
5. Choose your **From** and **To** dates
6. Click **Generate** — the form will be auto-filled for all weekdays

> 🛑 Weekends are automatically skipped  
> 🧠 Each day gets two rows: one for `In` at 08:00, and one for `Out` at 17:00

---

## 🛠 Installation Guide (Chrome)

To install this Chrome Extension manually:

1. **Download or clone** this repository to your computer:

```bash
git clone https://github.com/yourusername/attendance-autofill.git
```
2. **Open Chrome** and go to `chrome://extensions/`
3. Enable **Developer mode** (top right corner)
4. Click on **Load unpacked**
5. Select the folder where you cloned/downloaded the repository
6. The extension should now be installed and visible in your extensions list


📂 Folder Structure
```bash
attendance-autofill/
├── manifest.json          # Chrome extension config
├── popup.html             # Extension popup interface
├── popup.js               # Main logic that simulates form filling
├── content.js             # Content script that interacts with the Sprout HR page
```

## 💡 How It Works

The extension performs the following steps:

1. **Clicks the form’s “Add Row” button** twice for each weekday — once for the `In` row and once for the `Out` row.
2. **Fills in each row** with the following values:
   - **Type**: `In` or `Out`
   - **Time**: `08:00` for `In`, `17:00` for `Out`
   - **Date**: The specific date corresponding to the weekday
3. **Skips weekends** (Saturday and Sunday) automatically.
4. **Simulates human interaction** by triggering the following DOM events:
   - `focus`
   - `keypress`
   - `input`
   - `change`
   - `blur`

This simulation ensures that Sprout’s front-end form validations — which require manual user input — are satisfied automatically.

## 📄 License

This project is open-source and available under the MIT License.

## 🤝 Contributions

Pull requests are welcome! If you'd like to improve compatibility, add options, or report bugs, feel free to submit an issue or PR.

## ✉️ Contact
Built by manugentoo@gmail.com

Open for feedback, improvements, or collaborations!