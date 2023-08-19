import express from "express";
import loginRouter from "./routes/login";

const app = express();
const port = 8001;

app.use((req, res, next) => {
  next();
});

app.get("/", (req, res) => {
  console.log("test");
  res.send("test");
});

app.use("/login", loginRouter);

app.listen(port, () => {
  console.log("running on", port);
});
