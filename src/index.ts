import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoute from "./modules/auth/route";
import categoriesRoute from "./modules/category/route";
import productRoute from "./modules/product/route";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (_, res) => res.json({ message: "Welcome to Eco Shop API" }));

app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/categories", categoriesRoute);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
