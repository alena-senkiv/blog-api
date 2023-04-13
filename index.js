import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

// Constants
const { DB_HOST, PORT = 5000 } = process.env;

async function start() {
  try {
    await mongoose.connect(DB_HOST);

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
