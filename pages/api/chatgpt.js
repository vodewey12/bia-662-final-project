import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
  });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const prompt = req.body;

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {"role": "system", "content": "User will provide an input for song recommendation but only recommend artists in the following format. Artist: 1. <> 2. <> 3.<>"},
          {"role": "user", "content": prompt}
        ],
        max_tokens: 30
      });
      const quote = response;

      res.status(200).json({ quote });

    } catch (error) {
        if (error instanceof OpenAI.APIError) {
          console.log('fun')
          console.error(error.status);  // e.g. 401
          console.error(error.message); // e.g. The authentication token you passed was invalid...
          console.error(error.code);  // e.g. 'invalid_api_key'
          console.error(error.type);  // e.g. 'invalid_request_error'
          res.status(error.code).json({'error': error.message});
        } else {
          // Non-API error
          res.status(404).json({error: error.message});
        }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}