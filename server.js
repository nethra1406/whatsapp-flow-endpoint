const express = require("express");
const crypto = require("crypto");
const fs = require("fs");

const app = express();
const port = 3000;

// Load your private key
const privateKey = fs.readFileSync("./private.pem", "utf8");

// Define the payload
app.post("/", (req, res) => {
  const payload = {
    body: {
      success: true,
    },
  };

  const payloadString = JSON.stringify(payload);

  // Sign the payload using RSA-SHA256
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(payloadString);
  signer.end();

  const signature = signer.sign(privateKey);
  const base64Signature = signature.toString("base64");

  // Respond with the base64-encoded signature
  res.setHeader("Content-Type", "text/plain");
  res.status(200).send(base64Signature);
});

app.listen(port, () => {
  console.log(`✅ Flow endpoint running at http://localhost:${port}`);
});
