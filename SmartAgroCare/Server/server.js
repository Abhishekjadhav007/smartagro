import express from "express";
import cors from "cors";

const app = express();
const port = 5000;
let latestData = {};

app.use(cors());
app.use(express.json());

app.post("/api/data", (req, res) => {
  latestData = req.body;
  onsole.log("Data from ESP32:", latestData);
  res.json({ status: "ok" });
});

app.get("/api/data/latest", (req, res) => {
  res.json(latestData);
});

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
