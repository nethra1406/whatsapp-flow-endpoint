const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Meta's expected POST health check endpoint
app.post("/", (req, res) => {
  const responseObj = { success: true };
  const base64Response = Buffer.from(JSON.stringify(responseObj)).toString("base64");
  res.status(200).send(base64Response);
});

// Flow endpoint (for actual data)
app.post("/whatsapp-flow-endpoint", (req, res) => {
  const flowData = req.body;
  console.log("Received Flow Submission:");
  console.log(JSON.stringify(flowData, null, 2));
  res.status(200).send("Flow data received");
});

// Home
app.get("/", (req, res) => {
  res.send("🟢 WhatsApp Flow Endpoint is Live");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
