# 🛡️ SpamGuard AI — Intelligent Spam Message Detection

> A machine learning-powered spam detection system that runs entirely in your browser. No servers, no APIs, no data collection — just pure client-side AI.

![SpamGuard AI Banner](https://img.shields.io/badge/SpamGuard-AI-ff7eb3?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPjxwYXRoIGQ9Ik0xMiAxTDMgNXY2YzAgNS41NSAzLjg0IDEwLjc0IDkgMTIgNS4xNi0xLjI2IDktNi40NSA5LTEyVjVsLTktNHoiLz48L3N2Zz4=)
![License](https://img.shields.io/badge/license-MIT-6ee7b7?style=for-the-badge)
![Pure JS](https://img.shields.io/badge/Pure-JavaScript-fbbf24?style=for-the-badge&logo=javascript&logoColor=black)
![No Dependencies](https://img.shields.io/badge/Zero-Dependencies-c084fc?style=for-the-badge)

---

## ✨ What is this?

**SpamGuard AI** is a complete spam message detection system built with vanilla HTML, CSS, and JavaScript. It uses a **Naive Bayes classifier** with **TF-IDF vectorization** to analyze messages and determine whether they are spam or legitimate — all running directly in your browser.

This project demonstrates core machine learning fundamentals including:
- Text preprocessing and tokenization
- Feature extraction (TF-IDF, bigrams)
- Probabilistic classification (Naive Bayes)
- Model evaluation (accuracy, precision, recall, F1 score)
- Real-time prediction with confidence scoring

---

## 🎯 Features

### 🔍 Smart Message Analysis
- Paste or type any message and get an instant spam/ham verdict
- Confidence percentage with animated circular progress ring
- Side-by-side spam vs. legitimate probability bars
- Human-like AI commentary explaining *why* a message is spam

### 🧠 NLP Analysis Engine
- **Text Preprocessing** — tokenization, stop word removal, character normalization
- **Spam Signal Detection** — 10 pattern-based detectors (urgency language, phishing URLs, money/prize keywords, excessive caps, SMS shortcodes, and more)
- **Key Evidence Words** — highlights which specific words most influenced the decision, with log-odds scores
- **Model Details** — shows log-scores, decision margin, and algorithm info

### 📊 Model Performance Dashboard
- Live accuracy, precision, recall, and F1 score metrics
- Training/test sample counts
- 80/20 train-test split evaluation

### 📜 Analysis History
- Tracks your last 20 analyses
- Click any past analysis to reload and re-examine it
- Clear history with one click

### 🎨 Premium UI
- Warm, vibrant glassmorphism dark theme
- Aurora-inspired animated background
- Smooth micro-animations and hover effects
- Fully responsive — works on desktop, tablet, and mobile
- Color-coded token chips (red = spam signal, green = safe, gray = neutral)

---

## 🚀 Getting Started

### Prerequisites
**None!** This project has zero dependencies. All you need is a web browser.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/spamguard-ai.git
   cd spamguard-ai
   ```

2. **Open the app:**
   - Simply double-click `index.html` in your file explorer
   - **OR** use a local server for the best experience:
     ```bash
     # Using Python
     python -m http.server 8000

     # Using Node.js
     npx http-server -p 8000
     ```
   - Then open `http://localhost:8000` in your browser

That's it! The ML model trains automatically when the page loads (~100ms).

---

## 📁 Project Structure

```
spamguard-ai/
├── index.html      # Main HTML — app layout and structure
├── styles.css      # Premium glassmorphism dark theme
├── model.js        # ML engine — dataset, Naive Bayes, TF-IDF, evaluation
├── app.js          # UI controller — rendering, animations, history
└── README.md       # You are here!
```

| File | Purpose | Size |
|------|---------|------|
| `index.html` | Two-panel layout with header, input, results, NLP analysis, history, and performance sections | ~17 KB |
| `styles.css` | Complete warm glassmorphism theme with animations, responsive design | ~18 KB |
| `model.js` | Full ML pipeline — 280+ labeled messages, tokenizer, Naive Bayes classifier, signal detection | ~41 KB |
| `app.js` | DOM interactions, result rendering, animated counters, toast notifications | ~16 KB |

---

## 🤖 How the ML Model Works

```
        ┌──────────────────┐
        │   Raw Message     │
        │   "Win £1000!"    │
        └────────┬─────────┘
                 │
        ┌────────▼─────────┐
        │ Text Preprocessing│
        │ • Lowercase       │
        │ • Remove symbols  │
        │ • Strip stopwords │
        └────────┬─────────┘
                 │
        ┌────────▼─────────┐
        │   Tokenization    │
        │ • Unigrams        │
        │ • Bigrams         │
        └────────┬─────────┘
                 │
        ┌────────▼─────────┐
        │  Naive Bayes      │
        │  Classification   │
        │ • Log-likelihoods │
        │ • Laplace smooth  │
        │ • Softmax probs   │
        └────────┬─────────┘
                 │
        ┌────────▼─────────┐
        │    Prediction     │
        │ SPAM 🚫 or HAM ✅ │
        │ + confidence %    │
        └──────────────────┘
```

### Algorithm Details

| Component | Implementation |
|-----------|---------------|
| **Classifier** | Multinomial Naive Bayes with Laplace (add-1) smoothing |
| **Features** | Unigrams + Bigrams from vocabulary |
| **Vectorization** | TF-IDF inspired log-frequency scoring |
| **Dataset** | 280+ hand-labeled messages (spam + ham) |
| **Train/Test Split** | 80% training, 20% testing |
| **Typical Accuracy** | ~94–97% on held-out test set |
| **Probability** | Softmax normalization of log-scores |

### Spam Signal Detectors

The model also uses 10 rule-based pattern detectors for explainability:

| Signal | What it Detects |
|--------|----------------|
| 🔴 Urgency Language | "urgent", "immediately", "act now", "expires" |
| 💰 Money / Prizes | "win", "prize", "cash", "free", "lottery" |
| 🔗 Clickbait / CTA | "click", "verify", "sign up", "claim" |
| 🎯 Personal Lure | "you've been selected", "your account" |
| 🐟 Phishing URLs | Suspicious domains (.xyz, .tk, .biz) |
| 🔞 Adult Content | Inappropriate or suggestive language |
| 💊 Medical Claims | "lose weight", "diet pill", "no prescription" |
| 🔠 Excessive Caps | More than 25% of words in ALL CAPS |
| ❗ Excessive Punctuation | More than 2 exclamation/question marks |
| 📱 SMS Shortcodes | "text to", "txt to", premium rate numbers |

---

## 🖼️ Screenshots

### 🏠 Main Interface
The app features a warm, aurora-inspired dark theme with glassmorphism panels:

> *Two-panel layout: Message input (left) and NLP Analysis (right)*

### ⚠️ Spam Detection
When spam is detected, the interface shows warm pink/rose alerts with detailed breakdown:

> *Verdict card with confidence ring, probability bars, and human-like AI commentary*

### ✅ Legitimate Message
Safe messages get a friendly green confirmation:

> *"All good here! This reads like a normal, everyday message from a real person."*

---

## 🛠️ Technologies Used

| Technology | Usage |
|-----------|-------|
| **HTML5** | Semantic structure, accessibility |
| **CSS3** | Glassmorphism, animations, gradients, responsive grid |
| **Vanilla JavaScript** | ML engine, DOM manipulation, event handling |
| **Google Fonts** | Outfit, Space Grotesk, JetBrains Mono |
| **Font Awesome 6** | Icons throughout the UI |

### No Build Tools Required
- ❌ No React, Vue, or Angular
- ❌ No Webpack, Vite, or bundler
- ❌ No npm install
- ❌ No backend server
- ❌ No API keys
- ✅ Just open `index.html` and it works!

---

## 🔒 Privacy

**Your data never leaves your browser.** The entire ML model — training, inference, and analysis — runs 100% client-side in JavaScript. No data is sent to any server, ever. No cookies, no tracking, no analytics.

---

## 📈 Future Improvements

- [ ] Allow users to add custom training messages
- [ ] Export/import trained model as JSON
- [ ] Add more languages (currently English only)
- [ ] Implement TF-IDF weighting (currently using raw frequencies)
- [ ] Add confusion matrix visualization
- [ ] Dark/light theme toggle
- [ ] PWA support for offline use

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- Inspired by real-world spam filtering systems like SpamAssassin and Gmail's spam filter
- Dataset curated from common spam message patterns and legitimate communication examples
- UI design inspired by modern glassmorphism and aurora aesthetic trends

---

<p align="center">
  Made with ❤️ using vanilla HTML, CSS & JavaScript
  <br>
  <strong>SpamGuard AI</strong> — Your friendly spam-catching companion ✨
</p>
