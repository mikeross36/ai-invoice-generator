import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import rateLimit from "express-rate-limit";
import connectDb from "./connections/connectDb";
import logger from "./utils/logger";

import authRouter from "./routes/authRoutes";
import invoiceRouter from "./routes/invoiceRoutes";
import aiRouter from "./routes/aiRoutes";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Origin",
    ],
  })
);
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist/index.html")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
  });
}
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after an hour",
});
// app.use(limiter);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/invoices", invoiceRouter);
app.use("/api/v1/ai", aiRouter);

const PORT = process.env.PORT || 5000;

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error(`Faield to connect to database: ${err}`);
  });
