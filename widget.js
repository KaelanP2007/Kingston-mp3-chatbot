(function () {
const API_URL = "https://kingston-mp3-chatbot.onrender.com/chat";

const style = document.createElement("style");
style.innerHTML = `
#kmp3-ai-center{
padding:80px 30px;
background:transparent;
color:#fff;
max-width:1100px;
margin:0 auto;
font-family:inherit;
}

#kmp3-header{
text-align:center;
margin-bottom:40px;
}

#kmp3-header small{
color:#d7a94f;
text-transform:uppercase;
letter-spacing:2px;
font-weight:700;
}

#kmp3-header h2{
font-size:54px;
line-height:1.05;
margin:15px 0;
color:white;
}

#kmp3-header p{
max-width:700px;
margin:auto;
color:rgba(255,255,255,.75);
line-height:1.8;
}

#kmp3-search{
display:flex;
gap:10px;
margin-top:35px;
}

#kmp3-input{
flex:1;
padding:18px;
border-radius:12px;
border:1px solid rgba(255,255,255,.15);
background:rgba(255,255,255,.04);
color:white;
font-size:16px;
}

#kmp3-button{
background:#d7a94f;
border:none;
color:#000;
font-weight:700;
padding:0 30px;
border-radius:12px;
cursor:pointer;
}

#kmp3-questions{
margin-top:25px;
display:flex;
flex-wrap:wrap;
gap:10px;
}

.kmp3-question{
border:1px solid rgba(215,169,79,.35);
color:#d7a94f;
padding:10px 15px;
border-radius:999px;
cursor:pointer;
transition:.2s;
}

.kmp3-question:hover{
background:rgba(215,169,79,.1);
}

#kmp3-answer{
margin-top:35px;
display:none;
padding:30px;
border-radius:18px;
background:rgba(255,255,255,.03);
border:1px solid rgba(255,255,255,.08);
color:white;
line-height:1.8;
font-size:16px;
}

@media(max-width:768px){
#kmp3-header h2{
font-size:38px;
}

```
#kmp3-search{
  flex-direction:column;
}

#kmp3-button{
  height:55px;
}
```

}
`;
document.head.appendChild(style);

const container = document.createElement("section");
container.id = "kmp3-ai-center";

container.innerHTML = ` <div id="kmp3-header"> <small>Kingston MP3 Assistant</small> <h2>Ask Anything About Kingston MP3</h2> <p>
Learn about interviews, submissions, local music history,
copyright basics, and how Kingston MP3 supported local artists. </p>

```
  <div id="kmp3-search">
    <input id="kmp3-input" placeholder="Ask a question..." />
    <button id="kmp3-button">Ask</button>
  </div>

  <div id="kmp3-questions">
    <div class="kmp3-question">How do I get interviewed?</div>
    <div class="kmp3-question">How do I submit music?</div>
    <div class="kmp3-question">What is Kingston MP3?</div>
    <div class="kmp3-question">What can Kingston MP3 do for artists?</div>
  </div>

  <div id="kmp3-answer"></div>
</div>
```

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
answer.innerHTML = "Thinking...";

```
try {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      message: question
    })
  });

  const data = await response.json();
  answer.innerHTML = data.reply;
} catch (e) {
  answer.innerHTML = "Sorry, something went wrong.";
}
```

}

button.addEventListener("click", () => {
if (!input.value.trim()) return;
askQuestion(input.value);
});

input.addEventListener("keydown", (e) => {
if (e.key === "Enter") {
if (!input.value.trim()) return;
askQuestion(input.value);
}
});

document.querySelectorAll(".kmp3-question").forEach(btn => {
btn.addEventListener("click", () => {
input.value = btn.innerText;
askQuestion(btn.innerText);
});
});
})();
