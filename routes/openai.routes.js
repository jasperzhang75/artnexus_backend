const express = require('express');
const router = express.Router();
const axios = require('axios');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const IMAGE_API_URL = "https://api.openai.com/v1/images/generations";
const POEM_API_URL = "https://api.openai.com/v1/chat/completions";

router.post('/generate-artwork', async (req, res) => {
  const { prompt } = req.body;
  
  try {
    const response = await axios.post(
      IMAGE_API_URL,
      {
        prompt,
        n: 1,
        size: "1024x1024",
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ url: response.data.data[0].url });
  } catch (error) {
    console.error("Error generating artwork: ", error);
    res.status(500).json({ error: "Error generating artwork" });
  }
});

router.post('/generate-poem', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      POEM_API_URL,
      {
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are a poet." },
          { role: "user", content: prompt },
        ],
        max_tokens: 400,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.choices && response.data.choices.length > 0) {
      res.json({ poem: response.data.choices[0].message.content.trim() });
    } else {
      res.status(500).json({ error: "No choices found in the response" });
    }
  } catch (error) {
    console.error("Error generating poem: ", error);
    res.status(500).json({ error: "Error generating poem" });
  }
});

module.exports = router;