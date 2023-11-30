import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/dbConfig.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import path from "path";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import articleCatRoutes from "./routes/articleCatRoutes.js";
import bodyParser from "body-parser";

const port = process.env.PORT || 5000;

connectDB();

const app = express();
process.env.TZ = "Asia/Tehran";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cookieParser());

app.use(
  "/api/users",
  userRoutes
  /* , function(req, res, next){
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
} */
);
app.use("/api/articles", articleRoutes);
app.use("/api/articlecats", articleCatRoutes);
app.use("/api/auth", authRoutes);

app.use(express.static("public"));

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();

  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
