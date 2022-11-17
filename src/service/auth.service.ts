const axios = require("axios");

async function getAccessToken() {
  const url =
    "https://uat.finserve.africa/authentication/api/v3/authenticate/merchant";

  const accessToken = (
    await axios.post(
      url,
      {
        merchantCode: "7020673192",
        consumerSecret: "o5Yl3REiKL9o150FXIAL68sbjgl9n9",
      },
      {
        headers: {
          "Api-Key":
            "jRKyFVSR6TruPPIkGSOeeH8iuRZO2pBVl61uO3cp21CnJgZuUYfyYkndYU6TCsdVAlxbxrtwZrwfqSST21dytw==",
          "Content-Type": "application/json",
        },
      }
    )
  ).data.accessToken;

  console.log("accessToken:", accessToken);

  return accessToken;
}

module.exports = {
  getAccessToken,
};
