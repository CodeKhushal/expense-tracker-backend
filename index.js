import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import expenseRoute from "./routes/expense.route.js";
import cors from "cors";

dotenv.config({});

const app = express();
const PORT = process.env.PORT || 3000;
const whitelist = [
  "https://kexptrack.vercel.app",
  "http://localhost:5173",
  "https://expense-tracker-frontend-seven-alpha.vercel.app",
];

// middleware
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/expense", expenseRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server listen at port ${PORT}`);
});
