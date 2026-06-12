import express from "express";
import cors from "cors";
import OpenAI from "openai";
import fs from "fs";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("."));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const knowledge = JSON.parse(fs.readFileSync("./knowledge.json", "utf8"));

function searchKnowledge(message) {
  const words = message.toLowerCase().split(/\W+/).filter(Boolean);

  const scored = knowledge.map((item) => {
    const text = `${item.category} ${item.question} ${item.answer}`.toLowerCase();
    let score = 0;

    for (const word of words) {
      if (text.includes(word)) score++;
    }

    return { ...item, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((item) => `Q: ${item.question}\nA: ${item.answer}`)
    .join("\n\n");
}

app.get("/", (req, res) => {
  res.send("Kingston MP3 Chatbot backend is online.");
});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ error: "Message is required." });
    }

    const relevantKnowledge = searchKnowledge(userMessage);

    const response = await client.responses.create({
      model: "gpt-5.4-mini",
      input: `
You are the Kingston MP3 Artist Assistant.

Your job:
- Help local artists understand Kingston MP3.
- Answer questions about interviews, music submissions, promotion, copyright basics, and how the website can help them.
- Prioritize the provided Kingston MP3 knowledge.
- Do not invent official Kingston MP3 policies.
- For legal, copyright disputes, contracts, or unclear Kingston MP3 policies, explain generally and recommend contacting the Kingston MP3 team.
- If an artist wants to be interviewed or featured, collect: name, artist name, email, phone, genre, music link, and social media link.
- Keep answers friendly, clear, and short.

Relevant Kingston MP3 knowledge:
${relevantKnowledge || "No matching Kingston MP3 knowledge found."}

User question:
${userMessage}
`
    });

    res.json({
      reply: response.output_text || "Sorry, I couldn't generate a response."
    });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({
      reply: "Sorry, the Kingston MP3 assistant is having trouble right now."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Kingston MP3 chatbot running on port ${PORT}`);
});
