(function () {
  const API_URL = "https://kingston-mp3-chatbot.onrender.com/chat";

  const style = document.createElement("style");
  style.textContent = `
    #kmp3-ai-center {
      max-width: 1180px !important;
      margin: 60px auto !important;
      padding: 0 24px !important;
      font-family: Arial, sans-serif !important;
      box-sizing: border-box !important;
    }

    #kmp3-card {
      background: #080808 !important;
      border-radius: 28px !important;
      padding: 48px !important;
      border: 1px solid rgba(215,169,79,0.45) !important;
      box-shadow: 0 25px 70px rgba(0,0,0,0.25) !important;
      color: #ffffff !important;
    }

    #kmp3-card small {
      color: #d7a94f !important;
      text-transform: uppercase !important;
      letter-spacing: 2px !important;
      font-weight: 800 !important;
      display: block !important;
      margin-bottom: 14px !important;
      font-size: 13px !important;
    }

    #kmp3-card h2 {
      color: #ffffff !important;
      font-size: 46px !important;
      line-height: 1.05 !important;
      margin: 0 0 16px !important;
      font-weight: 800 !important;
    }

    #kmp3-card p {
      color: rgba(255,255,255,0.78) !important;
      line-height: 1.7 !important;
      max-width: 760px !important;
      margin: 0 0 28px !important;
      font-size: 16px !important;
    }

    #kmp3-search {
      display: flex !important;
      gap: 12px !important;
      max-width: 850px !important;
      margin-bottom: 22px !important;
    }

    #kmp3-input {
      flex: 1 !important;
      width: 100% !important;
      padding: 17px 18px !important;
      border-radius: 14px !important;
      border: 1px solid rgba(215,169,79,0.5) !important;
      background: #161616 !important;
      color: #ffffff !important;
      font-size: 16px !important;
      outline: none !important;
      box-sizing: border-box !important;
      min-height: 56px !important;
    }

    #kmp3-input::placeholder {
      color: rgba(255,255,255,0.65) !important;
    }

    #kmp3-button {
      background: #d7a94f !important;
      border: none !important;
      color: #050505 !important;
      font-weight: 900 !important;
      padding: 0 34px !important;
      border-radius: 14px !important;
      cursor: pointer !important;
      font-size: 15px !important;
      min-height: 56px !important;
    }

    #kmp3-questions {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 10px !important;
      margin-top: 8px !important;
    }

    .kmp3-question {
      border: 1px solid rgba(215,169,79,0.55) !important;
      color: #d7a94f !important;
      padding: 10px 15px !important;
      border-radius: 999px !important;
      cursor: pointer !important;
      background: rgba(215,169,79,0.1) !important;
      font-family: Arial, sans-serif !important;
      font-size: 14px !important;
    }

    #kmp3-answer {
      margin-top: 28px !important;
      display: none;
      max-width: 850px !important;
      padding: 24px !important;
      border-radius: 18px !important;
      background: #151515 !important;
      border: 1px solid rgba(255,255,255,0.12) !important;
      color: #ffffff !important;
      line-height: 1.75 !important;
      font-size: 16px !important;
      white-space: pre-wrap !important;
    }

    @media (max-width: 768px) {
      #kmp3-card {
        padding: 32px 22px !important;
      }

      #kmp3-card h2 {
        font-size: 34px !important;
      }

      #kmp3-search {
        flex-direction: column !important;
      }

      #kmp3-button {
        height: 54px !important;
      }
    }
  `;

  document.head.appendChild(style);

  const container = document.createElement("section");
  container.id = "kmp3-ai-center";

  container.innerHTML = `
    <div id="kmp3-card">
      <small>Kingston MP3 Assistant</small>
      <h2>Ask Anything About Kingston MP3</h2>
      <p>
        Learn about interviews, submissions, local music history,
        copyright basics, and how Kingston MP3 supported local artists.
      </p>

      <div id="kmp3-search">
        <input id="kmp3-input" type="text" placeholder="Ask a question..." />
        <button id="kmp3-button" type="button">Ask</button>
      </div>

      <div id="kmp3-questions">
        <button type="button" class="kmp3-question">How do I get interviewed?</button>
        <button type="button" class="kmp3-question">How do I submit music?</button>
        <button type="button" class="kmp3-question">What is Kingston MP3?</button>
        <button type="button" class="kmp3-question">What can Kingston MP3 do for artists?</button>
      </div>

      <div id="kmp3-answer"></div>
    </div>
  `;

  const target =
    document.querySelector("main") ||
    document.querySelector(".entry-content") ||
    document.body;

  const sections = target.querySelectorAll("section");

  if (sections[1]) {
    sections[1].parentNode.insertBefore(container, sections[1]);
  } else {
    target.appendChild(container);
  }

  const input = document.getElementById("kmp3-input");
  const button = document.getElementById("kmp3-button");
  const answer = document.getElementById("kmp3-answer");

  async function askQuestion(question) {
    answer.style.display = "block";
    answer.textContent = "Thinking...";

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question })
      });

      const data = await response.json();
      answer.textContent = data.reply || "Sorry, I could not answer that yet.";
    } catch (error) {
      answer.textContent = "Sorry, something went wrong.";
    }
  }

  button.addEventListener("click", function () {
    const question = input.value.trim();
    if (question) askQuestion(question);
  });

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const question = input.value.trim();
      if (question) askQuestion(question);
    }
  });

  document.querySelectorAll(".kmp3-question").forEach(function (btn) {
    btn.addEventListener("click", function () {
      input.value = btn.textContent;
      askQuestion(btn.textContent);
    });
  });
})();
