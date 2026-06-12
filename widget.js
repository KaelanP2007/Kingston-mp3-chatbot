(function () {
  const API_URL = "https://kingston-mp3-chatbot.onrender.com/chat";

  const style = document.createElement("style");
  style.textContent = `
    #kmp3-ai-center {
      padding: 70px 24px;
      background: transparent;
      color: #fff;
      max-width: 1100px;
      margin: 0 auto;
      font-family: inherit;
    }

    #kmp3-header {
      text-align: left;
    }

    #kmp3-header small {
      color: #d7a94f;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-weight: 700;
      display: block;
      margin-bottom: 12px;
    }

    #kmp3-header h2 {
      font-size: 48px;
      line-height: 1.05;
      margin: 0 0 18px;
      color: white;
    }

    #kmp3-header p {
      max-width: 720px;
      color: rgba(255,255,255,0.75);
      line-height: 1.7;
      margin: 0 0 28px;
    }

    #kmp3-search {
      display: flex;
      gap: 10px;
      max-width: 850px;
    }

    #kmp3-input {
      flex: 1;
      padding: 18px;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.15);
      background: rgba(255,255,255,0.05);
      color: white;
      font-size: 16px;
      outline: none;
    }

    #kmp3-button {
      background: #d7a94f;
      border: none;
      color: #000;
      font-weight: 800;
      padding: 0 30px;
      border-radius: 12px;
      cursor: pointer;
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
      background: rgba(215,169,79,0.06);
    }

    #kmp3-answer {
      margin-top: 28px;
      display: none;
      max-width: 850px;
      padding: 24px;
      border-radius: 16px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      color: white;
      line-height: 1.75;
      font-size: 16px;
      white-space: pre-wrap;
    }

    @media (max-width: 768px) {
      #kmp3-header h2 {
        font-size: 36px;
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
    <div id="kmp3-header">
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
        headers: {
          "Content-Type": "application/json"
        },
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
