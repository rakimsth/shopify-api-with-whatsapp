require("dotenv").config();
const { client } = require("./services/whatsapp");
const cors = require("cors");
const express = require("express");

client.initialize();
const app = express();
const indexRouter = require("./routes");

const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/v1", indexRouter);

app.use((err, req, res, next) => {
  err = err ? err.toString() : "Something went wrong";
  res.status(500).json({ err });
});

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}. http://localhost:${PORT}`);
});
