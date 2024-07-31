import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
  });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { heartRate, activity } = req.body;

    if (!heartRate || !activity) {
      return res.status(400).json({ error: 'Heart rate and activity are required.' });
    }

    try {
      const prompt = `The user has an average heart rate of ${heartRate} BPM and is about to ${activity}. Suggest a mood or genre for the music.`;
      console.log(prompt)
      const response = await openai.completions.create({
        model: 'gpt-3.5-turbo',
        prompt: prompt,
        max_tokens: 30
      });
      const quote = response.choices[0].text;
      for await (const part of stream) {
        console.log(part.choices[0]);
      }
      res.status(200).json({ quote });

    } catch (error) {
        if (error instanceof OpenAI.APIError) {
          console.error(error.status);  // e.g. 401
          console.error(error.message); // e.g. The authentication token you passed was invalid...
          console.error(error.code);  // e.g. 'invalid_api_key'
          console.error(error.type);  // e.g. 'invalid_request_error'
        } else {
          // Non-API error
          console.log(error);
        }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}