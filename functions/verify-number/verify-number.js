// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  try {
    const { number } = event.queryStringParameters;

    const API_KEY = process.env.NUM_VERIFY_APIKEY;

    const url = `http://apilayer.net/api/validate?access_key=${API_KEY}&number=${number}`;

    const res = await fetch(url);
    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
