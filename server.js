import express from "express";
import cors from "cors";
import OpenAI from "openai";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("."));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let knowledgeText = "";

try {
  const knowledgeRaw = fs.readFileSync("./knowledge.json", "utf8");
  knowledgeText = JSON.stringify(JSON.parse(knowledgeRaw), null, 2);
} catch (error) {
  console.error("Could not load knowledge.json:", error);
  knowledgeText = "No Kingston MP3 knowledge base has been loaded yet.";
}

app.get("/", (req, res) => {
  res.send("Chatbot backend is online");
});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({
        error: "No message provided",
      });
    }

    const systemPrompt = `
You are the Kingston MP3 website assistant.

Your job is to give helpful information to local artists about Kingston MP3.

You can answer questions about:
- What Kingston MP3 is
- How interviews work
- How music submissions work
- Copyright basics
- How Kingston MP3 can help local artists
- General platform information

Important rules:
- Do NOT book interviews.
- Do NOT collect personal details.
- Do NOT ask for name, phone number, email, music links, or social media links.
- Do NOT say "send me your details."
- Do NOT act like a form or lead collector.
- Only give informational answers.
- If the user asks how to get interviewed, explain the process based on the knowledge base.
- If the exact information is missing, say Kingston MP3 has not provided that detail yet.
- Keep answers short, clear, and friendly.
- Never make up official Kingston MP3 policies.
- Never give legal advice. For copyright questions, give basic general information only.

Use only this Kingston MP3 knowledge base:
${knowledgeText}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      temperature: 0.3,
      max_tokens: 350,
    });

    const reply =
      completion.choices[0]?.message?.content ||
      "Sorry, I could not generate a response.";

    res.json({ reply });
  } catch (error) {
    console.error("Chat error:", error);

    res.status(500).json({
      error: "Something went wrong with the chatbot.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
