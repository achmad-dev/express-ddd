import express from "express";
import { initRoute } from "../src/app/api/route/route";

const app = express();

app.use(express.json());

initRoute(app);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
