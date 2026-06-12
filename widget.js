(function () {
  const API_URL = "https://kingston-mp3-chatbot.onrender.com/chat";

  const style = document.createElement("style");
  style.innerHTML = `
    #kingston-chatbot-section {
      width: 100%;
      padding: 80px 24px;
      background:
        linear-gradient(180deg, #030303 0%, #090909 55%, #030303 100%);
      color: white;
      font-family: inherit;
      box-sizing: border-box;
    }

    #kingston-chatbot-wrap {
      max-width: 1180px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 0.9fr 1.1fr;
      gap: 56px;
      align-items: center;
    }

    #kingston-chatbot-copy {
      max-width: 470px;
    }

    #kingston-chatbot-copy small {
      display: block;
      color: #d7a94f;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-bottom: 14px;
    }

    #kingston-chatbot-copy h2 {
      font-size: clamp(34px, 4vw, 54px);
      line-height: 1.04;
      margin: 0 0 20px;
      color: #fff;
      letter-spacing: -0.04em;
    }

    #kingston-chatbot-copy p {
      color: rgba(255,255,255,0.78);
      font-size: 17px;
      line-height: 1.75;
      margin: 0;
    }

    #kingston-chatbot {
      width: 100%;
      max-width: 620px;
      background: rgba(8,8,8,0.92);
      border: 1px solid rgba(215,169,79,0.42);
      border-radius: 20px;
      box-shadow: 0 26px 70px rgba(0,0,0,0.55);
      overflow: hidden;
      min-height: 440px;
      display: flex;
      flex-direction: column;
    }

    #kingston-chatbot-header {
      padding: 22px 24px;
      background:
        linear-gradient(135deg, rgba(255,255,255,0.045), rgba(255,255,255,0.01));
      border-bottom: 1px solid rgba(215,169,79,0.25);
    }

    #kingston-chatbot-header h3 {
      margin: 0;
      font-size: 24px;
      line-height: 1.15;
      color: #fff;
      letter-spacing: -0.02em;
    }

    #kingston-chatbot-header p {
      margin: 8px 0 0;
      color: rgba(255,255,255,0.7);
      font-size: 14px;
      line-height: 1.45;
    }

    #kingston-chatbot-messages {
      flex: 1;
      padding: 22px;
      overflow-y: auto;
      background:
        radial-gradient(circle at top right, rgba(215,169,79,0.09), transparent 32%),
        #080808;
      font-size: 15px;
      line-height: 1.55;
    }

    .kingston-msg {
      margin-bottom: 13px;
      padding: 13px 15px;
      border-radius: 14px;
      max-width: 82%;
      white-space: pre-wrap;
      font-size: 15px;
      line-height: 1.55;
      text-align: left;
    }

    .kingston-user {
      background: #d7a94f;
      color: #080808;
      margin-left: auto;
      font-weight: 700;
    }

    .kingston-bot {
      background: rgba(255,255,255,0.075);
      color: rgba(255,255,255,0.9);
      border: 1px solid rgba(255,255,255,0.08);
      margin-right: auto;
    }

    #kingston-chatbot-input-area {
      display: flex;
      gap: 10px;
      padding: 14px;
      background: #060606;
      border-top: 1px solid rgba(215,169,79,0.22);
    }

    #kingston-chatbot-input {
      flex: 1;
      min-width: 0;
      padding: 13px 14px;
      border-radius: 12px;
      border: 1px solid rgba(215,169,79,0.28);
      background: rgba(255,255,255,0.055);
      color: white;
      outline: none;
      font-size: 15px;
      line-height: 1.2;
      box-sizing: border-box;
    }

    #kingston-chatbot-input::placeholder {
      color: rgba(255,255,255,0.42);
    }

    #kingston-chatbot-send {
      background: #d7a94f;
      color: #080808;
      border: none;
      border-radius: 12px;
      padding: 0 22px;
      cursor: pointer;
      font-weight: 900;
      font-size: 15px;
      min-width: 82px;
    }

    #kingston-chatbot-send:hover {
      background: #efc064;
    }

    @media (max-width: 900px) {
      #kingston-chatbot-section {
        padding: 56px 18px;
      }

      #kingston-chatbot-wrap {
        grid-template-columns: 1fr;
        gap: 30px;
      }

      #kingston-chatbot-copy {
        max-width: 100%;
      }

      #kingston-chatbot {
        max-width: 100%;
        min-height: 430px;
      }
    }
  `;
  document.head.appendChild(style);

  const section = document.createElement("section");
  section.id = "kingston-chatbot-section";

  section.innerHTML = `
    <div id="kingston-chatbot-wrap">
      <div id="kingston-chatbot-copy">
        <small>Kingston MP3 Assistant</small>
        <h2>Ask about the project, the music, and the story.</h2>
        <p>
          Use the Kingston MP3 assistant to learn how the platform works,
          what it offers local artists, and what information is currently
          available about interviews, submissions, and copyright basics.
        </p>
      </div>

      <div id="kingston-chatbot">
        <div id="kingston-chatbot-header">
          <h3>Ask Kingston MP3</h3>
          <p>Questions about interviews, submissions, music, copyright basics, and the platform.</p>
        </div>

        <div id="kingston-chatbot-messages">
          <div class="kingston-msg kingston-bot">
            Hey! Ask me anything about Kingston MP3, interviews, submissions, copyright basics, or how the platform helps local artists.
          </div>
        </div>

        <div id="kingston-chatbot-input-area">
          <input id="kingston-chatbot-input" placeholder="Type your question..." />
          <button id="kingston-chatbot-send">Send</button>
        </div>
      </div>
    </div>
  `;

  const target =
    document.querySelector("main") ||
    document.querySelector(".entry-content") ||
    document.body;

  const sections = target.querySelectorAll("section");

  if (sections[1]) {
    sections[1].parentNode.insertBefore(section, sections[1]);
  } else {
    target.appendChild(section);
  }

  const messages = document.getElementById("kingston-chatbot-messages");
  const input = document.getElementById("kingston-chatbot-input");
  const sendBtn = document.getElementById("kingston-chatbot-send");

  function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.className = `kingston-msg kingston-${sender}`;
    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  async function sendMessage() {
    const message = input.value.trim();
    if (!message) return;

    addMessage(message, "user");
    input.value = "";

    addMessage("Kingston MP3 is typing...", "bot");
    const typingMsg = messages.lastChild;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });

      const data = await response.json();
      typingMsg.textContent = data.reply || "Sorry, I could not answer that yet.";
    } catch (error) {
      typingMsg.textContent = "Sorry, something went wrong. Please try again.";
    }
  }

  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") sendMessage();
  });
})();
