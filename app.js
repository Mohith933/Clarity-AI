document.addEventListener("DOMContentLoaded", () => {
    const sendButton = document.getElementById("sendButton");
    const userInput = document.getElementById("userInput");
    const languageSelect = document.getElementById("languageSelect");
    const status = document.getElementById("voiceStatus");

   sendButton.addEventListener("click", () => {
  const text = userInput.value.trim();
  const lang = languageSelect.value || "en-US";

  if (!text) {
    alert("Please enter some text!");
    return;
  }

  if (!("speechSynthesis" in window)) {
    alert("Sorry, your browser does not support voice synthesis.");
    return;
  }

  speakText(text, lang);
});


function speakText(text, lang = "en-US") {
  const status = document.getElementById("voiceStatus");
  const synth = window.speechSynthesis;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = 1.05;
  utter.pitch = 1.1;
  utter.volume = 1;

  // Update UI
  status.textContent = "🔊 Speaking…";
  status.className = "status speaking";

  // Pick voice
  const voices = synth.getVoices();
  utter.voice = voices.find(v => v.lang.startsWith(lang)) || voices[0];

  synth.cancel(); // stop any previous speech
  synth.speak(utter);

  utter.onend = () => {
    status.textContent = "✅ Finished speaking";
    status.className = "status idle";
  };

  utter.onerror = () => {
    status.textContent = "⚠️ Voice error";
    status.className = "status idle";
  };
}



});


document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.querySelector('.navbar .nav-links');
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Restore theme from localStorage
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = "🌙";
  }

  // Hamburger
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('open');
    });
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('open');
      });
    });
  }

  // Theme toggle
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
      themeToggle.textContent = "🌙";
      localStorage.setItem('theme', 'dark');
    } else {
      themeToggle.textContent = "🌞";
      localStorage.setItem('theme', 'light');
    }
  });

const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

hamburger.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
});

// close when clicking outside
overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
});

/* ===== User Setup ===== */
const username = localStorage.getItem("username") || "User";
document.getElementById("username").innerText = username;

/* ===== Dashboard Pages ===== */
const pages = {
  home: `
    <h3>📊 Dashboard</h3>
    <p>This is your personal Clarity AI workspace.</p>
    <ul>
      <li>✔ Frontend-only architecture</li>
      <li>✔ Web Speech API based TTS</li>
      <li>✔ Privacy-first design</li>
    </ul>
  `,
  voice: `
    <h3>🎙️ Voice Assistant</h3>
    <p style="margin-bottom:20px;">Convert text into a confident and clear AI voice.</p>
    <a href="index.html" class="btn-primary">Open Voice Studio</a>
  `,
  notes: `
    <h3>📝 Notes</h3>
    <textarea id="notesArea" placeholder="Write your notes here..." style="width:100%;height:120px;"></textarea>
    <br/><br/>
    <button class="btn-primary" style="
    margin-bottom: 10px;
" onclick="saveNotes()">Save Notes</button>
    <p class="muted">Notes are stored locally in your browser.</p>
  `
};

/* ===== Navigation Logic ===== */
document.querySelectorAll(".sidebar a[data-page]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const page = link.dataset.page;
    document.getElementById("content-area").innerHTML = pages[page];
    if (page === "notes") loadNotes();
  });
});

/* ===== Notes Storage ===== */
function saveNotes() {
  const notes = document.getElementById("notesArea").value;
  localStorage.setItem("clarity_notes", notes);
  alert("Notes saved locally!");
}

function loadNotes() {
  const saved = localStorage.getItem("clarity_notes") || "";
  document.getElementById("notesArea").value = saved;
}

/* ===== Signup ===== */
function handleSignup(e) {
  e.preventDefault();

  const user = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    mobile: document.getElementById("mobile").value
  };

  localStorage.setItem("clarityUser", JSON.stringify(user));
  window.location.href = "login.html";
}


/* ===== Login ===== */
function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const savedUser = JSON.parse(localStorage.getItem("clarityUser"));

  if (!savedUser || savedUser.email !== email) {
    alert("Invalid credentials");
    return;
  }

  localStorage.setItem("claritySession", "active");
  window.location.href = "dashboard.html";
}


/* ===== Logout ===== */
function logout() {
  localStorage.removeItem("claritySession");
  window.location.href = "base.html";
}

document.getElementById("sidebarLogout")?.addEventListener("click", logout);


/* ===== Delete Account ===== */
function deleteAccount() {
  const confirmDelete = confirm(
    "Are you sure you want to permanently delete your account?\nThis action cannot be undone."
  );

  if (!confirmDelete) return;

  // Remove stored user + session
  localStorage.removeItem("clarityUser");
  localStorage.removeItem("claritySession");

  // Redirect to landing page
  window.location.href = "base.html";
}

document.getElementById("deleteAccount")?.addEventListener("click", (e) => {
  e.preventDefault();
  deleteAccount();
});










