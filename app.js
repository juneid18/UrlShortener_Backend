import express from "express";
import connectDB from "./config/db.config.js";
import shortUrlRoutes from "./routes/shortUrl.js";
import Authentication from "./routes/Authentication.js";
import { redirectFromShortUrl } from "./controller/shortUrl.controller.js";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", shortUrlRoutes);
app.get("/:id", redirectFromShortUrl);
app.use("/auth", Authentication);

app.listen(3000, async () => {
  await connectDB();
  console.log("Server is running on port http://localhost:3000");
});
