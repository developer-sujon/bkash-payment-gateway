require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const port = process.env.PORT ? process.env.PORT : 4000;
//bkash router
const bkashRouter = require("./routes/bkashRouter.js");
const authCheck = require("./middleware/bkashAuthorization.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/bkash", bkashRouter);

app.get("/", authCheck, (req, res) => {
  try {
    res.send("hlw bkash");
  } catch (e) {
    console.log(e);
  }
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`),
);
