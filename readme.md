# LeetCode Complexity Analyzer

![LeetCode Complexity Analyzer](icons/logo128.png)

LeetCode Complexity Analyzer is a Chrome extension that helps you analyze the time and space complexity of your LeetCode solutions instantly.

## 🚀 Features

- 📊 Analyzes time and space complexity of LeetCode solutions
- 🔍 Uses Google Gemini API for accurate predictions
- 🖥️ Simple and intuitive UI
- 🔧 Easy installation and configuration

---

## 📌 Installation Guide

### 1️⃣ Get the Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **Create API Key**
4. Copy your new API key

### 2️⃣ Configure the Extension

1. Open `popup.js` in a text editor
2. Locate the following line:
   ```js
   const GEMINI_API_KEY = 'YOUR_API_KEY_HERE';
   ```
3. Replace it with your API key:
   ```js
   YOUR_API_KEY_HERE = 'your gemini api key should be pasted';
   ```
4. Save the file

### 3️⃣ Install in Chrome

1. Open **Google Chrome**
2. Go to `chrome://extensions/`
3. Enable **Developer mode** (top-right corner)
4. Click **Load unpacked**
5. Select the folder containing the extension files

### 4️⃣ Using the Extension

1. Open any **LeetCode problem page**
2. Write your solution in the code editor
3. Click the **extension icon** in the Chrome toolbar
4. Click **Analyze Code**
5. View the **time and space complexity analysis**

---

## 📸 Screenshots

Here are some screenshots showcasing the extension in action:

![Extension Screenshot 1](screenshots/s1.png)
*Main Popup*

![Extension Screenshot 2](screenshots/s2.png)
*Analyzing a LeetCode solution*

![Extension Screenshot 3](screenshots/s3.png)
*Displaying complexity results*

---

## 🔧 Troubleshooting

- 🔄 **Refresh** the LeetCode page if the extension doesn’t work
- 🔑 Ensure your **API key** is entered correctly
- ✅ Check that you are on a **LeetCode problem page**
- 🌐 Ensure you have an **active internet connection**

## ⚠️ Rate Limits

- **Free tier** allows **60 requests per minute**
- Check [Google AI Studio](https://makersuite.google.com/app/apikey) for quota limits

---

## 📂 Files Included

```
📂 LeetCode-Complexity-Analyzer
├── manifest.json
├── popup.html
├── popup.js
├── content.js
├── styles.css
├── Chart.js
└── icons/  # Folder containing extension icons
```

---

## ❓ Need Help?

If you encounter issues:

1. Ensure all files are in the **correct location**
2. Verify your **API key** is working
3. Try **disabling and re-enabling** the extension
4. **Clear your browser cache** and reload the extension

---

## 🎉 Enjoy Using LeetCode Complexity Analyzer!

If you like this extension, consider giving it a ⭐ on GitHub!

Happy coding! 🚀

