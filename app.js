document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     VOICE (Web Speech API)
  =============================== */
  const sendButton = document.getElementById("sendButton");
  const userInput = document.getElementById("userInput");
  const languageSelect = document.getElementById("languageSelect");
  const voiceStatus = document.getElementById("voiceStatus");

  if (sendButton) {
    sendButton.addEventListener("click", () => {
      const text = userInput.value.trim();
      const lang = languageSelect.value || "en-US";

      if (!text) {
        alert("Please enter some text!");
        return;
      }

      if (!("speechSynthesis" in window)) {
        alert("Your browser does not support voice synthesis.");
        return;
      }

      speakText(text, lang);
    });
  }

  function speakText(text, lang) {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);

    utter.lang = lang;
    utter.rate = 1.05;
    utter.pitch = 1.1;
    utter.volume = 1;

    if (voiceStatus) {
      voiceStatus.textContent = "🔊 Speaking…";
      voiceStatus.className = "status speaking";
    }

    const voices = synth.getVoices();
    utter.voice = voices.find(v => v.lang.startsWith(lang)) || voices[0];

    synth.cancel();
    synth.speak(utter);

    utter.onend = () => {
      if (voiceStatus) {
        voiceStatus.textContent = "✅ Finished speaking";
        voiceStatus.className = "status idle";
      }
    };

    utter.onerror = () => {
      if (voiceStatus) {
        voiceStatus.textContent = "⚠️ Voice error";
        voiceStatus.className = "status idle";
      }
    };
  }

  /* ===============================
     NAVBAR + THEME
  =============================== */
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.querySelector(".navbar .nav-links");
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    if (themeToggle) themeToggle.textContent = "🌙";
  }

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      menuToggle.classList.toggle("open");
    });
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      const isDark = body.classList.contains("dark-mode");
      themeToggle.textContent = isDark ? "🌙" : "🌞";
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  /* ===============================
     SIDEBAR (Hamburger)
  =============================== */
  const hamburger = document.getElementById("hamburger");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  if (hamburger && sidebar && overlay) {
    hamburger.addEventListener("click", () => {
      sidebar.classList.toggle("active");
      overlay.classList.toggle("active");
    });

    overlay.addEventListener("click", () => {
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
    });
  }

  /* ===============================
     USER / SESSION
  =============================== */
  const session = localStorage.getItem("claritySession");
  const storedUser = JSON.parse(localStorage.getItem("clarityUser"));

  if (storedUser && document.getElementById("username")) {
    document.getElementById("username").innerText = storedUser.username;
  }

  /* ===============================
     DASHBOARD PAGES
  =============================== */
  const pages = {
    home: `
      <h3>📊 Dashboard</h3>
      <p>Your personal Clarity AI workspace.</p>
      <ul>
        <li>✔ Frontend-only architecture</li>
        <li>✔ Web Speech API TTS</li>
        <li>✔ Privacy-first design</li>
      </ul>
    `,
    voice: `
      <h3>🎙️ Voice Assistant</h3>
      <p>Convert text into a confident AI voice.</p>
      <a href="index.html" class="btn-primary" style="margin-top:10px;">
        🎙️ Open Voice Studio
      </a>
    `,
    notes: `
      <h3>📝 Notes</h3>
      <textarea id="notesArea" style="width:100%;height:120px;" placeholder="Write notes..."></textarea>
      <br><br>
      <button class="btn-primary" onclick="saveNotes()">Save Notes</button>
      <p class="muted" style="margin-top:10px;">Stored locally in your browser.</p>
    `
  };

  document.querySelectorAll(".sidebar a[data-page]").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const page = link.dataset.page;
      document.getElementById("content-area").innerHTML = pages[page];
      if (page === "notes") loadNotes();
    });
  });

  window.saveNotes = () => {
    localStorage.setItem(
      "clarity_notes",
      document.getElementById("notesArea").value
    );
    alert("Notes saved!");
  };

  window.loadNotes = () => {
    document.getElementById("notesArea").value =
      localStorage.getItem("clarity_notes") || "";
  };

  /* ===============================
     AUTH
  =============================== */
  window.handleSignup = e => {
    e.preventDefault();
    const user = {
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      mobile: document.getElementById("mobile").value
    };
    localStorage.setItem("clarityUser", JSON.stringify(user));
    window.location.href = "login.html";
  };

  window.handleLogin = e => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const savedUser = JSON.parse(localStorage.getItem("clarityUser"));

    if (!savedUser || savedUser.email !== email) {
      alert("Invalid credentials");
      return;
    }

    localStorage.setItem("claritySession", "active");
    window.location.href = "dashboard.html";
  };

  window.logout = () => {
    localStorage.removeItem("claritySession");
    window.location.href = "base.html";
  };

  document.getElementById("sidebarLogout")?.addEventListener("click", logout);

  /* ===============================
     DELETE ACCOUNT
  =============================== */
  document.getElementById("deleteAccount")?.addEventListener("click", e => {
    e.preventDefault();
    if (!confirm("Delete account permanently?")) return;
    localStorage.removeItem("clarityUser");
    localStorage.removeItem("claritySession");
    window.location.href = "base.html";
  });

  /* ===============================
     NAV VISIBILITY
  =============================== */
  const backBtn = document.getElementById("backToDashboard");
  if (session === "active" && backBtn) {
    backBtn.style.display = "inline-block";
  }

});