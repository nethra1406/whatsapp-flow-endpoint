const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;

// Meta's public key (for encrypting response)
const META_PUBLIC_KEY = `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsx92pTdhvLaciPlLsK53
OoW/Tq3wHZBcuqM6wPD//5nsAg7tLrNqUtZoXUmGLo+W52IjlYlFY0NfVPaYFi+p
D6S0ha6uRTQUnPisoYNSZijlkppSfZZOK2dMIojZjJGHbYIgAsrT3yDUh8MO3mcz
3KXoFybsLarhBfj1zWMvSKdcaLTJTixMe/ZEfmfVCtSoPJ9QbY8urI6aKB58MXAf
BpBDxGxKu7oiQQ03Zd5A23s2qP+9Zg/gutXDLkBqZwuRjOqmMUZq8hwYVJhK7kAp
5euAHOoKPgQhc+W/sDoFj+pu9Ca8vSHYxf8SbEf1CI6sskQBWSr8pbZDTIkf4/Rt
BQIDAQAB
-----END PUBLIC KEY-----
`;

// Middleware
app.use(bodyParser.text({ type: "*/*" }));

// POST / (for Meta's flow health check)
app.post("/", (req, res) => {
  const responseData = JSON.stringify({ success: true });

  const encryptedBuffer = crypto.publicEncrypt(
    {
      key: META_PUBLIC_KEY,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    },
    Buffer.from(responseData)
  );

  const base64Response = encryptedBuffer.toString("base64");

  res.status(200).send(base64Response);
});

// Flow submission endpoint
app.post("/whatsapp-flow-endpoint", (req, res) => {
  console.log("Received Flow Submission:");
  console.log(req.body);
  res.status(200).send("Flow data received");
});

// Home
app.get("/", (req, res) => {
  res.send("🟢 WhatsApp Flow Endpoint is Live");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
