(function () {
  const API_URL = "https://kingston-mp3-chatbot.onrender.com/chat";

  const style = document.createElement("style");
  style.innerHTML = `
    #kingston-chatbot-section {
      width: 100%;
      padding: 70px 20px;
      background: #050505;
      color: white;
      font-family: inherit;
    }

    #kingston-chatbot-wrap {
      max-width: 1100px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1.1fr;
      gap: 40px;
      align-items: center;
    }

    #kingston-chatbot-copy small {
      color: #d4a24c;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    #kingston-chatbot-copy h2 {
      font-size: 42px;
      line-height: 1.1;
      margin: 12px 0 18px;
      color: white;
    }

    #kingston-chatbot-copy p {
      color: #d8d8d8;
      font-size: 16px;
      line-height: 1.7;
      max-width: 470px;
    }

    #kingston-chatbot {
      background: rgba(16,16,16,0.96);
      border: 1px solid rgba(212,162,76,0.45);
      border-radius: 22px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.45);
      overflow: hidden;
      min-height: 520px;
      display: flex;
      flex-direction: column;
    }

    #kingston-chatbot-header {
      padding: 22px;
      background: linear-gradient(135deg, #151515, #050505);
      border-bottom: 1px solid rgba(212,162,76,0.35);
    }

    #kingston-chatbot-header h3 {
      margin: 0;
      font-size: 22px;
      color: white;
    }

    #kingston-chatbot-header p {
      margin: 8px 0 0;
      color: #cfcfcf;
      font-size: 14px;
      line-height: 1.5;
    }

    #kingston-chatbot-messages {
      flex: 1;
      padding: 22px;
      overflow-y: auto;
      background:
        radial-gradient(circle at top right, rgba(212,162,76,0.08), transparent 35%),
        #090909;
      font-size: 15px;
      line-height: 1.55;
    }

    .kingston-msg {
      margin-bottom: 14px;
      padding: 13px 15px;
      border-radius: 15px;
      max-width: 88%;
      white-space: pre-wrap;
    }

    .kingston-user {
      background: #d4a24c;
      color: #111;
      margin-left: auto;
      font-weight: 600;
    }

    .kingston-bot {
      background: #1f1f1f;
      color: #f2f2f2;
      border: 1px solid rgba(255,255,255,0.08);
      margin-right: auto;
    }

    #kingston-chatbot-input-area {
      display: flex;
      gap: 10px;
      padding: 16px;
      background: #070707;
      border-top: 1px solid rgba(212,162,76,0.25);
    }

    #kingston-chatbot-input {
      flex: 1;
      padding: 14px;
      border-radius: 12px;
      border: 1px solid rgba(212,162,76,0.35);
      background: #141414;
      color: white;
      outline: none;
      font-size: 15px;
    }

    #kingston-chatbot-send {
      background: #d4a24c;
      color: #111;
      border: none;
      border-radius: 12px;
      padding: 0 20px;
      cursor: pointer;
      font-weight: 800;
      font-size: 15px;
    }

    #kingston-chatbot-send:hover {
      background: #f0bd63;
    }

    @media (max-width: 850px) {
      #kingston-chatbot-wrap {
        grid-template-columns: 1fr;
      }

      #kingston-chatbot-copy h2 {
        font-size: 32px;
      }

      #kingston-chatbot {
        min-height: 500px;
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
        <h2>Ask questions about Kingston MP3</h2>
        <p>
          Local artists can use this assistant to learn about interviews,
          music submissions, copyright basics, and how Kingston MP3 helps
          Kingston-area talent get discovered.
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

  const secondSection = target.querySelectorAll("section")[1];

  if (secondSection) {
    secondSection.parentNode.insertBefore(section, secondSection);
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
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      });

      const data = await response.json();
      typingMsg.textContent = data.reply || "Sorry, I could not answer that.";
    } catch (error) {
      typingMsg.textContent = "Sorry, something went wrong. Please try again.";
    }
  }

  sendBtn.addEventListener("click", sendMessage);

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") sendMessage();
  });
})();
