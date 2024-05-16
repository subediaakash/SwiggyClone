import express from "express";
import { sellerRouter } from "./src/routes/seller/app.route";
import { commonRouter } from "./src/routes/common/app.route";
import { buyerRouter } from "./src/routes/buyer/app.route";

const app = express();

app.use(express.json());

app.use("/api/v1", commonRouter);

app.use("/api/v1/seller", sellerRouter);
app.use("/api/v1/buyer", buyerRouter);

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
