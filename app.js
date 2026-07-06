/**
 * SpamGuard AI — app.js
 * ======================
 * UI Controller: handles all DOM interactions, animation,
 * model lifecycle, result rendering, and history tracking.
 */

/* ------------------------------------------------------------------ */
/*  DOM REFERENCES                                                      */
/* ------------------------------------------------------------------ */
const $ = id => document.getElementById(id);

const messageInput    = $("messageInput");
const charCount       = $("charCount");
const analyzeBtn      = $("analyzeBtn");
const clearBtn        = $("clearBtn");
const exampleBtn      = $("exampleBtn");
const clearHistoryBtn = $("clearHistoryBtn");

const resultCard      = $("resultCard");
const verdictIcon     = $("verdictIcon");
const verdictLabel    = $("verdictLabel");
const verdictSubtitle = $("verdictSubtitle");
const ringProgress    = $("ringProgress");
const ringPercent     = $("ringPercent");
const spamFill        = $("spamFill");
const hamFill         = $("hamFill");
const spamPct         = $("spamPct");
const hamPct          = $("hamPct");
const commentaryText  = $("commentaryText");
const analysisBadge   = $("analysisBadge");

const emptyState      = $("emptyState");
const analysisContent = $("analysisContent");

const origLen         = $("origLen");
const tokenCount      = $("tokenCount");
const uniqueTokens    = $("uniqueTokens");
const tokenDisplay    = $("tokenDisplay");
const signalsGrid     = $("signalsGrid");
const keywordsContainer = $("keywordsContainer");
const logOddsSpam     = $("logOddsSpam");
const logOddsHam      = $("logOddsHam");
const decisionMargin  = $("decisionMargin");

const historyList     = $("historyList");
const modelStatus     = $("modelStatus");
const datasetSizeLabel= $("datasetSizeLabel");
const accuracyLabel   = $("accuracyLabel");

const perfAccuracy    = $("perfAccuracy");
const perfPrecision   = $("perfPrecision");
const perfRecall      = $("perfRecall");
const perfF1          = $("perfF1");
const perfTrainSize   = $("perfTrainSize");
const perfTestSize    = $("perfTestSize");

/* ------------------------------------------------------------------ */
/*  EXAMPLE MESSAGES                                                    */
/* ------------------------------------------------------------------ */
const EXAMPLES = [
  "WINNER!! As a valued network customer you have been selected to receive a £900 prize reward! To claim call 09061701461. Claim code KL341. Valid 12 hours only.",
  "Hey! Are you free on Saturday? We're thinking of grabbing brunch and maybe hitting the farmer's market. Would love to catch up!",
  "Congratulations! You've won a FREE cruise to the Bahamas! This exclusive offer is only available for 24 hours. Click here to claim your prize now!",
  "Just wanted to remind you that your dentist appointment is tomorrow at 2:30 PM. Please call if you need to reschedule.",
  "URGENT: Your PayPal account has been suspended due to suspicious activity. Verify your identity immediately at paypal-secure-verify.com or lose access!",
  "Can you pick up some coffee on your way to the office? We ran out this morning and everyone is struggling!",
  "You have been pre-approved for a personal loan of up to $50,000! No credit check needed. Apply now and get funded in 24 hours!",
  "The team meeting is moved to 3pm Thursday. I've updated the calendar invite. Let me know if you have any conflicts.",
];

let exampleIndex = 0;
let analysisHistory = [];

/* ------------------------------------------------------------------ */
/*  INITIALIZATION                                                      */
/* ------------------------------------------------------------------ */
window.addEventListener("DOMContentLoaded", () => {
  showToast("Training spam detection model...", "loading");

  // Use setTimeout to let the DOM paint before running heavy JS
  setTimeout(() => {
    const { metrics } = window.SpamGuardModel.train();
    updateModelStatus(metrics);
    updatePerformancePanel(metrics);
    showToast(`Model ready! Accuracy: ${(metrics.accuracy * 100).toFixed(1)}%`, "success");
  }, 120);
});

/* ------------------------------------------------------------------ */
/*  EVENT LISTENERS                                                     */
/* ------------------------------------------------------------------ */
messageInput.addEventListener("input", () => {
  const len = messageInput.value.length;
  charCount.textContent = `${len} / 2000 characters`;
  charCount.style.color = len > 1800 ? "#f87171" : "";
});

analyzeBtn.addEventListener("click", runAnalysis);
messageInput.addEventListener("keydown", e => {
  if (e.ctrlKey && e.key === "Enter") runAnalysis();
});

clearBtn.addEventListener("click", () => {
  messageInput.value = "";
  charCount.textContent = "0 / 2000 characters";
  messageInput.focus();
});

exampleBtn.addEventListener("click", () => {
  messageInput.value = EXAMPLES[exampleIndex % EXAMPLES.length];
  exampleIndex++;
  charCount.textContent = `${messageInput.value.length} / 2000 characters`;
  messageInput.focus();
});

clearHistoryBtn.addEventListener("click", () => {
  analysisHistory = [];
  renderHistory();
});

/* ------------------------------------------------------------------ */
/*  ANALYSIS RUNNER                                                     */
/* ------------------------------------------------------------------ */
async function runAnalysis() {
  const text = messageInput.value.trim();
  if (!text) {
    shakeElement(messageInput);
    return;
  }
  if (!window.SpamGuardModel.getMetrics().accuracy) {
    showToast("Model is still loading, please wait...", "loading");
    return;
  }

  // Animate button
  analyzeBtn.classList.add("loading");
  analyzeBtn.disabled = true;

  // Small delay for UX feel
  await delay(400);

  const analysis = window.SpamGuardModel.analyze(text);
  const commentary = window.SpamGuardModel.commentary(analysis);

  analyzeBtn.classList.remove("loading");
  analyzeBtn.disabled = false;

  renderResult(analysis, commentary);
  renderNLPAnalysis(analysis);
  addToHistory(analysis);
}

/* ------------------------------------------------------------------ */
/*  RESULT RENDERING                                                    */
/* ------------------------------------------------------------------ */
function renderResult(a, commentary) {
  const isSpam = a.prediction === "spam";
  const confPct = Math.round(a.confidence * 100);
  const spamP   = Math.round(a.spamProb * 100);
  const hamP    = Math.round(a.hamProb  * 100);

  // Show card
  resultCard.style.display = "block";

  // Verdict icon
  verdictIcon.className = "verdict-icon " + (isSpam ? "spam-icon-card" : "ham-icon-card");
  verdictIcon.innerHTML = isSpam
    ? '<i class="fa-solid fa-triangle-exclamation"></i>'
    : '<i class="fa-solid fa-shield-check"></i>';

  // Verdict label
  verdictLabel.textContent = isSpam ? "⚠ SPAM DETECTED" : "✓ LEGITIMATE MESSAGE";
  verdictLabel.className   = "verdict-label " + (isSpam ? "spam-label" : "ham-label");

  // Subtitle
  verdictSubtitle.textContent = isSpam
    ? "This message shows strong spam characteristics. Proceed with caution."
    : "This message appears to be legitimate and safe.";

  // Confidence ring
  const circumference = 251.2;
  const offset = circumference - (confPct / 100) * circumference;
  ringProgress.style.strokeDashoffset = offset;
  ringProgress.style.stroke = isSpam
    ? "#f87171"
    : "#34d399";
  ringPercent.textContent = `${confPct}%`;

  // Probability bars (animate with rAF)
  requestAnimationFrame(() => {
    spamFill.style.width = `${spamP}%`;
    hamFill.style.width  = `${hamP}%`;
  });
  spamPct.textContent = `${spamP}%`;
  hamPct.textContent  = `${hamP}%`;

  // Commentary
  commentaryText.textContent = commentary;

  // Badge
  analysisBadge.style.background = isSpam
    ? "rgba(248,113,113,0.1)"
    : "rgba(52,211,153,0.1)";
  analysisBadge.style.borderColor = isSpam
    ? "rgba(248,113,113,0.3)"
    : "rgba(52,211,153,0.3)";
  analysisBadge.style.color = isSpam ? "#f87171" : "#34d399";
  analysisBadge.innerHTML   = isSpam
    ? '<i class="fa-solid fa-triangle-exclamation"></i><span>Spam Detected</span>'
    : '<i class="fa-solid fa-shield-check"></i><span>Looks Safe</span>';
}

/* ------------------------------------------------------------------ */
/*  NLP ANALYSIS PANEL                                                  */
/* ------------------------------------------------------------------ */
function renderNLPAnalysis(a) {
  emptyState.style.display    = "none";
  analysisContent.style.display = "flex";

  // Step 1: Preprocessing
  origLen.textContent      = `${a.text.length} chars`;
  tokenCount.textContent   = `${a.tokens.length} tokens`;
  uniqueTokens.textContent = `${a.uniqueTokens.length} unique`;

  // Token chips (colored by spam score)
  tokenDisplay.innerHTML = "";
  const displayTokens = a.tokenScores.slice(0, 30);
  for (const { token, score } of displayTokens) {
    const chip = document.createElement("span");
    chip.className = "token-chip " + (score > 0.3 ? "spam-token" : score < -0.3 ? "ham-token" : "neutral-token");
    chip.textContent = token;
    chip.title = `Log-ratio: ${score.toFixed(2)}`;
    tokenDisplay.appendChild(chip);
  }
  if (a.tokenScores.length > 30) {
    const more = document.createElement("span");
    more.className = "token-chip neutral-token";
    more.textContent = `+${a.tokenScores.length - 30} more`;
    tokenDisplay.appendChild(more);
  }

  // Step 2: Spam Signals
  signalsGrid.innerHTML = "";
  for (const sig of a.signals) {
    const item = document.createElement("div");
    item.className = "signal-item " + (sig.active ? "active-signal" : "inactive-signal");
    item.innerHTML = `<i class="fa-solid ${sig.active ? "fa-circle-exclamation" : "fa-circle-check"}"></i><span>${sig.label}</span>`;
    signalsGrid.appendChild(item);
  }

  // Step 3: Key Evidence Words
  keywordsContainer.innerHTML = "";
  const evidenceWords = a.topEvidence.slice(0, 10);
  if (evidenceWords.length === 0) {
    keywordsContainer.innerHTML = '<span style="font-size:0.78rem;color:var(--text-muted)">No significant keywords found.</span>';
  } else {
    for (const ev of evidenceWords) {
      const isSpamWord = ev.logRatio > 0;
      const chip = document.createElement("div");
      chip.className = "keyword-chip " + (isSpamWord ? "spam-kw" : "ham-kw");
      chip.title = `Spam/Ham log-odds: ${ev.logRatio.toFixed(2)}`;
      chip.innerHTML = `
        <i class="fa-solid ${isSpamWord ? "fa-arrow-trend-up" : "fa-arrow-trend-down"}"></i>
        <span>${ev.token}</span>
        <span class="kw-score">${ev.logRatio > 0 ? "+" : ""}${ev.logRatio.toFixed(2)}</span>
      `;
      keywordsContainer.appendChild(chip);
    }
  }

  // Step 4: Model Details
  const ls = a.logScores;
  const spamScore = ls["spam"]?.toFixed(2) ?? "—";
  const hamScore  = ls["ham"]?.toFixed(2)  ?? "—";
  const margin    = ls["spam"] !== undefined && ls["ham"] !== undefined
    ? Math.abs(ls["spam"] - ls["ham"]).toFixed(2)
    : "—";

  logOddsSpam.textContent   = spamScore;
  logOddsHam.textContent    = hamScore;
  decisionMargin.textContent = margin;
}

/* ------------------------------------------------------------------ */
/*  HISTORY                                                             */
/* ------------------------------------------------------------------ */
function addToHistory(analysis) {
  analysisHistory.unshift({
    text: analysis.text,
    prediction: analysis.prediction,
    confidence: analysis.confidence,
    timestamp: new Date().toLocaleTimeString(),
  });
  if (analysisHistory.length > 20) analysisHistory.pop();
  renderHistory();
}

function renderHistory() {
  if (analysisHistory.length === 0) {
    historyList.innerHTML = `
      <div class="history-empty">
        <i class="fa-solid fa-inbox"></i>
        <span>No analyses yet. Start by analyzing a message above.</span>
      </div>`;
    return;
  }

  historyList.innerHTML = "";
  for (const item of analysisHistory) {
    const el = document.createElement("div");
    el.className = "history-item";
    el.innerHTML = `
      <div class="history-badge ${item.prediction === "spam" ? "spam-badge" : "ham-badge"}">
        <i class="fa-solid ${item.prediction === "spam" ? "fa-triangle-exclamation" : "fa-shield-check"}"></i>
      </div>
      <span class="history-text">${escapeHtml(item.text)}</span>
      <span class="history-conf" style="color:${item.prediction === "spam" ? "#f87171" : "#34d399"}">
        ${Math.round(item.confidence * 100)}%
      </span>
    `;
    el.addEventListener("click", () => {
      messageInput.value = item.text;
      charCount.textContent = `${item.text.length} / 2000 characters`;
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    historyList.appendChild(el);
  }
}

/* ------------------------------------------------------------------ */
/*  MODEL STATUS & PERFORMANCE                                          */
/* ------------------------------------------------------------------ */
function updateModelStatus(metrics) {
  // Header chips
  const statusDot = modelStatus.querySelector(".status-dot");
  if (statusDot) statusDot.classList.add("online");
  modelStatus.querySelector("span:not(.status-dot)").textContent = "Model Online";

  datasetSizeLabel.textContent = `${metrics.totalSize} training samples`;
  accuracyLabel.textContent = `${(metrics.accuracy * 100).toFixed(1)}% accuracy`;
}

function updatePerformancePanel(metrics) {
  animateCounter(perfAccuracy,  `${(metrics.accuracy  * 100).toFixed(1)}%`);
  animateCounter(perfPrecision, `${(metrics.precision * 100).toFixed(1)}%`);
  animateCounter(perfRecall,    `${(metrics.recall    * 100).toFixed(1)}%`);
  animateCounter(perfF1,        `${(metrics.f1        * 100).toFixed(1)}%`);
  animateCounter(perfTrainSize, `${metrics.trainSize}`);
  animateCounter(perfTestSize,  `${metrics.testSize}`);
}

/* ------------------------------------------------------------------ */
/*  TOAST NOTIFICATION                                                  */
/* ------------------------------------------------------------------ */
let activeToast = null;
function showToast(message, type = "loading") {
  if (activeToast) activeToast.remove();
  const toast = document.createElement("div");
  toast.className = `training-toast ${type === "success" ? "success" : ""}`;
  toast.innerHTML = type === "success"
    ? `<i class="fa-solid fa-circle-check"></i><span>${message}</span>`
    : `<i class="fa-solid fa-spinner"></i><span>${message}</span>`;
  document.body.appendChild(toast);
  activeToast = toast;
  if (type === "success") {
    setTimeout(() => { toast.style.opacity = "0"; toast.style.transition = "opacity 0.5s"; setTimeout(() => toast.remove(), 500); }, 3000);
  }
}

/* ------------------------------------------------------------------ */
/*  UTILITY                                                             */
/* ------------------------------------------------------------------ */
function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

function shakeElement(el) {
  el.style.animation = "none";
  el.offsetHeight; // reflow
  el.style.animation = "shake 0.4s ease";
  setTimeout(() => el.style.animation = "", 400);
}

function escapeHtml(str) {
  return str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

function animateCounter(el, finalVal) {
  el.style.opacity = "0";
  setTimeout(() => {
    el.textContent = finalVal;
    el.style.transition = "opacity 0.5s";
    el.style.opacity = "1";
  }, Math.random() * 600 + 200);
}

// Add shake animation dynamically
const shakeStyle = document.createElement("style");
shakeStyle.textContent = `@keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }`;
document.head.appendChild(shakeStyle);
