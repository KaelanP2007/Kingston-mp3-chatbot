(function () {
  const API_URL = "https://kingston-mp3-chatbot.onrender.com/chat";

  const style = document.createElement("style");
  style.innerHTML = `
    #kingston-chatbot {
      position: fixed;
      right: 24px;
      bottom: 24px;
      width: 360px;
      height: 520px;
      background: #111;
      color: white;
      border: 2px solid #e11d2e;
      border-radius: 18px;
      box-shadow: 0 10px 35px rgba(0,0,0,0.45);
      font-family: Arial, sans-serif;
      z-index: 999999;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    #kingston-chatbot-header {
      background: #e11d2e;
      padding: 14px 16px;
      font-weight: bold;
      font-size: 16px;
    }

    #kingston-chatbot-subtitle {
      font-size: 12px;
      font-weight: normal;
      opacity: 0.9;
      margin-top: 3px;
    }

    #kingston-chatbot-messages {
      flex: 1;
      padding: 14px;
      overflow-y: auto;
      background: #151515;
      font-size: 14px;
      line-height: 1.4;
    }

    .kingston-msg {
      margin-bottom: 12px;
      padding: 10px 12px;
      border-radius: 12px;
      max-width: 90%;
      white-space: pre-wrap;
    }

    .kingston-user {
      background: #e11d2e;
      margin-left: auto;
      color: white;
    }

    .kingston-bot {
      background: #2a2a2a;
      margin-right: auto;
      color: white;
    }

    #kingston-chatbot-input-area {
      display: flex;
      border-top: 1px solid #333;
      background: #111;
      padding: 10px;
      gap: 8px;
    }

    #kingston-chatbot-input {
      flex: 1;
      padding: 11px;
      border-radius: 10px;
      border: 1px solid #444;
      background: #1f1f1f;
      color: white;
      outline: none;
      font-size: 14px;
    }

    #kingston-chatbot-send {
      background: #e11d2e;
      color: white;
      border: none;
      border-radius: 10px;
      padding: 0 15px;
      cursor: pointer;
      font-weight: bold;
    }

    #kingston-chatbot-send:hover {
      background: #ff2638;
    }

    @media (max-width: 600px) {
      #kingston-chatbot {
        right: 10px;
        left: 10px;
        bottom: 10px;
        width: auto;
        height: 500px;
      }
    }
  `;
  document.head.appendChild(style);

  const chatbot = document.createElement("div");
  chatbot.id = "kingston-chatbot";

  chatbot.innerHTML = `
    <div id="kingston-chatbot-header">
      Ask Kingston MP3
      <div id="kingston-chatbot-subtitle">Questions about interviews, submissions, music, and the platform</div>
    </div>

    <div id="kingston-chatbot-messages">
      <div class="kingston-msg kingston-bot">
        Hey! I’m the Kingston MP3 assistant. Ask me about interviews, submitting music, copyright basics, or how Kingston MP3 helps local artists.
      </div>
    </div>

    <div id="kingston-chatbot-input-area">
      <input id="kingston-chatbot-input" placeholder="Type your question..." />
      <button id="kingston-chatbot-send">Send</button>
    </div>
  `;

  document.body.appendChild(chatbot);

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
    if (e.key === "Enter") {
      sendMessage();
    }
  });
})();
