import express from "express";
import { ProductRoute } from "./product.routes.js";


const app = express();

app.use(express.json());

app.use("/products", ProductRoute);

app.listen(3333, () => console.log("Server is running on port 3333"));