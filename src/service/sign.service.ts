const crypto = require("crypto");
const fs = require("fs");

const privateKey = fs.readFileSync("../privatekey.pem");
const publicKey = fs.readFileSync("../publicKey.pem");

function getSignature(data) {
  const signature = crypto
    .sign("sha256", Buffer.from(data), {
      key: privateKey,
    })
    .toString("base64");

  console.log("signature:", signature);

  const isVerified = crypto.verify(
    "sha256",
    Buffer.from(data),
    {
      key: publicKey,
    },
    Buffer.from(signature, "base64")
  );

  console.log("signature verified:", isVerified);

  return signature;
}

module.exports = {
  getSignature,
};
