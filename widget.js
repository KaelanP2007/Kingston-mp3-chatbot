(function () {
  if (document.getElementById("km3-chat-widget")) return;

  const API_URL = "https://kingston-mp3-chatbot.onrender.com/chat";

  const wrapper = document.createElement("div");
  wrapper.id = "km3-chat-widget";

  wrapper.innerHTML = `
    <style>
      #km3-button {
        position: fixed;
        bottom: 22px;
        right: 22px;
        width: 68px;
        height: 68px;
        border-radius: 50%;
        background: #22b8e8;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 28px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.28);
        z-index: 999999;
      }

      #km3-box {
        position: fixed;
        bottom: 100px;
        right: 22px;
        width: 360px;
        height: 520px;
        background: white;
        border-radius: 18px;
        box-shadow: 0 12px 40px rgba(0,0,0,0.28);
        z-index: 999999;
        display: none;
        overflow: hidden;
        font-family: Arial, sans-serif;
      }

      #km3-header {
        background: #101820;
        color: white;
        padding: 16px;
        font-weight: bold;
      }

      #km3-subtitle {
        font-size: 12px;
        opacity: 0.85;
        margin-top: 4px;
        font-weight: normal;
      }

      #km3-messages {
        height: 370px;
        overflow-y: auto;
        padding: 14px;
        background: #f7f7f7;
      }

      .km3-msg {
        margin-bottom: 12px;
        padding: 10px 12px;
        border-radius: 12px;
        font-size: 14px;
        line-height: 1.4;
        max-width: 85%;
        white-space: pre-wrap;
      }

      .km3-user {
        background: #22b8e8;
        color: white;
        margin-left: auto;
      }

      .km3-bot {
        background: white;
        color: #222;
        border: 1px solid #e5e5e5;
      }

      #km3-input-area {
        display: flex;
        gap: 8px;
        padding: 10px;
        border-top: 1px solid #ddd;
        background: white;
      }

      #km3-input {
        flex: 1;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 10px;
        outline: none;
      }

      #km3-send {
        background: #22b8e8;
        color: white;
        border: none;
        border-radius: 10px;
        padding: 0 14px;
        cursor: pointer;
        font-weight: bold;
      }
    </style>

    <button id="km3-button">💬</button>

    <div id="km3-box">
      <div id="km3-header">
        Kingston MP3 Assistant 🎵
        <div id="km3-subtitle">Ask about interviews, submissions, copyright, and artist opportunities.</div>
      </div>

      <div id="km3-messages">
        <div class="km3-msg km3-bot">
          Hey! I'm the Kingston MP3 assistant. Ask me how to get interviewed, submit music, or learn how Kingston MP3 can help local artists.
        </div>
      </div>

      <div id="km3-input-area">
        <input id="km3-input" placeholder="Type your question..." />
        <button id="km3-send">Send</button>
      </div>
    </div>
  `;

  document.body.appendChild(wrapper);

  const button = document.getElementById("km3-button");
  const box = document.getElementById("km3-box");
  const messages = document.getElementById("km3-messages");
  const input = document.getElementById("km3-input");
  const send = document.getElementById("km3-send");

  button.onclick = () => {
    box.style.display = box.style.display === "none" || box.style.display === "" ? "block" : "none";
  };

  function addMessage(text, type) {
    const msg = document.createElement("div");
    msg.className = `km3-msg km3-${type}`;
    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    addMessage("Typing...", "bot");
    const typingMsg = messages.lastChild;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: text })
      });

      const data = await response.json();
      typingMsg.textContent = data.reply || "Sorry, I couldn't answer that.";
    } catch (error) {
      typingMsg.textContent = "Sorry, I couldn't connect to the Kingston MP3 assistant.";
    }
  }

  send.onclick = sendMessage;

  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });
})();
