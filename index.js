import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import cors from "cors";

//configure env
dotenv.config();

//connect to database
connectDB();

//configure express
const app = express();


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// cors
app.use(cors({ credentials: true, origin: "http://localhost:5173"  }));
app.use(morgan("dev"));

//routes
app.use("/api", authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/api', paymentRoutes);

// rest api
app.get("/api", (req, res) => {
  res.send("Hello World!");
})

//listen to port
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on ${process.env.DEV_MODE} mode on port ${port}`.bgYellow.bold);
})