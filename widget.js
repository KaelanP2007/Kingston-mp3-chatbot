(function () {
  const API_URL = "https://kingston-mp3-chatbot.onrender.com/chat";

  const style = document.createElement("style");
  style.textContent = `
    #kmp3-ai-center {
      max-width: 1180px;
      margin: 70px auto;
      padding: 0 24px;
      font-family: inherit;
      box-sizing: border-box;
    }

    #kmp3-card {
      background: linear-gradient(135deg, #050505, #111);
      border-radius: 28px;
      padding: 48px;
      border: 1px solid rgba(215,169,79,0.35);
      box-shadow: 0 25px 70px rgba(0,0,0,0.22);
    }

    #kmp3-card small {
      color: #d7a94f;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-weight: 800;
      display: block;
      margin-bottom: 14px;
    }

    #kmp3-card h2 {
      color: #fff;
      font-size: 46px;
      line-height: 1.05;
      margin: 0 0 16px;
    }

    #kmp3-card p {
      color: rgba(255,255,255,0.75);
      line-height: 1.7;
      max-width: 760px;
      margin: 0 0 28px;
      font-size: 16px;
    }

    #kmp3-search {
      display: flex;
      gap: 12px;
      max-width: 850px;
    }

    #kmp3-input {
      flex: 1;
      padding: 17px 18px;
      border-radius: 14px;
      border: 1px solid rgba(215,169,79,0.35);
      background: rgba(255,255,255,0.07);
      color: white;
      font-size: 16px;
      outline: none;
      box-sizing: border-box;
    }

    #kmp3-input::placeholder {
      color: rgba(255,255,255,0.5);
    }

    #kmp3-button {
      background: #d7a94f;
      border: none;
      color: #050505;
      font-weight: 900;
      padding: 0 32px;
      border-radius: 14px;
      cursor: pointer;
      font-size: 15px;
    }

    #kmp3-questions {
      margin-top: 22px;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .kmp3-question {
      border: 1px solid rgba(215,169,79,0.45);
      color: #d7a94f;
      padding: 10px 15px;
      border-radius: 999px;
      cursor: pointer;
      background: rgba(215,169,79,0.08);
      font: inherit;
      font-size: 14px;
    }

    .kmp3-question:hover {
      background: rgba(215,169,79,0.16);
    }

    #kmp3-answer {
      margin-top: 28px;
      display: none;
      max-width: 850px;
      padding: 24px;
      border-radius: 18px;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.1);
      color: rgba(255,255,255,0.9);
      line-height: 1.75;
      font-size: 16px;
      white-space: pre-wrap;
    }

    @media (max-width: 768px) {
      #kmp3-card {
        padding: 32px 22px;
      }

      #kmp3-card h2 {
        font-size: 34px;
      }

      #kmp3-search {
        flex-direction: column;
      }

      #kmp3-button {
        height: 54px;
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
        <input id="kmp3-input" placeholder="Ask a question..." />
        <button id="kmp3-button">Ask</button>
      </div>

      <div id="kmp3-questions">
        <button class="kmp3-question">How do I get interviewed?</button>
        <button class="kmp3-question">How do I submit music?</button>
        <button class="kmp3-question">What is Kingston MP3?</button>
        <button class="kmp3-question">What can Kingston MP3 do for artists?</button>
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
