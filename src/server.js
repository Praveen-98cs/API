import express from "express";
import { ProductRoute } from "./product.routes.js";


const app = express();

app.use(express.json());

app.use("/products", ProductRoute);

const port = process.env.PORT || 3333;
app.listen(port, () => console.log("Server is running on port 3333"));