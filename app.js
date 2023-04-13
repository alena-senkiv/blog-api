import express from "express";
import cors from "cors";
import logger from "morgan";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import postsRouter from "./routes/posts.js";
import usersRouter from "./routes/users.js";

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// Middlewares

app.use(logger(formatsLogger));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});
app.use((err, req, res, next) => {
  const { status = 500 } = err;
  res.status(status).json({ message: err.message });
});

export default app;
