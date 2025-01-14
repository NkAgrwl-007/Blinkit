import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/connectDB.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(
    cors({
      origin: "http://localhost:5173", 
      credentials: true,              
    })
  );
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet({
    crossOriginResourcePolicy: false
}));

const PORT = process.env.PORT || 8080;

app.use("/api/auth", authRoutes); 

app.get("/", (req, res) => {
    res.json({ message: "Server is running!" });
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port", PORT);
    });
});
