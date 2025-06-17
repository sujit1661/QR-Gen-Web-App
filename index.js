import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import qr from "qr-image";

const app = express();
const port = 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/generate", (req, res) => {
  res.sendFile(path.join(__dirname, "public/generate.html"));
});

// QR image generation route
app.post("/generate", (req, res) => {
  const { url } = req.body;
  const qr_svg = qr.image(url, { type: "png" });
  res.type("png");
  qr_svg.pipe(res);
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
